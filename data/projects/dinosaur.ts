import { Project } from "../types";
import { brachiosaurus } from "./dinosaur/brachiosaurus";
import { triceratops } from "./dinosaur/triceratops";
import { tyrannosaurusRex } from "./dinosaur/tyrannosaurus-rex";
import { velociraptor } from "./dinosaur/velociraptor";

export const dinosaurProject: Project = {
  name: "Mesozoic Legends",
  slug: "dinosaur",
  icon: "🦖",
  description:
    "Journey back to the Mesozoic Era with scientifically accurate, high-fidelity 3D dinosaur models. Examine the apex predators and massive herbivores of the prehistoric world, optimized for individual scale appreciation and texture analysis.",
  tabName: "Paleo-Models",
  models: [brachiosaurus, triceratops, tyrannosaurusRex, velociraptor],
};
