import Link from "next/link";
import type { Project } from "@/data/types";

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  // Get unique main categories with counts
  const categories = Array.from(
    new Set(project.models.map((e) => e.mainCategory)),
  ).map((category) => ({
    name: category,
    count: project.models.filter((e) => e.mainCategory === category).length,
  }));

  return (
    <Link
      href={`/project/${project.slug}`}
      className="group relative bg-linear-to-br from-(--bg-card) to-(--bg-secondary) border border-(--border-primary) rounded-xl p-5 hover:border-(--border-accent) hover:shadow-lg transition-all duration-300"
    >
      <div className="space-y-3">
        {/* Header */}
        <div>
          <h4 className="text-xl font-bold text-(--ink-primary) group-hover:text-(--accent-primary) transition-colors">
            {project.icon} {project.name}
          </h4>
          <p className="text-xs text-(--ink-muted) mt-1.5 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2 pt-3 border-t border-(--border-secondary)/50">
          <span className="text-xs font-mono text-(--ink-muted) bg-(--bg-secondary) px-2.5 py-0.5 rounded-full">
            {project.models.length} models
          </span>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {categories.map(({ name, count }) => (
              <span
                key={name}
                className="text-[10px] px-2 py-0.5 bg-(--bg-secondary)/60 rounded text-(--ink-muted) border border-(--border-secondary)/50"
              >
                {name} ({count})
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
