import type { Entity3D } from "@/data/types";

export const dragonfly: Entity3D = {
  id: "dragonfly",
  name: "Dragonfly",
  subtitle: "Aerial Predator · Odonata",
  mainCategory: "Insects",
  subCategory: "Flying Insects",
  accent: "#4682B4",
  description:
    "Dragonflies are ancient predators that have existed for over 300 million years. They are among the most efficient hunters in the insect world, with a hunting success rate of up to 95%. Their exceptional flight capabilities allow them to hover, fly backward, and reach speeds of 35 mph.",
  attributes: [
    { name: "Body Length", unit: "mm", min: 20, max: 120 },
    { name: "Wingspan", unit: "mm", min: 30, max: 160 },
    {
      name: "Distribution",
      value: "Worldwide (except Antarctica)",
    },
    {
      name: "Habitat",
      value: "Freshwater Ecosystems · Wetlands · Ponds · Streams",
    },
    {
      name: "Key Features",
      value: {
        "Compound Eyes": "Up to 30,000 facets providing nearly 360° vision",
        "Independent Wings": "Four wings that can move independently for agile flight",
        "Spiny Legs": "Form a basket to catch prey mid-flight",
      },
    },
    {
      name: "Life Cycle",
      value: {
        "Nymph Stage": "Aquatic larvae living in water for months to years",
        "Metamorphosis": "Incomplete metamorphosis (hemimetabolous)",
      },
    },
    {
      name: "Ecological Role",
      value: "Top insect predator, mosquito control, and bioindicator species",
    },
  ],
  funFact:
    "Dragonflies have existed since the Carboniferous period, and their prehistoric ancestors had wingspans of up to 70 cm (28 inches).",
  teachingFocus:
    "Study the compound eye structure, independent wing movement mechanism, and observe the aquatic nymph to terrestrial adult metamorphosis.",
  tags: [
    "Odonata",
    "Aerial Predator",
    "Aquatic Larvae",
    "Bioindicator",
    "Ancient Lineage",
  ],
  model3D: {
    modelUrl: "/models/insect/dragonfly.glb",
    imageUrl: "/models/insect/dragonfly.webp",
    fileSize: 2668128,
    defaultRotation: { x: 0, y: 0, z: 0 },
    displayScale: 1.0,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of a dragonfly insect, scientific illustration style. Hyper-realistic rendering showing elongated abdomen, large multifaceted compound eyes dominating the head, and two pairs of transparent membranous wings with intricate venation. Iridescent blue-green coloration with detailed exoskeleton. Wings spread horizontally in characteristic dragonfly posture. Clean studio lighting on solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
    frontPrompt:
      "3D biological asset of a dragonfly, frontal view showcasing enormous compound eyes that nearly touch, short antennae, and powerful mandibles. The thorax displays wing attachment points with four delicate wings extending laterally. Six spiny legs positioned forward forming a catching basket. Iridescent coloration with microscopic texture, pure solid white background, professional scientific visualization, shadowless studio lighting, centered positioning, square aspect ratio --ar 1:1",
    backPrompt:
      "3D biological asset of a dragonfly, dorsal view displaying the characteristic horizontal wing posture with all four wings fully extended. The elongated segmented abdomen shows clear segmentation patterns. Wing venation reveals the complex network of veins and cells. Iridescent blue-green exoskeleton with natural sheen, clean scientific illustration style, pure solid white background, uniform laboratory lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
  },
};
