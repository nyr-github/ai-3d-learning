import type { Entity3D } from "@/data/types";

export const whiteBloodCell: Entity3D = {
  id: "white-blood-cell",
  name: "White Blood Cell",
  subtitle: "Immune Cell · Body's Guardian",
  mainCategory: "Cells",
  subCategory: "Specialized Cells",
  accent: "#c8a2d8",
  description:
    "White blood cells are core members of the immune system, patrolling through blood and lymph. They can recognize invading pathogens and protect the body's homeostasis.",
  attributes: [
    { name: "Size Range", value: "6 – 20", unit: "μm", min: 6, max: 20 },
    {
      name: "Location",
      value: "Blood, lymphatic system, bone marrow, and infected tissues",
    },
    {
      name: "Where It Occurs",
      value:
        "In every drop of blood, millions of white blood cells patrol your body around the clock.",
    },
    { name: "Habitat", value: "Blood · Bone Marrow · Spleen · Lymph Nodes" },
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
        "Requires Wright's or Giemsa staining in blood smears to view the distinct lobed nuclei.",
    },
    {
      name: "EM Note",
      value:
        "Shows active surface pseudopodia and rich intracellular phagocytic vesicles.",
    },
    {
      name: "Key Structures",
      value: {
        "Irregular Nucleus":
          "Varies by subtype; lobed (Neutrophils) or horseshoe-shaped (Monocytes) to help pass through narrow gaps",
        "Cell Membrane & Pseudopodia":
          "Can actively deform for amoeboid movement",
      },
    },
  ],
  funFact:
    "A healthy adult produces approximately 100 billion new white blood cells daily.",
  teachingFocus:
    "Observe how its lobed nucleus and dynamic membrane facilitate amoeboid movement.",
  tags: [
    "Immune Response",
    "Phagocytosis",
    "Amoeboid Movement",
    "Active Deformation",
  ],
  model3D: {
    modelUrl: "/models/bio/white-blood-cell.glb",
    imageUrl: "/models/bio/white-blood-cell.webp",
    fileSize: 3531228,
    defaultRotation: { x: 0, y: 0, z: 20 },
    displayScale: 1.1,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of an amoeboid white blood cell, 90-degree wedge cutout styling. A 1/4 section is cut away from the front right side to reveal flat perpendicular internal planes showing a deeply segmented lobed purple nucleus and digestive lysosomes inside granular cytoplasm. The rest of the 3D model forms a continuous, highly dynamic outer plasma membrane covered in irregular ruffles, microvilli, and prominent pseudopodia extensions. Complete multi-lobed geometric 3D structure, clear sectional depth, pure solid white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
    frontPrompt:
      "3D immunobiological rendering of an irregular, amoeboid white blood cell, 90-degree wedge cutout view from the front, eye-level. A 1/4 section is cleanly cut away from the front right side, exposing flat perpendicular internal planes. Inside the granular cytoplasm, a deeply segmented lobed purple nucleus, microscopic lysosomes, and active phagocytic vacuoles are revealed in sharp detail. The complex asymmetric perimeter of the cell's membrane pseudopodia is captured perfectly along the 3/4 remaining body. Premium laboratory visualization style, extreme structural definition, solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
    backPrompt:
      "3D immunobiological rendering of an irregular, amoeboid white blood cell (leukocyte), intact posterior full view from the back, eye-level. Showing the highly dynamic, heavily ruffled outer plasma membrane. The surface is covered in irregular folds, microvilli, and prominent pseudopodia arm extensions frozen in a predatory movement state. The silhouette matches the complex, asymmetric boundary of the front view exactly. Clean 3D asset presentation, solid pure white background, uniform studio lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
  },
};
