import type { Entity3D } from "@/data/types";
import { useModel } from "@/hooks/useModel";
import { CheckIcon } from "@/components/icons";
import { Clock } from "lucide-react";

interface Props {
  entity: Entity3D;
  active: boolean;
  onSelect: () => void;
}

export function EntityItem({ entity, active, onSelect }: Props) {
  const { phase, progress } = useModel(entity.model3D.modelUrl, {
    autoStart: false,
    fileSize: entity.model3D.fileSize,
  });

  const downloaded = phase === "completed";
  const downloading = phase === "downloading" || phase === "parsing";
  const queued = phase === "idle";
  const percent = Math.round(progress * 100);

  return (
    <li>
      <button
        type="button"
        className={`w-full flex  gap-3 px-3 py-2.5 rounded-lg border transition-all duration-200 text-left group hover:shadow-md ${
          active
            ? " border-(--accent-primary) shadow-xs "
            : "bg-(--bg-card) border-(--border-primary) hover:border-(--border-accent) hover:bg-(--bg-hover)"
        }`}
        onClick={onSelect}
        style={{ "--accent": entity.accent } as React.CSSProperties}
      >
        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-(--bg-secondary) border border-(--border-primary) group-hover:border-(--border-accent) transition-colors">
          <img
            src={entity.model3D.imageUrl}
            alt={entity.name}
            loading="lazy"
            className="w-full h-full object-cover block"
          />
          {active && (
            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"></div>
          )}
        </div>
        <div className="min-w-0 flex flex-col justify-center">
          <div className="text-sm font-semibold text-(--ink-primary) group-hover:text-(--accent-primary) transition-colors truncate">
            {entity.name}
          </div>
          <div className="text-xs text-(--ink-muted) mt-0.5 truncate">
            {entity.subCategory}
          </div>
        </div>
      </button>
    </li>
  );
}
