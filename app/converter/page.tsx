"use client";

import React from "react";
import Link from "next/link";
import { Header, Footer } from "@/components/Layout";
import { FileUploadZone } from "@/components/converter/FileUploadZone";
import { FormatSelector } from "@/components/converter/FormatSelector";
import { ConversionProgress } from "@/components/converter/ConversionProgress";
import { DownloadButton } from "@/components/converter/DownloadButton";
import { useModelConverter } from "@/hooks/useModelConverter";
import { getFormatInfo } from "@/lib/converter/types";

export default function ConverterPage() {
  const {
    selectedFile,
    sourceFormat,
    conversionState,
    resultBlob,
    resultFileName,
    handleFileSelect,
    handleConvert,
    handleReset,
  } = useModelConverter({ targetFormat: "glb" });

  const targetFormatInfo = getFormatInfo("glb");

  return (
    <div className="min-h-screen flex flex-col container w-full mx-auto">
      <Header />

      <main className="flex-1 px-4 py-10 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-(--ink-primary) tracking-tight">
            Free 3D Model File Converter
          </h1>
          <p className="text-base text-(--ink-secondary) max-w-3xl mx-auto leading-relaxed">
            Free, instant, browser-based. No login required. Files never leave
            your device. Simply drag and drop your 3D model file to convert it
            to any mainstream format. (OBJ/STL/GLB/DXF/USDZ/GLTF/PLY/3MF/FBX)
          </p>
        </section>

        {/* 专用转换场景 */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-(--ink-primary) text-center">
            Specialized Conversion Scenarios
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            <Link
              href="/converter/game-dev"
              className="
                bg-(--bg-card) border border-(--border-primary) rounded-xl p-6
                hover:border-(--accent-primary) hover:shadow-lg
                transition-all duration-300 group
              "
            >
              <div className="flex items-center gap-3 mb-3">
                <svg
                  className="w-8 h-8 text-(--accent-primary)"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h4 className="text-lg font-semibold text-(--ink-primary) group-hover:text-(--accent-primary) transition-colors">
                  Game Development
                </h4>
              </div>
              <p className="text-sm text-(--accent-secondary) font-medium mb-2">
                OBJ/FBX → GLB
              </p>
              <p className="text-xs text-(--ink-muted) leading-relaxed">
                Prepare models for game engines with extreme compression and
                cross-platform compatibility
              </p>
            </Link>

            <Link
              href="/converter/3d-print"
              className="
                bg-(--bg-card) border border-(--border-primary) rounded-xl p-6
                hover:border-(--accent-primary) hover:shadow-lg
                transition-all duration-300 group
              "
            >
              <div className="flex items-center gap-3 mb-3">
                <svg
                  className="w-8 h-8 text-(--accent-primary)"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
                <h4 className="text-lg font-semibold text-(--ink-primary) group-hover:text-(--accent-primary) transition-colors">
                  3D Printing
                </h4>
              </div>
              <p className="text-sm text-(--accent-secondary) font-medium mb-2">
                Any Format → STL
              </p>
              <p className="text-xs text-(--ink-muted) leading-relaxed">
                Convert to standard triangle mesh format recognized by 3D
                printers
              </p>
            </Link>

            <Link
              href="/converter/web-ar"
              className="
                bg-(--bg-card) border border-(--border-primary) rounded-xl p-6
                hover:border-(--accent-primary) hover:shadow-lg
                transition-all duration-300 group
              "
            >
              <div className="flex items-center gap-3 mb-3">
                <svg
                  className="w-8 h-8 text-(--accent-primary)"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                <h4 className="text-lg font-semibold text-(--ink-primary) group-hover:text-(--accent-primary) transition-colors">
                  Web AR/VR
                </h4>
              </div>
              <p className="text-sm text-(--accent-secondary) font-medium mb-2">
                OBJ/FBX → GLB
              </p>
              <p className="text-xs text-(--ink-muted) leading-relaxed">
                Optimized for web and AR/VR, the industry standard format for
                Web 3D
              </p>
            </Link>

            <Link
              href="/converter/gis-pointcloud"
              className="
                bg-(--bg-card) border border-(--border-primary) rounded-xl p-6
                hover:border-(--accent-primary) hover:shadow-lg
                transition-all duration-300 group
              "
            >
              <div className="flex items-center gap-3 mb-3">
                <svg
                  className="w-8 h-8 text-(--accent-primary)"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h4 className="text-lg font-semibold text-(--ink-primary) group-hover:text-(--accent-primary) transition-colors">
                  Point Cloud Data
                </h4>
              </div>
              <p className="text-sm text-(--accent-secondary) font-medium mb-2">
                PLY → GLB
              </p>
              <p className="text-xs text-(--ink-muted) leading-relaxed">
                LiDAR point cloud converted to 3D models for web visualization
              </p>
            </Link>

            <Link
              href="/converter/architecture"
              className="
                bg-(--bg-card) border border-(--border-primary) rounded-xl p-6
                hover:border-(--accent-primary) hover:shadow-lg
                transition-all duration-300 group
              "
            >
              <div className="flex items-center gap-3 mb-3">
                <svg
                  className="w-8 h-8 text-(--accent-primary)"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <h4 className="text-lg font-semibold text-(--ink-primary) group-hover:text-(--accent-primary) transition-colors">
                  Architecture Drawings
                </h4>
              </div>
              <p className="text-sm text-(--accent-secondary) font-medium mb-2">
                DXF → GLB
              </p>
              <p className="text-xs text-(--ink-muted) leading-relaxed">
                CAD architectural drawings 3D-ified for web display and review
              </p>
            </Link>
          </div>
        </section>

        {/* Upload Zone */}
        {!selectedFile && (
          <section>
            <FileUploadZone onFileSelect={handleFileSelect} />
          </section>
        )}

        {/* File Info & Format Selection */}
        {selectedFile && conversionState.status === "idle" && (
          <section className="space-y-6">
            {/* 文件信息 */}
            <div className="w-full max-w-2xl mx-auto">
              <div className="bg-(--bg-card) border border-(--border-primary) rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-(--ink-primary)">
                      Selected File
                    </h3>
                    <p className="text-sm text-(--ink-muted) mt-1">
                      {selectedFile.name}
                    </p>
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

            {/* 格式选择器 */}
            <FormatSelector
              sourceFormat={sourceFormat}
              targetFormat="glb"
              onTargetFormatChange={() => {}}
            />

            {/* 转换按钮 */}
            <div className="w-full max-w-2xl mx-auto">
              <button
                onClick={handleConvert}
                className="
                  w-full py-4 px-6
                  bg-linear-to-r from-(--accent-primary) to-(--accent-secondary)
                  text-white font-semibold text-lg rounded-xl
                  hover:opacity-90 transition-opacity
                  shadow-lg hover:shadow-xl
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                Start Converting to {targetFormatInfo?.label || "GLB"}
              </button>
            </div>
          </section>
        )}

        {/* Progress */}
        {conversionState.status !== "idle" &&
          conversionState.status !== "completed" && (
            <section>
              <ConversionProgress state={conversionState} />
            </section>
          )}

        {/* Error */}
        {conversionState.status === "error" && (
          <section className="space-y-4">
            <ConversionProgress state={conversionState} />
            <div className="w-full max-w-2xl mx-auto">
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
        {conversionState.status === "completed" && resultBlob && (
          <section className="space-y-6">
            <ConversionProgress state={conversionState} />
            <DownloadButton blob={resultBlob} fileName={resultFileName} />

            <div className="w-full max-w-2xl mx-auto">
              <button
                onClick={handleReset}
                className="
                  w-full py-3 px-6
                  bg-(--bg-card) border border-(--border-primary)
                  text-(--ink-primary) font-semibold rounded-xl
                  hover:bg-(--bg-hover) transition-colors
                "
              >
                Convert Another File
              </button>
            </div>
          </section>
        )}

        {/* Features */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-(--ink-primary) text-center">
            Why Choose Our Converter?
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
                All conversions are done locally in your browser, files are
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
                  Instant Conversion
                </h4>
              </div>
              <p className="text-xs text-(--ink-muted) leading-relaxed">
                Leverage your browser's powerful performance to quickly complete
                format conversions without waiting.
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
      </main>

      <Footer />
    </div>
  );
}
