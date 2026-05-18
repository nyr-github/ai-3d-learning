import { getProjectBySlug, projects } from "@/data";
// import { ProjectClient } from "./ProjectClient";
import { use } from "react";
import { ProjectClient } from "@/app/project/[slug]/ProjectClient";

// Generate static params for static export
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Use React.use() to access Promise-type params
  const { slug } = use(params);

  // Get project by slug
  const project = getProjectBySlug(slug);

  if (!project) {
    return null; // Or redirect to home page
  }

  return <ProjectClient project={project} />;
}
