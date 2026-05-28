import type { Project } from "@/data/types";
import { donatello } from "./char/donatello";
import { monkeyDLuffy } from "./char/monkey-d-luffy";
import { woodEnt } from "./char/wood-ent";
import { shadowStalker } from "./char/shadow-stalker";
import { smileyJoyRoot } from "./char/smiley-joy-root";

export const charProject: Project = {
  name: "Digital Avatars",
  slug: "char",
  icon: "👤",
  description:
    "Explore iconic anime characters, fantasy entities, and eldritch creatures in immersive 3D",
  tabName: "Char-Models",
  models: [donatello, monkeyDLuffy, woodEnt, shadowStalker, smileyJoyRoot],
};
