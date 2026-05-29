import type { Entity3D } from "@/data/types";

export const plumedBasilisk: Entity3D = {
  id: "plumed-basilisk",
  name: "Plumed Basilisk",
  subtitle: "The Jesus Lizard · Crested Torrent Dweller",
  mainCategory: "Reptiles",
  subCategory: "Iguania (Corytophanidae)",
  accent: "#1abc9c",
  description:
    "An extraordinary semi-aquatic lizard native to Central American rainforests. This 3D asset showcases its breathtaking emerald and turquoise scale coloration, prominent sail-like dorsal crests, and dual head plumes. It is universally famous for its incredible bipedal hydroplaning ability, allowing it to sprint across open water surfaces.",
  attributes: [
    { name: "Scientific Name", value: "Basiliscus plumifrons" },
    {
      name: "Specimen Grade",
      value: "Master Exhibition Level (Showcasing dual-crests)",
    },
    {
      name: "Morph & Coloration",
      value: "Vibrant Emerald Green with Cobalt Blue Speckles",
    },
    {
      name: "Anatomical Appraisal",
      value: {
        "Cranial Plume":
          "High-developed dual lobe cartilage crest, symmetrical curvature",
        "Dorsal Sail":
          "Highly elevated fin-like crest supported by elongated neural spines",
        "Scale Texture":
          "Finely granulated, overlapping matte scales with high hydrophobic properties",
        "Tail-to-Body Ratio":
          "Ultra-long stabilizing tail, comprising approximately 70% of total length",
      },
    },
    {
      name: "Locomotion Dynamics",
      value: {
        "Water Running Speed": "Up to 1.5 meters per second on water surface",
        "Foot Morphology":
          "Specialized fringes of skin on rear toes that unfurl into micro-paddles",
      },
    },
    {
      name: "Awards",
      value: [
        "World Herpetology Expo - Best Evolutionary Adaptation Display",
        "Grand Prize - Exotic Reptile Aesthetic Sculpting 2026",
      ],
    },
  ],
  funFact:
    "When running on water, their specialized fringed toes trap tiny air bubbles underneath them, acting as natural hydrofoils to support their body weight!",
  teachingFocus:
    "Analyze the fluid dynamics of reptilian hydroplaning, explore the evolutionary skeletal modifications supporting large decorative sails, and master vibrant iridescent reptilian texturing.",
  tags: [
    "Water Runner",
    "Plumed Basilisk",
    "Emerald Scale",
    "Dorsal Crest",
    "Corytophanidae",
  ],
  model3D: {
    modelUrl: "/models/lizard/plumed-basilisk.glb",
    imageUrl: "/models/lizard/plumed-basilisk.webp",
    fileSize: 2014344,
    defaultRotation: { x: 10, y: -45, z: 0 },
    displayScale: 1.25,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of a Plumed Basilisk lizard, designed as a perfect 1/2 longitudinal biological cross-section, presented at a 30-degree tilted isometric perspective. Sliced cleanly down the centerline: the left half reveals the complete dazzling emerald-green skin, turquoise speckles, large webbed toe fringes, and glorious fan-like dorsal crests. The exact right half opens into an intricate anatomical cutaway, exposing the delicate skull structure, the rows of elongated neural vertebrae spines supporting the fin, and the respiratory system. Complete volumetric 3D reptile mesh, solid pure white background, studio illumination, shadowless, --ar 1:1",
    frontPrompt:
      "3D scientific rendering of a Plumed Basilisk lizard, 1/2 mechanical and biological cross-section view from the front, tilted at a 30-degree angle. Sliced plane faces the camera to meticulously expose the inner muscular layout and vertebrae. The intact side captures the breathtaking neon-green and blue scale patterns, the large golden-yellow expressive eye, and the rigid crest definition. High-fidelity rendering, sharp occlusion, solid pure white background, --ar 1:1",
    backPrompt:
      "3D asset of the Plumed Basilisk lizard, intact posterior full view from the exact back, matching the 30-degree tilted orientation perfectly. Showing the continuous, unbroken opposite side of the reptile with its exceptionally long, slender tail tapering to a fine point. Features the continuous ridge of the spine, fine waxy scale textures, and muscular hind legs. Symmetrical silhouette that mirrors the front cutaway on a solid pure white background, shadowless, --ar 1:1",
  },
};
