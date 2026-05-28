"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  Upload,
  Download,
  Settings,
  Zap,
  FileBox,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  optimizeGLB,
  formatFileSize,
  type OptimizeOptions,
  type OptimizeResult,
} from "@/lib/converter/GLBOptimizer";

export function GLBOptimizerUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [result, setResult] = useState<OptimizeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [options, setOptions] = useState<OptimizeOptions>({
    compress: "meshopt",
    textureCompress: "webp",
    prune: true,
    dedup: true,
    resample: true,
  });

  const [showOptions] = useState(true);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.name.toLowerCase().endsWith(".glb")) {
        setSelectedFile(file);
        setError(null);
        setResult(null);
      } else {
        setError("请选择GLB文件");
      }
    }
  }, []);

  const handleFileSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (file.name.toLowerCase().endsWith(".glb")) {
          setSelectedFile(file);
          setError(null);
          setResult(null);
        } else {
          setError("请选择GLB文件");
        }
      }
    },
    [],
  );

  const handleOptimize = useCallback(async () => {
    if (!selectedFile) return;

    setIsOptimizing(true);
    setProgress(0);
    setStatus("Starting optimization...");
    setError(null);
    setResult(null);

    try {
      const optimizeResult = await optimizeGLB(
        selectedFile,
        options,
        (prog, stat) => {
          setProgress(prog);
          setStatus(stat);
        },
      );

      setResult(optimizeResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Optimization failed");
    } finally {
      setIsOptimizing(false);
    }
  }, [selectedFile, options]);

  const handleDownload = useCallback(() => {
    if (!result) return;

    const url = URL.createObjectURL(result.blob);
    const a = document.createElement("a");
    a.href = url;
    const baseName = selectedFile?.name.replace(/\.glb$/i, "") || "model";
    a.download = `${baseName}_optimized.glb`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [result, selectedFile]);

  const handleReset = useCallback(() => {
    setSelectedFile(null);
    setResult(null);
    setError(null);
    setProgress(0);
    setStatus("");
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-(--ink-primary) tracking-tight">
          GLB Model Optimizer
        </h1>
        <p className="text-base text-(--ink-secondary) max-w-3xl mx-auto leading-relaxed">
          Pure frontend GLB model optimization tool, supporting Meshopt geometry
          compression and WebP/AVIF/JPEG texture format conversion. Files are
          processed locally in your browser, never uploaded to servers.
        </p>
      </section>

      {/* Upload Zone */}
      {!selectedFile && !result && (
        <section>
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
            onClick={handleFileSelect}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".glb"
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
                    ? "Drop file to start optimization"
                    : "Drag and drop GLB file here or click to upload"}
                </h3>

                <p className="text-sm text-(--ink-muted)">
                  Supported format: .glb
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-(--error-light) border border-(--error) rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-(--error) shrink-0" />
              <p className="text-sm text-(--error)">{error}</p>
            </div>
          )}
        </section>
      )}

      {/* File Info & Options */}
      {selectedFile && !result && !isOptimizing && (
        <section className="space-y-6">
          {/* File Info */}
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-(--bg-card) border border-(--border-primary) rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileBox className="w-6 h-6 text-(--accent-primary)" />
                  <div>
                    <h3 className="text-lg font-semibold text-(--ink-primary)">
                      {selectedFile.name}
                    </h3>
                    <p className="text-sm text-(--ink-muted)">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="text-sm text-(--accent-primary) hover:underline"
                >
                  Change File
                </button>
              </div>
            </div>
          </div>

          {/* Options Panel */}
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-(--bg-card) border border-(--border-primary) rounded-xl p-6 space-y-4">
              {/* Geometry Compression */}
              <div>
                <label className="block text-sm font-semibold text-(--ink-primary) mb-2">
                  Geometry Compression
                </label>
                <select
                  value={options.compress}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      compress: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 bg-(--bg-secondary) border border-(--border-primary) rounded-lg text-(--ink-primary)"
                >
                  <option value="meshopt">Meshopt (Recommended)</option>
                  <option value="none">No Compression</option>
                </select>
              </div>

              {/* Texture Compression */}
              <div>
                <label className="block text-sm font-semibold text-(--ink-primary) mb-2">
                  Texture Image Format
                </label>
                <select
                  value={options.textureCompress}
                  onChange={(e) =>
                    setOptions({
                      ...options,
                      textureCompress: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 bg-(--bg-secondary) border border-(--border-primary) rounded-lg text-(--ink-primary)"
                >
                  <option value="webp">WebP (Recommended)</option>
                  <option value="avif">AVIF</option>
                  <option value="jpeg">JPEG</option>
                  <option value="none">No Compression</option>
                </select>
              </div>

              {/* Prune */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-(--ink-primary)">
                  Remove Unused Nodes
                </label>
                <input
                  type="checkbox"
                  checked={options.prune}
                  onChange={(e) =>
                    setOptions({ ...options, prune: e.target.checked })
                  }
                  className="w-5 h-5 accent-(--accent-primary)"
                />
              </div>

              {/* Dedup */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-(--ink-primary)">
                  Deduplicate Vertex and Texture Data
                </label>
                <input
                  type="checkbox"
                  checked={options.dedup}
                  onChange={(e) =>
                    setOptions({ ...options, dedup: e.target.checked })
                  }
                  className="w-5 h-5 accent-(--accent-primary)"
                />
              </div>

              {/* Resample */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-(--ink-primary)">
                  Resample Animation Frames
                </label>
                <input
                  type="checkbox"
                  checked={options.resample}
                  onChange={(e) =>
                    setOptions({ ...options, resample: e.target.checked })
                  }
                  className="w-5 h-5 accent-(--accent-primary)"
                />
              </div>
            </div>
          </div>

          {/* Optimize Button */}
          <div className="w-full max-w-2xl mx-auto">
            <button
              onClick={handleOptimize}
              className="
                w-full py-4 px-6
                bg-linear-to-r from-(--accent-primary) to-(--accent-secondary)
                text-white font-semibold text-lg rounded-xl
                hover:opacity-90 transition-opacity
                shadow-lg hover:shadow-xl
                flex items-center justify-center gap-2
              "
            >
              <Zap className="w-5 h-5" />
              Start Optimization
            </button>
          </div>
        </section>
      )}

      {/* Progress */}
      {isOptimizing && (
        <section className="w-full max-w-2xl mx-auto">
          <div className="bg-(--bg-card) border border-(--border-primary) rounded-xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-(--accent-primary) border-t-transparent rounded-full animate-spin" />
              <div>
                <h3 className="text-lg font-semibold text-(--ink-primary)">
                  {status}
                </h3>
                <p className="text-sm text-(--ink-muted)">{progress}%</p>
              </div>
            </div>

            <div className="w-full bg-(--bg-secondary) rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-(--accent-primary) to-(--accent-secondary) transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Error */}
      {error && !isOptimizing && (
        <section className="w-full max-w-2xl mx-auto">
          <div className="bg-(--error-light) border border-(--error) rounded-xl p-6 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-(--error) shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-(--error)">
                Optimization Failed
              </h3>
              <p className="text-sm text-(--error) mt-1">{error}</p>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleReset}
              className="
                w-full py-3 px-6
                bg-(--bg-card) border border-(--border-primary)
                text-(--ink-primary) font-semibold rounded-xl
                hover:bg-(--bg-hover) transition-colors
              "
            >
              Retry
            </button>
          </div>
        </section>
      )}

      {/* Success & Download */}
      {result && (
        <section className="space-y-6">
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-(--bg-card) border border-(--border-primary) rounded-xl p-8 space-y-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-(--success)" />
                <div>
                  <h3 className="text-xl font-bold text-(--ink-primary)">
                    Optimization Complete!
                  </h3>
                  <p className="text-sm text-(--ink-muted)">
                    Model has been successfully optimized
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-(--bg-secondary) rounded-lg p-4 text-center">
                  <p className="text-xs text-(--ink-muted) mb-1">
                    Original Size
                  </p>
                  <p className="text-lg font-bold text-(--ink-primary)">
                    {formatFileSize(result.originalSize)}
                  </p>
                </div>
                <div className="bg-(--bg-secondary) rounded-lg p-4 text-center">
                  <p className="text-xs text-(--ink-muted) mb-1">
                    Optimized Size
                  </p>
                  <p className="text-lg font-bold text-(--ink-primary)">
                    {formatFileSize(result.optimizedSize)}
                  </p>
                </div>
                <div className="bg-(--bg-secondary) rounded-lg p-4 text-center">
                  <p className="text-xs text-(--ink-muted) mb-1">
                    Compression Ratio
                  </p>
                  <p className="text-lg font-bold text-(--accent-primary)">
                    {result.ratio.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="
                  w-full py-4 px-6
                  bg-linear-to-r from-(--success) to-(--success)/80
                  text-white font-semibold text-lg rounded-xl
                  hover:opacity-90 transition-opacity
                  shadow-lg hover:shadow-xl
                  flex items-center justify-center gap-2
                "
              >
                <Download className="w-5 h-5" />
                Download Optimized Model
              </button>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="
                  w-full py-3 px-6
                  bg-(--bg-secondary) border border-(--border-primary)
                  text-(--ink-primary) font-semibold rounded-xl
                  hover:bg-(--bg-hover) transition-colors
                "
              >
                Optimize Another File
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-(--ink-primary) text-center">
          Why Choose Our Optimizer?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          <div className="bg-(--bg-card) border border-(--border-primary) rounded-xl p-5 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <svg
                className="w-6 h-6 text-(--accent-primary)"
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
              <h4 className="text-base font-semibold text-(--ink-primary)">
                Privacy Protected
              </h4>
            </div>
            <p className="text-xs text-(--ink-muted) leading-relaxed">
              All optimizations are done locally in your browser, files are
              never uploaded to servers.
            </p>
          </div>

          <div className="bg-(--bg-card) border border-(--border-primary) rounded-xl p-5 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <svg
                className="w-6 h-6 text-(--accent-primary)"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <h4 className="text-base font-semibold text-(--ink-primary)">
                Efficient Compression
              </h4>
            </div>
            <p className="text-xs text-(--ink-muted) leading-relaxed">
              Supports Meshopt geometry compression and WebP/AVIF/JPEG texture
              format conversion.
            </p>
          </div>

          <div className="bg-(--bg-card) border border-(--border-primary) rounded-xl p-5 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <svg
                className="w-6 h-6 text-(--accent-primary)"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <h4 className="text-base font-semibold text-(--ink-primary)">
                Completely Free
              </h4>
            </div>
            <p className="text-xs text-(--ink-muted) leading-relaxed">
              No registration, no payment, use it anywhere anytime, with no
              usage limits.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
