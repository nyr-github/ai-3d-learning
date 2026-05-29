import type { Entity3D } from "@/data/types";

export const centralBeardedDragon: Entity3D = {
  id: "central-bearded-dragon",
  name: "Central Bearded Dragon",
  subtitle: "The Inland Dragon · Australian Desert Icon",
  mainCategory: "Reptiles",
  subCategory: "Agamidae (Dragon Lizards)",
  accent: "#d4a574",
  description:
    "A magnificent agamid lizard native to the arid and semi-arid regions of central Australia. This 3D asset captures its distinctive spiny 'beard' that inflates when threatened, robust triangular head, and heavily armored scales. Known for their docile nature and remarkable ability to wave their front legs as a territorial signal, they are among the most recognizable reptiles in the Australian outback.",
  attributes: [
    { name: "Scientific Name", value: "Pogona vitticeps" },
    {
      name: "Specimen Grade",
      value: "Premium Exhibition Level (Showcasing full beard display)",
    },
    {
      name: "Morph & Coloration",
      value: "Natural Sandy Brown with Orange Accent Scales",
    },
    {
      name: "Anatomical Appraisal",
      value: {
        "Beard Spines":
          "Highly developed keratinized throat spikes, capable of full inflation display",
        "Head Structure":
          "Broad triangular cranium with pronounced temporal ridges",
        "Scale Texture":
          "Coarse overlapping scales with distinctive lateral spine rows",
        "Body Proportions":
          "Robust cylindrical body with powerful limbs, tail comprising 50% of total length",
      },
    },
    {
      name: "Behavioral Traits",
      value: {
        "Arm Waving":
          "Characteristic front limb circular motion for communication",
        "Beard Display": "Threat response mechanism with full throat inflation",
        Thermoregulation:
          "Excellent basking behavior with precise temperature control",
      },
    },
    {
      name: "Awards",
      value: [
        "Australian Reptile Conservation Award - Best Educational Species 2026",
        "International Herpetoculture Society - Ambassador Species Recognition",
      ],
    },
  ],
  funFact:
    "Bearded dragons can change their beard color to communicate! They darken it when stressed or during courtship, and can even turn it completely black to intimidate rivals!",
  teachingFocus:
    "Study the biomechanics of the expandable throat pouch, analyze desert adaptation strategies including water conservation and thermoregulation, and explore the social signaling behaviors unique to agamid lizards.",
  tags: [
    "Australian Native",
    "Bearded Dragon",
    "Desert Adaptation",
    "Agamidae",
    "Social Signaling",
  ],
  model3D: {
    modelUrl: "/models/lizard/central-bearded-dragon.glb",
    imageUrl: "/models/lizard/central-bearded-dragon.webp",
    fileSize: 2123876,
    defaultRotation: { x: 0, y: -30, z: 0 },
    displayScale: 1.0,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of a Central Bearded Dragon lizard, designed as a perfect 1/2 longitudinal biological cross-section, presented at a 30-degree tilted isometric perspective. Sliced cleanly down the centerline: the left half reveals the complete sandy-brown scaly exterior, the iconic spiny throat beard, robust triangular head, and powerful clawed limbs. The exact right half opens into an intricate anatomical cutaway, exposing the skull structure, respiratory system, and muscular layout. Complete volumetric 3D reptile mesh, solid pure white background, studio illumination, shadowless, --ar 1:1",
    frontPrompt:
      "3D scientific rendering of a Central Bearded Dragon lizard, 1/2 mechanical and biological cross-section view from the front, tilted at a 30-degree angle. Sliced plane faces the camera to meticulously expose the inner anatomical structures and throat pouch mechanism. The intact side captures the distinctive spiny beard, broad triangular head with golden eyes, and coarse scale patterns. High-fidelity rendering, sharp occlusion, solid pure white background, --ar 1:1",
    backPrompt:
      "3D asset of the Central Bearded Dragon lizard, intact posterior full view from the exact back, matching the 30-degree tilted orientation perfectly. Showing the continuous, unbroken opposite side of the reptile with its robust body, distinctive spine ridges, and tapering tail. Features the armored scale texture and muscular hind legs. Symmetrical silhouette that mirrors the front cutaway on a solid pure white background, shadowless, --ar 1:1",
  },
};
