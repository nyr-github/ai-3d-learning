import type { Entity3D } from "@/data/types";

export const donatello: Entity3D = {
  id: "donatello",
  name: "Donatello",
  subtitle: "Teenage Mutant Ninja Turtle · Tech Genius",
  mainCategory: "Characters",
  subCategory: "Anime & Manga",
  accent: "#8b5cf6",
  description:
    "Donatello is one of the four Teenage Mutant Ninja Turtles, distinguished by his purple mask and bo staff. Known as the team's tech genius and inventor, he combines martial arts mastery with scientific brilliance. This chibi-style 3D model captures his iconic look with vibrant purple accents and dynamic pose, perfect for stylized character studies.",
  attributes: [
    { name: "Weapon", value: "Bo Staff (Rokushakubo)" },
    { name: "Mask Color", value: "Purple" },
    {
      name: "Skills",
      value: {
        Combat: "Ninjutsu Master",
        Intellect: "Genius-level Inventor",
        Technology: "Hacking & Engineering",
      },
    },
    { name: "Personality", value: "Analytical · Creative · Problem-solver" },
    {
      name: "Awards",
      value: ["Classic Cartoon Icon · 90s Nostalgia Legend"],
    },
  ],
  funFact:
    "Donatello's bo staff can extend and retract, and he's often the one to solve the team's technical problems with makeshift gadgets!",
  teachingFocus:
    "Study stylized character proportions, chibi-style anatomy, purple-themed color palette application, and dynamic weapon-holding pose configuration in 3D character design.",
  tags: [
    "Ninja Turtle",
    "Purple Mask",
    "Bo Staff",
    "Chibi Style",
    "Cartoon Hero",
  ],
  model3D: {
    modelUrl: "/models/char/donatello.glb",
    imageUrl: "/models/char/donatello.webp",
    fileSize: 1331016,
    defaultRotation: { x: 0, y: -30, z: 0 },
    displayScale: 1.1,
  },
  generationPrompts: {
    full3DPrompt:
      "Chibi-style 3D character of Donatello from Teenage Mutant Ninja Turtles, dynamic action pose holding a bo staff. Features a purple mask with flowing tails, green turtle skin, purple bandana wraps on arms and legs, and a brown shell on his back. Stylized proportions with large head and expressive eyes, cute but ready for battle. Solid pure white background, clean studio lighting, --ar 1:1",
    frontPrompt:
      "Front view of chibi Donatello 3D model, purple mask covering eyes with distinctive tails, holding bo staff in combat-ready stance. Green reptilian skin texture, purple arm wraps, brown turtle shell visible from front angle. Expressive determined eyes, cartoon-style rendering. Solid pure white background, shadowless, --ar 1:1",
    backPrompt:
      "Back view of chibi Donatello showing the full brown turtle shell with detailed scute patterns, purple mask tails flowing down the back, and the complete bo staff held diagonally. Perfectly mirrors the front pose orientation. Solid pure white background, uniform lighting, --ar 1:1",
  },
};
