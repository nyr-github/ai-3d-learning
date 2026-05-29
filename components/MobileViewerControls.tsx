"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import type { OrbitControls } from "three-stdlib";
import { RotateIcon, ResetIcon } from "@/components/icons";
import {
  Move,
  Maximize2,
  Minimize2,
  Menu,
  Info,
  Component,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

interface MobileViewerControlsProps {
  autoRotate: boolean;
  onToggleRotate: () => void;
  onReset: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  onOpenSidebar: () => void;
  onOpenInfoPanel: () => void;
  isRedCarpetPlaying?: boolean;
  onTriggerRedCarpet?: () => void;
}

/** Mobile Viewer Controls Component */
export function MobileViewerControls({
  autoRotate,
  onToggleRotate,
  onReset,
  isFullscreen = false,
  onToggleFullscreen,
  onOpenSidebar,
  onOpenInfoPanel,
  isRedCarpetPlaying = false,
  onTriggerRedCarpet,
}: MobileViewerControlsProps) {
  return (
    <div className="flex items-center justify-between gap-2 mb-2">
      {/* Sidebar toggle button */}
      <Button
        variant="outline"
        size="icon"
        onClick={onOpenSidebar}
        aria-label="Open model selection"
      >
        <Component className="w-5 h-5" />
      </Button>
      <ButtonGroup>
        {/* Fullscreen toggle button */}
        {onToggleFullscreen && (
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            className="gap-1.5"
          >
            {isFullscreen ? (
              <>
                <span className="text-xs">Exit Fullscreen</span>
              </>
            ) : (
              <>
                <span className="text-xs">Fullscreen</span>
              </>
            )}
          </Button>
        )}

        {/* Auto rotate toggle button */}
        <Button
          variant={autoRotate ? "default" : "outline"}
          size="sm"
          onClick={onToggleRotate}
          aria-label={autoRotate ? "Pause auto rotate" : "Enable auto rotate"}
          className="gap-1.5"
        >
          <span className="text-xs">Auto Rotate</span>
        </Button>

        {/* Red carpet button */}
        <Button
          variant={isRedCarpetPlaying ? "default" : "outline"}
          size="sm"
          onClick={onTriggerRedCarpet}
          disabled={isRedCarpetPlaying}
          aria-label="Trigger red carpet effect"
          className={`gap-1.5 ${
            isRedCarpetPlaying
              ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              : ""
          }`}
        >
          <Star className="w-3.5 h-3.5" />
          <span className="text-xs">
            {isRedCarpetPlaying ? "Playing..." : "Red Carpet"}
          </span>
        </Button>

        {/* Reset button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          aria-label="Reset view"
          className="gap-1.5"
        >
          <span className="text-xs">Reset</span>
        </Button>
      </ButtonGroup>

      {/* Info panel toggle button */}
      <Button
        variant="outline"
        size="icon"
        onClick={onOpenInfoPanel}
        aria-label="Open detail panel"
      >
        <Info className="w-5 h-5" />
      </Button>
    </div>
  );
}

/** Create View Control Hook for Mobile */
export function useMobileViewerControls() {
  const controlsRef = useRef<OrbitControls | null>(null);
  const [autoRotate, setAutoRotate] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Expose controlsRef for use in other components
  const getControlsRef = () => controlsRef;

  const handleReset = () => {
    const controls = controlsRef.current;
    if (!controls) return;
    controls.target.set(0, 0, 0);
    controls.object.position.set(0, 0, 4.4);
    controls.update();
  };

  const handleToggleRotate = () => {
    setAutoRotate((v) => !v);
  };

  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      if (containerRef.current) {
        containerRef.current
          .requestFullscreen()
          .then(() => setIsFullscreen(true))
          .catch((err) => {
            console.error("Error attempting to enable fullscreen:", err);
          });
      }
    } else {
      // Exit fullscreen
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch((err) => {
          console.error("Error attempting to exit fullscreen:", err);
        });
    }
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return {
    controlsRef,
    containerRef,
    autoRotate,
    isFullscreen,
    handleReset,
    handleToggleRotate,
    handleToggleFullscreen,
    getControlsRef,
  };
}
