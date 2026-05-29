import type { Entity3D } from "@/data/types";

export const firefly: Entity3D = {
  id: "firefly",
  name: "Firefly",
  subtitle: "Bioluminescent Beetle · Coleoptera",
  mainCategory: "Insects",
  subCategory: "Beetles",
  accent: "#FFD700",
  description:
    "Fireflies, also known as lightning bugs, are soft-bodied beetles capable of producing their own light through bioluminescence. This fascinating ability is used for communication, mating displays, and warning predators. Each species has a unique flash pattern, creating a complex language of light in summer evenings.",
  attributes: [
    { name: "Body Length", unit: "mm", min: 5, max: 25 },
    {
      name: "Distribution",
      value: "Temperate and tropical regions worldwide",
    },
    {
      name: "Habitat",
      value: "Moist Woodlands · Marshes · Gardens · Fields",
    },
    {
      name: "Bioluminescence",
      value: {
        "Light Organ": "Located in lower abdomen, contains luciferin and luciferase",
        "Efficiency": "Nearly 100% of energy converted to light (cold light)",
        "Purpose": "Mating signals, predator warning, and prey attraction",
      },
    },
    {
      name: "Key Features",
      value: {
        "Soft Elytra": "Unlike typical beetles, wing covers are soft and flexible",
        "Flash Patterns": "Species-specific light signals for mate recognition",
        "Nocturnal": "Most species active during twilight and night",
      },
    },
    {
      name: "Life Cycle",
      value: "Egg → Larva (glow) → Pupa → Adult (glow)",
    },
    {
      name: "Ecological Role",
      value: "Predator and prey, bioindicator for environmental health",
    },
  ],
  funFact:
    "Firefly larvae are also bioluminescent and are called 'glowworms.' Some species can synchronize their flashing, creating spectacular light shows.",
  teachingFocus:
    "Examine the bioluminescent organs in the abdomen, understand the chemistry of luciferin-luciferase reaction, and study species-specific flash patterns.",
  tags: [
    "Coleoptera",
    "Bioluminescence",
    "Nocturnal",
    "Chemical Communication",
    "Bioindicator",
  ],
  model3D: {
    modelUrl: "/models/insect/firefly.glb",
    imageUrl: "/models/insect/firefly.webp",
    fileSize: 2208324,
    defaultRotation: { x: 0, y: 0, z: 0 },
    displayScale: 1.0,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of a firefly (lightning bug) beetle, scientific illustration style. Hyper-realistic rendering showing soft-bodied beetle with distinctive dark elytra (wing covers) and pronotum covering part of the head. The lower abdomen shows bioluminescent light organs with subtle yellow-green glow effect. Dark brown to black coloration with delicate antennae. Clean studio lighting on solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
    frontPrompt:
      "3D biological asset of a firefly, frontal view showcasing the pronotum (shield-like structure) covering the head, short antennae, and compound eyes. The soft wing covers (elytra) are visible with characteristic beetle segmentation. The abdomen tip shows light-emitting organs with warm yellow-green coloration. Detailed chitinous texture, pure solid white background, professional scientific visualization, shadowless studio lighting, centered positioning, square aspect ratio --ar 1:1",
    backPrompt:
      "3D biological asset of a firefly, dorsal view displaying the soft flexible elytra covering the folded hind wings underneath. The pronotum is clearly visible at the thorax. The abdomen shows segmented structure with bioluminescent organs on the last two segments. Dark coloration with subtle textural details, clean scientific illustration style, pure solid white background, uniform laboratory lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
  },
};
