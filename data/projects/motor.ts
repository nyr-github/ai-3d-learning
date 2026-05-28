import type { Project } from "@/data/types";
import { zx820rrRs } from "./motor/zx-820rr-rs";

export const motorcycleProject: Project = {
  name: "Race Motorcycles",
  slug: "moto",
  icon: "🏍️",
  description:
    "Experience high-performance racing motorcycles and engineering aesthetics in interactive 3D",
  tabName: "Moto-Models",
  models: [zx820rrRs],
};
