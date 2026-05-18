"use client";
import { Box } from "lucide-react";

interface TransformState {
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  scale: number;
}

interface Props {
  transform: TransformState;
}

/** Convert radians to degrees */
function radToDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

/** Format number to fixed decimals */
function formatNum(num: number, decimals: number = 1): string {
  return num.toFixed(decimals);
}

/** Real-time Transform Info Panel - Shows current rotation and scale */
export function TransformPanel({ transform }: Props) {
  return (
    <div className="hidden sm:block absolute bottom-4 right-4 z-10 sm:bottom-3 sm:right-3">
      <div className="bg-(--bg-card)/95 border border-(--border-primary) px-3 py-2.5 rounded-xl backdrop-blur-md shadow-lg sm:px-2.5 sm:py-2">
        <div className="flex items-center gap-2 mb-2">
          <Box className="w-3.5 h-3.5 text-(--accent-primary) sm:w-3 sm:h-3" />
          <span className="text-[11px] font-bold text-(--ink-primary) uppercase tracking-wider">
            Transform
          </span>
        </div>

        <div className="space-y-1.5">
          {/* Rotation X */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-(--ink-muted) font-medium">
              Rot X
            </span>
            <span className="text-xs font-mono text-(--ink-primary) bg-(--bg-secondary) px-2 py-0.5 rounded">
              {formatNum(radToDeg(transform.rotationX))}°
            </span>
          </div>

          {/* Rotation Y */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-(--ink-muted) font-medium">
              Rot Y
            </span>
            <span className="text-xs font-mono text-(--ink-primary) bg-(--bg-secondary) px-2 py-0.5 rounded">
              {formatNum(radToDeg(transform.rotationY))}°
            </span>
          </div>

          {/* Scale */}
          <div className="flex items-center justify-between gap-4 ">
            <span className="text-xs text-(--ink-muted) font-medium">
              Scale
            </span>
            <span className="text-xs font-mono text-(--ink-primary) bg-(--bg-secondary) px-2 py-0.5 rounded">
              {formatNum(transform.scale, 2)}x
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
