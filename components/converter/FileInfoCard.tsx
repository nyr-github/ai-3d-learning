"use client";

import React from "react";

interface FileInfoCardProps {
  fileName: string;
  onReset: () => void;
}

export function FileInfoCard({ fileName, onReset }: FileInfoCardProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-(--bg-card) border border-(--border-primary) rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-(--ink-primary)">
              Selected File
            </h3>
            <p className="text-sm text-(--ink-muted) mt-1">{fileName}</p>
          </div>
          <button
            onClick={onReset}
            className="text-sm text-(--accent-primary) hover:underline"
          >
            Change File
          </button>
        </div>
      </div>
    </div>
  );
}
