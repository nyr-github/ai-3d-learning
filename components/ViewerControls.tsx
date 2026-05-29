"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import type { OrbitControls } from "three-stdlib";
import { RotateIcon, ResetIcon } from "@/components/icons";
import { Move, Maximize2, Minimize2, Star } from "lucide-react";

interface Props {
  autoRotate: boolean;
  onToggleRotate: () => void;
  onReset: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  isRedCarpetPlaying?: boolean;
  onTriggerRedCarpet?: () => void;
}

/** 3D Viewer Toolbar Component - Educational Demo Style */
export function ViewerToolbar({
  autoRotate,
  onToggleRotate,
  onReset,
  isFullscreen = false,
  onToggleFullscreen,
  isRedCarpetPlaying = false,
  onTriggerRedCarpet,
}: Props) {
  return (
    <div className="absolute hidden  top-4 right-4 z-10 sm:flex gap-2 bg-(--bg-card)/95 border border-(--border-primary) px-2 py-2 rounded-xl backdrop-blur-md shadow-lg sm:top-3 sm:right-3 sm:px-1.5 sm:py-1.5">
      {onToggleFullscreen && (
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-(--bg-card) text-(--ink-secondary) border border-(--border-primary) hover:border-(--border-accent) hover:bg-(--bg-hover) transition-all duration-200 sm:px-2.5 sm:py-1 sm:text-[11px]"
          onClick={onToggleFullscreen}
        >
          {isFullscreen ? (
            <Minimize2 className="w-3.5 h-3.5" />
          ) : (
            <Maximize2 className="w-3.5 h-3.5" />
          )}
          {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
        </button>
      )}
      <button
        type="button"
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border sm:px-2.5 sm:py-1 sm:text-[11px] ${
          autoRotate
            ? "bg-linear-to-r from-(--accent-primary) to-(--accent-secondary) text-white border-transparent shadow-md"
            : "bg-(--bg-card) text-(--ink-secondary) border-(--border-primary) hover:border-(--border-accent) hover:bg-(--bg-hover)"
        }`}
        onClick={onToggleRotate}
      >
        <RotateIcon />
        {autoRotate ? "Pause auto rotate" : "Enable auto rotate"}
      </button>
      <button
        type="button"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-(--bg-card) text-(--ink-secondary) border border-(--border-primary) hover:border-(--border-accent) hover:bg-(--bg-hover) transition-all duration-200 sm:px-2.5 sm:py-1 sm:text-[11px]"
        onClick={onReset}
      >
        <ResetIcon />
        Reset
      </button>
      <button
        type="button"
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border sm:px-2.5 sm:py-1 sm:text-[11px] ${
          isRedCarpetPlaying
            ? "bg-linear-to-r from-amber-500 to-orange-500 text-white border-transparent shadow-md"
            : "bg-(--bg-card) text-(--ink-secondary) border-(--border-primary) hover:border-(--border-accent) hover:bg-(--bg-hover)"
        }`}
        onClick={onTriggerRedCarpet}
        disabled={isRedCarpetPlaying}
      >
        <Star className="w-3.5 h-3.5" />
        {isRedCarpetPlaying ? "Playing..." : "Red Carpet"}
      </button>
    </div>
  );
}

/** 3D Viewer Heading Component - Educational Demo Style */
export function ViewerHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="absolute top-4 left-4 pointer-events-none max-w-[60%] sm:top-3 sm:left-3">
      <h2 className="text-3xl font-bold tracking-tight text-(--ink-primary) drop-shadow-lg sm:text-2xl">
        {title}
      </h2>
      <p className="mt-1 text-sm text-(--ink-muted) font-medium drop-shadow sm:text-xs">
        {subtitle}
      </p>
    </div>
  );
}

/** 3D Viewer Operation Tip Component - Educational Demo Style */
export function ViewerTip() {
  return (
    <p
      className="absolute right-4 bottom-4 z-5 pointer-events-none text-xs tracking-wide text-(--ink-muted) m-0 select-none inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-(--bg-card)/80 border border-(--border-secondary) rounded-lg backdrop-blur-sm sm:right-3 sm:text-[10px] sm:px-2 sm:py-1"
      aria-hidden="true"
    >
      <Move className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
      Drag to Rotate · Scroll to Zoom · Right-click to Pan
    </p>
  );
}

/** 3D Viewer Fun Fact Component - Educational Demo Style */
export function ViewerFunFact({ funFact }: { funFact: string | undefined }) {
  if (!funFact) return null;
  return (
    <div className="absolute hidden sm:block bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none  sm:max-w-[85%]">
      <div className="bg-linear-to-br from-blue-50/90 to-purple-50/90 border border-blue-200/60 px-4 py-3 rounded-2xl backdrop-blur-md shadow-lg sm:px-3 sm:py-2.5">
        <div className="flex items-start gap-2.5">
          <span className="text-2xl shrink-0 sm:text-xl">✨</span>
          <div>
            <h3 className="text-[11px] font-bold text-blue-700 uppercase tracking-wider mb-1">
              Did You Know?
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 font-medium sm:text-xs">
              {funFact}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Create View Control Hook */
export function useViewerControls() {
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
