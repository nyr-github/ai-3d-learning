import type { Entity3D } from "@/data/types";

export const bacterialCell: Entity3D = {
  id: "bacterial-cell",
  name: "Bacterial Cell",
  subtitle: "Prokaryotic Cell · Unicellular Organism",
  mainCategory: "Cells",
  subCategory: "Basic Cell Types",
  accent: "#4da6db",
  description:
    "Bacterial cells represent prokaryotic life. They lack a nuclear membrane and membrane-bound organelles. Their genetic material floats freely in the nucleoid region.",
  attributes: [
    { name: "Size Range", unit: "μm", min: 0.5, max: 5 },
    {
      name: "Location",
      value: "Soil, water, air, and inside or on other organisms",
    },
    {
      name: "Where It Occurs",
      value:
        "Bacteria thrive in every habitat on Earth, from deep-sea hydrothermal vents to Antarctic ice sheets.",
    },
    { name: "Habitat", value: "Global Biosphere · Microflora" },
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
        "Requires Gram staining or oil immersion lenses to resolve cell shapes clearly due to their tiny size.",
    },
    {
      name: "EM Note",
      value:
        "Clearly differentiates the capsule, cell wall, and internal ribosome distribution.",
    },
    {
      name: "Key Structures",
      value: {
        "Nucleoid (Genophore)":
          "Region containing a single, circular DNA molecule, lacking a surrounding nuclear membrane",
        "Cell Wall (Peptidoglycan)":
          "Rigid layer outside the membrane protecting against osmotic lysis",
      },
    },
  ],
  funFact: "The microbes in your body outnumber your human cells.",
  teachingFocus:
    "The ultimate model to teach 'Prokaryote vs Eukaryote'. Emphasize the absolute absence of a nuclear membrane.",
  tags: ["Prokaryote", "Nucleoid", "Peptidoglycan", "Flagellum", "Plasmids"],
  model3D: {
    modelUrl: "/models/bio/bacterial-cell.glb",
    imageUrl: "/models/bio/bacterial-cell.webp",
    fileSize: 2037060,
    defaultRotation: { x: 0, y: -51.57, z: 0 },
    displayScale: 1.5,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of a capsule-shaped bacterium, 90-degree wedge cutout styling. One-quarter of the rod-shaped body is sliced out from the front right quadrant. The exposed internal planes display a tangled central mass of light-blue nucleoid DNA strands, red plasmids, and granular ribosomes, bounded by three distinct structural layers (membrane, cell wall, capsule). The remaining three-quarters shows an unbroken, glossy protective capsule envelope with microscopic hair-like pili and long flagella tails emerging from the base. Complete volumetric 3D mesh, precise geometric orientation, solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
    frontPrompt:
      "3D microbiological asset of a capsule-shaped bacterium, 90-degree wedge cutout view from the front, eye-level. One-quarter of the rod-shaped capsule is cleanly sliced out from the front right quadrant, forming perpendicular internal cross-section planes. The interior reveals a dense tangled central mass of light-blue circular nucleoid DNA strands, red plasmids, and granular ribosomes. The sharp multi-layer cut edge beautifully outlines the inner cell membrane, middle peptidoglycan cell wall, and outermost protective capsule layer. Long flagella tails originate from the base. Hyper-precise scientific visualization, pure white background, studio lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
    backPrompt:
      "3D microbiological asset of a capsule-shaped bacterium, intact posterior full view from the back, eye-level. Showing the unbroken, smooth exterior capsule envelope of the rod-shaped prokaryote. The capsule has a glossy, organic protective layer texture. Multiple thin, hair-like pili project evenly across the surface, and several long, whip-like flagella tails emerge from the rear end, matching the exact spatial alignment of the front view. Clean geometric 3D asset style, solid pure white background, uniform professional illumination, shadowless, centered positioning, square aspect ratio --ar 1:1",
  },
};
