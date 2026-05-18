"use client";
import * as THREE from "three";
import {
  GLTFLoader,
  type GLTF,
} from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import type { MeshStandardMaterial } from "three";

// ============================================================================
// Constants
// ============================================================================

/** Base path for static assets in Next.js */
const ASSETS_BASE_PATH = "/";

/** Progress weight for download phase (0-1) */
const DOWNLOAD_PROGRESS_WEIGHT = 0.95;

/** Progress value for parsing phase */
const PARSING_PROGRESS_VALUE = 0.97;

/** Model preload queue delay time (milliseconds) */
export const PRELOAD_QUEUE_DELAY = 120;

/** Model load timeout (milliseconds) */
export const MODEL_LOAD_TIMEOUT = 5000;

/** Maximum number of models to keep in cache (LRU limit) */
const MAX_CACHE_SIZE = 5;

/** Memory threshold (MB) to trigger cache cleanup */
const MEMORY_THRESHOLD_MB = 500;

// ============================================================================
// Type Definitions
// ============================================================================

/** Represents the current phase of model loading lifecycle */
export type LoadPhase =
  | "idle"
  | "downloading"
  | "parsing"
  | "completed"
  | "failed";

/** Configuration options for model loading operations */
export interface ModelLoadConfig {
  /** Expected file size in bytes for progress calculation */
  fileSize: number;
}

/** Internal state tracking a single model load operation */
export interface ModelLoadTask {
  phase: LoadPhase;
  /** Normalized progress value (0.0 - 1.0) */
  progress: number;
  rawBuffer?: ArrayBuffer;
  parsedAsset?: GLTF;
  failureReason?: unknown;
  completionPromise: Promise<GLTF>;
  stateChangeCallbacks: Set<VoidFunction>;
  /** Last access timestamp for LRU tracking */
  lastAccessed: number;
}

// ============================================================================
// Loader Infrastructure (Lazy Initialization)
// ============================================================================

/** Singleton loader instances with lazy initialization */
let dracoDecoderLoader: DRACOLoader | null = null;
let gltfModelLoader: GLTFLoader | null = null;

/**
 * Retrieves or initializes GLTF/DRACO loaders (client-side only)
 * @returns Loader instances or null during server-side rendering
 */
function initializeLoaders(): {
  dracoLoader: DRACOLoader | null;
  gltfLoader: GLTFLoader | null;
} {
  // Prevent initialization during SSR
  if (typeof window === "undefined") {
    return { dracoLoader: null, gltfLoader: null };
  }

  // Return existing instances if already initialized
  if (!dracoDecoderLoader) {
    dracoDecoderLoader = new DRACOLoader();
    dracoDecoderLoader.setDecoderPath(
      `${ASSETS_BASE_PATH}draco/`.replace(/\/+/, "/"),
    );
    dracoDecoderLoader.setDecoderConfig({ type: "wasm" });
    dracoDecoderLoader.preload();

    gltfModelLoader = new GLTFLoader();
    gltfModelLoader.setDRACOLoader(dracoDecoderLoader);
  }

  return { dracoLoader: dracoDecoderLoader, gltfLoader: gltfModelLoader };
}

// ============================================================================
// Cache Management
// ============================================================================

/** Global cache storing all model load tasks by URL */
const taskCache = new Map<string, ModelLoadTask>();

/** Subscribers notified when new tasks are added to cache */
const cacheChangeSubscribers = new Set<VoidFunction>();

/**
 * Notifies all listeners of a specific task about state changes
 */
function emitTaskUpdate(task: ModelLoadTask): void {
  task.stateChangeCallbacks.forEach((callback) => callback());
}

/**
 * Broadcasts cache modifications to all subscribers
 */
function emitCacheUpdate(): void {
  cacheChangeSubscribers.forEach((callback) => callback());
}

/**
 * Registers a callback to be invoked on cache changes
 * @returns Unsubscribe function
 */
export function onCacheChange(callback: VoidFunction): VoidFunction {
  cacheChangeSubscribers.add(callback);
  return () => {
    cacheChangeSubscribers.delete(callback);
  };
}

// ============================================================================
// HTTP Download with Progress Tracking
// ============================================================================

/**
 * Downloads a resource with streaming progress callbacks
 * @param resourceUrl - URL to fetch
 * @param expectedByteSize - Expected size for progress calculation fallback
 * @param progressCallback - Invoked with (loadedBytes, totalBytes)
 * @returns Complete ArrayBuffer of the response
 */
async function downloadWithProgress(
  resourceUrl: string,
  expectedByteSize: number,
  progressCallback: (loadedBytes: number, totalBytes: number) => void,
): Promise<ArrayBuffer> {
  const httpResponse = await fetch(resourceUrl, { cache: "force-cache" });

  if (!httpResponse.ok) {
    throw new Error(
      `HTTP ${httpResponse.status}: Failed to fetch ${resourceUrl}`,
    );
  }

  // Determine total size from headers or fallback to expected size
  const contentLengthHeader =
    Number(httpResponse.headers.get("Content-Length")) || 0;
  const totalBytes =
    contentLengthHeader > 0 ? contentLengthHeader : expectedByteSize;

  // Handle responses without streaming body
  if (!httpResponse.body) {
    const buffer = await httpResponse.arrayBuffer();
    progressCallback(buffer.byteLength, totalBytes || buffer.byteLength);
    return buffer;
  }

  // Stream download with progress tracking
  const streamReader = httpResponse.body.getReader();
  const byteChunks: Uint8Array[] = [];
  let downloadedBytes = 0;

  while (true) {
    const { done, value } = await streamReader.read();
    if (done) break;

    if (value) {
      byteChunks.push(value);
      downloadedBytes += value.length;
      progressCallback(downloadedBytes, Math.max(totalBytes, downloadedBytes));
    }
  }

  // Concatenate chunks into single buffer
  const finalBuffer = new Uint8Array(downloadedBytes);
  let byteOffset = 0;
  for (const chunk of byteChunks) {
    finalBuffer.set(chunk, byteOffset);
    byteOffset += chunk.length;
  }

  return finalBuffer.buffer;
}

// ============================================================================
// GLTF Parsing
// ============================================================================

/**
 * Parses GLTF binary data into a 3D asset structure
 * @param binaryData - Raw GLTF buffer
 * @param assetBaseUrl - Base URL for resolving external resources
 * @returns Parsed GLTF scene graph
 */
function parseGLTFAsset(
  binaryData: ArrayBuffer,
  assetBaseUrl: string,
): Promise<GLTF> {
  return new Promise((resolve, reject) => {
    const { gltfLoader: loader } = initializeLoaders();

    if (!loader) {
      reject(
        new Error(
          "GLTFLoader unavailable: operation requires client-side environment",
        ),
      );
      return;
    }

    loader.parse(binaryData, assetBaseUrl, resolve, reject);
  });
}

// ============================================================================
// Public API: Model Loading Operations
// ============================================================================

/**
 * Initiates a model load operation with caching support
 *
 * If the model is already loading/loaded, returns the existing task.
 * Otherwise, creates a new load task with download→parse lifecycle.
 *
 * @param modelUrl - URL of the GLTF/GLB model file
 * @param config - Load configuration including file size
 * @returns ModelLoadTask for tracking progress and completion
 */
export function initiateModelLoad(
  modelUrl: string,
  config: ModelLoadConfig,
): ModelLoadTask {
  // Return cached task if already exists
  const cachedTask = taskCache.get(modelUrl);
  if (cachedTask) return cachedTask;

  // Create new task placeholder
  const task: ModelLoadTask = {
    phase: "downloading",
    progress: 0,
    stateChangeCallbacks: new Set(),
    completionPromise: Promise.resolve() as unknown as Promise<GLTF>,
    lastAccessed: Date.now(),
  };

  taskCache.set(modelUrl, task);
  emitCacheUpdate();

  // Execute async load pipeline
  task.completionPromise = (async () => {
    try {
      // Phase 1: Download with progress
      const modelBuffer = await downloadWithProgress(
        modelUrl,
        config.fileSize,
        (loadedBytes, totalBytes) => {
          task.phase = "downloading";
          task.progress = Math.min(
            DOWNLOAD_PROGRESS_WEIGHT,
            (loadedBytes / Math.max(1, totalBytes)) * DOWNLOAD_PROGRESS_WEIGHT,
          );
          emitTaskUpdate(task);
        },
      );

      task.rawBuffer = modelBuffer;

      // Phase 2: Parse GLTF
      task.phase = "parsing";
      task.progress = PARSING_PROGRESS_VALUE;
      emitTaskUpdate(task);

      const parsedGltf = await parseGLTFAsset(modelBuffer, "");

      // Phase 3: Complete
      task.parsedAsset = parsedGltf;
      task.phase = "completed";
      task.progress = 1.0;
      emitTaskUpdate(task);

      return parsedGltf;
    } catch (error) {
      task.phase = "failed";
      task.failureReason = error;
      emitTaskUpdate(task);
      throw error;
    }
  })();

  return task;
}

/**
 * Retrieves an existing load task from cache (if any)
 * @param modelUrl - Model URL to look up
 * @returns Cached task or undefined
 */
export function getCachedTask(modelUrl: string): ModelLoadTask | undefined {
  const task = taskCache.get(modelUrl);
  if (task) {
    // Update access time for LRU tracking
    task.lastAccessed = Date.now();

    // Enforce LRU and memory limits periodically
    enforceLRUPolicy();
    enforceMemoryLimit();
  }
  return task;
}

/**
 * Preloads a model in the background without blocking
 *
 * Unlike initiateModelLoad, this silently suppresses errors
 * and is intended for speculative prefetching.
 *
 * @param modelUrl - Model URL to preload
 * @param config - Load configuration
 */
export function prefetchModel(modelUrl: string, config: ModelLoadConfig): void {
  const task = initiateModelLoad(modelUrl, config);
  task.completionPromise.catch(() => {
    // Intentionally silent - prefetch failures are non-critical
  });
}

// ============================================================================
// Scene Utilities
// ============================================================================

/**
 * Creates an independent clone of a GLTF scene for rendering
 *
 * Each Three.js Canvas requires its own scene instance.
 * This method also configures shadow properties on meshes.
 *
 * @param gltfAsset - Source GLTF asset
 * @returns Cloned scene group with shadow casting enabled
 */
export function createSceneInstance(gltfAsset: GLTF): THREE.Group {
  const sceneInstance = gltfAsset.scene.clone(true);

  sceneInstance.traverse((object) => {
    if ((object as THREE.Mesh).isMesh) {
      const mesh = object as THREE.Mesh;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    }
  });

  return sceneInstance;
}

// ============================================================================
// Backward Compatibility Aliases
// ============================================================================

/** @deprecated Use initiateModelLoad instead */
export const loadModel = initiateModelLoad;

/** @deprecated Use LoadPhase instead */
export type LoadStatus = LoadPhase;

/** @deprecated Use ModelLoadTask instead */
export type LoadEntry = ModelLoadTask;

/** @deprecated Use ModelLoadConfig instead */
export type LoadOptions = ModelLoadConfig;

/** @deprecated Use getCachedTask instead */
export const getLoadEntry = getCachedTask;

/** @deprecated Use prefetchModel instead */
export const preloadModel = prefetchModel;

/** @deprecated Use onCacheChange instead */
export const subscribeCache = onCacheChange;

/** @deprecated Use createSceneInstance instead */
export const cloneScene = createSceneInstance;

// ============================================================================
// Preload Orchestration
// ============================================================================

import { getAllEntities } from "@/data";

/**
 * Disposes Three.js resources to free memory
 * @param gltf - GLTF asset to dispose
 */
function disposeGltfResources(gltf: GLTF): void {
  if (!gltf) return;

  // Dispose geometries
  gltf.scene.traverse((object) => {
    if ((object as THREE.Mesh).isMesh) {
      const mesh = object as THREE.Mesh;
      if (mesh.geometry) {
        mesh.geometry.dispose();
      }
      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => {
            const mat = material as THREE.Material;
            if ((mat as any).map) (mat as any).map.dispose();
            if ((mat as any).lightMap) (mat as any).lightMap.dispose();
            if ((mat as any).bumpMap) (mat as any).bumpMap.dispose();
            if ((mat as any).normalMap) (mat as any).normalMap.dispose();
            if ((mat as any).specularMap) (mat as any).specularMap.dispose();
            if ((mat as any).envMap) (mat as any).envMap.dispose();
            material.dispose();
          });
        } else {
          const mat = mesh.material as THREE.Material;
          if ((mat as any).map) (mat as any).map.dispose();
          if ((mat as any).lightMap) (mat as any).lightMap.dispose();
          if ((mat as any).bumpMap) (mat as any).bumpMap.dispose();
          if ((mat as any).normalMap) (mat as any).normalMap.dispose();
          if ((mat as any).specularMap) (mat as any).specularMap.dispose();
          if ((mat as any).envMap) (mat as any).envMap.dispose();
          mesh.material.dispose();
        }
      }
    }
  });

  // Dispose animations
  if (gltf.animations) {
    gltf.animations.forEach((clip) => {
      // Animation clips don't need explicit disposal
      // but we clear references
    });
  }
}

/**
 * Removes a model from cache and disposes its resources
 * @param modelUrl - URL of the model to remove
 */
export function evictModelFromCache(modelUrl: string): void {
  const task = taskCache.get(modelUrl);
  if (task) {
    // Dispose Three.js resources if they exist
    if (task.parsedAsset) {
      disposeGltfResources(task.parsedAsset);
    }

    // Clear references
    task.rawBuffer = undefined;
    task.parsedAsset = undefined;
    task.stateChangeCallbacks.clear();

    // Remove from cache
    taskCache.delete(modelUrl);
    emitCacheUpdate();
  }
}

/**
 * Clears all models from cache except specified ones
 * @param keepUrls - URLs of models to keep in cache
 */
export function clearModelCache(keepUrls: string[] = []): void {
  const urlsToClear = Array.from(taskCache.keys()).filter(
    (url) => !keepUrls.includes(url),
  );

  urlsToClear.forEach((url) => evictModelFromCache(url));
}

/**
 * Gets the current cache size
 * @returns Number of models in cache
 */
export function getCacheSize(): number {
  return taskCache.size;
}

/**
 * Gets current memory usage (if available)
 * @returns Memory usage in MB or null if API not available
 */
export function getMemoryUsage(): number | null {
  if (typeof performance !== "undefined" && "memory" in performance) {
    const mem = (performance as any).memory;
    return mem.usedJSHeapSize / (1024 * 1024); // Convert to MB
  }
  return null;
}

/**
 * Enforces LRU cache policy by removing least recently used models
 * @param maxItems Maximum number of items to keep in cache
 */
function enforceLRUPolicy(maxItems: number = MAX_CACHE_SIZE): void {
  if (taskCache.size <= maxItems) return;

  // Sort tasks by lastAccessed time (oldest first)
  const sortedTasks = Array.from(taskCache.entries()).sort(
    (a, b) => a[1].lastAccessed - b[1].lastAccessed,
  );

  // Remove oldest tasks until we're under the limit
  const itemsToRemove = sortedTasks.length - maxItems;
  for (let i = 0; i < itemsToRemove; i++) {
    const [url] = sortedTasks[i];
    evictModelFromCache(url);
  }
}

/**
 * Checks memory usage and triggers cache cleanup if needed
 * @param thresholdMB Memory threshold in MB
 */
function enforceMemoryLimit(thresholdMB: number = MEMORY_THRESHOLD_MB): void {
  const memoryUsage = getMemoryUsage();
  if (memoryUsage !== null && memoryUsage > thresholdMB) {
    // Aggressively reduce cache when memory is high
    const aggressiveLimit = Math.max(2, Math.floor(MAX_CACHE_SIZE / 2));
    enforceLRUPolicy(aggressiveLimit);
  }
}

/**
 * Updates the last accessed timestamp for a model
 * @param modelUrl - URL of the model to mark as accessed
 */
function touchModel(modelUrl: string): void {
  const task = taskCache.get(modelUrl);
  if (task) {
    task.lastAccessed = Date.now();
  }
}

/**
 * Initializes model preloading for a project page
 * - Starts loading the active model immediately
 * - Queues other models from the SAME PROJECT for background preloading
 * - Does NOT preload models from other projects to save memory
 *
 * @param activeEntityId - The ID of the currently active entity
 * @param projectSlug - The slug of the current project (optional, for filtering)
 */
export function initializePreload(
  activeEntityId: string,
  projectSlug?: string,
): void {
  if (typeof window === "undefined") return;

  // Get entities from the current project only if projectSlug is provided
  let projectEntities: Array<{
    id: string;
    model3D: { modelUrl: string; fileSize: number };
  }> = [];

  if (projectSlug) {
    // Import getProjectBySlug dynamically to avoid circular dependencies
    import("@/data").then(({ getProjectBySlug }) => {
      const project = getProjectBySlug(projectSlug);
      if (project) {
        projectEntities = project.models;
        startPreloadQueue(activeEntityId, projectEntities);
      }
    });
  } else {
    // Fallback: preload all entities (backward compatibility)
    import("@/data").then(({ getAllEntities }) => {
      projectEntities = getAllEntities();
      startPreloadQueue(activeEntityId, projectEntities);
    });
  }
}

/**
 * Internal function to start the preload queue
 */
function startPreloadQueue(
  activeEntityId: string,
  entities: Array<{
    id: string;
    model3D: { modelUrl: string; fileSize: number };
  }>,
): void {
  const activeEntity = entities.find((e) => e.id === activeEntityId);
  if (!activeEntity) return;

  let cancelled = false;

  // Start loading the active model
  const firstTask = initiateModelLoad(activeEntity.model3D.modelUrl, {
    fileSize: activeEntity.model3D.fileSize,
  });

  // Preload queue logic - only for models in the same project
  let started = false;
  const queueOthers = () => {
    if (cancelled || started) return;
    started = true;

    // Only queue models from the same project, excluding the active one
    const queue = entities.filter((e) => e.id !== activeEntityId);
    let i = 0;

    const next = () => {
      if (cancelled || i >= queue.length) return;
      const e = queue[i++];
      prefetchModel(e.model3D.modelUrl, { fileSize: e.model3D.fileSize });

      const task = getCachedTask(e.model3D.modelUrl);
      task?.completionPromise.finally(() => {
        if (cancelled) return;
        setTimeout(next, PRELOAD_QUEUE_DELAY);
      });
    };

    next();
  };

  // Set timeout and start queue
  const timer = setTimeout(queueOthers, MODEL_LOAD_TIMEOUT);

  // Start queue immediately after active model is loaded
  firstTask.completionPromise
    .then(() => {
      clearTimeout(timer);
      queueOthers();
    })
    .catch(() => {
      clearTimeout(timer);
      queueOthers();
    });
}
