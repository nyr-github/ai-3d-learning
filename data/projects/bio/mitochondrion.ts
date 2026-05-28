import type { Entity3D } from "@/data/types";

export const mitochondrion: Entity3D = {
  id: "mitochondrion",
  name: "Mitochondrion",
  subtitle: "Organelle · Cell's Powerhouse",
  mainCategory: "Organelles",
  subCategory: "Subcellular Structures",
  accent: "#d97b5a",
  description:
    "Mitochondria are the 'powerhouses' of eukaryotic cells, with nearly all energy-requiring life activities depending on them. Through aerobic respiration, they convert chemical energy into ATP.",
  attributes: [
    { name: "Size Range", unit: "μm", min: 1, max: 10 },
    { name: "Location", value: "Cytoplasm of almost all eukaryotic cells" },
    {
      name: "Where It Occurs",
      value:
        "Denser in cells with high energy demands, such as cardiac muscle, skeletal muscle, and liver cells.",
    },
    { name: "Habitat", value: "Animals · Plants · Fungi · Protists" },
    {
      name: "Microscope Visibility",
      value: {
        "Light Microscope": "Staining Required",
        "Electron Microscope": "Visible",
      },
    },
    {
      name: "LM Note",
      value:
        "Visible as tiny granules or rods only after Janus Green B vital staining.",
    },
    {
      name: "EM Note",
      value:
        "Displays detailed double-membrane structure and the elaborate folds of internal cristae.",
    },
    {
      name: "Key Structures",
      value: {
        "Inner Membrane & Cristae":
          "Folds inward to form 'cristae', expanding surface area for electron transport chain enzymes",
        Matrix:
          "Fluid region enclosed by the inner membrane; contains enzymes for the Krebs cycle",
      },
    },
  ],
  funFact:
    "Mitochondria are believed to have originated from an ancient aerobic bacterium engulfed by a primitive eukaryote.",
  teachingFocus:
    "Correlate structural compartmentalization with biochemical steps: Krebs cycle occurs in the Matrix; ETC occurs on the Cristae.",
  tags: [
    "Double Membrane",
    "ATP Synthesis",
    "Aerobic Respiration",
    "Endosymbiosis",
    "Maternal Inheritance",
  ],
  model3D: {
    modelUrl: "/models/bio/mitochondrion.glb",
    imageUrl: "/models/bio/mitochondrion.webp",
    fileSize: 1240456,
    defaultRotation: { x: 20, y: 90, z: 60 },
    displayScale: 1.2,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of an oval mitochondrion, 90-degree wedge cutout styling. A 1/4 piece is carved out from the front right quadrant of the bean-shaped organelle. The perpendicular cross-section planes reveal double-membrane anatomy: a smooth outer membrane border, an inner membrane folding into pinkish-orange cristae channels, and a fluid central matrix. The remaining 3/4 forms a continuous, completely enclosed capsule exterior with an organic matte brown lipid texture. Accurate 3D asset geometry, high-end medical definition, solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
    frontPrompt:
      "3D organelle model of an oval mitochondrion, 90-degree wedge cutout view from the front, eye-level. A 1/4 piece is cleanly removed from the front right quadrant of the bean-shaped organelle with sharp perpendicular cut lines. The exposed internal planes display the dual-membrane anatomy perfectly: a smooth outer membrane border, an inner membrane folding intricately into sharp, pinkish-orange cristae channels, and a central matrix fluid containing mitochondrial DNA and tiny ATP synthase spheres. Hyper-detailed medical illustration, clear geometric structure, pure solid white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
    backPrompt:
      "3D organelle model of an oval mitochondrion, intact posterior full view from the exact back, eye-level. Representing the totally enclosed, continuous, smooth capsule-like exterior shell of the organelle. The outer membrane displays an organic matte, warm brown lipid texture with fine, clean pores. Capsule silhouette aligns exactly with the cutaway front counterpart. Professional 3D science asset style, solid pure white background, uniform soft lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
  },
};
