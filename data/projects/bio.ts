import type { Project } from "@/data/types";
import { plantCell } from "./bio/plant-cell";
import { animalCell } from "./bio/animal-cell";
import { bacterialCell } from "./bio/bacterial-cell";
import { whiteBloodCell } from "./bio/white-blood-cell";
import { neuron } from "./bio/neuron";
import { mitochondrion } from "./bio/mitochondrion";
import { chloroplast } from "./bio/chloroplast";
import { cellMembrane } from "./bio/cell-membrane";
import { dna } from "./bio/dna";
import { bacteriophage } from "./bio/bacteriophage";

export const bioProject: Project = {
  name: "Biological Entities",
  slug: "bio",
  icon: "🧬",
  description:
    "Explore cells, organelles, biomolecules, and viruses in interactive 3D",
  tabName: "Bio-Models",
  models: [
    plantCell,
    animalCell,
    bacterialCell,
    whiteBloodCell,
    neuron,
    mitochondrion,
    chloroplast,
    cellMembrane,
    dna,
    bacteriophage,
  ],
};
