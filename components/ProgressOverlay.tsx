import type { LoadPhase } from "@/lib/modelLoader";
import { CellRingIcon } from "@/components/icons";
import { Loader2, AlertCircle } from "lucide-react";

// Display text for loading phase
const STATUS_TEXT: Record<LoadPhase, string> = {
  idle: "Preparing...",
  downloading: "Downloading model...",
  parsing: "Parsing model...",
  completed: "Load complete",
  failed: "Load failed",
};

interface Props {
  progress: number;
  phase: LoadPhase;
  modelName: string;
  error?: unknown;
}

export function ProgressOverlay({ progress, phase, modelName, error }: Props) {
  const percent = Math.round(progress * 100);
  return (
    <div
      className="absolute inset-0 grid place-items-center bg-(--bg-primary)/90 backdrop-blur-md z-10"
      role="status"
      aria-live="polite"
    >
      <div className="w-[min(420px,90%)] px-8 py-8 text-center">
        <div className="grid place-items-center mb-4" aria-hidden="true">
          <div className="relative">
            <div className="rounded-full bg-linear-to-br from-(--accent-light) to-(--bg-secondary) border-2 border-(--accent-primary)/30 grid place-items-center">
              <CellRingIcon />
            </div>
            {phase === "downloading" && (
              <div className="absolute -inset-2 border-2 border-(--accent-primary)/20 border-t-(--accent-primary) rounded-full animate-spin"></div>
            )}
          </div>
        </div>
        <div className="text-lg font-semibold text-(--ink-primary) mb-1">
          Preparing 3D Model
        </div>
        <div className="text-xl text-(--ink-muted) mb-4">
          <strong className="text-(--accent-primary) font-semibold">
            {modelName}
          </strong>
        </div>

        <div className="w-full h-2.5 bg-(--bg-secondary) rounded-full overflow-hidden border border-(--border-secondary) mb-3">
          <div
            className="h-full bg-linear-to-r from-(--accent-primary) to-(--accent-secondary) rounded-full transition-all duration-300 ease-out relative overflow-hidden"
            style={{ width: `${Math.max(2, percent)}%` }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-2xl font-bold text-(--ink-primary)">
            {percent}%
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-(--bg-secondary) rounded-lg text-xs text-(--ink-muted) border border-(--border-secondary)">
            {phase === "downloading" && (
              <Loader2 className="w-3 h-3 animate-spin" />
            )}
            {STATUS_TEXT[phase]}
          </span>
        </div>

        {phase === "failed" && (
          <div className="mt-4 p-3 bg-(--error-light) border border-(--error)/30 rounded-lg">
            <div className="flex items-center gap-2 text-(--error) text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span className="font-medium">
                {(error as Error | undefined)?.message ??
                  "Please refresh the page and try again."}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
