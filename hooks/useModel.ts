"use client";
import { useEffect, useReducer } from "react";
import {
  getCachedTask,
  initiateModelLoad,
  onCacheChange,
  type ModelLoadTask,
  type LoadPhase,
} from "../lib/modelLoader";

export interface UseModelState {
  phase: LoadPhase;
  progress: number;
  task?: ModelLoadTask;
}

interface Options {
  /** Whether to immediately start download when entry doesn't exist (default true) */
  autoStart?: boolean;
  fileSize: number;
}

/**
 * Subscribe to a model's loading status.
 * - When autoStart=true, immediately triggers download if not yet started.
 * - When autoStart=false, only observes download progress initiated externally (e.g., App orchestration).
 */
export function useModel(url: string, opts: Options): UseModelState {
  const { autoStart = true, fileSize } = opts;
  const [, forceUpdate] = useReducer((n: number) => n + 1, 0);

  // When the observed target doesn't exist yet, subscribe to cache growth events, then switch to task's local subscription after it's created.
  useEffect(() => {
    let unsubCache: (() => void) | null = null;
    let unsubTask: (() => void) | null = null;

    const attach = () => {
      const task = getCachedTask(url);
      if (!task) return false;
      if (unsubCache) {
        unsubCache();
        unsubCache = null;
      }
      const listener = () => forceUpdate();
      task.stateChangeCallbacks.add(listener);
      unsubTask = () => task.stateChangeCallbacks.delete(listener);
      return true;
    };

    if (autoStart) {
      initiateModelLoad(url, { fileSize });
    }

    if (!attach()) {
      unsubCache = onCacheChange(() => {
        if (attach()) {
          forceUpdate();
        }
      });
    }

    return () => {
      unsubCache?.();
      unsubTask?.();
    };
  }, [url, fileSize, autoStart]);

  const task = getCachedTask(url);
  if (!task) {
    return { phase: "idle", progress: 0 };
  }
  return { phase: task.phase, progress: task.progress, task };
}
