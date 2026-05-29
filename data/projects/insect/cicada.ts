import type { Entity3D } from "@/data/types";

export const cicada: Entity3D = {
  id: "cicada",
  name: "Cicada",
  subtitle: "Singing Insect · Hemiptera",
  mainCategory: "Insects",
  subCategory: "True Bugs",
  accent: "#556B2F",
  description:
    "Cicadas are remarkable insects known for their loud acoustic signals and extraordinarily long life cycles. Some species spend 13 or 17 years underground as nymphs before emerging en masse. Their distinctive song, produced by males using tymbal organs, can reach 120 decibels.",
  attributes: [
    { name: "Body Length", unit: "mm", min: 20, max: 60 },
    {
      name: "Distribution",
      value: "Worldwide (tropical and temperate regions)",
    },
    {
      name: "Habitat",
      value: "Forests · Woodlands · Gardens · Agricultural Areas",
    },
    {
      name: "Life Cycle",
      value: {
        "Nymph Stage": "2-17 years underground (species-dependent)",
        "Adult Stage": "4-6 weeks above ground",
      },
    },
    {
      name: "Key Features",
      value: {
        "Tymbal Organs": "Specialized sound-producing structures on abdomen",
        "Transparent Wings": "Membranous wings with prominent venation",
        "Piercing Mouthparts": "Straw-like rostrum for feeding on plant sap",
      },
    },
    {
      name: "Ecological Role",
      value: "Nutrient cycling, soil aeration, and food source for predators",
    },
  ],
  funFact:
    "Periodical cicadas emerge in synchronized broods of millions, overwhelming predators through sheer numbers—a survival strategy called predator satiation.",
  teachingFocus:
    "Examine the wing venation pattern, tymbal organs for sound production, and understand the unique life cycle with extended underground nymph stage.",
  tags: [
    "Hemiptera",
    "Acoustic Communication",
    "Periodical Emergence",
    "Plant Feeder",
    "Metamorphosis",
  ],
  model3D: {
    modelUrl: "/models/insect/cicada.glb",
    imageUrl: "/models/insect/cicada.webp",
    fileSize: 2178940,
    defaultRotation: { x: 0, y: 0, z: 0 },
    displayScale: 1.0,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of a cicada insect, scientific illustration style. Hyper-realistic rendering showing broad head with prominent compound eyes, stout body with transparent membranous wings displaying intricate venation patterns. Green to brown coloration with detailed exoskeleton texture. Wings held tent-like over the back. Clean studio lighting on solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
    frontPrompt:
      "3D biological asset of a cicada, frontal view showcasing wide-set compound eyes, short antennae, and piercing-sucking mouthparts (rostrum). The robust thorax shows wing attachment points with delicate transparent wings extending beyond the abdomen. Detailed chitinous texture with natural coloration, pure solid white background, professional scientific visualization, shadowless studio lighting, centered positioning, square aspect ratio --ar 1:1",
    backPrompt:
      "3D biological asset of a cicada, dorsal view displaying the characteristic wing posture with membranous wings folded tent-like over the body. Wing venation is clearly visible showing the complex network of veins. The abdomen shows segmented structure with tymbal organs visible on males. Natural green-brown coloration, clean scientific illustration style, pure solid white background, uniform laboratory lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
  },
};
