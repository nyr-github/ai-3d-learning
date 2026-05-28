"use client";

import { ScenarioConverter } from "@/components/converter/ScenarioConverter";
import { CONVERSION_SCENARIOS } from "@/lib/converter/conversion-scenarios";

export default function GameDevConverterPage() {
  return <ScenarioConverter scenario={CONVERSION_SCENARIOS["game-dev"]} />;
}
