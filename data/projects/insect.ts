import { Project } from "../types";
import { ant } from "./insect/ant";
import { cicada } from "./insect/cicada";
import { dragonfly } from "./insect/dragonfly";
import { firefly } from "./insect/firefly";
import { grasshopper } from "./insect/grasshopper";
import { honeybee } from "./insect/honeybee";
import { ladybug } from "./insect/ladybug";
import { monarchButterfly } from "./insect/monarch-butterfly";
import { prayingMantis } from "./insect/praying-mantis";
import { rhinocerosBeetle } from "./insect/rhinoceros-beetle";

export const insectProject: Project = {
  name: "Micro-Monsters",
  slug: "insect",
  icon: "🪲",
  description:
    "Delve into the microscopic world of Arthropods. Explore hyper-realistic 3D digital specimens of world-famous insects, highlighting their complex compound eyes, intricate wing venation, and specialized mouthparts.",
  tabName: "Entomology-Models",
  models: [
    ant,
    cicada,
    dragonfly,
    firefly,
    grasshopper,
    honeybee,
    ladybug,
    monarchButterfly,
    prayingMantis,
    rhinocerosBeetle,
  ],
};
