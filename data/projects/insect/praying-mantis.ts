import type { Entity3D } from "@/data/types";

export const prayingMantis: Entity3D = {
  id: "praying-mantis",
  name: "Praying Mantis",
  subtitle: "Ambush Predator · Mantodea",
  mainCategory: "Insects",
  subCategory: "Predatory Insects",
  accent: "#90EE90",
  description:
    "Praying mantises are master ambush predators known for their distinctive 'praying' posture and lightning-fast predatory strikes. They can rotate their heads 180 degrees, possess stereo vision for depth perception, and exhibit sexual cannibalism where females sometimes consume males during or after mating. Their raptorial forelegs can strike in under 1/20th of a second.",
  attributes: [
    { name: "Body Length", unit: "mm", min: 30, max: 150 },
    {
      name: "Strike Speed",
      value: "Less than 50 milliseconds (1/20th of a second)",
    },
    {
      name: "Distribution",
      value: "Worldwide (tropical and temperate regions)",
    },
    {
      name: "Habitat",
      value: "Gardens · Forests · Grasslands · Agricultural Areas",
    },
    {
      name: "Key Features",
      value: {
        "Raptorial Forelegs": "Spined grasping legs for capturing prey",
        "Head Rotation": "Can rotate head 180 degrees for prey tracking",
        "Stereo Vision": "Triangular head with large eyes providing depth perception",
      },
    },
    {
      name: "Diet",
      value: "Flies, moths, butterflies, and even small vertebrates",
    },
    {
      name: "Camouflage",
      value: "Mimics leaves, sticks, or flowers to ambush prey",
    },
    {
      name: "Ecological Role",
      value: "Top insect predator, natural pest control agent",
    },
  ],
  funFact:
    "Mantises are the only insects that can turn their heads to look over their 'shoulders.' They have a fovea (like humans) for high-resolution vision in a small area.",
  teachingFocus:
    "Examine the raptorial forelegs with spines, triangular head with stereo vision, and understand camouflage strategies and ambush predation behavior.",
  tags: [
    "Mantodea",
    "Ambush Predator",
    "Camouflage",
    "Stereo Vision",
    "Biological Control",
  ],
  model3D: {
    modelUrl: "/models/insect/praying-mantis.glb",
    imageUrl: "/models/insect/praying-mantis.webp",
    fileSize: 2254964,
    defaultRotation: { x: 0, y: 0, z: 0 },
    displayScale: 1.0,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of a praying mantis, scientific illustration style. Hyper-realistic rendering showing elongated body in characteristic 'praying' posture with folded raptorial forelegs. Triangular head with large compound eyes and flexible neck. Green camouflage coloration with leaf-like body texture. Spined forelegs ready to strike. Clean studio lighting on solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
    frontPrompt:
      "3D biological asset of a praying mantis, frontal view showcasing the triangular head that can rotate 180 degrees, large compound eyes, and short antennae. The raptorial forelegs are folded in the characteristic 'praying' position with visible spines. The elongated prothorax connects to the body. Green camouflage coloration with detailed exoskeleton texture, pure solid white background, professional scientific visualization, shadowless studio lighting, centered positioning, square aspect ratio --ar 1:1",
    backPrompt:
      "3D biological asset of a praying mantis, dorsal view displaying the elongated body with folded wings along the back. The raptorial forelegs are visible from above showing the femur-tibia grasping mechanism. The abdomen shows segmentation with natural tapering. Green coloration mimicking leaf texture, clean scientific illustration style, pure solid white background, uniform laboratory lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
  },
};
