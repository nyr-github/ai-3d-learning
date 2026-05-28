import type { Entity3D } from "@/data/types";

export const plantCell: Entity3D = {
  id: "plant-cell",
  name: "Plant Cell",
  subtitle: "Eukaryotic Cell · Autotrophic Organism",
  mainCategory: "Cells",
  subCategory: "Basic Cell Types",
  accent: "#7fb069",
  description:
    "Plant cells are the basic units that make up plants. Unlike animal cells, they possess a rigid cell wall, chloroplasts capable of photosynthesis, and large vacuoles for storing nutrients and water, enabling them to maintain their shape while providing energy for the entire ecosystem.",
  attributes: [
    { name: "Size Range", unit: "μm", min: 10, max: 100 },
    {
      name: "Location",
      value: "Roots, stems, leaves, flowers, and fruits of plants",
    },
    {
      name: "Where It Occurs",
      value:
        "From mosses to towering trees, plant cells are ubiquitous in building the green landscape of our planet.",
    },
    { name: "Habitat", value: "Terrestrial Plants · Aquatic Algae · Ferns" },
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
        "Cell wall, nucleus, and large vacuole are easily observable under low power.",
    },
    {
      name: "EM Note",
      value:
        "Reveals fine structures of all organelles including endomembrane networks.",
    },
    {
      name: "Key Structures",
      value: {
        "Cell Wall":
          "Made of cellulose, provides structural support and mechanical protection",
        Chloroplast:
          "Site of photosynthesis, converts light energy into organic compounds",
        "Large Vacuole":
          "Stores water, sugars, and pigments; maintains turgor pressure",
      },
    },
  ],
  funFact:
    "A mature leaf may contain millions of chloroplasts, making every breath on Earth sweeter.",
  teachingFocus:
    "Compare with Animal Cells to grasp the structures exclusive to plants (Cell Wall, Chloroplast, Large Vacuole) and understand how they maintain turgor pressure.",
  tags: [
    "Eukaryote",
    "Autotrophic",
    "Cell Wall",
    "Double Membrane",
    "Turgor Pressure",
  ],
  model3D: {
    modelUrl: "/models/bio/plant-cell.glb",
    imageUrl: "/models/bio/plant-cell.webp",
    fileSize: 2302256,
    defaultRotation: { x: 0, y: 0, z: 20 },
    displayScale: 1.0,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of a plant cell, 90-degree wedge cutout styling. One-quarter of the structure is cleanly removed from the front right quadrant to reveal internal biological components: a massive teal-blue central vacuole, bright green chloroplasts, and a purple spherical nucleus. The remaining three-quarters of the model shows a continuous, unbroken exterior shell with a matte waxy green cellulose cell wall texture and microscopic plasmodesmata pores. Complete volumetric 3D model, sharp internal cutting planes, consistent front-to-back geometric definition, studio lighting on solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
    frontPrompt:
      "3D biological asset of a plant cell, 90-degree wedge cutout view from the front, eye-level. One-quarter of the cell structure is cleanly removed from the front right quadrant with a sharp laser-cut finish, revealing a stunning three-dimensional internal look: a massive, turgid, semi-transparent teal-blue central vacuole, bright green chloroplasts with visible thylakoid stacks, a highly detailed purple spherical nucleus, and mitochondria. The dual 90-degree internal cut planes perfectly expose the thick green rigid cell wall layers alongside the intact remaining exterior shell. Professional medical visualization, micro-occlusion rendering, crisp textures, pure solid white background, shadowless studio lighting, centered positioning, square aspect ratio --ar 1:1",
    backPrompt:
      "3D biological asset of a plant cell, intact posterior full view from the exact back, eye-level. Showing the completely unbroken, rigid exterior shell of the plant cell. The surface displays a sharp polygonal geometric structure with microscopic cellulose fiber patterns, interconnected plasmodesmata pores, and an organic matte waxy green texture. Perfectly matches the shape, silhouette, and orientation of the front view. Professional scientific model, clean textures, pure solid white background, uniform laboratory lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
  },
};
