import type { Entity3D } from "@/data/types";

export const mechWarrior: Entity3D = {
  id: "mech-warrior",
  name: "Mech Warrior",
  subtitle: "Advanced Combat Exoskeleton · Red & White Armor",
  mainCategory: "Characters",
  subCategory: "Sci-Fi & Fantasy",
  accent: "#ef4444",
  description:
    "A powerful mech warrior featuring advanced combat exoskeleton technology with striking red and white armor plating. This dynamic humanoid mech stands on a circular display platform, showcasing intricate mechanical joints, reinforced armor segments, and battle-ready stance. The sleek design combines futuristic military aesthetics with agile combat capabilities, featuring articulated limbs, protected core systems, and weapon-ready positioning. Perfect for studying mecha design principles, armor plating techniques, and dynamic pose composition in 3D character modeling.",
  attributes: [
    { name: "Type", value: "Combat Exoskeleton" },
    { name: "Armor Colors", value: "Red · White · Metallic Gray" },
    {
      name: "Key Features",
      value: {
        Armor: "Segmented red and white plating",
        Joints: "Articulated mechanical joints",
        Stance: "Dynamic combat-ready pose",
        Platform: "Circular display base with tech details",
      },
    },
    { name: "Design Style", value: "Futuristic Military · Mecha · Agile" },
    { name: "Combat Role", value: "Frontline Assault · Versatile Combat" },
    {
      name: "Tech Specs",
      value: ["Powered Exoskeleton · Enhanced Mobility · Armored Core"],
    },
  ],
  funFact:
    "Mech warriors in sci-fi often represent the pinnacle of human-machine integration, combining the agility and decision-making of a pilot with the raw power and protection of advanced armor systems!",
  teachingFocus:
    "Study mecha design principles, armor segmentation techniques, dynamic pose composition, red and white color palette application, mechanical joint articulation, and circular base platform design in 3D modeling.",
  tags: [
    "Mech",
    "Warrior",
    "Exoskeleton",
    "Red Armor",
    "Combat",
    "Sci-Fi",
    "Dynamic Pose",
    "Futuristic",
  ],
  model3D: {
    modelUrl: "/models/char/mech-warrior.glb",
    imageUrl: "/models/char/mech-warrior.webp",
    fileSize: 1910760,
    defaultRotation: { x: 0, y: -45, z: 0 },
    displayScale: 1.0,
  },
  generationPrompts: {
    full3DPrompt:
      "Advanced combat mech warrior in dynamic pose, red and white armor plating with metallic gray mechanical joints. Standing on circular display platform with tech details and glowing elements. Articulated limbs in battle-ready stance, segmented armor covering torso and limbs, protected core system visible. Futuristic military mecha design with sleek lines and combat-ready positioning. Dark background, studio lighting, detailed mechanical textures, --ar 1:1",
    frontPrompt:
      "Front view of red and white mech warrior showing armored chest plate with central core, articulated arms in combat position, segmented leg armor with mechanical knee joints. Circular platform base with technical details and support structure. Dynamic forward-leaning stance ready for battle. Dark neutral background, even lighting, --ar 1:1",
    backPrompt:
      "Back view of mech warrior displaying reinforced back armor plating, mechanical spine structure, articulated shoulder and hip joints. Red and white armor segments with metallic gray mechanical details, platform base visible from behind angle. Consistent armor design throughout. Dark background, --ar 1:1",
  },
};
