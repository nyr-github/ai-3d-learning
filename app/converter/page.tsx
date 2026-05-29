"use client";

import React from "react";
import { Header, Footer } from "@/components/Layout";
import { FileUploadZone } from "@/components/converter/FileUploadZone";
import { FormatSelector } from "@/components/converter/FormatSelector";
import { ConversionProgress } from "@/components/converter/ConversionProgress";
import { DownloadButton } from "@/components/converter/DownloadButton";
import { ConverterHero } from "@/components/converter/ConverterHero";
import { FileInfoCard } from "@/components/converter/FileInfoCard";
import { ConvertButton } from "@/components/converter/ConvertButton";
import { ScenarioCards } from "@/components/converter/ScenarioCards";
import { ConverterFeatures } from "@/components/converter/ConverterFeatures";
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
        <ConverterHero />

        {/* Upload Zone */}
        {!selectedFile && (
          <section>
            <FileUploadZone onFileSelect={handleFileSelect} />
          </section>
        )}

        {/* File Info & Format Selection */}
        {selectedFile && conversionState.status === "idle" && (
          <section className="space-y-6">
            <FileInfoCard fileName={selectedFile.name} onReset={handleReset} />

            <FormatSelector
              sourceFormat={sourceFormat}
              targetFormat="glb"
              onTargetFormatChange={() => {}}
            />

            <ConvertButton
              targetFormat={targetFormatInfo?.label || "GLB"}
              onConvert={handleConvert}
            />
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

        {/* Specialized Conversion Scenarios */}
        <ScenarioCards />

        {/* Features */}
        <ConverterFeatures />
      </main>

      <Footer />
    </div>
  );
}
