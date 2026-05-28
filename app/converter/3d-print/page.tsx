"use client";

import { ScenarioConverter } from "@/components/converter/ScenarioConverter";
import { CONVERSION_SCENARIOS } from "@/lib/converter/conversion-scenarios";

export default function Print3DConverterPage() {
  return <ScenarioConverter scenario={CONVERSION_SCENARIOS["3d-print"]} />;
}
