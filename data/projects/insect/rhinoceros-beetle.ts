import type { Entity3D } from "@/data/types";

export const rhinocerosBeetle: Entity3D = {
  id: "rhinoceros-beetle",
  name: "Rhinoceros Beetle",
  subtitle: "Herculean Beetle · Coleoptera",
  mainCategory: "Insects",
  subCategory: "Beetles",
  accent: "#8B0000",
  description:
    "Rhinoceros beetles are among the strongest animals on Earth, capable of lifting 850 times their own body weight. Males possess spectacular horn-like projections used in combat over mating rights and territory. These gentle giants are popular in Asian cultures as pets and fighting insects, with some specimens reaching impressive sizes of up to 150mm in length.",
  attributes: [
    { name: "Body Length", unit: "mm", min: 50, max: 150 },
    {
      name: "Lifting Capacity",
      value: "Up to 850 times body weight",
    },
    {
      name: "Distribution",
      value: "Tropical and subtropical regions worldwide",
    },
    {
      name: "Habitat",
      value: "Tropical Forests · Decaying Wood · Leaf Litter",
    },
    {
      name: "Key Features",
      value: {
        "Cephalic Horn": "Male's prominent head horn for fighting rivals",
        "Thoracic Horn": "Additional horn on pronotum in many species",
        "Exoskeleton": "Extremely hard chitinous armor providing protection",
      },
    },
    {
      name: "Diet",
      value: {
        Adult: "Rotting fruit, tree sap, and nectar",
        Larva: "Decaying wood and organic matter",
      },
    },
    {
      name: "Life Cycle",
      value: "Egg → Larva (grub, 1-2 years) → Pupa → Adult (2-4 months)",
    },
    {
      name: "Ecological Role",
      value: "Decomposer, nutrient cycling in forest ecosystems",
    },
  ],
  funFact:
    "If humans had the relative strength of a rhinoceros beetle, a person could lift a full-grown elephant overhead. Their horn structure is studied by engineers for biomimetic applications.",
  teachingFocus:
    "Examine the sexual dimorphism (horns on males only), horn mechanics for combat, and understand the biomechanics of extreme strength relative to body size.",
  tags: [
    "Coleoptera",
    "Sexual Dimorphism",
    "Extreme Strength",
    "Decomposer",
    "Tropical Species",
  ],
  model3D: {
    modelUrl: "/models/insect/rhinoceros-beetle.glb",
    imageUrl: "/models/insect/rhinoceros-beetle.webp",
    fileSize: 2586348,
    defaultRotation: { x: 0, y: 0, z: 0 },
    displayScale: 1.0,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of a rhinoceros beetle, scientific illustration style. Hyper-realistic rendering showing massive robust body with prominent cephalic horn curving upward and backward from the head. Additional thoracic horn visible on the pronotum. Dark brown to black glossy exoskeleton with powerful legs. Sexual dimorphism clearly visible with male horn structure. Clean studio lighting on solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
    frontPrompt:
      "3D biological asset of a rhinoceros beetle, frontal view showcasing the impressive Y-shaped cephalic horn extending from the head, with smaller thoracic horn on the pronotum. Large compound eyes visible on the sides of the head, with robust mandibles. The thick exoskeleton shows detailed texture and segmentation. Dark brown-black coloration with glossy surface, pure solid white background, professional scientific visualization, shadowless studio lighting, centered positioning, square aspect ratio --ar 1:1",
    backPrompt:
      "3D biological asset of a rhinoceros beetle, dorsal view displaying the robust oval-shaped body with hardened elytra covering the wings. The thoracic horn projects upward from the pronotum, while the cephalic horn extends forward. The elytra show subtle textural striations and glossy finish. Dark brown-black exoskeleton with natural sheen, clean scientific illustration style, pure solid white background, uniform laboratory lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
  },
};
