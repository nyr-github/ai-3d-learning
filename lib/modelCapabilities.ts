import * as THREE from "three";
import {
  GLTFLoader,
  type GLTF,
} from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

export interface ModelCapabilityInfo {
  hasAnimations: boolean;
  animationCount: number;
  animationNames: string[];
  hasSkeleton: boolean;
  jointCount: number;
  skinCount: number;
  hasSkinning: boolean;
}

/**
 * Analyze a loaded GLTF model for animation and skeleton capabilities
 */
export function analyzeModelCapabilities(gltf: GLTF): ModelCapabilityInfo {
  // Check for animations
  const animationNames: string[] = [];
  if (gltf.animations && gltf.animations.length > 0) {
    for (const clip of gltf.animations) {
      animationNames.push(
        clip.name || `Animation ${animationNames.length + 1}`,
      );
    }
  }

  // Check for skeleton and skinning
  const joints = new Set<string>();
  let hasSkinning = false;
  let skinCount = 0;

  gltf.scene.traverse((object: THREE.Object3D) => {
    if (object instanceof THREE.SkinnedMesh) {
      hasSkinning = true;
      skinCount++;
      if (object.skeleton) {
        for (const bone of object.skeleton.bones) {
          if (bone.name) {
            joints.add(bone.name);
          }
        }
      }
    }
    if (object instanceof THREE.Bone && object.name) {
      joints.add(object.name);
    }
  });

  return {
    hasAnimations: gltf.animations && gltf.animations.length > 0,
    animationCount: gltf.animations?.length || 0,
    animationNames,
    hasSkeleton: joints.size > 0,
    jointCount: joints.size,
    skinCount,
    hasSkinning,
  };
}

/**
 * Cache for model capability analysis results
 * Key: model URL, Value: ModelCapabilityInfo
 */
const capabilityCache = new Map<string, ModelCapabilityInfo>();

/** Singleton GLTFLoader instance with Draco support */
let capabilityLoader: GLTFLoader | null = null;

/**
 * Get or create GLTFLoader with Draco decoder support
 */
function getLoader(): GLTFLoader {
  if (typeof window === "undefined") {
    throw new Error(
      "Model capability analysis is only available in browser environment",
    );
  }

  if (!capabilityLoader) {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    dracoLoader.setDecoderConfig({ type: "wasm" });
    dracoLoader.preload();

    capabilityLoader = new GLTFLoader();
    capabilityLoader.setDRACOLoader(dracoLoader);
  }

  return capabilityLoader;
}

/**
 * Load and analyze model capabilities from URL
 * Uses caching to avoid repeated analysis
 */
export async function getModelCapabilities(
  modelUrl: string,
): Promise<ModelCapabilityInfo> {
  // Return cached result if available
  if (capabilityCache.has(modelUrl)) {
    return capabilityCache.get(modelUrl)!;
  }

  try {
    const loader = getLoader();

    // Load the model
    const gltf = await new Promise<GLTF>((resolve, reject) => {
      loader.load(
        modelUrl,
        (data) => resolve(data),
        undefined,
        (error) => reject(error),
      );
    });

    // Analyze capabilities
    const capabilities = analyzeModelCapabilities(gltf);

    // Cache the result
    capabilityCache.set(modelUrl, capabilities);

    return capabilities;
  } catch (error) {
    console.warn(
      `Failed to analyze model capabilities for ${modelUrl}:`,
      error,
    );
    return {
      hasAnimations: false,
      animationCount: 0,
      animationNames: [],
      hasSkeleton: false,
      jointCount: 0,
      skinCount: 0,
      hasSkinning: false,
    };
  }
}

/**
 * Clear the capability cache (useful for memory management)
 */
export function clearCapabilityCache(): void {
  capabilityCache.clear();
}
