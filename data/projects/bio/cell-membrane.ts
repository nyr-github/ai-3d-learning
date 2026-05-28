import type { Entity3D } from "@/data/types";

export const cellMembrane: Entity3D = {
  id: "cell-membrane",
  name: "Cell Membrane",
  subtitle: "Subcellular Structure · Fluid Mosaic Model",
  mainCategory: "Organelles",
  subCategory: "Subcellular Structures",
  accent: "#e67e22",
  description:
    "The cell membrane is a dynamic, semi-permeable biological membrane that regulates the transport of materials and mediates cell signaling.",
  attributes: [
    {
      name: "Size Range",
      value: "7 – 10",
      unit: "nm (Thickness)",
      min: 7,
      max: 10,
    },
    {
      name: "Location",
      value: "Surrounding the cytoplasm of all living cells",
    },
    {
      name: "Where It Occurs",
      value:
        "An absolute universal component of life—no cell can exist without a cell membrane to define its boundaries.",
    },
    { name: "Habitat", value: "All Living Organisms" },
    {
      name: "Microscope Visibility",
      value: {
        "Light Microscope": "Invisible",
        "Electron Microscope": "Visible",
      },
    },
    {
      name: "LM Note",
      value: "Too thin (~10nm) to be resolved by optical light microscopes.",
    },
    {
      name: "EM Note",
      value:
        "Appears as a classic 'dark-light-dark' trilaminar structure under TEM.",
    },
    {
      name: "Key Structures",
      value: {
        "Phospholipid Bilayer":
          "The core framework; hydrophilic phosphate heads face outward, hydrophobic fatty acid tails face inward",
        "Embedded Proteins":
          "Integral and peripheral proteins acting as channels, pumps, or receptors",
      },
    },
  ],
  funFact: "The cell membrane is as fluid as olive oil!",
  teachingFocus:
    "Master the structure of phospholipids (amphipathic nature) and distinguish between Passive and Active Transport.",
  tags: [
    "Phospholipid Bilayer",
    "Fluid Mosaic",
    "Selective Permeability",
    "Glycoprotein",
    "Transport",
  ],
  model3D: {
    modelUrl: "/models/bio/cell-membrane.glb",
    imageUrl: "/models/bio/cell-membrane.webp",
    fileSize: 4790932,
    defaultRotation: { x: 45, y: 0, z: 45 },
    displayScale: 1.1,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D macromolecular block diagram of the cell membrane fluid mosaic model, 90-degree corner cutout perspective. A 1/4 corner block is removed from the front right side, exposing perpendicular vertical cross-section planes that show dual-layer lipid alignments (blue hydrophilic head spheres, yellow fatty acid tails) and sliced purple protein channels. The remaining outer surfaces form a continuous extracellular sheet showing an organized mosaic landscape of blue lipid spheres with green branched glycoprotein chains sprouting upward. Technical 3D graphic block mesh, solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
    frontPrompt:
      "3D macromolecular block diagram of the cell membrane fluid mosaic model, 90-degree corner cutout perspective view from the front. A 1/4 corner block is cleanly removed from the front right side, exposing two sharp perpendicular vertical cross-section planes. The cuts show the exact internal arrangement of the lipid bilayer with blue hydrophilic head spheres and yellow fatty acid tails, alongside massive purple protein channels sliced in half. The top surface remains intact showing a mosaic landscape of lipid heads and glycoproteins. Technical asset style, pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
    backPrompt:
      "3D macromolecular block diagram of the cell membrane fluid mosaic model, intact posterior full view from the opposite angle, eye-level. Showing the continuous, unbroken extracellular top surface sheet. The surface is an organized mosaic landscape composed entirely of dense blue lipid spheres, from which multiple green branched carbohydrate chains (glycoproteins and glycolipids) sprout upward like tiny antennas. Clean block boundary alignment that matches the front cutaway structure. Technical 3D graphic asset, solid pure white background, uniform flat lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
  },
};
