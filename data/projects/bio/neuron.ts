import type { Entity3D } from "@/data/types";

export const neuron: Entity3D = {
  id: "neuron",
  name: "Neuron",
  subtitle: "Excitable Cell · Information Transmitter",
  mainCategory: "Cells",
  subCategory: "Specialized Cells",
  accent: "#f0a868",
  description:
    "Neurons are the basic units of information processing. Prominent dendrites receive signals like antennas, while long axons send electrical impulses to distant locations.",
  attributes: [
    { name: "Size Range", unit: "μm", min: 4, max: 100 },
    {
      name: "Location",
      value: "Brain, spinal cord, peripheral nervous system",
    },
    {
      name: "Where It Occurs",
      value:
        "From butterfly compound eyes to the human cerebral cortex, neurons give animals the ability to sense, move, and think.",
    },
    {
      name: "Habitat",
      value: "Central Nervous System · Peripheral Nerves · Sensory Organs",
    },
    {
      name: "Microscope Visibility",
      value: {
        "Light Microscope": "Staining Required",
        "Electron Microscope": "Visible",
      },
    },
    {
      name: "LM Note",
      value:
        "Requires specialized silver staining (Golgi's method) to trace the intricate branching fibers.",
    },
    {
      name: "EM Note",
      value: "Captures high-resolution details of synaptic vesicles.",
    },
    {
      name: "Key Structures",
      value: {
        Dendrites:
          "Highly branched, tree-like structures that receive signals from other neurons",
        Axon: "A single long fiber that conducts action potentials away from the soma",
      },
    },
  ],
  funFact: "The human brain has approximately 86 billion neurons.",
  teachingFocus:
    "Understand directional signal flow: Dendrites (Input) -> Soma (Integration) -> Axon (Output) -> Synapse (Transmission).",
  tags: [
    "Nervous System",
    "Bioelectricity",
    "Synaptic Transmission",
    "Polarized Structure",
  ],
  model3D: {
    modelUrl: "/models/bio/neuron.glb",
    imageUrl: "/models/bio/neuron.webp",
    fileSize: 1167660,
    defaultRotation: { x: 0, y: 0, z: 0 },
    displayScale: 1.4,
  },
  generationPrompts: {
    full3DPrompt:
      "Full 3D digital asset of a multipolar neuron, 90-degree wedge cutout styling applied to the main cell body (soma). A 1/4 wedge is removed from the front right quadrant of the star-shaped soma to expose internal structures: an orange central nucleus and neurofilaments. The rest of the 3D model extends into an intact continuous network of tree-like branching dendrites and a long downward axon cylinder completely wrapped in yellow segmented myelin sheath blocks. Clear 3D structural mesh, razor-sharp geometric details, solid pure white background, shadowless studio lighting, centered positioning, square aspect ratio --ar 1:1",
    frontPrompt:
      "3D neurological model of a single multipolar neuron, 90-degree wedge cutout view of the main star-shaped cell body (soma) from the front, eye-level. A 1/4 wedge is meticulously removed from the front right quadrant of the soma, creating two perpendicular cut planes meeting at the center. The cross-sections reveal a glowing orange central nucleus, Nissl bodies, and cytoskeletal neurofilaments. Branching dendrites radiate outward symmetrically, and the base of the long axon is exposed. Clinical graphic asset style, razor-sharp geometric edges, solid pure white background, shadowless studio lighting, centered positioning, square aspect ratio --ar 1:1",
    backPrompt:
      "3D neurological model of a single multipolar neuron, intact posterior full view from the back, eye-level. Showing the continuous back profile of the star-shaped soma and its extensive network of branching dendrites. The long axon fiber extends downward, completely wrapped in distinct, high-contrast yellow segmented myelin sheath blocks with visible Nodes of Ranvier. Perfectly mirrors the spatial footprint of the front view. Crisp 3D object format, solid pure white background, uniform laboratory diffuse lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
  },
};
