import type { Entity3D } from "@/data/types";

export const smileyJoyRoot: Entity3D = {
  id: "smiley-joy-root",
  name: "Smiley Joy Root",
  subtitle: "Chamber Core · Central Energy Pod",
  mainCategory: "Mechanical Core",
  subCategory: "System Center",
  accent: "#f39c12",
  description:
    "The capsule centerpiece of the collective display system (ID: Char_Carrot_01). It features a cheerful, handcrafted knitted carrot character suspended inside a high-tech illuminated containment chamber via dual precision robotic arms, serving as the whimsical power source for the surrounding toy universes.",
  attributes: [
    { name: "Model ID", value: "Char_Carrot_01" },
    { name: "System Role", value: "Central Power & Joy Generator" },
    { name: "Core Texture", value: "Coarse Woolen Crochet Knit Pattern" },
    { name: "Chamber Mount", value: "Dual Hydraulic Robotic Grabbers" },
    {
      name: "Containment Specs",
      value: {
        "Glass Type": "Reinforced anti-reflective curved acrylic",
        "Base Pod": "Industrial matte grey mechanical dock with LED indicator",
      },
    },
    {
      name: "Awards",
      value: ["Future Mechanical Art Exhibition - Best Centerpiece Design"],
    },
  ],
  funFact:
    "Despite being suspended by heavy, cold robotic machinery, this little carrot maintains a permanent embroidered smile to spread positivity across all display chambers.",
  teachingFocus:
    "Learn to blend cozy organic fabric shaders with cold mechanical hard surfaces, handle curved transparency and refraction in glass pods, and configure multi-joint mechanical rigging.",
  tags: [
    "Carrot Core",
    "Knitted Plush",
    "Robotic Arms",
    "Sci-Fi Chamber",
    "Centerpiece",
  ],
  model3D: {
    modelUrl: "/models/char/smiley-joy-root.glb",
    imageUrl: "/models/char/smiley-joy-root.webp",
    fileSize: 2512176,
    defaultRotation: { x: 0, y: 0, z: 0 },
    displayScale: 2,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of a knitted carrot inside a sci-fi containment tube held by robotic arms, stylized as a 1/2 longitudinal cross-section cutaway at a 30-degree tilted perspective. The model is cleanly divided down the centerline: the left half reveals the complex mechanical wiring of the pod base and the soft cotton filling of the carrot; the right half shows the glossy glass tube and the detailed coarse crochet texture of the smiling carrot. Pure solid white background, shadowless laboratory lighting, --ar 1:1",
    frontPrompt:
      "3D industrial display render of the Smiley Joy Root chamber, 1/2 mechanical cross-section view from the front at a 30-degree tilted angle. The sharp laser-cut plane showcases the internal gears and pistons of the robotic claws holding the carrot core. Bright internal LED light simulation, crisp ambient occlusion, solid pure white background, shadowless, --ar 1:1",
    backPrompt:
      "3D asset of the central chamber core, intact posterior view from the exact back, matching the 30-degree tilted orientation perfectly. Showing the solid spine of the structural support column and the rear casing of the mechanical arms from behind. Perfectly mirrors the cylindrical silhouette to align with the front cutaway mesh. Professional 3D object format, solid white background, uniform flat lighting, --ar 1:1",
  },
};
