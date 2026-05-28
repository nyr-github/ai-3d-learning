"use client";
import { useState } from "react";
import type { Entity3D, Project } from "@/data/types";
import { EntityItem } from "@/components/EntityItem";
import { List, ChevronRight } from "lucide-react";

interface Props {
  // entities: Entity3D[];
  activeId: string;
  project: Project;
  onSelect: (id: string) => void;
}

export function EntitySidebar({ project, activeId, onSelect }: Props) {
  const [expandedCategory, setExpandedCategory] = useState<string>(
    project.models[0]?.mainCategory || "",
  );

  // Get all main categories
  const mainCategories = Array.from(
    new Set(project.models.map((e) => e.mainCategory)),
  );

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? "" : category);
  };

  return (
    <aside className="flex flex-col gap-3 h-full">
      <div className="flex-1 flex flex-col gap-2">
        <header className="hidden md:flex items-center gap-2 px-4 py-3 border-b border-(--border-secondary) bg-linear-to-r from-(--bg-secondary) to-(--bg-card)">
          <List className="w-4 h-4 text-(--accent-primary)" />
          <h2 className="text-sm font-semibold text-(--ink-primary) uppercase tracking-wider">
            {project.tabName}
          </h2>
          <span className="ml-auto text-xs font-(--font-mono) text-(--ink-muted) bg-(--bg-secondary) px-2 py-0.5 rounded">
            {project.models.length}
          </span>
        </header>
        <div className="flex-1 overflow-y-auto px-3">
          {mainCategories.map((category) => {
            const categoryEntities = project.models.filter(
              (e) => e.mainCategory === category,
            );
            const isExpanded = expandedCategory === category;

            return (
              <div key={category} className="mb-2 last:mb-0">
                <button
                  type="button"
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-(--bg-secondary) hover:bg-(--bg-hover) border border-(--border-primary) hover:border-(--border-accent) transition-all duration-200 group"
                  onClick={() => toggleCategory(category)}
                >
                  <ChevronRight
                    className={`w-4 h-4 text-(--ink-muted) transition-transform duration-200 ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                  />
                  <span className="flex-1 text-left text-xs font-semibold text-(--ink-primary) group-hover:text-(--accent-primary) transition-colors">
                    {category}
                  </span>
                  <span className="text-[10px] font-(--font-mono) text-(--ink-muted) bg-(--bg-card) px-1.5 py-0.5 rounded">
                    {categoryEntities.length}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isExpanded ? "max-h-200 mt-2" : "max-h-0"
                  }`}
                >
                  <ul className="list-none m-0 p-0 flex flex-col gap-2">
                    {categoryEntities.map((entity) => (
                      <EntityItem
                        key={entity.id}
                        entity={entity}
                        active={entity.id === activeId}
                        onSelect={() => onSelect(entity.id)}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
