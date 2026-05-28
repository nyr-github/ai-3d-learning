import type { Entity3D } from "@/data/types";

export const monkeyDLuffy: Entity3D = {
  id: "monkey-d-luffy",
  name: "Monkey D. Luffy",
  subtitle: "Captain of the Straw Hat Pirates · Rubber Human",
  mainCategory: "Characters",
  subCategory: "Anime & Manga",
  accent: "#ff4b2b",
  description:
    "The protagonist of One Piece, Monkey D. Luffy is a high-energy pirate who gained the properties of rubber after eating the Gomu Gomu no Mi. This 3D model captures his iconic pre-timeskip look in a classic T-pose, ideal for character rigging and animation study.",
  attributes: [
    {
      name: "Devil Fruit",
      value: "Gomu Gomu no Mi (Paramecia/Mythical Zoan)",
    },
    { name: "Bounty", unit: "Belly", value: 3000000000 },
    { name: "Haki Ability", value: "Haoshoku, Busoshoku, Kenbunshoku" },
    {
      name: "Combat Stats",
      value: {
        Strength: "S",
        Agility: "SS",
        Durability: "SSS (Rubber Resistance)",
      },
    },
    {
      name: "Awards",
      value: [
        "Global Anime Icon Award",
        "Most Influential Shonen Character 2024",
      ],
    },
  ],
  funFact:
    "Luffy's rubber body makes him completely immune to lightning strikes and most blunt-force trauma, but he still can't swim!",
  teachingFocus:
    "Study cel-shaded texturing techniques, human-proportional character topology, and the implementation of iconic clothing assets in 3D character design.",
  tags: [
    "Straw Hat",
    "Pirate King",
    "Rubber Human",
    "Anime Hero",
    "Cel-Shaded",
  ],
  model3D: {
    modelUrl: "/models/char/luffy.glb",
    imageUrl: "/models/char/luffy.webp",
    fileSize: 214152,
    defaultRotation: { x: 0, y: -40, z: 0 },
    displayScale: 1.1,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital character of Monkey D. Luffy in T-pose, 90-degree wedge anatomical cutout. One-quarter of the body is cleanly removed from the front right quadrant to reveal internal rubber-like muscular structures and a stylized skeletal frame. The remaining 3/4 shows the iconic red vest, blue shorts, and straw hat with cel-shaded textures. Complete volumetric character mesh, solid pure white background, flat anime-style lighting, --ar 1:1",
    frontPrompt:
      "3D anime character asset of Luffy, vertical anatomical cross-section view from the front, eye-level. Sliced to expose inner 'rubber human' anatomy including vital organs stylized in anime art style. Right side shows the classic anime appearance with vibrant colors. Pure solid white background, shadowless, square aspect ratio --ar 1:1",
    backPrompt:
      "3D character asset of Luffy, intact posterior full view from the back. Showing the iconic straw hat hanging by a string, the back of the red vest, and denim shorts. Perfectly aligns with the T-pose front orientation. Solid pure white background, uniform lighting, --ar 1:1",
  },
};
