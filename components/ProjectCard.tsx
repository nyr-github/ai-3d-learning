import Link from "next/link";
import type { Project } from "@/data/types";
import Image from "next/image";

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

  // Get first 6 model thumbnails
  const thumbnails = project.models.slice(0, 6);

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

        {/* Model Thumbnails */}
        {thumbnails.length > 0 && (
          <div className="grid grid-cols-6 gap-1.5 pt-2">
            {thumbnails.map((model, index) => (
              <div
                key={model.id}
                className="relative aspect-square rounded-md overflow-hidden border border-(--border-secondary)/50 bg-(--bg-secondary)/30"
              >
                <Image
                  src={model.model3D.imageUrl}
                  alt={model.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 25vw, 10vw"
                />
                {index === 5 && project.models.length > 6 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      +{project.models.length - 6}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

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
