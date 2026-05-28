"use client";

import React, { useRef, useState, useCallback } from "react";
import { Upload, File } from "lucide-react";
import { getFormatByExtension, getFormatInfo } from "@/lib/converter/types";

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
}

export function FileUploadZone({ onFileSelect }: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndProcessFile = useCallback(
    (file: File) => {
      // 检查文件扩展名
      const extension = file.name.split(".").pop();
      const format = extension ? getFormatByExtension(`.${extension}`) : null;

      if (!format) {
        setError("Unsupported file format");
        return;
      }

      setError("");
      onFileSelect(file);
    },
    [onFileSelect],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        validateAndProcessFile(files[0]);
      }
    },
    [validateAndProcessFile],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        validateAndProcessFile(files[0]);
      }
    },
    [validateAndProcessFile],
  );

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
          transition-all duration-300 ease-in-out
          ${
            isDragging
              ? "border-(--accent-primary) bg-(--accent-ultralight) scale-105"
              : "border-(--border-primary) bg-(--bg-card) hover:border-(--accent-primary) hover:bg-(--bg-hover)"
          }
          ${error ? "border-(--error) bg-(--error-light)" : ""}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".obj,.stl,.glb,.gltf,.ply,.3mf,.dxf,.usdz,.fbx"
          onChange={handleFileInput}
        />

        <div className="flex flex-col items-center gap-4">
          <div
            className={`
            w-20 h-20 rounded-full flex items-center justify-center
            transition-colors duration-300
            ${
              isDragging
                ? "bg-(--accent-primary) text-white"
                : "bg-(--bg-secondary) text-(--accent-primary)"
            }
          `}
          >
            <Upload className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-(--ink-primary)">
              {isDragging
                ? "Drop file to start conversion"
                : "Drag and drop file here or click to upload"}
            </h3>

            <p className="text-sm text-(--ink-muted)">
              Supported formats: OBJ, STL, GLB, GLTF, PLY, 3MF, DXF, USDZ, FBX
            </p>
          </div>

          {error && (
            <div className="mt-4 px-4 py-2 bg-(--error-light) border border-(--error) rounded-lg text-(--error) text-sm">
              {error}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-(--ink-light)">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <span>
          Files are processed locally in your browser and will not be uploaded
          to our servers
        </span>
      </div>
    </div>
  );
}
