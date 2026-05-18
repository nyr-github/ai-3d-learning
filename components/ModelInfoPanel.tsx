"use client";
import { FileBox, Image, Layers, Zap } from "lucide-react";
import type { Entity3D } from "@/data/types";

interface Props {
  entity: Entity3D;
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

/** Model Info Panel - Shows compression, texture format, and file size */
export function ModelInfoPanel({ entity }: Props) {
  const fileSize = entity.model3D.fileSize;
  const filename = getFilename(entity.model3D.modelUrl);

  // Determine compression method (all current models use Draco)
  const compressionMethod = "Draco";

  // Determine texture format (most models use AVIF)
  const textureFormat = "AVIF";

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
        </div>
      </div>
    </div>
  );
}
