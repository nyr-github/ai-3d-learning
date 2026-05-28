import type { Entity3D } from "@/data/types";

export const woodEnt: Entity3D = {
  id: "wood-ent",
  name: "Forest Guardian",
  subtitle: "Ancient Wood Ent · Nature Entity",
  mainCategory: "Creatures",
  subCategory: "Fantasy & Mythos",
  accent: "#8b5a2b",
  description:
    "An ancient forest spirit embodied in a gnarled, humanoid wooden frame. This entity represents the raw power of nature, with limbs resembling thick roots and a torso formed from weathered bark. Its glowing yellow eyes indicate a sentient magical core.",
  attributes: [
    { name: "Estimated Age", unit: "Years", value: 1500 },
    { name: "Armor Class", value: "Natural Bark Armor (DR 15)" },
    {
      name: "Elemental Affinity",
      value: {
        Primary: "Earth/Flora",
        Secondary: "Vitality Magic",
        Weakness: "Fire/Ax-based Slashing",
      },
    },
    { name: "Awards", value: ["Best Creature Concept - Fantasy Arts 2023"] },
  ],
  funFact:
    "This Ent doesn't speak through a mouth; it communicates through the rhythmic creaking of its branches and the vibration of the surrounding soil.",
  teachingFocus:
    "Master high-definition bark sculpting, procedural wood grain texturing, and organic non-humanoid rigging for slow-moving entities.",
  tags: [
    "Living Tree",
    "Ent",
    "Fantasy Creature",
    "Nature Spirit",
    "Organic Sculpting",
  ],
  model3D: {
    modelUrl: "/models/char/wooden.glb",
    imageUrl: "/models/char/wooden.webp",
    fileSize: 336684,
    defaultRotation: { x: 0, y: -40, z: 0 },
    displayScale: 1.2,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of a Wood Ent, 90-degree wedge cutout styling. One-quarter of the wooden torso and leg is cleanly sliced to reveal internal rings like an ancient tree and glowing green sap veins. The remaining structure shows weathered brown bark, root-like limbs, and sharp gnarled textures. Complete volumetric fantasy mesh, solid pure white background, shadowless studio lighting, --ar 1:1",
    frontPrompt:
      "3D fantasy asset of the Wood Ent, 90-degree wedge cutout view from the front, tilted at 30 degrees. The slice exposes the glowing core of the tree spirit and the layered bark anatomy. Gnarled fingers and glowing yellow eyes are prominent. Pure white background, high contrast textures, --ar 1:1",
    backPrompt:
      "3D fantasy asset of the Wood Ent, intact posterior view from the back. Showing the dense growth of branches on the shoulders and the deep ridges of the back bark. Matches the ancient forest spirit's silhouette. Solid pure white background, uniform laboratory lighting, --ar 1:1",
  },
};
