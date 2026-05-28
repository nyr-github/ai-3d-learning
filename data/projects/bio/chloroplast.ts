import type { Entity3D } from "@/data/types";

export const chloroplast: Entity3D = {
  id: "chloroplast",
  name: "Chloroplast",
  subtitle: "Organelle · Site of Photosynthesis",
  mainCategory: "Organelles",
  subCategory: "Subcellular Structures",
  accent: "#4daf7c",
  description:
    "Chloroplasts are unique organelles found in green plants and some algae, hailed as the 'green factories' of cells. They capture solar energy to synthesize organic molecules.",
  attributes: [
    {
      name: "Size Range",
      value: "5 – 10",
      unit: "μm (Length)",
      min: 5,
      max: 10,
    },
    {
      name: "Location",
      value:
        "Mesophyll cells of green plants, young stems, and green algal cells",
    },
    {
      name: "Where It Occurs",
      value:
        "All eukaryotic photosynthetic organisms rely on chloroplasts to drive the carbon and oxygen cycles of Earth.",
    },
    {
      name: "Habitat",
      value: "Terrestrial Plants · Green Algae · Mosses & Ferns",
    },
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
        "Directly visible as green ellipsoids or discs without any chemical staining due to chlorophyll.",
    },
    {
      name: "EM Note",
      value:
        "Reveals detailed internal thylakoids, stacked grana structures, and stroma regions.",
    },
    {
      name: "Key Structures",
      value: {
        "Thylakoids & Grana":
          "Flat sac-like membranes stacked into 'grana', maximizing the surface area for light reactions",
        Stroma:
          "The fluid compartment containing enzymes required for the Calvin Cycle",
      },
    },
  ],
  funFact:
    "The light reactions split water to release O₂ on the thylakoid membrane, while the dark reactions fix CO₂ into sugar inside the stroma.",
  teachingFocus:
    "Understand the division of labor during photosynthesis: Light reactions take place on the Thylakoids, Dark reactions in the Stroma.",
  tags: [
    "Double Membrane",
    "Photosynthesis",
    "Thylakoid",
    "Carbon Fixation",
    "Endosymbiosis",
  ],
  model3D: {
    modelUrl: "/models/bio/chloroplast.glb",
    imageUrl: "/models/bio/chloroplast.webp",
    fileSize: 1102320,
    defaultRotation: { x: 0, y: 0, z: 0 },
    displayScale: 1.0,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of an ellipsoidal chloroplast, 90-degree wedge cutout styling. One-quarter of the green oval envelope is removed from the front right quadrant. Perpendicular internal planes expose organized columns of dark green coin-like thylakoid discs stacked into grana, linked by stroma lamellae threads in an emerald fluid stroma. The remaining 3/4 forms a completely seamless, egg-shaped outer green membrane with a fine organic kelly green micro-texture. Complete 3D volumetric mesh, clean biological definitions, solid pure white background, shadowless laboratory lighting, centered positioning, square aspect ratio --ar 1:1",
    frontPrompt:
      "3D scientific model of an ellipsoidal chloroplast, 90-degree wedge cutout view from the front, eye-level. One-quarter of the green oval envelope is cleanly carved away from the front right quadrant with precise perpendicular cross-section surfaces. The interior displays neat columns of dark green thylakoid discs stacked into grana, connected by stroma lamellae fibers. The background fluid stroma is a clear, emerald liquid containing tiny starch granules. Brilliant depth contrast, crisp biological textures, solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
    backPrompt:
      "3D scientific model of an ellipsoidal chloroplast, intact posterior full view from the back, eye-level. Showing the completely seamless, smooth, egg-shaped green outer envelope. The outer membrane features a vibrant organic kelly green color with a fine biological micro-texture and subtle dual-layer depth lines. Perfect geometrical symmetry matching the front slice. Clean 3D asset presentation, solid pure white background, uniform diffuse lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
  },
};
