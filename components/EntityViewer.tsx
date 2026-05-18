import { Suspense, useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows } from "@react-three/drei";
import type { OrbitControls as OrbitControlsType } from "three-stdlib";
import type { Entity3D } from "@/data/types";
import { useModel } from "@/hooks/useModel";
import { ModelScene } from "@/components/ModelScene";
import { ProgressOverlay } from "@/components/ProgressOverlay";
import {
  ViewerToolbar,
  ViewerHeading,
  ViewerFunFact,
  useViewerControls,
} from "./ViewerControls";
import { TransformPanel } from "./TransformPanel";
import {
  evictModelFromCache,
  getCachedTask,
  getCacheSize,
  getMemoryUsage,
} from "@/lib/modelLoader";

interface TransformUpdaterProps {
  controlsRef: React.RefObject<unknown>;
  onUpdate: (transform: {
    rotationX: number;
    rotationY: number;
    rotationZ: number;
    scale: number;
  }) => void;
  defaultRotation: { x: number; y: number; z: number };
  displayScale: number;
}

/** Convert degrees to radians */
function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/** Updates transform panel based on OrbitControls camera position */
function TransformUpdater({
  controlsRef,
  onUpdate,
  defaultRotation,
  displayScale,
}: TransformUpdaterProps) {
  useFrame(() => {
    const ctrl = controlsRef.current as {
      object?: { position: { x: number; y: number; z: number } };
      target: { x: number; y: number; z: number };
    } | null;
    if (!ctrl?.object) return;

    const cam = ctrl.object;
    const target = ctrl.target;

    const dx = cam.position.x - target.x;
    const dy = cam.position.y - target.y;
    const dz = cam.position.z - target.z;
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (distance === 0) return;

    onUpdate({
      rotationX: Math.asin(Math.max(-1, Math.min(1, dy / distance))),
      rotationY: Math.atan2(dx, dz),
      rotationZ: degToRad(defaultRotation.z),
      scale: (4.4 / distance) * displayScale,
    });
  });

  return null;
}

interface Props {
  entity: Entity3D;
  // Optional external controls for mobile integration
  controlsRef?: React.RefObject<OrbitControlsType | null>;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  autoRotate?: boolean;
  isFullscreen?: boolean;
  onReset?: () => void;
  onToggleRotate?: () => void;
  onToggleFullscreen?: () => void;
}

export function EntityViewer({
  entity,
  controlsRef: externalControlsRef,
  containerRef: externalContainerRef,
  autoRotate: externalAutoRotate,
  isFullscreen: externalIsFullscreen,
  onReset: externalOnReset,
  onToggleRotate: externalOnToggleRotate,
  onToggleFullscreen: externalOnToggleFullscreen,
}: Props) {
  const { phase, progress, task } = useModel(entity.model3D.modelUrl, {
    autoStart: true,
    fileSize: entity.model3D.fileSize,
  });

  // Internal controls (used when external controls are not provided)
  const internalControls = useViewerControls();

  // Use external controls if provided, otherwise use internal
  const controlsRef = externalControlsRef ?? internalControls.controlsRef;
  const containerRef = externalContainerRef ?? internalControls.containerRef;
  const autoRotate = externalAutoRotate ?? internalControls.autoRotate;
  const isFullscreen = externalIsFullscreen ?? internalControls.isFullscreen;
  const handleReset = externalOnReset ?? internalControls.handleReset;
  const handleToggleRotate =
    externalOnToggleRotate ?? internalControls.handleToggleRotate;
  const handleToggleFullscreen =
    externalOnToggleFullscreen ?? internalControls.handleToggleFullscreen;

  const [transform, setTransform] = useState({
    rotationX: degToRad(entity.model3D.defaultRotation.x),
    rotationY: degToRad(entity.model3D.defaultRotation.y),
    rotationZ: degToRad(entity.model3D.defaultRotation.z),
    scale: entity.model3D.displayScale,
  });

  const isReady = phase === "completed" && !!task?.parsedAsset;

  // Track previous entity to cleanup old model cache
  const prevEntityRef = useRef<Entity3D | null>(null);

  // Reset transform state and cleanup old model when switching entities
  useEffect(() => {
    // Cleanup previous model cache if it's different from current
    if (prevEntityRef.current && prevEntityRef.current.id !== entity.id) {
      const prevModelUrl = prevEntityRef.current.model3D.modelUrl;
      // Only evict if the previous model is different from current model
      if (prevModelUrl !== entity.model3D.modelUrl) {
        evictModelFromCache(prevModelUrl);
      }
    }

    // Update previous entity reference
    prevEntityRef.current = entity;

    // Reset transform to default values
    setTransform({
      rotationX: degToRad(entity.model3D.defaultRotation.x),
      rotationY: degToRad(entity.model3D.defaultRotation.y),
      rotationZ: degToRad(entity.model3D.defaultRotation.z),
      scale: entity.model3D.displayScale,
    });
  }, [entity]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      // When component unmounts, we keep the current model in cache for potential reuse
      // but you could evict it here if memory is a concern
      // evictModelFromCache(entity.model3D.modelUrl);
    };
  }, [entity.model3D.modelUrl]);

  // Debug: Log cache and memory info in development
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const cacheSize = getCacheSize();
      const memoryUsage = getMemoryUsage();
      console.log(
        `[Model Cache] Size: ${cacheSize}, Memory: ${memoryUsage ? memoryUsage.toFixed(2) + " MB" : "N/A"}`,
      );
    }
  }, [entity.id]);

  // Update transform based on camera position
  const handleTransformUpdate = (newTransform: typeof transform) => {
    setTransform(newTransform);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${isFullscreen ? "bg-(--bg-primary)" : ""}`}
    >
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

        {isReady && task?.parsedAsset && (
          <ModelScene
            gltf={task.parsedAsset}
            autoRotate={autoRotate}
            initialRotation={entity.model3D.defaultRotation}
            displayScale={entity.model3D.displayScale}
          />
        )}

        <ContactShadows
          position={[0, -1.35, 0]}
          opacity={0.32}
          scale={6}
          blur={2.4}
          far={3.2}
        />

        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.08}
          minDistance={1.5}
          maxDistance={9}
        />

        <TransformUpdater
          controlsRef={controlsRef}
          onUpdate={handleTransformUpdate}
          defaultRotation={entity.model3D.defaultRotation}
          displayScale={entity.model3D.displayScale}
        />
      </Canvas>

      <ViewerHeading title={entity.name} subtitle={entity.subtitle} />
      <ViewerFunFact funFact={entity.funFact} />
      <ViewerToolbar
        autoRotate={autoRotate}
        onToggleRotate={handleToggleRotate}
        onReset={handleReset}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />
      <TransformPanel transform={transform} />

      {!isReady && (
        <ProgressOverlay
          progress={progress}
          phase={phase}
          modelName={entity.name}
          error={task?.failureReason}
        />
      )}
    </div>
  );
}
