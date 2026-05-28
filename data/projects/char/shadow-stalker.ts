import type { Entity3D } from "@/data/types";

export const shadowStalker: Entity3D = {
  id: "shadow-stalker",
  name: "Shadow Stalker",
  subtitle: "Void Dweller · Eldritch Horror",
  mainCategory: "Creatures",
  subCategory: "Horror & Eldritch",
  accent: "#2c3e50",
  description:
    "A lean, terrifying entity from the shadow dimension. Characterized by its elongated limbs, needle-like claws, and a pitch-black muscular frame that seems to absorb light. It exists on the edge of human perception, moving silently through the dark.",
  attributes: [
    { name: "Hostility Level", value: "Extreme / Predatory" },
    { name: "Visibility", unit: "%", value: 5 },
    { name: "Origin", value: "The Abyssal Plane" },
    {
      name: "Abilities",
      value: {
        Movement: "Phasing through solid matter",
        Detection: "Detects fear/heartbeat at 500m",
        Attack: "Void corruption claws",
      },
    },
    { name: "Awards", value: ["Indie Horror Design - Scariest Entity 2025"] },
  ],
  funFact:
    "The Shadow Stalker has no eyes; it 'sees' by sensing the heat and vibrations emitted by living souls.",
  teachingFocus:
    "Explore sub-surface scattering on dark materials, muscle definition on lean humanoid figures, and horror-themed atmospheric lighting.",
  tags: [
    "Slenderman-style",
    "Shadow Monster",
    "Horror",
    "Eldritch",
    "Dark Anatomy",
  ],
  model3D: {
    modelUrl: "/models/char/break-news.glb",
    imageUrl: "/models/char/break-news.webp",
    fileSize: 1108648,
    defaultRotation: { x: 0, y: 45, z: 0 },
    displayScale: 1.3,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital mesh of a Shadow Stalker horror creature, 1/2 longitudinal cross-section cutaway. The creature is perfectly sliced to show a hollow, void-like interior filled with swirling black smoke and a pulsing dark core. The exterior side is pitch-black, muscular, and lean with elongated fingers. Complete 3D horror mesh, 30-degree tilted perspective, solid pure white background, shadowless lighting, --ar 1:1",
    frontPrompt:
      "3D horror asset of the Shadow Stalker, half cross-section view from the front. Sliced down the middle to reveal the 'Void Core' and obsidian-like internal organs. Lean, muscular black skin texture with sharp claws. Pure solid white background, high-fidelity scientific render, --ar 1:1",
    backPrompt:
      "3D horror asset of the Shadow Stalker, intact posterior dome view from the back. Showing the elongated, spine-heavy back and lean muscular limbs. Perfectly mirrors the predatory silhouette. Solid pure white background, uniform flat lighting, --ar 1:1",
  },
};
