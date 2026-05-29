import type { Entity3D } from "@/data/types";

export const frilledLizard: Entity3D = {
  id: "frilled-lizard",
  name: "Frilled Lizard",
  subtitle: "The Neck-Frilled Dragon · Defensive Master",
  mainCategory: "Reptiles",
  subCategory: "Agamidae (Dragon Lizards)",
  accent: "#c17f59",
  description:
    "An extraordinary agamid lizard native to northern Australia and southern New Guinea, renowned for its spectacular defensive display. This 3D asset showcases its most distinctive feature: a massive frill of skin supported by elongated hyoid bones that can expand to three times the lizard's body width. When threatened, it rears up on its hind legs, opens its frill dramatically, and gapes its mouth to intimidate predators in one of nature's most impressive bluff displays.",
  attributes: [
    { name: "Scientific Name", value: "Chlamydosaurus kingii" },
    {
      name: "Specimen Grade",
      value: "Museum Quality (Full frill extension display)",
    },
    {
      name: "Morph & Coloration",
      value: "Earthen Brown-Gray with Orange-Red Frill Interior",
    },
    {
      name: "Anatomical Appraisal",
      value: {
        "Frill Structure":
          "Elastic skin membrane supported by elongated hyoid bone spines, fully deployable",
        "Frill Diameter":
          "Expands to 30cm+ span, creating three times body width intimidation display",
        "Scale Texture":
          "Fine granular dorsal scales with keeled texture for camouflage",
        "Bipedal Stance":
          "Specialized hind limb morphology enabling rapid bipedal sprinting",
      },
    },
    {
      name: "Defensive Behaviors",
      value: {
        "Frill Display":
          "Instantaneous deployment with mouth gaping and hissing",
        "Bipedal Running": "Rapid escape on hind legs with tail counterbalance",
        "Color Change":
          "Frill interior darkens to deeper reds during threat display",
      },
    },
    {
      name: "Awards",
      value: [
        "National Geographic Wildlife Photography - Best Defensive Behavior 2026",
        "Australian Museum Excellence Award - Most Dramatic Display Species",
      ],
    },
  ],
  funFact:
    "The frilled lizard's neck frill isn't just for show—it's supported by bones connected to its jaw! When the lizard opens its mouth, the frill automatically deploys like an umbrella, making the entire display instantaneous and terrifying to predators!",
  teachingFocus:
    "Examine the biomechanics of the hyoid bone frill support system, study the evolutionary advantages of defensive bluff displays versus actual combat, and analyze the specialized adaptations for bipedal locomotion in arboreal lizards.",
  tags: [
    "Frilled Dragon",
    "Defensive Display",
    "Bipedal Runner",
    "Agamidae",
    "Australian Wildlife",
  ],
  model3D: {
    modelUrl: "/models/lizard/frilled-lizard.glb",
    imageUrl: "/models/lizard/frilled-lizard.webp",
    fileSize: 1738204,
    defaultRotation: { x: 0, y: -45, z: 0 },
    displayScale: 1.15,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of a Frilled Lizard, designed as a perfect 1/2 longitudinal biological cross-section, presented at a 30-degree tilted isometric perspective. Sliced cleanly down the centerline: the left half reveals the complete earthen-brown scaly exterior with the spectacular expanded frill collar showing vibrant orange-red interior membrane. The exact right half opens into an intricate anatomical cutaway, exposing the elongated hyoid bone structure supporting the frill, skull anatomy, and respiratory system. Complete volumetric 3D reptile mesh, solid pure white background, studio illumination, shadowless, --ar 1:1",
    frontPrompt:
      "3D scientific rendering of a Frilled Lizard in defensive display pose, 1/2 mechanical and biological cross-section view from the front, tilted at a 30-degree angle. Sliced plane faces the camera to meticulously expose the inner hyoid bone frill support mechanism and jaw anatomy. The intact side captures the fully expanded frill with vivid orange-red interior, open mouth with teeth, and intense golden eyes. High-fidelity rendering, sharp occlusion, solid pure white background, --ar 1:1",
    backPrompt:
      "3D asset of the Frilled Lizard, intact posterior full view from the exact back, matching the 30-degree tilted orientation perfectly. Showing the continuous, unbroken opposite side with the external frill surface in natural brown-gray camouflage coloration, the dorsal scale texture, and long balancing tail. Features the subtle ridge patterns where the hyoid bones connect. Symmetrical silhouette that mirrors the front cutaway on a solid pure white background, shadowless, --ar 1:1",
  },
};
