import type { Entity3D } from "@/data/types";

export const komodoDragon: Entity3D = {
  id: "komodo-dragon",
  name: "Komodo Dragon",
  subtitle: "The Dragon of Komodo · Apex Predator",
  mainCategory: "Reptiles",
  subCategory: "Varanidae (Monitor Lizards)",
  accent: "#8b4513",
  description:
    "The world's largest living lizard species, endemic to the Indonesian islands of Komodo, Rinca, Flores, and Gili Motang. This 3D asset captures the immense power and prehistoric appearance of this apex predator, featuring its heavily armored osteoderm-reinforced skin, muscular build, powerful clawed limbs, and the legendary forked yellow tongue used for chemoreception. Capable of reaching 3 meters in length and 70 kilograms, these magnificent creatures represent the pinnacle of monitor lizard evolution and are the last surviving members of a lineage of giant carnivorous lizards.",
  attributes: [
    { name: "Scientific Name", value: "Varanus komodoensis" },
    {
      name: "Specimen Grade",
      value: "Alpha Male Specimen (Maximum Size Class)",
    },
    {
      name: "Morph & Coloration",
      value: "Dark Gray-Brown with Osteoderm Armor Plating",
    },
    {
      name: "Anatomical Appraisal",
      value: {
        "Osteoderm Armor":
          "Extensive bony deposits (osteoderms) embedded in skin creating natural chainmail protection",
        "Venom System":
          "Lower jaw venom glands secreting anticoagulant toxins to prevent blood clotting in prey",
        "Muscular Build":
          "Massive temporalis muscles for devastating bite force, powerful limb girdles",
        "Sensory Systems":
          "Highly developed Jacobson's organ accessed via forked tongue for long-range prey detection",
      },
    },
    {
      name: "Predatory Adaptations",
      value: {
        "Ambush Strategy":
          "Patient hunter capable of explosive 20 km/h sprint bursts",
        "Venomous Bite":
          "Complex venom system causing shock and blood loss in large prey",
        "Olfactory Range":
          "Can detect carrion from 4-9.5 kilometers away using tongue-flicking",
      },
    },
    {
      name: "Awards",
      value: [
        "UNESCO World Heritage Species - Komodo Island Flagship 2026",
        "World Wildlife Fund Conservation Priority - Critically Endangered Species",
      ],
    },
  ],
  funFact:
    "Komodo dragons were long thought to kill prey with bacteria from their mouths, but scientists discovered in 2009 that they actually have venom glands! Their venom causes a dramatic drop in blood pressure, leading to shock and preventing prey from escaping—making them one of the few venomous lizards on Earth!",
  teachingFocus:
    "Explore the evolutionary biology of gigantism in island ecosystems, examine the dual venom-bacteria predatory strategy, analyze the biomechanics of the osteoderm armor system, and study the ecological role of apex predators in isolated island habitats.",
  tags: [
    "Komodo Dragon",
    "Apex Predator",
    "Venomous Lizard",
    "Varanidae",
    "Indonesian Wildlife",
  ],
  model3D: {
    modelUrl: "/models/lizard/komodo-dragon.glb",
    imageUrl: "/models/lizard/komodo-dragon.webp",
    fileSize: 2073096,
    defaultRotation: { x: 0, y: -45, z: 0 },
    displayScale: 1.5,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of a Komodo Dragon, designed as a perfect 1/2 longitudinal biological cross-section, presented at a 30-degree tilted isometric perspective. Sliced cleanly down the centerline: the left half reveals the complete dark gray-brown armored exterior with extensive osteoderm bony plates, massive muscular build, powerful curved claws, and forked yellow tongue. The exact right half opens into an intricate anatomical cutaway, exposing the skull with venom gland structures, massive jaw musculature, respiratory system, and the reinforced skeletal structure. Complete volumetric 3D reptile mesh, solid pure white background, studio illumination, shadowless, --ar 1:1",
    frontPrompt:
      "3D scientific rendering of a Komodo Dragon, 1/2 mechanical and biological cross-section view from the front, tilted at a 30-degree angle. Sliced plane faces the camera to meticulously expose the inner venom gland anatomy, powerful bite musculature, and reinforced skull structure. The intact side captures the fearsome appearance with osteoderm armor plating, keen reptilian eye, extended forked tongue, and heavily muscled neck. High-fidelity rendering, sharp occlusion, solid pure white background, --ar 1:1",
    backPrompt:
      "3D asset of the Komodo Dragon, intact posterior full view from the exact back, matching the 30-degree tilted orientation perfectly. Showing the continuous, unbroken opposite side with the extensive osteoderm armor creating a chainmail-like texture across the entire body, the massively thick muscular tail used as a weapon, and powerful hind limbs. Features the detailed armored scale pattern and prehistoric silhouette. Symmetrical silhouette that mirrors the front cutaway on a solid pure white background, shadowless, --ar 1:1",
  },
};
