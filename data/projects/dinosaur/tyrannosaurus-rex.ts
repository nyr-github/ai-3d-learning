import type { Entity3D } from "@/data/types";

export const tyrannosaurusRex: Entity3D = {
  id: "tyrannosaurus-rex",
  name: "Tyrannosaurus Rex",
  subtitle: "King of Tyrant Lizards · Apex Predator",
  mainCategory: "Dinosaurs",
  subCategory: "Theropods",
  accent: "#8B0000",
  description:
    "Tyrannosaurus rex, meaning 'tyrant lizard king,' was one of the largest land predators ever to walk the Earth. Living during the Late Cretaceous period (68-66 million years ago), this apex predator possessed the most powerful bite of any terrestrial animal, bone-crushing teeth up to 30cm long, and surprisingly sophisticated senses including exceptional smell and binocular vision. Despite its tiny arms, T. rex was a highly adapted hunter and possibly also a scavenger.",
  attributes: [
    { name: "Body Length", unit: "m", min: 12, max: 13 },
    { name: "Height (Hips)", unit: "m", min: 3.6, max: 4 },
    { name: "Weight", unit: "tonnes", min: 8, max: 14 },
    {
      name: "Geological Period",
      value: "Late Cretaceous (68-66 million years ago)",
    },
    {
      name: "Fossil Locations",
      value: "Montana, USA · South Dakota, USA · Wyoming, USA · Alberta, Canada",
    },
    {
      name: "Key Features",
      value: {
        "Skull": "Up to 1.5m long with binocular vision and exceptional olfactory bulbs",
        "Teeth": "Banana-sized, serrated, bone-crushing teeth up to 30cm (12 inches)",
        "Bite Force": "Estimated 35,000-57,000 Newtons (strongest of any land animal)",
        "Reduced Arms": "Two-fingered, muscular arms (function still debated)",
      },
    },
    {
      name: "Diet",
      value: "Apex predator and/or scavenger (Triceratops, Edmontosaurus, carrion)",
    },
    {
      name: "Locomotion",
      value: "Bipedal, estimated speed 16-40 km/h (debated)",
    },
    {
      name: "Ecological Role",
      value: "Apex predator, keystone species, ecosystem regulator",
    },
  ],
  funFact:
    "T. rex had the best sense of smell of any dinosaur—its olfactory bulbs were enormous. It could probably smell a carcass from several kilometers away. Despite weighing up to 14 tonnes, its bones were hollow to reduce weight!",
  teachingFocus:
    "Examine the massive skull with binocular vision, bone-crushing teeth structure, reduced but powerful arms, and understand apex predator ecology and the predator-scavenger debate.",
  tags: [
    "Theropod",
    "Cretaceous",
    "Carnivore",
    "Apex Predator",
    "Tyrannosaurid",
  ],
  model3D: {
    modelUrl: "/models/dinosaur/tyrannosaurus-rex.glb",
    imageUrl: "/models/dinosaur/tyrannosaurus-rex.webp",
    fileSize: 1581056,
    defaultRotation: { x: 0, y: 0, z: 0 },
    displayScale: 1.0,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of a Tyrannosaurus rex dinosaur, scientific paleontological reconstruction style. Hyper-realistic rendering showing massive bipedal predator with enormous skull (1.5m long), powerful jaws with banana-sized serrated teeth, tiny two-fingered forelimbs, robust hind legs with three weight-bearing toes, and long heavy tail for balance. Textured skin with possible lips covering teeth, earth-tone coloration with subtle pattern. Late Cretaceous apex predator. Clean studio lighting on solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
    frontPrompt:
      "3D paleontological asset of a Tyrannosaurus rex, frontal view showcasing the massive skull with forward-facing eyes providing binocular vision, powerful jaw muscles, and rows of serrated conical teeth. The tiny two-fingered arms are visible against the massive chest. Robust hind legs with clawed toes positioned for bipedal stance. Detailed textured skin with natural coloration and subtle scales, pure solid white background, professional scientific visualization, shadowless studio lighting, centered positioning, square aspect ratio --ar 1:1",
    backPrompt:
      "3D paleontological asset of a Tyrannosaurus rex, dorsal view displaying the massive skull tapering to the long muscular tail used for counterbalance. The broad chest and powerful hind legs are visible, with tiny arms barely noticeable. The back shows muscle definition and textured skin with possible filamentous integument (protofeathers) along the spine. Earth-tone coloration with natural sheen, clean scientific illustration style, pure solid white background, uniform laboratory lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
  },
};
