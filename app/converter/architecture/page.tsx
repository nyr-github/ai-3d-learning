"use client";

import { ScenarioConverter } from "@/components/converter/ScenarioConverter";
import { CONVERSION_SCENARIOS } from "@/lib/converter/conversion-scenarios";

export default function ArchitectureConverterPage() {
  return <ScenarioConverter scenario={CONVERSION_SCENARIOS["architecture"]} />;
}
