import type { Entity3D } from "@/data/types";

export const monarchButterfly: Entity3D = {
  id: "monarch-butterfly",
  name: "Monarch Butterfly",
  subtitle: "Migratory Lepidopteran · Lepidoptera",
  mainCategory: "Insects",
  subCategory: "Butterflies & Moths",
  accent: "#FF8C00",
  description:
    "The Monarch butterfly is famous for its extraordinary multi-generational migration spanning up to 3,000 miles from North America to central Mexico. Their bright orange and black wings serve as warning coloration, signaling toxicity acquired from milkplant feeding during their caterpillar stage. This iconic species is a crucial pollinator and bioindicator.",
  attributes: [
    { name: "Wingspan", unit: "mm", min: 89, max: 102 },
    {
      name: "Migration Distance",
      value: "Up to 4,800 km (3,000 miles)",
    },
    {
      name: "Distribution",
      value: "North America (breeding), Mexico (overwintering)",
    },
    {
      name: "Habitat",
      value: "Fields · Roadsides · Gardens · Milkweed-rich Areas",
    },
    {
      name: "Key Features",
      value: {
        "Wing Pattern": "Orange with black veins and white spots along edges",
        "Toxicity": "Sequesters cardenolides from milkweed, making them poisonous",
        "Migration": "Only butterfly to make two-way migration like birds",
      },
    },
    {
      name: "Life Cycle",
      value: "Egg → Caterpillar (milkweed feeder) → Chrysalis → Adult",
    },
    {
      name: "Ecological Role",
      value: "Pollinator, bioindicator, and flagship species for conservation",
    },
  ],
  funFact:
    "Monarchs use a time-compensated sun compass and Earth's magnetic field to navigate during migration. No individual makes the round trip—it takes 3-4 generations.",
  teachingFocus:
    "Study the wing scale patterns, proboscis structure, and understand the complete metamorphosis and multi-generational migration phenomenon.",
  tags: [
    "Lepidoptera",
    "Migration",
    "Pollinator",
    "Complete Metamorphosis",
    "Conservation Icon",
  ],
  model3D: {
    modelUrl: "/models/insect/monarch-butterfly.glb",
    imageUrl: "/models/insect/monarch-butterfly.webp",
    fileSize: 1683724,
    defaultRotation: { x: 0, y: 0, z: 0 },
    displayScale: 1.0,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of a Monarch butterfly, scientific illustration style. Hyper-realistic rendering showing distinctive orange wings with bold black veins and white spots along the black margins. Slender black body with clubbed antennae. Wings displayed in characteristic butterfly posture (vertical when at rest). Delicate wing membrane with visible scale patterns. Clean studio lighting on solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
    frontPrompt:
      "3D biological asset of a Monarch butterfly, frontal view showcasing the head with large compound eyes, clubbed antennae, and coiled proboscis. The thorax shows wing attachment points with forewings displaying bright orange coloration intersected by black veins. White spots clearly visible along the wing margins. Detailed scale texture, pure solid white background, professional scientific visualization, shadowless studio lighting, centered positioning, square aspect ratio --ar 1:1",
    backPrompt:
      "3D biological asset of a Monarch butterfly, dorsal view with wings fully spread displaying the iconic orange and black pattern. Black veins create a stained-glass effect across the orange wing surface. The white spot margin is clearly defined against the black wing edges. The slender abdomen shows segmentation. Vibrant orange-black-white coloration with microscopic scale detail, clean scientific illustration style, pure solid white background, uniform laboratory lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
  },
};
