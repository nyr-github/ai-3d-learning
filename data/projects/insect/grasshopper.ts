import type { Entity3D } from "@/data/types";

export const grasshopper: Entity3D = {
  id: "grasshopper",
  name: "Grasshopper",
  subtitle: "Jumping Insect · Orthoptera",
  mainCategory: "Insects",
  subCategory: "Orthopterans",
  accent: "#7CFC00",
  description:
    "Grasshoppers are powerful jumping insects known for their music-making abilities and swarming behavior. Their enlarged hind legs enable jumps up to 20 times their body length. Some species can produce sounds (stridulation) by rubbing their legs against their wings, creating the characteristic summer chorus.",
  attributes: [
    { name: "Body Length", unit: "mm", min: 10, max: 120 },
    {
      name: "Jump Distance",
      value: "Up to 20 times body length",
    },
    {
      name: "Distribution",
      value: "Worldwide (except polar regions)",
    },
    {
      name: "Habitat",
      value: "Grasslands · Fields · Meadows · Agricultural Areas",
    },
    {
      name: "Key Features",
      value: {
        "Hind Legs": "Massive jumping muscles (femur) with powerful tibia",
        "Tympanal Organs": "Hearing organs located on the first abdominal segment",
        "Stridulation": "Sound production by rubbing hind legs against forewings",
      },
    },
    {
      name: "Mouthparts",
      value: "Chewing type with strong mandibles for plant material",
    },
    {
      name: "Ecological Role",
      value: "Herbivore, food source for birds and mammals, nutrient cycling",
    },
  ],
  funFact:
    "During plague conditions, locusts (swarming grasshoppers) can form swarms of billions, consuming the equivalent food of 35,000 people in a single day.",
  teachingFocus:
    "Study the modified hind legs for jumping, tympanal hearing organs on the abdomen, and understand the stridulation mechanism for sound production.",
  tags: [
    "Orthoptera",
    "Jumping Adaptation",
    "Acoustic Communication",
    "Herbivore",
    "Stridulation",
  ],
  model3D: {
    modelUrl: "/models/insect/grasshopper.glb",
    imageUrl: "/models/insect/grasshopper.webp",
    fileSize: 2433136,
    defaultRotation: { x: 0, y: 0, z: 0 },
    displayScale: 1.0,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of a grasshopper insect, scientific illustration style. Hyper-realistic rendering showing streamlined body with enormously enlarged hind femurs for jumping, folded wings along the back, and long antennae. Green to brown coloration with detailed exoskeleton texture. Characteristic orthopteran body shape with prominent jumping legs. Clean studio lighting on solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
    frontPrompt:
      "3D biological asset of a grasshopper, frontal view showcasing the sloping head with large compound eyes, chewing mouthparts, and thread-like antennae. The thorax shows the massive hind leg femurs extending laterally, with folded wings visible along the abdomen. Green-brown camouflage coloration with microscopic texture, pure solid white background, professional scientific visualization, shadowless studio lighting, centered positioning, square aspect ratio --ar 1:1",
    backPrompt:
      "3D biological asset of a grasshopper, dorsal view displaying the wings folded flat over the elongated abdomen. The enormous hind legs are clearly visible with thick femurs and spiny tibiae. The pronotum (dorsal plate of thorax) shows characteristic shape. Natural green coloration with detailed segmentation, clean scientific illustration style, pure solid white background, uniform laboratory lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
  },
};
