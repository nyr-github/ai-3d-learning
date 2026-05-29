import { Project } from "../types";
import { plumedBasilisk } from "./lizard/plumed-basilisk";
import { centralBeardedDragon } from "./lizard/central-bearded-dragon";
import { frilledLizard } from "./lizard/frilled-lizard";
import { greenIguana } from "./lizard/green-iguana";
import { komodoDragon } from "./lizard/komodo-dragon";

export const lizardProject: Project = {
  name: "The Lizard Chronicles",
  slug: "lizard",
  icon: "🦎",
  description:
    "Explore the diverse world of Squamata: from apex predators like the Komodo Dragon to the defensive masters like the Frilled Lizard in interactive 3D.",
  tabName: "Saurian-Models",
  models: [
    plumedBasilisk,
    centralBeardedDragon,
    frilledLizard,
    greenIguana,
    komodoDragon,
  ],
};
