import type { Entity3D } from "@/data/types";

export const animalCell: Entity3D = {
  id: "animal-cell",
  name: "Animal Cell",
  subtitle: "Eukaryotic Cell · Heterotrophic Organism",
  mainCategory: "Cells",
  subCategory: "Basic Cell Types",
  accent: "#e8859a",
  description:
    "Animal cells lack cell walls and chloroplasts, relying on flexible cell membranes and rich organelles to collaborate in metabolism and movement.",
  attributes: [
    { name: "Size Range", value: "10 – 30", unit: "μm", min: 10, max: 30 },
    { name: "Location", value: "Tissues and organs of all animals" },
    {
      name: "Where It Occurs",
      value:
        "From single-celled protozoa to whales, all animal bodies are composed of animal cells.",
    },
    { name: "Habitat", value: "Mammals · Fish · Insects · Birds" },
    {
      name: "Microscope Visibility",
      value: {
        "Light Microscope": "Visible",
        "Electron Microscope": "Visible",
      },
    },
    {
      name: "LM Note",
      value:
        "Requires basic staining (like methylene blue) to clearly distinguish the nucleus and cytoplasm.",
    },
    {
      name: "EM Note",
      value:
        "Reveals complex organelle collaboration and cytoskeletal structures.",
    },
    {
      name: "Key Structures",
      value: {
        "Cell Membrane":
          "Phospholipid bilayer, selectively controls substance entry and exit via the fluid mosaic model",
        Nucleus: "Genetic center, contains DNA, chromatin and nucleolus",
      },
    },
  ],
  funFact:
    "An average adult human body contains approximately 37 trillion cells.",
  teachingFocus:
    "Focus on the Endomembrane System (ER -> Golgi -> Membrane) to understand how secretory proteins are synthesized.",
  tags: ["Eukaryote", "Heterotrophic", "Fluid Mosaic", "Organelle Cooperation"],
  model3D: {
    modelUrl: "/models/bio/animal-cell.glb",
    imageUrl: "/models/bio/animal-cell.webp",
    fileSize: 1925172,
    defaultRotation: { x: 87, y: 20, z: 0 },
    displayScale: 1.0,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of a hemisphere animal cell, designed as a perfect 1/2 longitudinal cross-section, presented at a 30-degree tilted isometric perspective. The model is cleanly divided into two halves; the prominent flat interior cross-section face completely exposes cellular anatomy: a prominent blue spherical nucleus, pink rough endoplasmic reticulum, and orange mitochondria embedded in cytoplasm. The exact flip side (posterior) forms the remaining intact 1/2 hemisphere dome showing a continuous outer cell membrane with a microscopic lipid fluid mosaic texture. Complete half-sphere volumetric 3D mesh, sharp rim boundaries, solid pure white background, shadowless studio lighting, centered positioning, square aspect ratio --ar 1:1",
    frontPrompt:
      "3D medical illustration of a spherical animal cell cut exactly in half (1/2 cross-section view), viewed from an isometric perspective tilted at a 30-degree angle. The large, flat, circular internal plane faces the camera, fully exposing the detailed cellular interior embedded in translucent pink cytoplasm: a massive blue nucleus with chromatin fibers, extensive dense pink rough endoplasmic reticulum with tiny ribosomes, and vibrant orange mitochondria. The razor-sharp cut rim defines the circular boundary of the cell membrane. High-fidelity cinematic scientific render, ambient occlusion, solid pure white background, shadowless, centered, square aspect ratio --ar 1:1",
    backPrompt:
      "3D medical illustration of a hemisphere animal cell, intact posterior full view from the exact back, matching the 30-degree tilted orientation perfectly. Since the cell is cut in half, this view shows the completely unbroken, continuous 1/2 dome exterior shell of the animal cell membrane from behind. The surface features a rich microscopic fluid mosaic lipid bilayer texture, dotted with fine glycoprotein receptors. Solid half-sphere silhouette that perfectly mirrors and aligns with the 1/2 front cross-section. Professional 3D asset style, solid pure white background, uniform laboratory diffuse lighting, shadowless, centered, square aspect ratio --ar 1:1",
  },
};
