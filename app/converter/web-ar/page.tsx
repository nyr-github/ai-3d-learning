"use client";

import { ScenarioConverter } from "@/components/converter/ScenarioConverter";
import { CONVERSION_SCENARIOS } from "@/lib/converter/conversion-scenarios";

export default function WebARConverterPage() {
  return <ScenarioConverter scenario={CONVERSION_SCENARIOS["web-ar"]} />;
}
