"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { Header, Footer } from "@/components/Layout";
import { FileUploadZone } from "@/components/converter/FileUploadZone";
import { ConversionProgress } from "@/components/converter/ConversionProgress";
import { DownloadButton } from "@/components/converter/DownloadButton";
import { ScenarioInfo } from "@/components/converter/ScenarioInfo";
import { useModelConverter } from "@/hooks/useModelConverter";
import { getFormatInfo } from "@/lib/converter/types";
import type { ConversionScenario } from "@/lib/converter/conversion-scenarios";

interface ScenarioConverterProps {
  scenario: ConversionScenario;
}

export function ScenarioConverter({ scenario }: ScenarioConverterProps) {
  const {
    selectedFile,
    conversionState,
    resultBlob,
    resultFileName,
    previewScene,
    handleFileSelect,
    handleConvert,
    handleReset,
  } = useModelConverter({
    targetFormat: scenario.targetFormat,
    enablePreview: true,
  });

  const targetFormatInfo = getFormatInfo(scenario.targetFormat);

  return (
    <div className="min-h-screen flex flex-col container w-full mx-auto">
      <Header />

      <main className="flex-1 px-4 py-10 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-(--ink-primary) tracking-tight">
            {scenario.title}
          </h1>
          <p className="text-xl font-semibold text-(--accent-primary)">
            {scenario.subtitle}
          </p>
          <p className="text-base text-(--ink-secondary) max-w-3xl mx-auto leading-relaxed">
            {scenario.description}
          </p>
        </section>

        {/* 3D Preview */}
        {previewScene && (
          <section className="space-y-4">
            <h3 className="text-xl font-bold text-(--ink-primary) text-center">
              Model Preview
            </h3>
            <div className="w-full max-w-4xl mx-auto h-96 bg-(--bg-card) border border-(--border-primary) rounded-xl overflow-hidden">
              <Canvas
                shadows="percentage"
                dpr={[1, 2]}
                camera={{ position: [0, 0, 4.4], fov: 45 }}
                gl={{ antialias: true, preserveDrawingBuffer: true }}
              >
                <ambientLight intensity={0.55} />
                <directionalLight
                  position={[5, 6, 4]}
                  intensity={1.1}
                  castShadow
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                />
                <directionalLight position={[-3, 2, -4]} intensity={0.35} />

                <Environment
                  files="/hdr/studio_small_03_1k.hdr"
                  environmentIntensity={0.55}
                />

                <primitive object={previewScene} />

                <ContactShadows
                  position={[0, -1.35, 0]}
                  opacity={0.32}
                  scale={6}
                  blur={2.4}
                  far={3.2}
                />

                <OrbitControls
                  makeDefault
                  enableDamping
                  dampingFactor={0.08}
                  minDistance={1.5}
                  maxDistance={9}
                />
              </Canvas>
            </div>
          </section>
        )}

        {/* Upload Zone */}
        {!selectedFile && (
          <section>
            <FileUploadZone onFileSelect={handleFileSelect} />
          </section>
        )}

        {/* File Info & Convert Button */}
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
                    <p className="text-xs text-(--ink-light) mt-1">
                      Will be converted to{" "}
                      {targetFormatInfo?.label ||
                        scenario.targetFormat.toUpperCase()}{" "}
                      format
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
                Start Converting to{" "}
                {targetFormatInfo?.label || scenario.targetFormat.toUpperCase()}
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

        {/* Scenario Info */}
        <ScenarioInfo scenario={scenario} />
      </main>

      <Footer />
    </div>
  );
}
