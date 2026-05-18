"use client";
import type { Entity3D, Attribute } from "@/data/types";
import { InfoCard } from "@/components/InfoCard";
import { Eye, EyeOff, FlaskConical, RotateCcw } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface Props {
  entity: Entity3D;
  onRotateReset?: () => void;
  onScaleChange?: (scale: number) => void;
}

// Collapsible section component

// Range Attribute Renderer (with min/max)
function RangeAttributeRenderer({
  name,
  min,
  max,
  unit,
}: {
  name: string;
  min: number;
  max: number;
  unit?: string;
}) {
  return (
    <div className="p-2.5 bg-(--bg-secondary)/30 border border-(--border-secondary)/40 rounded-lg">
      <div className="text-[10px] font-medium text-(--ink-muted) uppercase tracking-wider mb-2">
        {name}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-end gap-2">
          <span className="text-xs text-(--ink-primary) font-mono font-semibold">
            {min} – {max}
          </span>
          {unit && <span className="text-xs text-(--ink-muted)">{unit}</span>}
        </div>
        <Slider
          value={[min, max]}
          min={0}
          max={Math.ceil(max * 1.2)}
          step={min >= 1 ? 1 : 0.1}
          disabled
          // className="opacity-75"
        />
      </div>
    </div>
  );
}

// Array Attribute Renderer (string or number arrays)
function ArrayAttributeRenderer({
  name,
  value,
}: {
  name: string;
  value: string[] | number[];
}) {
  return (
    <div className="p-2.5 bg-(--bg-secondary)/30 border border-(--border-secondary)/40 rounded-lg">
      <div className="text-[10px] font-medium text-(--ink-muted) uppercase tracking-wider mb-2">
        {name}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {value.map((item, idx) =>
          typeof item === "string" ? (
            <span
              key={idx}
              className="px-2 py-0.5 text-[10px] bg-(--accent)/10 text-accent border border-(--accent)/30 rounded-full"
            >
              {item}
            </span>
          ) : (
            <span
              key={idx}
              className="px-2 py-0.5 text-[10px] font-mono bg-(--bg-secondary) text-(--ink-primary) border border-(--border-secondary) rounded"
            >
              {item}
            </span>
          ),
        )}
      </div>
    </div>
  );
}

// Dictionary Attribute Renderer (object values)
function DictionaryAttributeRenderer({
  name,
  value,
}: {
  name: string;
  value: Record<string, string>;
}) {
  return (
    <div className="p-2.5 bg-(--bg-secondary)/30 border border-(--border-secondary)/40 rounded-lg">
      <div className="text-[10px] font-medium text-(--ink-muted) uppercase tracking-wider mb-2">
        {name}
      </div>
      <div className="space-y-2">
        {Object.entries(value).map(([key, val]) => {
          const isShort = val.length <= 10;
          return (
            <div key={key}>
              {isShort ? (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-medium text-(--ink-muted) uppercase tracking-wider">
                    {key}
                  </span>
                  <p className="text-xs text-(--ink-secondary) leading-relaxed">
                    {val}
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <span className="text-[10px] font-medium text-(--ink-muted) uppercase tracking-wider">
                    {key}
                  </span>
                  <p className="text-xs text-(--ink-secondary) leading-relaxed">
                    {val}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Simple Attribute Renderer (string or number values)
function SimpleAttributeRenderer({
  name,
  value,
  unit,
}: {
  name: string;
  value: string | number;
  unit?: string;
}) {
  const isShortValue =
    typeof value === "number" ||
    (typeof value === "string" && value.length <= 10);

  return (
    <div className="p-2.5 bg-(--bg-secondary)/30 border border-(--border-secondary)/40 rounded-lg">
      {isShortValue ? (
        <div className="flex items-center justify-between gap-2">
          <div className="text-[10px] font-medium text-(--ink-muted) uppercase tracking-wider">
            {name}
          </div>
          {typeof value === "string" ? (
            (() => {
              const visibilityBadge = getVisibilityBadge(value);
              if (visibilityBadge) {
                return (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1.5 w-fit ${visibilityBadge.color}`}
                  >
                    {visibilityBadge.icon}
                    {visibilityBadge.text}
                  </span>
                );
              }
              return (
                <p className="text-xs text-(--ink-secondary) leading-relaxed">
                  {value}
                  {unit ? ` ${unit}` : ""}
                </p>
              );
            })()
          ) : (
            <p className="text-xs text-(--ink-primary) font-mono font-semibold">
              {value}
              {unit ? ` ${unit}` : ""}
            </p>
          )}
        </div>
      ) : (
        <>
          <div className="text-[10px] font-medium text-(--ink-muted) uppercase tracking-wider mb-2">
            {name}
          </div>
          {typeof value === "string" ? (
            <p className="text-xs text-(--ink-secondary) leading-relaxed">
              {value}
              {unit ? ` ${unit}` : ""}
            </p>
          ) : (
            <p className="text-xs text-(--ink-primary) font-mono font-semibold">
              {value}
              {unit ? ` ${unit}` : ""}
            </p>
          )}
        </>
      )}
    </div>
  );
}

// Generic Attribute Renderer - dispatches to specific renderers
function AttributeRenderer({ attribute }: { attribute: Attribute }) {
  const { value, unit, min, max, name } = attribute;

  // Range values (with min/max)
  if (min !== undefined && max !== undefined) {
    return (
      <RangeAttributeRenderer name={name} min={min} max={max} unit={unit} />
    );
  }

  // Array values (string or number)
  if (Array.isArray(value)) {
    return <ArrayAttributeRenderer name={name} value={value} />;
  }

  // Dictionary/object values
  if (typeof value === "object" && value !== null) {
    return (
      <DictionaryAttributeRenderer
        name={name}
        value={value as Record<string, string>}
      />
    );
  }

  // Simple string/number values
  if (typeof value === "string" || typeof value === "number") {
    return <SimpleAttributeRenderer name={name} value={value} unit={unit} />;
  }

  return null;
}

// Helper function for visibility badges
function getVisibilityBadge(status: string) {
  switch (status) {
    case "Visible":
      return {
        text: "Visible",
        color: "bg-(--success-light) text-(--success) border-(--success)/30",
        icon: <Eye className="w-3 h-3" />,
      };
    case "Staining Required":
      return {
        text: "Staining Required",
        color: "bg-orange-500/10 text-orange-600 border-orange-500/30",
        icon: <FlaskConical className="w-3 h-3" />,
      };
    case "Invisible":
      return {
        text: "Invisible",
        color: "bg-gray-500/10 text-gray-600 border-gray-500/30",
        icon: <EyeOff className="w-3 h-3" />,
      };
    default:
      return null;
  }
}

export function EntityInfoPanel({ entity, onRotateReset }: Props) {
  // Separate numeric attributes from other attributes
  const numericAttributes =
    entity.attributes?.filter(
      (attr) =>
        (attr.min !== undefined && attr.max !== undefined) ||
        typeof attr.value === "number",
    ) || [];

  const otherAttributes =
    entity.attributes?.filter(
      (attr) =>
        !(
          (attr.min !== undefined && attr.max !== undefined) ||
          typeof attr.value === "number"
        ),
    ) || [];

  return (
    <aside
      className="flex flex-col gap-3 h-full p-3"
      style={{ "--accent": entity.accent } as React.CSSProperties}
    >
      {/* Header Card */}
      <InfoCard className="">
        <header className="relative">
          <div className="flex justify-between items-start">
            <div className=" space-y-2">
              <span className="text-[10px] font-mono tracking-wider text-(--ink-muted) uppercase">
                {entity.subCategory}
              </span>
              <h2 className="text-2xl font-bold text-(--ink-primary) tracking-tight mt-1">
                {entity.name}
              </h2>
              <p className="text-xs text-(--ink-muted) italic mt-0.5">
                {entity.subtitle}
              </p>
            </div>
            <span
              className="px-2.5 py-1 text-xs font-medium rounded-full border shrink-0"
              style={{
                borderColor: `${entity.accent}40`,
                backgroundColor: `${entity.accent}10`,
                color: entity.accent,
              }}
            >
              {entity.mainCategory}
            </span>
          </div>
        </header>
        <p className="text-xs text-(--ink-secondary) leading-relaxed mb-2">
          {entity.description}
        </p>
        {entity.teachingFocus && (
          <p className="text-xs text-(--ink-secondary) leading-relaxed mb-2">
            {entity.teachingFocus}
          </p>
        )}

        {/* Tags - Displayed prominently */}
        {entity.tags && entity.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {entity.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[10px] bg-(--accent)/10 text-accent border border-(--accent)/30 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Numeric Attributes - Displayed directly */}
        {numericAttributes.length > 0 && (
          <div className="space-y-2 mt-3">
            {numericAttributes.map((attr) => (
              <AttributeRenderer attribute={attr} key={attr.name} />
            ))}
          </div>
        )}
        {otherAttributes.length > 0 && (
          <div className="space-y-2 mt-3">
            {otherAttributes.map((attr) => (
              <AttributeRenderer attribute={attr} key={attr.name} />
            ))}
          </div>
        )}
      </InfoCard>

      {/* Footer with 3D Controls */}
      {onRotateReset && (
        <div className="p-3 bg-(--bg-secondary)/60 border border-(--border-secondary) rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-(--ink-muted) font-mono">
              🔍 3D Viewer Sync
            </span>
            <button
              onClick={onRotateReset}
              className="px-3 py-1.5 bg-(--bg-card) hover:bg-(--bg-hover) text-(--ink-primary) rounded transition-colors border border-(--border-secondary) shadow-sm text-xs font-medium flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset View
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
