import { Document, WebIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import {
  meshopt,
  prune,
  dedup,
  resample,
  textureCompress,
} from "@gltf-transform/functions";
import { MeshoptDecoder, MeshoptEncoder } from "meshoptimizer";

export interface OptimizeOptions {
  /** Geometry compression method - only meshopt supported in browser */
  compress?: "meshopt" | "none";
  /** Texture compression format */
  textureCompress?: "webp" | "avif" | "jpeg" | "png" | "none";
  /** Texture resize (max width/height in pixels) */
  textureResize?: [number, number];
  /** Remove unused nodes, textures, or other data */
  prune?: boolean;
  /** Remove duplicate vertex or texture data */
  dedup?: boolean;
  /** Resample animation frames */
  resample?: boolean;
}

export interface OptimizeResult {
  /** Optimized GLB blob */
  blob: Blob;
  /** Original file size in bytes */
  originalSize: number;
  /** Optimized file size in bytes */
  optimizedSize: number;
  /** Compression ratio */
  ratio: number;
}

/** Singleton WebIO instance */
let webIO: WebIO | null = null;

/**
 * Get or create WebIO instance with all extensions and decoders/encoders
 */
async function getWebIO(): Promise<WebIO> {
  if (webIO) return webIO;

  // Initialize Meshopt
  await MeshoptDecoder.ready;
  await MeshoptEncoder.ready;

  webIO = new WebIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
    "meshopt.decoder": MeshoptDecoder,
    "meshopt.encoder": MeshoptEncoder,
  });

  return webIO;
}

/**
 * Optimize GLB file
 */
export async function optimizeGLB(
  file: File,
  options: OptimizeOptions = {},
  onProgress?: (progress: number, status: string) => void,
): Promise<OptimizeResult> {
  const {
    compress = "draco",
    textureCompress = "webp",
    textureResize,
    prune: doPrune = true,
    dedup: doDedup = true,
    resample: doResample = true,
  } = options;

  const originalSize = file.size;

  try {
    // Step 1: Read GLB file
    onProgress?.(10, "Loading model...");
    const io = await getWebIO();
    const document = await io.readBinary(
      new Uint8Array(await file.arrayBuffer()),
    );

    // Step 2: Apply optimizations
    onProgress?.(30, "Optimizing geometry...");

    const transforms: any[] = [];

    // Resample animations
    if (doResample) {
      transforms.push(resample());
    }

    // Prune unused nodes
    if (doPrune) {
      transforms.push(prune());
    }

    // Remove duplicates
    if (doDedup) {
      transforms.push(dedup());
    }

    // Geometry compression
    if (compress === "meshopt") {
      transforms.push(meshopt({ encoder: MeshoptEncoder, level: "medium" }));
    }

    // Texture compression
    if (textureCompress !== "none") {
      const textureOptions: any = {
        targetFormat: textureCompress,
      };

      if (textureResize) {
        textureOptions.resize = textureResize;
      }

      // Note: textureCompress in browser requires different approach
      // We'll skip texture compression for now as it needs sharp library
      // which is Node.js only
      console.warn(
        "Texture compression is not supported in browser mode. Skipping...",
      );
    }

    // Apply all transforms
    await document.transform(...transforms);

    onProgress?.(80, "Exporting optimized model...");

    // Step 3: Write optimized GLB
    const optimizedGLB = await io.writeBinary(document);
    const blob = new Blob([optimizedGLB], { type: "model/gltf-binary" });

    onProgress?.(100, "Complete!");

    const optimizedSize = blob.size;
    const ratio = ((originalSize - optimizedSize) / originalSize) * 100;

    return {
      blob,
      originalSize,
      optimizedSize,
      ratio,
    };
  } catch (error) {
    console.error("Optimization failed:", error);
    throw error;
  }
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
