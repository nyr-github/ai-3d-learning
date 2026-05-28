import type { Entity3D } from "@/data/types";

export const bacteriophage: Entity3D = {
  id: "bacteriophage",
  name: "T4 Bacteriophage",
  subtitle: "Virus · Bacterial Parasite",
  mainCategory: "Viruses",
  subCategory: "Non-cellular Entities",
  accent: "#e74c3c",
  description:
    "Bacteriophages are viruses that infect and replicate within bacteria. The T4 bacteriophage possesses an intricate 'lunar lander' structure.",
  attributes: [
    { name: "Size Range", value: "60 – 200", unit: "nm", min: 60, max: 200 },
    {
      name: "Location",
      value:
        "Anywhere bacteria exist; highly abundant in soil, oceans, and animal guts",
    },
    {
      name: "Where It Occurs",
      value:
        "Phages are everywhere bacteria reside, serving as critical regulators of bacterial populations in global ecosystems.",
    },
    { name: "Habitat", value: "Oceans · Soil · Animal Microbiome" },
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
        "Far smaller than the wavelength of visible light; can only be inferred through plaque assays.",
    },
    {
      name: "EM Note",
      value:
        "Easily visualized using negative staining TEM, revealing its geometric crystalline head.",
    },
    {
      name: "Key Structures",
      value: {
        "Icosahedral Head (Capsid)":
          "A protein shell composed of capsomeres that tightly packs and protects the viral dsDNA genome",
        "Sheath & Core Tube":
          "A contractile tail structure that acts like a molecular syringe to punch through the cell wall",
      },
    },
  ],
  funFact: "Bacteriophages are the most abundant biological entities on Earth!",
  teachingFocus:
    "The prime example of 'Non-cellular life'. Excellent for teaching the Hershey-Chase experiment.",
  tags: ["Virus", "Capsid", "Non-cellular", "Lytic Cycle", "Genetic Injection"],
  model3D: {
    modelUrl: "/models/bio/bacteriophage.glb",
    imageUrl: "/models/bio/bacteriophage.webp",
    fileSize: 2202052,
    defaultRotation: { x: 0, y: 0, z: 0 },
    displayScale: 1.2,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D biomechanical asset of a T4 bacteriophage virus standing upright, featuring a 90-degree wedge cutout applied to the crystalline head. A 1/4 wedge is cleanly cut from the front right side of the icosahedral protein head capsid, revealing an inner coiled mass of glowing blue viral DNA. The vertical ribbed tail sheath, hexagonal baseplate, and six long spider-like tail fibers remain entirely whole and unbroken. Complete volumetric 3D mesh with absolute front-to-back geometric alignment, micro-specular gloss, solid pure white background, shadowless studio lighting, centered positioning, square aspect ratio --ar 1:1",
    frontPrompt:
      "3D biomechanical asset of a T4 bacteriophage virus standing upright, 90-degree wedge cutout view of the head from the front, eye-level. A 1/4 wedge is cleanly sliced out from the front right side of the icosahedral geometric protein head capsid, revealing two sharp internal planes. The cutout exposes a tightly coiled inner mass of glowing blue double-stranded viral DNA, while the remaining 3/4 capsid preserves its crystalline structural facets. The vertical ribbed tail sheath and six long spider-like tail fibers remain whole and symmetrical. Hyper-detailed medical asset, solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
    backPrompt:
      "3D biomechanical asset of a T4 bacteriophage virus standing upright, intact posterior full view from the exact back, eye-level. Displays the completely unbroken, solid crystalline geometric facets of the icosahedral capsid head protein shell. The long vertical tail sheath cylinder and the intranet hexagonal baseplate are fully intact from behind, with the reverse angles of the long spider-like tail fibers wrapping around symmetrically. Absolute geometric alignment with the front view. Sleek matte technical material, solid pure white background, uniform flat lab lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
  },
};
