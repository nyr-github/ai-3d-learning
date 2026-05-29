import type { Entity3D } from "@/data/types";

export const pikachu: Entity3D = {
  id: "pikachu",
  name: "Pikachu",
  subtitle: "Electric Mouse Pokémon · Iconic Partner",
  mainCategory: "Characters",
  subCategory: "Anime & Manga",
  accent: "#fbbf24",
  description:
    "Pikachu is the world's most beloved Electric-type Pokémon and the iconic mascot of the Pokémon franchise. This adorable yellow mouse Pokémon features distinctive lightning bolt-shaped tail, red circular cheek pouches that store electricity, and long pointed ears with black tips. Known for its playful personality and powerful Thunderbolt attacks, Pikachu has become a global cultural phenomenon and the face of the Pokémon universe. This high-quality 3D model captures Pikachu's cute and expressive character design with smooth yellow fur texture and charming standing pose, perfect for studying iconic character design and Pokémon anatomy.",
  attributes: [
    { name: "Type", value: "Electric" },
    { name: "Species", value: "Mouse Pokémon" },
    {
      name: "Physical Features",
      value: {
        Color: "Bright yellow fur",
        Cheeks: "Red circular electric pouches",
        Ears: "Long pointed with black tips",
        Tail: "Lightning bolt-shaped",
      },
    },
    {
      name: "Signature Moves",
      value: "Thunderbolt · Quick Attack · Iron Tail",
    },
    { name: "Personality", value: "Playful · Loyal · Courageous" },
    {
      name: "Achievements",
      value: ["Pokémon Mascot · Global Icon · Anime Star"],
    },
  ],
  funFact:
    "Pikachu's name comes from the Japanese onomatopoeia 'pika' (electric sparkle) and 'chu' (mouse squeak). It's the only Pokémon whose English and Japanese names are identical!",
  teachingFocus:
    "Study iconic character design principles, smooth surface modeling for cartoon characters, yellow and red color palette application, expressive facial feature creation, and Pokémon species anatomy in 3D character modeling.",
  tags: [
    "Pokémon",
    "Pikachu",
    "Electric Type",
    "Anime Character",
    "Yellow",
    "Mascot",
    "Cute",
    "Iconic",
  ],
  model3D: {
    modelUrl: "/models/char/pikachu.glb",
    imageUrl: "/models/char/pikachu.webp",
    fileSize: 1664732,
    defaultRotation: { x: 0, y: 0, z: 0 },
    displayScale: 1.0,
  },
  generationPrompts: {
    full3DPrompt:
      "Cute Pikachu 3D character model, bright yellow mouse Pokémon with smooth shiny fur texture. Features distinctive lightning bolt-shaped tail, red circular cheek pouches, long pointed ears with black tips. Standing pose with small arms at sides, friendly expression with large dark eyes and tiny mouth. Clean studio lighting, solid dark background, high-quality cartoon-style rendering, --ar 1:1",
    frontPrompt:
      "Front view of Pikachu showing symmetrical red cheek pouches, large expressive dark eyes with white highlights, small black nose and mouth. Long pointed ears extending upward with black tips, lightning tail visible from front angle. Bright yellow smooth fur texture, solid dark background, even lighting, --ar 1:1",
    backPrompt:
      "Back view of Pikachu displaying the iconic lightning bolt-shaped tail extending from the back, smooth yellow fur texture, ear backs with black tips. Small rounded body shape with visible arm and leg positioning from behind. Solid dark neutral background, consistent lighting, --ar 1:1",
  },
};
