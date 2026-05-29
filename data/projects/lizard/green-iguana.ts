import type { Entity3D } from "@/data/types";

export const greenIguana: Entity3D = {
  id: "green-iguana",
  name: "Green Iguana",
  subtitle: "The Common Iguana · Arboreal Herbivore Giant",
  mainCategory: "Reptiles",
  subCategory: "Iguanidae (True Iguanas)",
  accent: "#2ecc71",
  description:
    "A large, primarily arboreal lizard native to Central and South America and the Caribbean. This 3D asset captures the species in its vibrant juvenile green coloration, featuring the characteristic dorsal crest of elongated spines running from neck to tail, prominent dewlap throat fan, and the distinctive subtypanic scale below the ear. Despite their name, adults often transition to orange or blue-green hues, but this specimen showcases the iconic emerald phase that made them famous in the pet trade and ecological studies.",
  attributes: [
    { name: "Scientific Name", value: "Iguana iguana" },
    {
      name: "Specimen Grade",
      value: "Prime Juvenile Coloration (Vibrant Emerald Phase)",
    },
    {
      name: "Morph & Coloration",
      value: "Brilliant Emerald Green with Black Banding",
    },
    {
      name: "Anatomical Appraisal",
      value: {
        "Dorsal Crest":
          "Prominent row of 18-20 elongated triangular spines along vertebral ridge",
        Dewlap:
          "Large expandable throat fan used for thermoregulation and display",
        "Subtypanic Scale":
          "Oversized circular scale below tympanum, diagnostic species identifier",
        "Tail Proportion":
          "Exceptionally long prehensile tail comprising 65-70% of total body length",
      },
    },
    {
      name: "Ecological Adaptations",
      value: {
        "Arboreal Mastery":
          "Specialized toe pads and sharp claws for branch climbing",
        "Herbivore Dentition":
          "Pleurodont teeth adapted for leaf shearing and fruit consumption",
        "Parietal Eye":
          "Light-sensitive third eye on crown for predator detection from above",
      },
    },
    {
      name: "Awards",
      value: [
        "International Reptile Conservation Foundation - Flagship Species Award 2026",
        "Tropical Ecology Research Prize - Best Arboreal Adaptation Model",
      ],
    },
  ],
  funFact:
    "Green iguanas have a 'third eye' on top of their head called the parietal eye! It can't see images, but it detects changes in light and shadow, warning them of predators approaching from above—like hungry birds of prey!",
  teachingFocus:
    "Investigate the functional morphology of the parietal eye and its role in predator detection, examine the specialized dentition for herbivorous diets in reptiles, and study the biomechanics of arboreal locomotion with prehensile tail balance.",
  tags: [
    "Green Iguana",
    "Arboreal Species",
    "Herbivore",
    "Iguanidae",
    "Central American Wildlife",
  ],
  model3D: {
    modelUrl: "/models/lizard/green-iguana.glb",
    imageUrl: "/models/lizard/green-iguana.webp",
    fileSize: 1897988,
    defaultRotation: { x: 5, y: -30, z: 0 },
    displayScale: 1.3,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of a Green Iguana, designed as a perfect 1/2 longitudinal biological cross-section, presented at a 30-degree tilted isometric perspective. Sliced cleanly down the centerline: the left half reveals the complete brilliant emerald-green scaly exterior with prominent dorsal crest spines, large dewlap throat fan, and prehensile banded tail. The exact right half opens into an intricate anatomical cutaway, exposing the skull with parietal eye structure, digestive system adapted for herbivory, and vertebral column supporting the crest. Complete volumetric 3D reptile mesh, solid pure white background, studio illumination, shadowless, --ar 1:1",
    frontPrompt:
      "3D scientific rendering of a Green Iguana, 1/2 mechanical and biological cross-section view from the front, tilted at a 30-degree angle. Sliced plane faces the camera to meticulously expose the inner digestive tract, herbivore dentition, and dewlap musculature. The intact side captures the vibrant green coloration, golden eye with subtypanic scale, distinctive head crest, and the characteristic black body banding. High-fidelity rendering, sharp occlusion, solid pure white background, --ar 1:1",
    backPrompt:
      "3D asset of the Green Iguana, intact posterior full view from the exact back, matching the 30-degree tilted orientation perfectly. Showing the continuous, unbroken opposite side with the complete row of dorsal crest spines tapering down the spine, the exceptionally long striped tail, and powerful climbing claws. Features the detailed keeled scale texture and muscular structure. Symmetrical silhouette that mirrors the front cutaway on a solid pure white background, shadowless, --ar 1:1",
  },
};
