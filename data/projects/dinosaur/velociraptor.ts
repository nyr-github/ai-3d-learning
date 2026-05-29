import type { Entity3D } from "@/data/types";

export const velociraptor: Entity3D = {
  id: "velociraptor",
  name: "Velociraptor",
  subtitle: "Swift Seizer · Intelligent Pack Hunter",
  mainCategory: "Dinosaurs",
  subCategory: "Dromaeosaurids",
  accent: "#6B8E23",
  description:
    "Velociraptor was a small but highly intelligent dromaeosaurid dinosaur that lived during the Late Cretaceous period (75-71 million years ago). Despite its portrayal in popular media as a large predator, the real Velociraptor was only turkey-sized (about 2m long including tail) but was an apex predator in its ecosystem. It possessed a lethal sickle-shaped claw on each foot, sophisticated hunting behaviors, and was likely covered in feathers. Famous fossils show Velociraptor locked in combat with a Protoceratops.",
  attributes: [
    { name: "Body Length", unit: "m", min: 1.8, max: 2.07 },
    { name: "Height (Hips)", unit: "m", min: 0.5, max: 0.6 },
    { name: "Weight", unit: "kg", min: 15, max: 20 },
    {
      name: "Geological Period",
      value: "Late Cretaceous (75-71 million years ago)",
    },
    {
      name: "Fossil Locations",
      value: "Gobi Desert, Mongolia · Inner Mongolia, China",
    },
    {
      name: "Key Features",
      value: {
        "Sickle Claw": "Retractable 6.5cm curved claw on each hind foot for slashing",
        "Feathered Body": "Quill knobs on ulna prove presence of flight feathers (flightless)",
        "Stiff Tail": "Ossified tendons made tail rigid for balance during sharp turns",
        "Large Brain": "Enlarged brain relative to body size, indicating high intelligence",
      },
    },
    {
      name: "Diet",
      value: "Carnivore (small vertebrates, lizards, mammals, insects, possibly scavenging)",
    },
    {
      name: "Locomotion",
      value: "Bipedal runner, estimated speed 40 km/h, agile pack hunter (debated)",
    },
    {
      name: "Ecological Role",
      value: "Mesopredator, pack hunter (behavior debated), opportunistic feeder",
    },
  ],
  funFact:
    "The famous 'Fighting Dinosaurs' fossil shows a Velociraptor and Protoceratops locked in mortal combat, buried by a collapsing sand dune. The raptor's sickle claw is embedded in the herbivore's throat—a 75-million-year-old snapshot of predator vs prey!",
  teachingFocus:
    "Study the sickle claw mechanism, feather evidence from quill knobs, rigid tail for balance, and understand dromaeosaurid intelligence and the debate over pack hunting behavior.",
  tags: [
    "Dromaeosaurid",
    "Cretaceous",
    "Carnivore",
    "Feathered Dinosaur",
    "Pack Hunter",
  ],
  model3D: {
    modelUrl: "/models/dinosaur/velociraptor.glb",
    imageUrl: "/models/dinosaur/velociraptor.webp",
    fileSize: 1667072,
    defaultRotation: { x: 0, y: 0, z: 0 },
    displayScale: 1.0,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of a Velociraptor dinosaur, scientific paleontological reconstruction style. Hyper-realistic rendering showing small bipedal theropod (turkey-sized) covered in feathers, long stiff tail held horizontally for balance, distinctive sickle-shaped retractable claw on each hind foot second toe. Bird-like posture with horizontal body, long arms with feathers, sharp teeth in narrow snout. Late Cretaceous Gobi Desert predator. Clean studio lighting on solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
    frontPrompt:
      "3D paleontological asset of a Velociraptor, frontal view showcasing the narrow elongated skull with sharp teeth, large forward-facing eyes indicating predatory behavior, and feathered body. The arms show quill knobs proving feather attachment. Hind legs positioned with the infamous sickle claw visible on the raised inner toe. Feathered texture with earth-tone coloration and possible display patterning, pure solid white background, professional scientific visualization, shadowless studio lighting, centered positioning, square aspect ratio --ar 1:1",
    backPrompt:
      "3D paleontological asset of a Velociraptor, dorsal view displaying the streamlined feathered body with long stiff tail held rigid and horizontal. The tail's ossified tendons are visible providing structural support. Feathers cover the entire body with possible wing-like structures on arms. The sickle claws on hind feet are visible. Earth-tone coloration with subtle stripe or spot pattern for camouflage, clean scientific illustration style, pure solid white background, uniform laboratory lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
  },
};
