"use client";
import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function RotatingLogo() {
  const meshRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isCenteredRef = useRef(false);

  // Load GLB model
  const { scene } = useGLTF("/icon.glb");

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Center the model only once after first render
      if (!isCenteredRef.current) {
        const box = new THREE.Box3().setFromObject(meshRef.current);
        const center = box.getCenter(new THREE.Vector3());
        meshRef.current.position.sub(center);
        isCenteredRef.current = true;
      }

      if (!isHovered) {
        // Auto rotate when not being interacted with
        meshRef.current.rotation.y += delta * 0.5;
      }
    }
  });

  // Clone the loaded scene to avoid conflicts
  const clonedScene = scene.clone(true);

  return (
    <group
      ref={meshRef}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <primitive object={clonedScene} />
    </group>
  );
}

export function Brand3DLogo() {
  return (
    <div
      className="w-14 h-14 cursor-grab active:cursor-grabbing"
      style={{ touchAction: "none" }}
    >
      <Canvas
        camera={{ position: [0, 0, 2], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} />
        <RotatingLogo />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
