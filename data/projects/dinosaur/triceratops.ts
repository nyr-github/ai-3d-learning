import type { Entity3D } from "@/data/types";

export const triceratops: Entity3D = {
  id: "triceratops",
  name: "Triceratops",
  subtitle: "Three-Horned Face · Cretaceous Herbivore",
  mainCategory: "Dinosaurs",
  subCategory: "Ceratopsians",
  accent: "#CD853F",
  description:
    "Triceratops is one of the most recognizable dinosaurs, famous for its three facial horns and massive bony frill. Living during the Late Cretaceous period (68-66 million years ago), this tank-like herbivore was one of the last dinosaur genera to appear before the mass extinction. Its elaborate head display was likely used for species recognition, defense against predators like T. rex, and possibly thermoregulation.",
  attributes: [
    { name: "Body Length", unit: "m", min: 7.9, max: 9 },
    { name: "Height", unit: "m", min: 2.9, max: 3 },
    { name: "Weight", unit: "tonnes", min: 6, max: 12 },
    {
      name: "Geological Period",
      value: "Late Cretaceous (68-66 million years ago)",
    },
    {
      name: "Fossil Locations",
      value: "Montana, USA · South Dakota, USA · Alberta, Canada · Wyoming, USA",
    },
    {
      name: "Key Features",
      value: {
        "Three Horns": "Two long brow horns (up to 1m) above eyes, one shorter nasal horn",
        "Bony Frill": "Solid bone shield (not fenestrated) protecting neck, up to 2.5m wide",
        "Parrot-Like Beak": "Powerful keratinous beak for cropping tough vegetation",
      },
    },
    {
      name: "Diet",
      value: "Low-browsing herbivore (ferns, cycads, palms, conifers)",
    },
    {
      name: "Ecological Role",
      value: "Megaherbivore, prey for large theropods, vegetation management",
    },
  ],
  funFact:
    "Despite its fearsome appearance, Triceratops was a plant-eater. Its frill may have been brightly colored for display, and recent studies suggest it might have been used for species recognition and mating displays rather than just defense.",
  teachingFocus:
    "Examine the distinctive three-horn arrangement, solid bony frill structure, and understand ceratopsian evolution and predator-prey dynamics with Tyrannosaurus rex.",
  tags: [
    "Ceratopsian",
    "Cretaceous",
    "Herbivore",
    "Horned Dinosaur",
    "T. rex Contemporary",
  ],
  model3D: {
    modelUrl: "/models/dinosaur/triceratops.glb",
    imageUrl: "/models/dinosaur/triceratops.webp",
    fileSize: 2129920,
    defaultRotation: { x: 0, y: 0, z: 0 },
    displayScale: 1.0,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of a Triceratops dinosaur, scientific paleontological reconstruction style. Hyper-realistic rendering showing robust quadrupedal body with massive skull featuring three prominent horns (two long brow horns curving forward, one short nasal horn), and large solid bony frill extending from back of head. Stocky body with elephant-like legs, short tail. Textured skin with possible scutes or scales. Late Cretaceous coloration. Clean studio lighting on solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
    frontPrompt:
      "3D paleontological asset of a Triceratops, frontal view showcasing the iconic three-horned face with two long curved brow horns above the eyes and shorter nasal horn on the snout. The massive solid frill forms a protective shield behind the head. Parrot-like keratinous beak visible. Deep-set eyes with protective bony ridges. Detailed textured skin with natural coloration, pure solid white background, professional scientific visualization, shadowless studio lighting, centered positioning, square aspect ratio --ar 1:1",
    backPrompt:
      "3D paleontological asset of a Triceratops, dorsal view displaying the massive frill extending laterally from the skull, clearly showing its solid bone structure (not open fenestrations like other ceratopsians). The robust barrel-shaped body tapers to a short tail. Four sturdy column-like legs visible from above. Textured hide with possible osteoderm patterns, earth-tone coloration, clean scientific illustration style, pure solid white background, uniform laboratory lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
  },
};
