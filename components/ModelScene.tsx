"use client";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { type GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createSceneInstance } from "@/lib/modelLoader";

interface Props {
  gltf: GLTF;
  autoRotate: boolean;
  /** Initial rotation angles around x, y, z axes (radians) */
  initialRotation?: { x: number; y: number; z: number };
  /** Additional scale multiplier on top of normalization, used to make different models appear at different default sizes */
  displayScale?: number;
  /** Callback to report current transform state */
  onTransformChange?: (transform: {
    rotationX: number;
    rotationY: number;
    rotationZ: number;
    scale: number;
  }) => void;
}

/**
 * Center and scale GLTF.scene to appropriate size, then render.
 * Implements controllable auto-rotation through useFrame.
 */

/** Convert degrees to radians */
function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

export function ModelScene({
  gltf,
  autoRotate,
  initialRotation = { x: 0, y: 0, z: 0 },
  displayScale = 1,
  onTransformChange,
}: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const sceneRef = useRef<THREE.Group | null>(null);

  const { centeredScene, scale } = useMemo(() => {
    const cloned = createSceneInstance(gltf);
    sceneRef.current = cloned;

    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    cloned.position.x -= center.x;
    cloned.position.y -= center.y;
    cloned.position.z -= center.z;

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 2.0;
    return {
      centeredScene: cloned,
      scale: (targetSize / maxDim) * displayScale,
    };
  }, [gltf, displayScale]);

  // Cleanup scene when component unmounts or gltf changes
  useEffect(() => {
    return () => {
      if (sceneRef.current) {
        // Dispose the cloned scene resources
        sceneRef.current.traverse((object) => {
          if ((object as THREE.Mesh).isMesh) {
            const mesh = object as THREE.Mesh;
            if (mesh.geometry) {
              mesh.geometry.dispose();
            }
            if (mesh.material) {
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((mat) => mat.dispose());
              } else {
                mesh.material.dispose();
              }
            }
          }
        });
        sceneRef.current = null;
      }
    };
  }, [gltf]);

  // Reset rotation to default angle when switching models
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.set(
        degToRad(initialRotation.x),
        degToRad(initialRotation.y),
        degToRad(initialRotation.z),
      );
    }
  }, [initialRotation, gltf]);

  useFrame((state, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group
      ref={groupRef}
      scale={scale}
      rotation={[
        degToRad(initialRotation.x),
        degToRad(initialRotation.y),
        degToRad(initialRotation.z),
      ]}
    >
      <primitive object={centeredScene} />
    </group>
  );
}
