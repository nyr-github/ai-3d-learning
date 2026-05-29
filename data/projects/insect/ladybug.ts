import type { Entity3D } from "@/data/types";

export const ladybug: Entity3D = {
  id: "ladybug",
  name: "Ladybug",
  subtitle: "Beneficial Beetle · Coleoptera",
  mainCategory: "Insects",
  subCategory: "Beetles",
  accent: "#DC143C",
  description:
    "Ladybugs, or ladybird beetles, are beloved beneficial insects renowned for their appetite for agricultural pests. A single ladybug can consume up to 5,000 aphids in its lifetime. Their bright warning coloration (aposematism) signals toxicity to predators, and they can reflex-bleed toxic hemolymph from their leg joints as a defense mechanism.",
  attributes: [
    { name: "Body Length", unit: "mm", min: 1, max: 10 },
    {
      name: "Distribution",
      value: "Worldwide (over 6,000 species described)",
    },
    {
      name: "Habitat",
      value: "Gardens · Agricultural Fields · Forests · Grasslands",
    },
    {
      name: "Diet",
      value: {
        Primary: "Aphids, scale insects, mites, and other soft-bodied pests",
        Alternative: "Pollen, nectar, and fungi when prey is scarce",
      },
    },
    {
      name: "Key Features",
      value: {
        "Elytra": "Hardened red/orange wing covers with distinctive black spots",
        "Aposematic Coloration": "Bright warning colors signal toxicity to predators",
        "Reflex Bleeding": "Exudes toxic hemolymph from leg joints when threatened",
      },
    },
    {
      name: "Life Cycle",
      value: "Egg → Larva (alligator-shaped) → Pupa → Adult",
    },
    {
      name: "Ecological Role",
      value: "Natural biological control agent, reduces need for pesticides",
    },
  ],
  funFact:
    "The spots on a ladybug's back don't indicate its age—they help identify the species. The number of spots varies from 2 to 28 depending on the species.",
  teachingFocus:
    "Examine the dome-shaped body, hardened elytra with spot patterns, and understand aposematic coloration and reflex bleeding defense mechanisms.",
  tags: [
    "Coleoptera",
    "Beneficial Insect",
    "Biological Control",
    "Aposematism",
    "Predator",
  ],
  model3D: {
    modelUrl: "/models/insect/ladybug.glb",
    imageUrl: "/models/insect/ladybug.webp",
    fileSize: 2135516,
    defaultRotation: { x: 0, y: 0, z: 0 },
    displayScale: 1.0,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of a ladybug (ladybird beetle), scientific illustration style. Hyper-realistic rendering showing distinctive dome-shaped body with bright red elytra (wing covers) featuring black spots. Black pronotum with white lateral markings. Short antennae and six legs visible underneath. Smooth, glossy exoskeleton with reflective surface. Clean studio lighting on solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
    frontPrompt:
      "3D biological asset of a ladybug, frontal view showcasing the black pronotum with white markings, short clubbed antennae, and compound eyes. The red elytra meet in a straight line down the center with distinctive black spot pattern. Six legs partially visible beneath the dome-shaped body. Glossy red and black coloration with smooth texture, pure solid white background, professional scientific visualization, shadowless studio lighting, centered positioning, square aspect ratio --ar 1:1",
    backPrompt:
      "3D biological asset of a ladybug, dorsal view displaying the characteristic hemispherical shape with bright red elytra and symmetrical black spots. The spot pattern is clearly defined against the glossy red background. The suture line where elytra meet is visible down the center. Smooth polished texture with natural sheen, clean scientific illustration style, pure solid white background, uniform laboratory lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
  },
};
