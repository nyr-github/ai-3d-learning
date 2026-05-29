"use client";

import React from "react";
import Link from "next/link";

interface ScenarioCard {
  href: string;
  icon: React.ReactNode;
  title: string;
  formats: string;
  description: string;
}

const scenarios: ScenarioCard[] = [
  {
    href: "/converter/game-dev",
    icon: (
      <svg
        className="w-8 h-8 text-(--accent-primary)"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Game Development",
    formats: "OBJ/FBX → GLB",
    description:
      "Prepare models for game engines with extreme compression and cross-platform compatibility",
  },
  {
    href: "/converter/3d-print",
    icon: (
      <svg
        className="w-8 h-8 text-(--accent-primary)"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
    title: "3D Printing",
    formats: "Any Format → STL",
    description:
      "Convert to standard triangle mesh format recognized by 3D printers",
  },
  {
    href: "/converter/web-ar",
    icon: (
      <svg
        className="w-8 h-8 text-(--accent-primary)"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>
    ),
    title: "Web AR/VR",
    formats: "OBJ/FBX → GLB",
    description:
      "Optimized for web and AR/VR, the industry standard format for Web 3D",
  },
  {
    href: "/converter/gis-pointcloud",
    icon: (
      <svg
        className="w-8 h-8 text-(--accent-primary)"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Point Cloud Data",
    formats: "PLY → GLB",
    description:
      "LiDAR point cloud converted to 3D models for web visualization",
  },
  {
    href: "/converter/architecture",
    icon: (
      <svg
        className="w-8 h-8 text-(--accent-primary)"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
    title: "Architecture Drawings",
    formats: "DXF → GLB",
    description:
      "CAD architectural drawings 3D-ified for web display and review",
  },
];

export function ScenarioCards() {
  return (
    <section className="space-y-6">
      <h3 className="text-2xl font-bold text-(--ink-primary) text-center">
        Specialized Conversion Scenarios
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {scenarios.map((scenario) => (
          <Link
            key={scenario.href}
            href={scenario.href}
            className="
              bg-(--bg-card) border border-(--border-primary) rounded-xl p-6
              hover:border-(--accent-primary) hover:shadow-lg
              transition-all duration-300 group
            "
          >
            <div className="flex items-center gap-3 mb-3">
              {scenario.icon}
              <h4 className="text-lg font-semibold text-(--ink-primary) group-hover:text-(--accent-primary) transition-colors">
                {scenario.title}
              </h4>
            </div>
            <p className="text-sm text-(--accent-secondary) font-medium mb-2">
              {scenario.formats}
            </p>
            <p className="text-xs text-(--ink-muted) leading-relaxed">
              {scenario.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
