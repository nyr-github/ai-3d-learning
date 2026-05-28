"use client";

import React from "react";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import type { ConversionState } from "@/lib/converter/types";

interface ConversionProgressProps {
  state: ConversionState;
}

const statusMessages: Record<ConversionState["status"], string> = {
  idle: "Ready",
  uploading: "Uploading file...",
  parsing: "Parsing model...",
  converting: "Converting format...",
  exporting: "Exporting file...",
  completed: "Conversion complete!",
  error: "Conversion failed",
};

const statusIcons: Record<ConversionState["status"], React.ReactNode> = {
  idle: null,
  uploading: (
    <Loader2 className="w-6 h-6 animate-spin text-(--accent-primary)" />
  ),
  parsing: <Loader2 className="w-6 h-6 animate-spin text-(--accent-primary)" />,
  converting: (
    <Loader2 className="w-6 h-6 animate-spin text-(--accent-primary)" />
  ),
  exporting: (
    <Loader2 className="w-6 h-6 animate-spin text-(--accent-primary)" />
  ),
  completed: <CheckCircle2 className="w-6 h-6 text-(--success)" />,
  error: <AlertCircle className="w-6 h-6 text-(--error)" />,
};

export function ConversionProgress({ state }: ConversionProgressProps) {
  if (state.status === "idle") {
    return null;
  }

  const isActive = ["uploading", "parsing", "converting", "exporting"].includes(
    state.status,
  );

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`
        bg-(--bg-card) border rounded-xl p-6 space-y-4
        ${
          state.status === "error"
            ? "border-(--error) bg-(--error-light)"
            : state.status === "completed"
              ? "border-(--success) bg-(--success-light)"
              : "border-(--border-primary)"
        }
      `}
      >
        {/* 状态标题 */}
        <div className="flex items-center justify-center gap-3">
          {statusIcons[state.status]}
          <h3
            className={`
            text-lg font-semibold
            ${state.status === "error" ? "text-(--error)" : ""}
            ${state.status === "completed" ? "text-(--success)" : ""}
          `}
          >
            {statusMessages[state.status]}
          </h3>
        </div>

        {/* 进度条 */}
        {isActive && (
          <div className="space-y-2">
            <div className="w-full bg-(--bg-secondary) rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-(--accent-primary) to-(--accent-secondary) transition-all duration-300 ease-out"
                style={{ width: `${state.progress}%` }}
              />
            </div>
            <div className="text-xs text-(--ink-muted) text-center">
              {Math.round(state.progress)}%
            </div>
          </div>
        )}

        {/* 错误信息 */}
        {state.status === "error" && state.error && (
          <div className="text-sm text-(--error) text-center">
            {state.error}
          </div>
        )}

        {/* 完成信息 */}
        {state.status === "completed" && (
          <div className="text-sm text-(--success) text-center">
            File has been successfully converted and is ready for download
          </div>
        )}
      </div>
    </div>
  );
}
