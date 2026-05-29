import type { Entity3D } from "@/data/types";

export const ant: Entity3D = {
  id: "ant",
  name: "Ant",
  subtitle: "Social Insect · Hymenoptera",
  mainCategory: "Insects",
  subCategory: "Social Insects",
  accent: "#8B4513",
  description:
    "Ants are highly social insects belonging to the family Formicidae. Known for their remarkable colony organization, they exhibit complex behaviors including agriculture, warfare, and slavery. With over 12,000 species, they inhabit nearly every terrestrial ecosystem on Earth.",
  attributes: [
    { name: "Body Length", unit: "mm", min: 2, max: 30 },
    {
      name: "Distribution",
      value: "Worldwide (except Antarctica and remote islands)",
    },
    {
      name: "Habitat",
      value: "Soil · Wood · Leaf Litter · Urban Areas",
    },
    {
      name: "Colony Size",
      value: {
        "Typical Colony": "Thousands to millions of individuals",
        "Queen Lifespan": "Up to 30 years in some species",
      },
    },
    {
      name: "Key Features",
      value: {
        "Elbowed Antennae": "Highly sensitive chemical communication organs",
        "Node Waist": "Distinctive narrow petiole connecting thorax and abdomen",
        "Mandibles": "Powerful jaws for cutting, carrying, and defense",
      },
    },
    {
      name: "Ecological Role",
      value:
        "Soil aeration, seed dispersal, pest control, and nutrient cycling",
    },
  ],
  funFact:
    "Ants can carry 10-50 times their body weight and communicate using over 20 different pheromones.",
  teachingFocus:
    "Observe the three-part body structure (head, thorax, abdomen), elbowed antennae, and understand eusocial colony organization with caste systems.",
  tags: [
    "Hymenoptera",
    "Eusocial",
    "Pheromone Communication",
    "Decomposer",
    "Colony",
  ],
  model3D: {
    modelUrl: "/models/insect/ant.glb",
    imageUrl: "/models/insect/ant.webp",
    fileSize: 1875224,
    defaultRotation: { x: 0, y: 0, z: 0 },
    displayScale: 1.0,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of an ant insect, scientific illustration style. Hyper-realistic rendering showing the characteristic three-part body segmentation: head with elbowed antennae and powerful mandibles, segmented thorax with six jointed legs, and abdomen connected by a narrow node waist. Dark brown to black exoskeleton with subtle chitinous texture and fine hairs. Clean studio lighting on solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
    frontPrompt:
      "3D biological asset of an ant, frontal view showcasing the head with prominent compound eyes, elbowed antennae in alert position, and strong mandibles. The segmented thorax shows six legs in natural stance, leading to the narrow petiole and bulbous abdomen. Detailed chitinous exoskeleton with microscopic texture, pure solid white background, professional scientific visualization, shadowless studio lighting, centered positioning, square aspect ratio --ar 1:1",
    backPrompt:
      "3D biological asset of an ant, posterior view showing the dorsal surface of the segmented body. The gaster (abdomen) displays fine textural details, the constricted waist node is clearly visible, and the thoracic segments show leg attachment points. Dark brown exoskeleton with natural sheen, clean scientific illustration style, pure solid white background, uniform laboratory lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
  },
};
