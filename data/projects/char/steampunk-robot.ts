import type { Entity3D } from "@/data/types";

export const steampunkRobot: Entity3D = {
  id: "steampunk-robot",
  name: "Steampunk Robot",
  subtitle: "Victorian Era Mechanical Guardian · Brass & Copper",
  mainCategory: "Characters",
  subCategory: "Sci-Fi & Fantasy",
  accent: "#d4a574",
  description:
    "A charming steampunk-inspired robot featuring Victorian-era aesthetics with brass and copper mechanical components. This compact automaton showcases intricate gear mechanisms, riveted metal plating, and a distinctive dome-shaped head with circular optical sensors. The weathered blue-green patina contrasts beautifully with warm bronze accents, creating a unique blend of industrial machinery and antique craftsmanship. Perfect for studying mechanical design, retro-futuristic aesthetics, and stylized character modeling.",
  attributes: [
    { name: "Era Style", value: "Victorian Steampunk" },
    { name: "Primary Materials", value: "Brass · Copper · Steel" },
    {
      name: "Key Features",
      value: {
        Head: "Dome-shaped with optical sensors",
        Body: "Riveted metal plating with gear details",
        Arms: "Articulated mechanical joints",
        Shield: "Decorative brass shield accessory",
      },
    },
    { name: "Color Palette", value: "Weathered blue-green · Bronze · Copper" },
    { name: "Design Style", value: "Retro-futuristic · Industrial · Ornate" },
    {
      name: "Accessories",
      value: ["Brass Shield · Gear Mechanisms · Riveted Armor"],
    },
  ],
  funFact:
    "Steampunk robots blend 19th-century industrial aesthetics with futuristic technology, often featuring visible gears, steam vents, and clockwork mechanisms powered by imaginary steam engines!",
  teachingFocus:
    "Study steampunk design principles, mechanical joint articulation, weathered metal texturing, brass and copper material differentiation, and retro-futuristic character design in 3D modeling.",
  tags: [
    "Steampunk",
    "Robot",
    "Victorian Era",
    "Brass",
    "Copper",
    "Mechanical",
    "Retro-futuristic",
    "Gear Mechanism",
  ],
  model3D: {
    modelUrl: "/models/char/steampunk-robot.glb",
    imageUrl: "/models/char/steampunk-robot.webp",
    fileSize: 2138712,
    defaultRotation: { x: 0, y: 0, z: 0 },
    displayScale: 1.0,
  },
  generationPrompts: {
    full3DPrompt:
      "Steampunk robot character, Victorian-era mechanical automaton with weathered blue-green metal body and brass copper accents. Dome-shaped head with circular optical sensors and antenna, riveted metal plating covering the body, visible gear mechanisms and clockwork details. Holding a decorative brass shield in one hand, articulated mechanical joints with ornate steam-punk styling. Compact chibi-style proportions with sturdy stance. Dark neutral background, studio lighting, detailed metal textures, --ar 1:1",
    frontPrompt:
      "Front view of steampunk robot showing dome head with dual circular optical sensors, brass riveted chest plate with central gear mechanism, articulated arms with mechanical joints, decorative brass shield held in left hand. Weathered blue-green metal surface with copper and bronze highlights, Victorian-era industrial design elements. Dark background, even lighting, --ar 1:1",
    backPrompt:
      "Back view of steampunk robot displaying riveted metal backplate with exposed gear mechanisms, steam vent details, and ornate brass piping. Dome head rear with antenna and mechanical connections, shield visible from behind angle. Consistent weathered patina finish throughout. Dark neutral background, --ar 1:1",
  },
};
