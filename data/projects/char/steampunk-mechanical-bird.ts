import type { Entity3D } from "@/data/types";

export const steampunkMechanicalBird: Entity3D = {
  id: "steampunk-mechanical-bird",
  name: "Steampunk Mechanical Bird",
  subtitle: "Victorian Automaton · Brass & Teal Gem",
  mainCategory: "Characters",
  subCategory: "Sci-Fi & Fantasy",
  accent: "#14b8a6",
  description:
    "A whimsical steampunk mechanical bird featuring intricate Victorian-era clockwork design with polished brass and copper components. This charming automaton showcases detailed feather-like metal plates, gear-driven wing mechanisms, and a distinctive telescope-like beak. The chest cavity houses a glowing teal gem that serves as the power core, while the tail feathers are crafted from ornate brass plates. Perfect for studying steampunk aesthetics, mechanical bird anatomy, and ornamental metalwork in 3D modeling.",
  attributes: [
    { name: "Type", value: "Clockwork Automaton" },
    { name: "Primary Materials", value: "Brass · Copper · Teal Gemstone" },
    {
      name: "Key Features",
      value: {
        Beak: "Telescope-like brass apparatus",
        Wings: "Gear-driven mechanical feather plates",
        Chest: "Glowing teal gem power core",
        Tail: "Ornate brass feather assembly",
      },
    },
    { name: "Color Palette", value: "Polished Brass · Copper · Teal" },
    { name: "Design Style", value: "Victorian Steampunk · Ornate · Whimsical" },
    {
      name: "Mechanisms",
      value: ["Gear-driven Wings · Clockwork Movement · Gem Power Core"],
    },
  ],
  funFact:
    "Steampunk mechanical birds were popular motifs in Victorian-era science fiction, representing the fusion of nature and machinery - automated creatures powered by steam engines and clockwork mechanisms!",
  teachingFocus:
    "Study steampunk design principles, mechanical bird anatomy, brass and copper material rendering, gear mechanism visualization, teal gem material effects, and ornamental metalwork techniques in 3D modeling.",
  tags: [
    "Steampunk",
    "Mechanical Bird",
    "Automaton",
    "Brass",
    "Clockwork",
    "Victorian",
    "Teal Gem",
    "Whimsical",
  ],
  model3D: {
    modelUrl: "/models/char/steampunk-mechanical-bird.glb",
    imageUrl: "/models/char/steampunk-mechanical-bird.webp",
    fileSize: 1812056,
    defaultRotation: { x: 0, y: 0, z: 0 },
    displayScale: 1.0,
  },
  generationPrompts: {
    full3DPrompt:
      "Steampunk mechanical bird automaton with polished brass and copper body, intricate clockwork mechanisms visible through gear-driven wing structures. Telescope-like brass beak apparatus, glowing teal gem embedded in chest as power core. Detailed metal feather plates on wings and tail, ornate Victorian-era design elements throughout. Standing pose with mechanical legs and talons. Dark neutral background, studio lighting, metallic textures with warm brass highlights, --ar 1:1",
    frontPrompt:
      "Front view of steampunk mechanical bird showing telescope brass beak, glowing teal gem power core in chest cavity, symmetrical wing structures with visible gear mechanisms. Brass and copper feather plates, ornate Victorian design details, mechanical legs with talon feet. Dark background, even lighting highlighting metallic surfaces, --ar 1:1",
    backPrompt:
      "Back view of steampunk mechanical bird displaying ornate brass tail feather assembly, gear-driven wing mechanisms from behind, copper body plating with rivet details. Mechanical spine structure visible, consistent brass and copper color scheme. Dark neutral background, --ar 1:1",
  },
};
