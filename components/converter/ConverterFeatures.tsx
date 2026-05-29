"use client";

import React from "react";

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    icon: (
      <svg
        className="w-6 h-6 text-(--accent-primary)"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    title: "Privacy Protected",
    description:
      "All conversions are done locally in your browser, files are never uploaded to servers.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-(--accent-primary)"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Instant Conversion",
    description:
      "Leverage your browser's powerful performance to quickly complete format conversions without waiting.",
  },
  {
    icon: (
      <svg
        className="w-6 h-6 text-(--accent-primary)"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
        />
      </svg>
    ),
    title: "Completely Free",
    description:
      "No registration, no payment, use it anywhere anytime, with no usage limits.",
  },
];

export function ConverterFeatures() {
  return (
    <section className="space-y-6">
      <h3 className="text-2xl font-bold text-(--ink-primary) text-center">
        Why Choose Our Converter?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-(--bg-card) border border-(--border-primary) rounded-xl p-5 space-y-2.5"
          >
            <div className="flex items-center gap-2.5">
              {feature.icon}
              <h4 className="text-base font-semibold text-(--ink-primary)">
                {feature.title}
              </h4>
            </div>
            <p className="text-xs text-(--ink-muted) leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
