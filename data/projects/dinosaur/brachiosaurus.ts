import type { Entity3D } from "@/data/types";

export const brachiosaurus: Entity3D = {
  id: "brachiosaurus",
  name: "Brachiosaurus",
  subtitle: "Giant Sauropod · Jurassic Herbivore",
  mainCategory: "Dinosaurs",
  subCategory: "Sauropods",
  accent: "#8FBC8F",
  description:
    "Brachiosaurus was one of the tallest and largest dinosaurs ever discovered. Its distinctive long neck and front legs longer than its hind legs gave it a giraffe-like posture, allowing it to reach vegetation high in the treetops. Living during the Late Jurassic period (154-153 million years ago), this gentle giant roamed what is now North America and Africa.",
  attributes: [
    { name: "Body Length", unit: "m", min: 22, max: 26 },
    { name: "Height", unit: "m", min: 12, max: 16 },
    { name: "Weight", unit: "tonnes", min: 28, max: 58 },
    {
      name: "Geological Period",
      value: "Late Jurassic (154-153 million years ago)",
    },
    {
      name: "Fossil Locations",
      value: "Colorado, USA · Tanzania · Portugal",
    },
    {
      name: "Key Features",
      value: {
        "Elongated Neck": "Comprised of 12-14 vertebrae, enabled high browsing",
        "Front-Leg Dominance": "Front legs longer than hind legs, unique among sauropods",
        "Nostrils on Top": "High-set nostrils possibly for aquatic or high-altitude breathing",
      },
    },
    {
      name: "Diet",
      value: "High-browsing herbivore (conifers, ginkgos, cycads)",
    },
    {
      name: "Ecological Role",
      value: "Megaherbivore, ecosystem engineer, seed disperser",
    },
  ],
  funFact:
    "The name 'Brachiosaurus' means 'arm lizard' because its front legs were longer than its hind legs. Its heart may have weighed over 400 kg (880 lbs) to pump blood up that long neck!",
  teachingFocus:
    "Study the unique body proportions (front-heavy posture), neck vertebrae structure, and understand sauropod gigantism and high-browsing ecological niche.",
  tags: [
    "Sauropod",
    "Jurassic",
    "Herbivore",
    "Megafauna",
    "High Browser",
  ],
  model3D: {
    modelUrl: "/models/dinosaur/brachiosaurus.glb",
    imageUrl: "/models/dinosaur/brachiosaurus.webp",
    fileSize: 1552384,
    defaultRotation: { x: 0, y: 0, z: 0 },
    displayScale: 1.0,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of a Brachiosaurus dinosaur, scientific paleontological reconstruction style. Hyper-realistic rendering showing massive quadrupedal body with extremely long neck reaching upward, small head with high-set nostrils, and distinctive front legs longer than hind legs creating a giraffe-like sloping back. Green-brown scaly skin texture with subtle pattern. Late Jurassic vegetation environment context. Clean studio lighting on solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
    frontPrompt:
      "3D paleontological asset of a Brachiosaurus, frontal view showcasing the small narrow head with nostrils positioned on top, long neck extending vertically, and massive body supported by column-like legs. The front legs are visibly longer than the hind legs, creating the characteristic sloping posture. Detailed scaly skin texture with natural coloration, pure solid white background, professional scientific visualization, shadowless studio lighting, centered positioning, square aspect ratio --ar 1:1",
    backPrompt:
      "3D paleontological asset of a Brachiosaurus, dorsal view displaying the extremely long neck extending forward from the massive barrel-shaped body. The tail extends backward for balance. The back slopes downward from shoulders to hips due to longer front legs. Scaly skin texture with subtle osteoderm patterns visible. Green-brown coloration with natural sheen, clean scientific illustration style, pure solid white background, uniform laboratory lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
  },
};
