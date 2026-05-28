"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { ModelConverter } from "@/lib/converter/ModelConverter";
import { getFormatByExtension } from "@/lib/converter/types";
import type { SupportedFormat, ConversionState } from "@/lib/converter/types";

interface UseModelConverterOptions {
  targetFormat?: SupportedFormat;
  enablePreview?: boolean;
}

interface UseModelConverterReturn {
  // 状态
  selectedFile: File | null;
  sourceFormat: SupportedFormat | null;
  conversionState: ConversionState;
  resultBlob: Blob | null;
  resultFileName: string;
  previewScene: THREE.Scene | null;
  isLoadingPreview: boolean;

  // 操作
  handleFileSelect: (file: File) => Promise<void>;
  handleConvert: () => Promise<void>;
  handleReset: () => void;

  // 转换器实例
  converter: ModelConverter;
}

/**
 * 通用的 3D 模型转换 Hook
 * 封装文件选择、预览加载、格式转换、状态管理等核心逻辑
 */
export function useModelConverter(
  options: UseModelConverterOptions = {}
): UseModelConverterReturn {
  const { targetFormat, enablePreview = false } = options;

  // 状态管理
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sourceFormat, setSourceFormat] = useState<SupportedFormat | null>(null);
  const [conversionState, setConversionState] = useState<ConversionState>({
    status: "idle",
    progress: 0,
  });
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultFileName, setResultFileName] = useState<string>("");
  const [previewScene, setPreviewScene] = useState<THREE.Scene | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  // 转换器实例（使用 ref 避免重新渲染时重新创建）
  const converterRef = useRef<ModelConverter | null>(null);
  if (!converterRef.current) {
    converterRef.current = new ModelConverter();
  }

  /**
   * 清理 Three.js 场景资源
   */
  const cleanupScene = useCallback((scene: THREE.Scene) => {
    scene.traverse((object) => {
      if ((object as THREE.Mesh).geometry) {
        (object as THREE.Mesh).geometry.dispose();
      }
      if ((object as THREE.Mesh).material) {
        const material = (object as THREE.Mesh).material as THREE.Material;
        if (Array.isArray(material)) {
          material.forEach((m) => m.dispose());
        } else {
          material.dispose();
        }
      }
    });
  }, []);

  /**
   * 处理文件选择
   */
  const handleFileSelect = useCallback(
    async (file: File) => {
      setSelectedFile(file);

      // 识别源格式
      const extension = file.name.split(".").pop();
      const format = extension ? getFormatByExtension(`.${extension}`) : null;
      setSourceFormat(format);

      // 重置转换状态
      setConversionState({
        status: "idle",
        progress: 0,
      });
      setResultBlob(null);
      setResultFileName("");

      // 加载 3D 预览（如果启用）
      if (enablePreview) {
        setIsLoadingPreview(true);
        try {
          const scene = await converterRef.current!.loadModel(file);
          setPreviewScene(scene);
        } catch (error) {
          console.error("Failed to load preview:", error);
        } finally {
          setIsLoadingPreview(false);
        }
      }
    },
    [enablePreview]
  );

  /**
   * 执行格式转换
   */
  const handleConvert = useCallback(async () => {
    if (!selectedFile || !sourceFormat || !targetFormat) {
      return;
    }

    try {
      // 开始转换
      setConversionState({
        status: "uploading",
        progress: 10,
      });

      // 模拟进度更新
      const progressInterval = setInterval(() => {
        setConversionState((prev) => {
          if (prev.status === "completed" || prev.status === "error") {
            clearInterval(progressInterval);
            return prev;
          }

          const newProgress = Math.min(prev.progress + 5, 90);
          return { ...prev, progress: newProgress };
        });
      }, 200);

      // 执行转换
      const result = await converterRef.current!.convert(
        selectedFile,
        targetFormat
      );

      clearInterval(progressInterval);

      // 转换完成
      setResultBlob(result.blob);
      setResultFileName(result.fileName);
      setConversionState({
        status: "completed",
        progress: 100,
      });
    } catch (error) {
      console.error("Conversion error:", error);
      setConversionState({
        status: "error",
        progress: 0,
        error:
          error instanceof Error ? error.message : "转换过程中发生错误",
      });
    }
  }, [selectedFile, sourceFormat, targetFormat]);

  /**
   * 重置所有状态
   */
  const handleReset = useCallback(() => {
    setSelectedFile(null);
    setSourceFormat(null);
    setConversionState({
      status: "idle",
      progress: 0,
    });
    setResultBlob(null);
    setResultFileName("");

    // 清理预览场景
    if (previewScene) {
      cleanupScene(previewScene);
      setPreviewScene(null);
    }
  }, [previewScene, cleanupScene]);

  // 组件卸载时清理资源
  useEffect(() => {
    return () => {
      if (previewScene) {
        cleanupScene(previewScene);
      }
    };
  }, [previewScene, cleanupScene]);

  return {
    // 状态
    selectedFile,
    sourceFormat,
    conversionState,
    resultBlob,
    resultFileName,
    previewScene,
    isLoadingPreview,

    // 操作
    handleFileSelect,
    handleConvert,
    handleReset,

    // 转换器实例
    converter: converterRef.current!,
  };
}
