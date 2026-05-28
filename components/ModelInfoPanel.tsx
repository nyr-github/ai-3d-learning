"use client";
import { useState, useEffect } from "react";
import { FileBox, Image, Layers, Zap, Bone, Play } from "lucide-react";
import type { Entity3D } from "@/data/types";
import {
  analyzeModelCapabilities,
  type ModelCapabilityInfo,
} from "@/lib/modelCapabilities";
import { getCachedTask } from "@/lib/modelLoader";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

interface Props {
  entity: Entity3D;
  onSkeletonHover?: (show: boolean) => void;
}

/** Format bytes to human-readable size */
function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/** Extract filename from URL */
function getFilename(url: string): string {
  return url.split("/").pop() || "";
}

/** Model Info Panel - Shows compression, texture format, file size, and model capabilities */
export function ModelInfoPanel({ entity, onSkeletonHover }: Props) {
  const fileSize = entity.model3D.fileSize;
  const filename = getFilename(entity.model3D.modelUrl);

  // Determine compression method (all current models use Draco)
  const compressionMethod = "Draco";

  // Determine texture format (most models use AVIF)
  const textureFormat = "AVIF";

  // Model capabilities state
  const [capabilities, setCapabilities] = useState<ModelCapabilityInfo | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadCapabilities() {
      try {
        setLoading(true);

        // Try to get the model from cache first (already loaded by EntityViewer)
        const cachedTask = getCachedTask(entity.model3D.modelUrl);
        let gltf: GLTF | undefined = cachedTask?.parsedAsset;

        // If not in cache, we can't analyze it without loading
        // This is expected as EntityViewer should have loaded it
        if (!gltf) {
          console.warn(
            `Model ${entity.model3D.modelUrl} not found in cache. Capabilities will not be analyzed.`,
          );
          if (mounted) {
            setLoading(false);
            return;
          }
        }

        // Analyze the GLTF model
        const caps = analyzeModelCapabilities(gltf!);
        if (mounted) {
          setCapabilities(caps);
        }
      } catch (error) {
        console.warn("Failed to load model capabilities:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadCapabilities();

    return () => {
      mounted = false;
    };
  }, [entity.model3D.modelUrl]);

  return (
    <div className="hidden sm:block absolute bottom-4 left-4 z-10 sm:bottom-3 sm:left-3">
      <div className="bg-(--bg-card)/95 border border-(--border-primary) px-3 py-2.5 rounded-xl backdrop-blur-md shadow-lg sm:px-2.5 sm:py-2">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-3.5 h-3.5 text-(--accent-primary) sm:w-3 sm:h-3" />
          <span className="text-[11px] font-bold text-(--ink-primary) uppercase tracking-wider">
            Model Info
          </span>
        </div>

        <div className="space-y-1.5">
          {/* File Size */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <FileBox className="w-3 h-3 text-(--ink-muted)" />
              <span className="text-xs text-(--ink-muted) font-medium">
                Size
              </span>
            </div>
            <span className="text-xs font-mono text-(--ink-primary) bg-(--bg-secondary) px-2 py-0.5 rounded">
              {formatBytes(fileSize)}
            </span>
          </div>

          {/* Compression Method */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-(--ink-muted)" />
              <span className="text-xs text-(--ink-muted) font-medium">
                Compression
              </span>
            </div>
            <span className="text-xs font-mono text-(--ink-primary) bg-(--bg-secondary) px-2 py-0.5 rounded">
              {compressionMethod}
            </span>
          </div>

          {/* Texture Format */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <Image className="w-3 h-3 text-(--ink-muted)" />
              <span className="text-xs text-(--ink-muted) font-medium">
                Texture
              </span>
            </div>
            <span className="text-xs font-mono text-(--ink-primary) bg-(--bg-secondary) px-2 py-0.5 rounded">
              {textureFormat}
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-(--border-primary) my-1.5" />

          {/* Skeleton Info */}
          {!loading && capabilities && (
            <>
              <div
                className="flex items-center justify-between gap-4 cursor-pointer"
                onMouseEnter={() =>
                  capabilities.hasSkeleton && onSkeletonHover?.(true)
                }
                onMouseLeave={() => onSkeletonHover?.(false)}
              >
                <div className="flex items-center gap-1.5">
                  <Bone className="w-3 h-3 text-(--ink-muted)" />
                  <span className="text-xs text-(--ink-muted) font-medium">
                    Skeleton
                  </span>
                </div>
                <span
                  className={`text-xs font-mono px-2 py-0.5 rounded ${
                    capabilities.hasSkeleton
                      ? "text-(--accent-primary) bg-(--accent-primary)/10"
                      : "text-(--ink-muted) bg-(--bg-secondary)"
                  }`}
                >
                  {capabilities.hasSkeleton
                    ? `${capabilities.jointCount} joints`
                    : "None"}
                </span>
              </div>

              {/* Animation Info */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5">
                  <Play className="w-3 h-3 text-(--ink-muted)" />
                  <span className="text-xs text-(--ink-muted) font-medium">
                    Animations
                  </span>
                </div>
                <span
                  className={`text-xs font-mono px-2 py-0.5 rounded ${
                    capabilities.hasAnimations
                      ? "text-(--accent-primary) bg-(--accent-primary)/10"
                      : "text-(--ink-muted) bg-(--bg-secondary)"
                  }`}
                >
                  {capabilities.hasAnimations
                    ? `${capabilities.animationCount} clips`
                    : "None"}
                </span>
              </div>

              {/* Animation Names (if any) */}
              {capabilities.hasAnimations &&
                capabilities.animationNames.length > 0 && (
                  <div className="pt-1">
                    <div className="text-[10px] text-(--ink-muted) mb-1">
                      Available:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {capabilities.animationNames
                        .slice(0, 2)
                        .map((name, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono text-(--accent-primary) bg-(--accent-primary)/10 px-1.5 py-0.5 rounded"
                          >
                            {name}
                          </span>
                        ))}
                      {capabilities.animationNames.length > 2 && (
                        <span className="text-[10px] text-(--ink-muted)">
                          +{capabilities.animationNames.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                )}
            </>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-2">
              <span className="text-[10px] text-(--ink-muted)">
                Analyzing...
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
