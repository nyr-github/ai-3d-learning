"use client";

import React from "react";
import type { ConversionScenario } from "@/lib/converter/conversion-scenarios";

interface ScenarioInfoProps {
  scenario: ConversionScenario;
}

export function ScenarioInfo({ scenario }: ScenarioInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {/* 功能特性 */}
      <div className="bg-(--bg-card) border border-(--border-primary) rounded-xl p-6">
        <h4 className="text-lg font-semibold text-(--ink-primary) mb-4">
          Core Features
        </h4>
        <ul className="space-y-3">
          {scenario.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-(--accent-primary) mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm text-(--ink-secondary)">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 专业提示 */}
      <div className="bg-(--bg-card) border border-(--border-primary) rounded-xl p-6">
        <h4 className="text-lg font-semibold text-(--ink-primary) mb-4">
          Professional Tips
        </h4>
        <ul className="space-y-3">
          {scenario.tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
              <span className="text-sm text-(--ink-secondary)">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
