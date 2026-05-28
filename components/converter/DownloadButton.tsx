"use client";

import React from "react";
import { Download, File } from "lucide-react";
import { formatFileSize } from "@/lib/converter/types";

interface DownloadButtonProps {
  blob: Blob;
  fileName: string;
}

export function DownloadButton({ blob, fileName }: DownloadButtonProps) {
  const handleDownload = () => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-(--bg-card) border border-(--success) rounded-xl p-6">
        <div className="flex items-center justify-between gap-4">
          {/* 文件信息 */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 bg-(--success-light) rounded-lg flex items-center justify-center flex-shrink-0">
              <File className="w-6 h-6 text-(--success)" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-(--ink-primary) truncate">
                {fileName}
              </div>
              <div className="text-xs text-(--ink-muted) mt-0.5">
                {formatFileSize(blob.size)}
              </div>
            </div>
          </div>

          {/* 下载按钮 */}
          <button
            onClick={handleDownload}
            className="
              flex items-center gap-2 px-6 py-3
              bg-linear-to-r from-(--success) to-(--success)
              text-white font-semibold rounded-lg
              hover:opacity-90 transition-opacity
              shadow-md hover:shadow-lg
              flex-shrink-0
            "
          >
            <Download className="w-5 h-5" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
}
