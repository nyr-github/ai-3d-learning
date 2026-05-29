import type { Entity3D } from "@/data/types";

export const honeybee: Entity3D = {
  id: "honeybee",
  name: "Honeybee",
  subtitle: "Pollinator · Hymenoptera",
  mainCategory: "Insects",
  subCategory: "Social Insects",
  accent: "#FFA500",
  description:
    "Honeybees are essential pollinators and master architects, building precise hexagonal wax combs. They communicate through sophisticated waggle dances to share food source locations. A single colony may contain 50,000-60,000 individuals working in perfect coordination, producing honey as food storage for winter survival.",
  attributes: [
    { name: "Body Length", unit: "mm", min: 12, max: 20 },
    {
      name: "Distribution",
      value: "Worldwide (managed and wild populations)",
    },
    {
      name: "Habitat",
      value: "Flowering Ecosystems · Gardens · Agricultural Areas · Forests",
    },
    {
      name: "Colony Structure",
      value: {
        "Queen": "Single reproductive female, lives 2-5 years",
        "Workers": "Female non-reproductive, 40,000-60,000 per colony",
        "Drones": "Male bees, several hundred, mating purpose only",
      },
    },
    {
      name: "Key Features",
      value: {
        "Pollen Baskets": "Corbiculae on hind legs for pollen transport",
        "Waggle Dance": "Complex communication system for food location",
        "Stinger": "Barbed stinger (workers), fatal to bee when used on mammals",
      },
    },
    {
      name: "Ecological Role",
      value: "Primary pollinator for 75% of global food crops",
    },
  ],
  funFact:
    "To produce one pound of honey, honeybees must visit approximately 2 million flowers and fly a combined distance equal to three times around the Earth.",
  teachingFocus:
    "Examine the pollen baskets on hind legs, wing venation, and understand the waggle dance communication system and caste-based colony organization.",
  tags: [
    "Hymenoptera",
    "Eusocial",
    "Pollinator",
    "Waggle Dance",
    "Agricultural Importance",
  ],
  model3D: {
    modelUrl: "/models/insect/honeybee.glb",
    imageUrl: "/models/insect/honeybee.webp",
    fileSize: 2791224,
    defaultRotation: { x: 0, y: 0, z: 0 },
    displayScale: 1.0,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of a honeybee, scientific illustration style. Hyper-realistic rendering showing fuzzy body with distinctive yellow and black abdominal stripes, two pairs of transparent wings with hooking mechanism (hamuli), and branched body hairs. Compound eyes and elbowed antennae visible. Pollen baskets (corbiculae) on hind legs. Clean studio lighting on solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
    frontPrompt:
      "3D biological asset of a honeybee, frontal view showcasing large compound eyes, elbowed antennae, and chewing-lapping mouthparts with proboscis. The thorax shows dense branched hairs (plumose setae) and wing attachment points. Front legs with antenna cleaners visible, hind legs showing pollen baskets. Golden-yellow and black coloration with fuzzy texture, pure solid white background, professional scientific visualization, shadowless studio lighting, centered positioning, square aspect ratio --ar 1:1",
    backPrompt:
      "3D biological asset of a honeybee, dorsal view displaying the striped abdomen with alternating yellow and black bands. The thorax shows dense hair covering and four wings folded along the back (forewings larger than hindwings). The stinger is visible at the abdomen tip. Detailed fuzzy texture with natural coloration, clean scientific illustration style, pure solid white background, uniform laboratory lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
  },
};
