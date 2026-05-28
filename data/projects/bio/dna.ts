import type { Entity3D } from "@/data/types";

export const dna: Entity3D = {
  id: "dna",
  name: "DNA Double Helix",
  subtitle: "Genetic Molecule · Blueprint of Life",
  mainCategory: "Biomolecules",
  subCategory: "Macromolecules",
  accent: "#9cc4e4",
  description:
    "DNA consists of two complementary nucleotide chains twisted into an elegant double helix. It writes life's instructions with four letters—A, T, G, C.",
  attributes: [
    { name: "Size Range", value: "Diameter ~2 nm, length varies" },
    {
      name: "Location",
      value: "Nucleus, mitochondria, chloroplasts, and prokaryotic nucleoids",
    },
    {
      name: "Where It Occurs",
      value:
        "From ancient archaea to human cells, it acts as the universal storage of genetic blueprints.",
    },
    { name: "Habitat", value: "All Cellular Organisms · DNA Viruses" },
    {
      name: "Microscope Visibility",
      value: {
        "Light Microscope": "Invisible",
        "Electron Microscope": "Visible",
      },
    },
    {
      name: "LM Note",
      value:
        "Individual double helix chains are invisible, though condensed chromosomes are visible during cell division.",
    },
    {
      name: "EM Note",
      value:
        "Requires advanced techniques like Cryo-EM or AFM to resolve the distinct helical contours.",
    },
    {
      name: "Key Structures",
      value: {
        "Sugar-Phosphate Backbone":
          "Formed by alternating phosphate and deoxyribose units linked by phosphodiester bonds",
        "Complementary Base Pairs":
          "Adenine pairs with Thymine, Guanine pairs with Cytosine via hydrogen bonds",
      },
    },
  ],
  funFact:
    "If uncoiled, the DNA in a single human cell would extend about 2 meters.",
  teachingFocus:
    "Master Chargaff's Rules (A=T, G=C) and visualize how hydrogen bonding holds the central rungs together.",
  tags: [
    "Double Helix",
    "Base Pairing",
    "Hydrogen Bonds",
    "Genetic Code",
    "Antiparallel",
  ],
  model3D: {
    modelUrl: "/models/bio/dna.glb",
    imageUrl: "/models/bio/dna.webp",
    fileSize: 1022220,
    defaultRotation: { x: 0, y: 0, z: 0 },
    displayScale: 1.2,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D atomic-scale molecular mesh of a vertical DNA double helix strand. Features two anti-parallel spiraling backbones made of metallic blue sugar-phosphate chains twisting gracefully upwards, forming accurate major and minor grooves. Symmetrical horizontal nucleotide base rungs link them together with explicit color-coding: Adenine (crimson), Thymine (gold), Cytosine (emerald green), and Guanine (vibrant purple), joined by dotted silver links. Complete volumetric 3D molecular asset, sharp geometry from all 360-degree viewing angles, specular highlights, solid pure white background, shadowless studio lighting, centered positioning, square aspect ratio --ar 1:1",
    frontPrompt:
      "3D atomic-scale molecular model of a vertical DNA double helix strand, front view, eye-level. The model uses a highly detailed semi-glossy finish. Two anti-parallel spiraling backbones made of metallic blue sugar-phosphate chains twist gracefully upwards. Symmetrical horizontal nucleotide base rungs link them together, with clear color coding for bases: Adenine (crimson), Thymine (gold), Cytosine (emerald green), and Guanine (vibrant purple), connected by visible dotted silver hydrogen bond links. Sharp chemical asset styling, crisp specular highlights, solid pure white background, studio shadowless lighting, centered positioning, square aspect ratio --ar 1:1",
    backPrompt:
      "3D atomic-scale molecular model of a vertical DNA double helix strand, full back view rotated exactly 180 degrees, eye-level. Showing the continuous reverse curves of the winding blue sugar-phosphate helical backbones. Focuses on the pristine geometry of the spiraling major grooves and minor grooves winding around the central axis, with the back profiles of the colorful base rungs visible through the spiral openings. Perfectly symmetrical, solid pure white background, uniform flat lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
  },
};
