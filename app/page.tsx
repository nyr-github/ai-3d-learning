import Link from "next/link";
import { Header, Footer } from "@/components/Layout";
import { ProjectCard } from "@/components/ProjectCard";
import { projects, getAllEntities } from "@/data";
import { ArrowRight, Database, Microscope, Atom, Grid3x3 } from "lucide-react";

export default async function Home() {
  return (
    <div className="px-4 pb-2 gap-3 container w-full mx-auto overflow-hidden sm:px-3  sm:gap-2">
      <Header />
      <main className="px-4 py-10 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4 py-4 md:py-20">
          <h2 className="text-4xl md:text-5xl font-bold text-(--ink-primary) tracking-tight">
            Explore Science in
            <span className="inline-block mx-2 bg-linear-to-r from-(--accent-primary) to-(--accent-secondary) bg-clip-text text-transparent">
              3D
            </span>
          </h2>
          <p className="text-base text-(--ink-secondary) max-w-2xl mx-auto leading-relaxed">
            Discover the beauty of biological entities, chemical molecules, and
            physical structures through interactive 3D models. Perfect for
            classroom teaching and self-study.
          </p>
        </section>

        {/* Project Categories */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="space-y-6">
          <h3 className="text-2xl font-bold text-(--ink-primary) text-center">
            Platform Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-(--bg-card) border border-(--border-primary) rounded-xl p-5 space-y-2.5">
              <div className="flex  items-center justify-start gap-2.5">
                <Microscope className="w-6 h-6 text-(--accent-primary)" />
                <h4 className="text-base font-semibold text-(--ink-primary)">
                  Interactive 3D Viewing
                </h4>
              </div>
              <p className="text-xs text-(--ink-muted) leading-relaxed">
                Rotate, zoom, and explore every detail of complex structures in
                real-time 3D.
              </p>
            </div>

            <div className="bg-(--bg-card) border border-(--border-primary) rounded-xl p-5 space-y-2.5">
              <div className="flex  items-center justify-start gap-2.5">
                <Database className="w-6 h-6 text-(--accent-primary)" />
                <h4 className="text-base font-semibold text-(--ink-primary)">
                  Smart Loading
                </h4>
              </div>
              <p className="text-xs text-(--ink-muted) leading-relaxed">
                Models are intelligently cached and preloaded for instant access
                without waiting.
              </p>
            </div>

            <div className="bg-(--bg-card) border border-(--border-primary) rounded-xl p-5 space-y-2.5">
              <div className="flex  items-center justify-start gap-2.5">
                <Atom className="w-6 h-6 text-(--accent-primary)" />
                <h4 className="text-base font-semibold text-(--ink-primary)">
                  Multi-Discipline Support
                </h4>
              </div>
              <p className="text-xs text-(--ink-muted) leading-relaxed">
                Biology, chemistry, physics - all in one unified platform with
                extensible architecture.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
