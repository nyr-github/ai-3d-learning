"use client";
import { useEffect, useMemo, useRef, useState } from "react";
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
  /** Whether to show skeleton helper */
  showSkeleton?: boolean;
  /** Callback to report current transform state */
  onTransformChange?: (transform: {
    rotationX: number;
    rotationY: number;
    rotationZ: number;
    scale: number;
  }) => void;
  /** Optional custom scene (for FBX and other non-GLTF formats) */
  customScene?: THREE.Group | THREE.Scene;
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
  showSkeleton = false,
  onTransformChange,
  customScene,
}: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const sceneRef = useRef<THREE.Group | null>(null);

  const { centeredScene, scale } = useMemo(() => {
    // Use customScene if provided (for FBX/OBJ), otherwise create from gltf
    const cloned = customScene
      ? (customScene.clone() as THREE.Group)
      : createSceneInstance(gltf);
    sceneRef.current = cloned;

    // Get model name for logging
    const modelName = customScene
      ? "custom-model"
      : gltf.parser.json.asset?.generator || "model";

    // For skinned models, calculate bounding box from visible meshes only
    // Exclude bones/skeleton which may have inflated bounding boxes
    let box: THREE.Box3;

    // Detect if model has skeleton by checking for SkinnedMesh
    let hasSkeleton = false;
    cloned.traverse((object: THREE.Object3D) => {
      if (object instanceof THREE.SkinnedMesh) {
        hasSkeleton = true;
      }
    });

    if (hasSkeleton) {
      // For skinned models, only include meshes in bounding box calculation
      box = new THREE.Box3();
      let hasMeshes = false;
      const meshSizes: string[] = [];

      cloned.traverse((object: THREE.Object3D) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.SkinnedMesh
        ) {
          // Update world matrix to ensure accurate bounding box
          object.updateWorldMatrix(true, false);

          const meshBox = new THREE.Box3().setFromObject(object);
          const meshSize = new THREE.Vector3();
          meshBox.getSize(meshSize);
          const meshMaxDim = Math.max(meshSize.x, meshSize.y, meshSize.z);

          // Also check geometry bounding box
          const geometry = object.geometry;
          let geometrySize = "N/A";
          if (geometry) {
            if (!geometry.boundingBox) {
              geometry.computeBoundingBox();
            }
            if (geometry.boundingBox) {
              const geoSize = new THREE.Vector3();
              geometry.boundingBox.getSize(geoSize);
              const geoMaxDim = Math.max(geoSize.x, geoSize.y, geoSize.z);
              geometrySize = geoMaxDim.toFixed(2);
            }
          }

          meshSizes.push(
            `${object.name || "unnamed"}: mesh=${meshMaxDim.toFixed(2)}, geo=${geometrySize}, type=${object instanceof THREE.SkinnedMesh ? "SkinnedMesh" : "Mesh"}`,
          );

          if (!hasMeshes) {
            box.copy(meshBox);
            hasMeshes = true;
          } else {
            box.union(meshBox);
          }
        }
      });

      console.log(
        `[ModelScene] Mesh sizes for ${modelName}:`,
        meshSizes,
      );

      // Fallback to full bounding box if no meshes found
      if (!hasMeshes) {
        console.warn(
          `[ModelScene] No meshes found for skinned model, using full bounding box`,
        );
        box = new THREE.Box3().setFromObject(cloned);
      }
    } else {
      // For non-skinned models, use standard bounding box
      box = new THREE.Box3().setFromObject(cloned);
    }

    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    cloned.position.x -= center.x;
    cloned.position.y -= center.y;
    cloned.position.z -= center.z;

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const targetSize = 2.0;

    // Calculate base scale to normalize model to target size
    const baseScale = targetSize / maxDim;

    // Apply displayScale as a multiplier on top of normalization
    // This allows fine-tuning the final display size
    const finalScale = baseScale * displayScale;

    console.log(
      `[ModelScene] ${modelName}:`,
    );
    console.log(`  ├─ hasSkeleton: ${hasSkeleton}`);
    console.log(`  ├─ originalSize: ${maxDim.toFixed(2)}`);
    console.log(`  ├─ baseScale: ${baseScale.toFixed(4)}`);
    console.log(`  ├─ displayScale: ${displayScale}`);
    console.log(`  └─ finalScale: ${finalScale.toFixed(4)}`);
    console.log("");

    return {
      centeredScene: cloned,
      scale: finalScale,
    };
  }, [customScene, gltf, displayScale]);

  // Cleanup scene when component unmounts or gltf/customScene changes
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
  }, [gltf, customScene]);

  // Reset rotation to default angle when switching models
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.set(
        degToRad(initialRotation.x),
        degToRad(initialRotation.y),
        degToRad(initialRotation.z),
      );
    }
  }, [initialRotation, gltf, customScene]);

  useFrame((state, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  // Create skeleton helper with useEffect to ensure bones are bound
  const [skeletonHelper, setSkeletonHelper] =
    useState<THREE.SkeletonHelper | null>(null);

  useEffect(() => {
    if (!showSkeleton || !centeredScene) {
      setSkeletonHelper(null);
      return;
    }

    // 延迟创建，确保骨骼已绑定
    const timer = setTimeout(() => {
      const helper = new THREE.SkeletonHelper(centeredScene);

      console.log("[SkeletonHelper] Creating with centeredScene:", {
        centeredSceneChildren: centeredScene.children.length,
        hasSkeleton: centeredScene.children.some(
          (child: THREE.Object3D) => child instanceof THREE.SkinnedMesh,
        ),
      });

      // 找到 SkinnedMesh 并打印骨骼信息
      centeredScene.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.SkinnedMesh) {
          console.log("[SkeletonHelper] Found SkinnedMesh:", {
            name: child.name,
            hasSkeleton: !!child.skeleton,
            boneCount: child.skeleton?.bones.length || 0,
          });
        }
      });

      setSkeletonHelper(helper);
    }, 100); // 延迟 100ms 确保渲染完成

    return () => clearTimeout(timer);
  }, [showSkeleton, centeredScene]);

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
      {skeletonHelper && <primitive object={skeletonHelper} />}
    </group>
  );
}
