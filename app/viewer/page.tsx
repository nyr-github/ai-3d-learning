"use client";

import { useState, useCallback, useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  Upload,
  X,
  Maximize2,
  Minimize2,
  Grid3x3,
  Eye,
  Loader2,
} from "lucide-react";
import { Header, Footer } from "@/components/Layout";
import { ModelScene } from "@/components/ModelScene";

interface ModelFile {
  id: string;
  name: string;
  file: File;
  url: string;
  scene: THREE.Group | THREE.Scene | null;
  thumbnail: string | null;
  size: number;
  format: "glb" | "fbx" | "obj";
}

/** Convert degrees to radians */
function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/** Generate thumbnail from 3D model scene */
async function generateThumbnail(
  modelScene: THREE.Group | THREE.Scene,
  width: number = 400,
  height: number = 400,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(2); // Higher pixel ratio for sharper rendering
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const thumbnailScene = new THREE.Scene();
    thumbnailScene.background = new THREE.Color("#0b0b0b");

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    thumbnailScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
    directionalLight.position.set(5, 6, 4);
    thumbnailScene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.35);
    directionalLight2.position.set(-3, 2, -4);
    thumbnailScene.add(directionalLight2);

    // Clone and center the model
    const cloned = modelScene.clone();
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Center the model
    cloned.position.sub(center);

    // Calculate scale to fit the model as large as possible
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const fov = camera.fov * (Math.PI / 180);
    const cameraDistance = maxDim / (2 * Math.tan(fov / 2));

    // Add 10% padding to ensure model fits well
    const padding = 1.1;
    const finalDistance = cameraDistance * padding;

    // Set camera position based on model dimensions
    camera.position.set(0, 0, finalDistance);

    // Scale model to fill ~90% of the view
    const scale = 0.8;
    cloned.scale.set(scale, scale, scale);

    thumbnailScene.add(cloned);

    // Render
    renderer.render(thumbnailScene, camera);

    // Get thumbnail with higher quality
    const thumbnail = canvas.toDataURL("image/avif", 1.0);
    renderer.dispose();
    resolve(thumbnail);
  });
}

export default function ModelViewerPage() {
  const [files, setFiles] = useState<ModelFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<ModelFile | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /** Handle file selection */
  const handleFileSelect = useCallback(async () => {
    if (!fileInputRef.current?.files) return;

    const selectedFiles = Array.from(fileInputRef.current.files);

    // Setup loaders once
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    dracoLoader.setDecoderConfig({ type: "wasm" });
    dracoLoader.preload();
    gltfLoader.setDRACOLoader(dracoLoader);
    gltfLoader.setMeshoptDecoder(MeshoptDecoder);

    const fbxLoader = new FBXLoader();
    const objLoader = new OBJLoader();

    // Immediately add files to UI with loading state
    const tempFiles: ModelFile[] = selectedFiles
      .filter((file) => {
        const ext = file.name.toLowerCase();
        return (
          ext.endsWith(".glb") || ext.endsWith(".fbx") || ext.endsWith(".obj")
        );
      })
      .map((file) => {
        const ext = file.name.toLowerCase();
        const format = ext.endsWith(".fbx")
          ? "fbx"
          : ext.endsWith(".obj")
            ? "obj"
            : "glb";
        return {
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          name: file.name,
          file,
          url: URL.createObjectURL(file),
          scene: null,
          thumbnail: null,
          size: file.size,
          format,
        };
      });

    setFiles((prev) => [...prev, ...tempFiles]);

    // Clear input immediately
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Load all files in parallel - one failure won't affect others
    const loadPromises = tempFiles.map(async (tempFile) => {
      try {
        setLoading(`Loading ${tempFile.name}...`);

        let scene: THREE.Group | THREE.Scene;

        if (tempFile.format === "fbx") {
          // Load FBX file
          scene = await fbxLoader.loadAsync(tempFile.url);
        } else if (tempFile.format === "obj") {
          // Load OBJ file
          scene = await objLoader.loadAsync(tempFile.url);
        } else {
          // Load GLB/GLTF file
          const gltf = await new Promise<GLTF>((resolve, reject) => {
            gltfLoader.load(
              tempFile.url,
              (data: GLTF) => resolve(data),
              undefined,
              (error: unknown) => reject(error),
            );
          });
          scene = gltf.scene;
        }

        // Generate thumbnail
        const thumbnail = await generateThumbnail(scene);

        // Update the file with loaded data
        setFiles((prev) =>
          prev.map((f) =>
            f.id === tempFile.id ? { ...f, scene, thumbnail } : f,
          ),
        );
      } catch (error) {
        console.error(`Failed to load ${tempFile.name}:`, error);
        // Remove only the failed file
        setFiles((prev) => {
          const file = prev.find((f) => f.id === tempFile.id);
          if (file) {
            URL.revokeObjectURL(file.url);
          }
          return prev.filter((f) => f.id !== tempFile.id);
        });
      }
    });

    // Wait for all to complete (or fail)
    await Promise.all(loadPromises);
    setLoading(null);
  }, []);

  /** Remove a file */
  const handleRemoveFile = useCallback(
    (id: string) => {
      setFiles((prev) => {
        const file = prev.find((f) => f.id === id);
        if (file) {
          URL.revokeObjectURL(file.url);
        }
        return prev.filter((f) => f.id !== id);
      });

      if (selectedFile?.id === id) {
        setSelectedFile(null);
      }
    },
    [selectedFile],
  );

  /** Clear all files */
  const handleClearAll = useCallback(() => {
    files.forEach((file) => {
      URL.revokeObjectURL(file.url);
    });
    setFiles([]);
    setSelectedFile(null);
  }, [files]);

  /** Format file size */
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  /** Cleanup on unmount */
  useEffect(() => {
    return () => {
      files.forEach((file) => {
        URL.revokeObjectURL(file.url);
      });
    };
  }, [files]);

  return (
    <div className="min-h-screen bg-(--bg-primary) flex flex-col container w-full mx-auto">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-(--ink-primary) mb-2">
            3D Model Viewer
          </h1>
          <p className="text-(--ink-muted)">
            Import and view multiple GLB, FBX and OBJ files. Click thumbnails to
            see detailed 3D models.
          </p>
        </div>

        {/* File Import Section */}
        <div className="mb-6 bg-(--bg-card) border border-(--border-primary) rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Grid3x3 className="w-5 h-5 text-(--accent-primary)" />
              <h2 className="text-lg font-semibold text-(--ink-primary)">
                Model Library ({files.length})
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {files.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="px-3 py-2 text-sm bg-(--bg-secondary) hover:bg-(--bg-tertiary) border border-(--border-primary) rounded-lg transition-colors"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-(--accent-primary) hover:bg-(--accent-primary)/90 text-white rounded-lg transition-colors font-medium"
              >
                <Upload className="w-4 h-4" />
                Import Models
              </button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".glb,.fbx,.obj"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* File Grid */}
          {files.length === 0 ? (
            <div className="text-center py-12 text-(--ink-muted)">
              <Upload className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg mb-1">No models imported yet</p>
              <p className="text-sm">
                Click "Import Models" to add your 3D models (GLB/FBX/OBJ)
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="group relative bg-(--bg-secondary) border border-(--border-primary) rounded-lg overflow-hidden hover:border-(--accent-primary) transition-all cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div
                    className="aspect-square bg-(--bg-tertiary) relative overflow-hidden"
                    onClick={() => setSelectedFile(file)}
                  >
                    {file.thumbnail ? (
                      <img
                        src={file.thumbnail}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-(--ink-muted)">
                        <Loader2 className="w-8 h-8 opacity-50 animate-spin" />
                      </div>
                    )}

                    {/* Format Badge */}
                    <div className="absolute top-2 left-2">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                          file.format === "glb"
                            ? "bg-blue-500/90 text-white"
                            : file.format === "fbx"
                              ? "bg-purple-500/90 text-white"
                              : "bg-orange-500/90 text-white"
                        }`}
                      >
                        {file.format.toUpperCase()}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize2 className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* File Info */}
                  <div className="p-2">
                    <p
                      className="text-xs font-medium text-(--ink-primary) truncate mb-1"
                      title={file.name}
                    >
                      {file.name.replace(/\.(glb|fbx|obj)$/i, "")}
                    </p>
                    <p className="text-[10px] text-(--ink-muted)">
                      {formatBytes(file.size)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(file.id);
                    }}
                    className="absolute top-1 right-1 p-1 bg-red-500/80 hover:bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="mt-4 text-center text-(--ink-muted) text-sm">
              {loading}
            </div>
          )}
        </div>

        {/* 3D Viewer Modal */}
        {selectedFile && selectedFile.scene && (
          <div
            className={`fixed inset-0 z-50 bg-black/90 flex items-center justify-center ${
              isFullscreen ? "" : "p-4"
            }`}
            onClick={() => setSelectedFile(null)}
          >
            <div
              className={`relative rounded-xl overflow-hidden ${
                isFullscreen ? "w-full h-full rounded-none" : "w-full max-w-5xl"
              }`}
              style={{
                height: isFullscreen ? "100vh" : "70vh",
                backgroundImage: "linear-gradient(#0b0b0b 5%, #6e6e6e 140%)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Viewer Header */}
              <div className="absolute top-0 left-0 right-0 z-10 bg-linear-to-b from-black/50 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {selectedFile.name}
                    </h3>
                    <p className="text-sm text-white/70">
                      {formatBytes(selectedFile.size)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      {isFullscreen ? (
                        <Minimize2 className="w-5 h-5 text-white" />
                      ) : (
                        <Maximize2 className="w-5 h-5 text-white" />
                      )}
                    </button>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 3D Canvas */}
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

                <Suspense fallback={null}>
                  <Environment
                    files="/hdr/studio_small_03_1k.hdr"
                    environmentIntensity={0.55}
                  />
                </Suspense>

                <ModelScene
                  gltf={null as any}
                  customScene={selectedFile.scene}
                  autoRotate={false}
                  initialRotation={{ x: 0, y: 0, z: 0 }}
                  displayScale={1}
                />

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

              {/* Viewer Footer */}
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-linear-to-t from-black/50 to-transparent p-4">
                <p className="text-xs text-white/60 text-center">
                  Click and drag to rotate • Scroll to zoom • Right-click to pan
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
