"use client";

import React from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import type { SupportedFormat } from "@/lib/converter/types";
import { SUPPORTED_FORMATS, getFormatInfo } from "@/lib/converter/types";

interface FormatSelectorProps {
  sourceFormat: SupportedFormat | null;
  targetFormat: SupportedFormat;
  onTargetFormatChange: (format: SupportedFormat) => void;
  disabled?: boolean;
}

export function FormatSelector({
  sourceFormat,
  targetFormat,
  onTargetFormatChange,
  disabled = false,
}: FormatSelectorProps) {
  const sourceInfo = sourceFormat ? getFormatInfo(sourceFormat) : null;
  const targetInfo = getFormatInfo(targetFormat);

  // 过滤掉源格式，避免选择相同的格式
  const availableTargets = SUPPORTED_FORMATS.filter(
    (f) => f.format !== sourceFormat,
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-(--bg-card) border border-(--border-primary) rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-(--ink-primary) text-center">
          Select Target Format
        </h3>

        <div className="flex items-center justify-center gap-4">
          {/* 源格式显示 */}
          <div className="flex-1">
            <div className="bg-(--bg-secondary) border border-(--border-primary) rounded-lg p-4">
              <div className="text-xs text-(--ink-muted) mb-1">
                Source Format
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-(--accent-primary)">
                  {sourceInfo ? sourceInfo.label : "???"}
                </span>
              </div>
              {sourceInfo && (
                <div className="text-xs text-(--ink-light) mt-1">
                  {sourceInfo.description}
                </div>
              )}
            </div>
          </div>

          {/* 箭头图标 */}
          <div className="flex items-center justify-center">
            <ArrowRight className="w-6 h-6 text-(--accent-primary)" />
          </div>

          {/* 目标格式选择 */}
          <div className="flex-1">
            <div className="relative">
              <select
                value={targetFormat}
                onChange={(e) =>
                  onTargetFormatChange(e.target.value as SupportedFormat)
                }
                disabled={disabled}
                className="
                  w-full bg-(--bg-secondary) border border-(--border-primary) rounded-lg p-4
                  appearance-none cursor-pointer
                  focus:outline-none focus:ring-2 focus:ring-(--accent-primary) focus:border-transparent
                  disabled:opacity-50 disabled:cursor-not-allowed
                  text-(--ink-primary) font-bold text-2xl
                "
              >
                {availableTargets.map((format) => (
                  <option key={format.format} value={format.format}>
                    {format.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-(--ink-muted) pointer-events-none" />
            </div>
            {targetInfo && (
              <div className="text-xs text-(--ink-light) mt-1">
                {targetInfo.description}
              </div>
            )}
          </div>
        </div>

        <div className="text-xs text-(--ink-muted) text-center">
          Select the target format you want to convert to
        </div>
      </div>
    </div>
  );
}
