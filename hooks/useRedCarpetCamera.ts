import { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import gsap from "gsap";
import type { OrbitControls } from "three-stdlib";

interface UseRedCarpetCameraOptions {
  controlsRef: React.RefObject<OrbitControls | null>;
  camera: THREE.Camera | null;
  enabled: boolean;
  target?: THREE.Vector3;
  duration?: number;
  onComplete?: () => void;
  onAnimationSpeedChange?: (speed: number) => void;
}

interface UseRedCarpetCameraReturn {
  isPlaying: boolean;
  startAnimation: () => void;
  stopAnimation: () => void;
}

/**
 * Hollywood Red Carpet Camera Effect
 *
 * Implements a "fast-then-slow" camera path animation that mimics
 * the GlamBOT red carpet slow-motion rotation effect.
 *
 * Key features:
 * - CatmullRomCurve3 path for smooth camera movement
 * - GSAP power4.out easing for dramatic speed transition
 * - User interruptible via OrbitControls interaction
 * - Model animation speed control for time-stretching effect
 */
export function useRedCarpetCamera({
  controlsRef,
  camera,
  enabled,
  target = new THREE.Vector3(0, 0, 0),
  duration = 4,
  onComplete,
  onAnimationSpeedChange,
}: UseRedCarpetCameraOptions): UseRedCarpetCameraReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const progressRef = useRef({ value: 0 });

  // Define camera path: dramatic sweep around the model
  const cameraPath = useRef<THREE.CatmullRomCurve3 | null>(null);

  useEffect(() => {
    // Create a cinematic camera path
    cameraPath.current = new THREE.CatmullRomCurve3([
      new THREE.Vector3(3, 2, 3), // Start: upper-right (wide shot)
      new THREE.Vector3(-2.5, 1.5, 2), // Fast sweep to left side
      new THREE.Vector3(-1, 0.8, 2.8), // Begin deceleration
      new THREE.Vector3(0, 0.5, 2.5), // Slow: front medium shot
      new THREE.Vector3(0.8, 0.3, 1.8), // Very slow: right close-up
    ]);
  }, []);

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }
    setIsPlaying(false);
    onAnimationSpeedChange?.(1.0); // Restore normal animation speed
  }, [onAnimationSpeedChange]);

  const startAnimation = useCallback(() => {
    if (!enabled || !camera || !cameraPath.current) {
      return;
    }

    // Stop any existing animation first
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }

    // Reset progress
    progressRef.current.value = 0;

    // Disable controls during animation
    if (controlsRef.current) {
      controlsRef.current.enabled = false;
    }

    // Force set playing to true
    setIsPlaying(true);

    // Notify to slow down model animations
    onAnimationSpeedChange?.(0.05);

    // GSAP animation with power4.out easing (fast start, slow end)
    animationRef.current = gsap.to(progressRef.current, {
      value: 1,
      duration,
      ease: "power4.out",
      onUpdate: () => {
        if (!camera || !cameraPath.current) return;

        const progress = progressRef.current.value;

        // Get camera position on path
        const point = cameraPath.current.getPointAt(progress);
        camera.position.copy(point);

        // Camera always looks at target
        camera.lookAt(target);
      },
      onComplete: () => {
        // Reset playing state
        setIsPlaying(false);

        // Re-enable controls
        if (controlsRef.current) {
          controlsRef.current.enabled = true;
        }

        // Restore normal animation speed
        onAnimationSpeedChange?.(1.0);

        // Call completion callback
        onComplete?.();

        animationRef.current = null;
      },
    });
  }, [
    enabled,
    camera,
    controlsRef,
    target,
    duration,
    onComplete,
    onAnimationSpeedChange,
  ]);

  // Setup interrupt listener on OrbitControls
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const handleStart = () => {
      // User interaction detected - stop red carpet animation
      if (isPlaying) {
        stopAnimation();
      }
    };

    controls.addEventListener("start", handleStart);

    return () => {
      controls.removeEventListener("start", handleStart);
    };
  }, [controlsRef, isPlaying, stopAnimation]);

  // Auto-start when enabled changes to true
  useEffect(() => {
    if (enabled && camera && !isPlaying) {
      // Small delay to ensure everything is ready
      const timer = setTimeout(() => {
        startAnimation();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [enabled, camera, isPlaying, startAnimation]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  return {
    isPlaying,
    startAnimation,
    stopAnimation,
  };
}
