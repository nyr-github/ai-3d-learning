import type { Entity3D, Project } from "@/data/types";

const ENTITIES: Entity3D[] = [
  {
    id: "plant-cell",
    name: "Plant Cell",
    subtitle: "Eukaryotic Cell · Autotrophic Organism",
    mainCategory: "Cells",
    subCategory: "Basic Cell Types",
    accent: "#7fb069",
    description:
      "Plant cells are the basic units that make up plants. Unlike animal cells, they possess a rigid cell wall, chloroplasts capable of photosynthesis, and large vacuoles for storing nutrients and water, enabling them to maintain their shape while providing energy for the entire ecosystem.",
    attributes: [
      { name: "Size Range", unit: "μm", min: 10, max: 100 },
      {
        name: "Location",
        value: "Roots, stems, leaves, flowers, and fruits of plants",
      },
      {
        name: "Where It Occurs",
        value:
          "From mosses to towering trees, plant cells are ubiquitous in building the green landscape of our planet.",
      },
      { name: "Habitat", value: "Terrestrial Plants · Aquatic Algae · Ferns" },
      {
        name: "Microscope Visibility",
        value: {
          "Light Microscope": "Visible",
          "Electron Microscope": "Visible",
        },
      },
      {
        name: "LM Note",
        value:
          "Cell wall, nucleus, and large vacuole are easily observable under low power.",
      },
      {
        name: "EM Note",
        value:
          "Reveals fine structures of all organelles including endomembrane networks.",
      },
      {
        name: "Key Structures",
        value: {
          "Cell Wall":
            "Made of cellulose, provides structural support and mechanical protection",
          Chloroplast:
            "Site of photosynthesis, converts light energy into organic compounds",
          "Large Vacuole":
            "Stores water, sugars, and pigments; maintains turgor pressure",
        },
      },
    ],
    funFact:
      "A mature leaf may contain millions of chloroplasts, making every breath on Earth sweeter.",
    teachingFocus:
      "Compare with Animal Cells to grasp the structures exclusive to plants (Cell Wall, Chloroplast, Large Vacuole) and understand how they maintain turgor pressure.",
    tags: [
      "Eukaryote",
      "Autotrophic",
      "Cell Wall",
      "Double Membrane",
      "Turgor Pressure",
    ],
    model3D: {
      modelUrl: "/models/plant-cell.glb",
      imageUrl: "/models/plant-cell.webp",
      fileSize: 2302256,
      defaultRotation: { x: 0, y: 0, z: 20 },
      displayScale: 1.0,
    },
    generationPrompts: {
      full3DPrompt:
        "Full 3D digital asset of a plant cell, 90-degree wedge cutout styling. One-quarter of the structure is cleanly removed from the front right quadrant to reveal internal biological components: a massive teal-blue central vacuole, bright green chloroplasts, and a purple spherical nucleus. The remaining three-quarters of the model shows a continuous, unbroken exterior shell with a matte waxy green cellulose cell wall texture and microscopic plasmodesmata pores. Complete volumetric 3D model, sharp internal cutting planes, consistent front-to-back geometric definition, studio lighting on solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
      frontPrompt:
        "3D biological asset of a plant cell, 90-degree wedge cutout view from the front, eye-level. One-quarter of the cell structure is cleanly removed from the front right quadrant with a sharp laser-cut finish, revealing a stunning three-dimensional internal look: a massive, turgid, semi-transparent teal-blue central vacuole, bright green chloroplasts with visible thylakoid stacks, a highly detailed purple spherical nucleus, and mitochondria. The dual 90-degree internal cut planes perfectly expose the thick green rigid cell wall layers alongside the intact remaining exterior shell. Professional medical visualization, micro-occlusion rendering, crisp textures, pure solid white background, shadowless studio lighting, centered positioning, square aspect ratio --ar 1:1",
      backPrompt:
        "3D biological asset of a plant cell, intact posterior full view from the exact back, eye-level. Showing the completely unbroken, rigid exterior shell of the plant cell. The surface displays a sharp polygonal geometric structure with microscopic cellulose fiber patterns, interconnected plasmodesmata pores, and an organic matte waxy green texture. Perfectly matches the shape, silhouette, and orientation of the front view. Professional scientific model, clean textures, pure solid white background, uniform laboratory lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
    },
  },
  {
    id: "animal-cell",
    name: "Animal Cell",
    subtitle: "Eukaryotic Cell · Heterotrophic Organism",
    mainCategory: "Cells",
    subCategory: "Basic Cell Types",
    accent: "#e8859a",
    description:
      "Animal cells lack cell walls and chloroplasts, relying on flexible cell membranes and rich organelles to collaborate in metabolism and movement.",
    attributes: [
      { name: "Size Range", value: "10 – 30", unit: "μm", min: 10, max: 30 },
      { name: "Location", value: "Tissues and organs of all animals" },
      {
        name: "Where It Occurs",
        value:
          "From single-celled protozoa to whales, all animal bodies are composed of animal cells.",
      },
      { name: "Habitat", value: "Mammals · Fish · Insects · Birds" },
      {
        name: "Microscope Visibility",
        value: {
          "Light Microscope": "Visible",
          "Electron Microscope": "Visible",
        },
      },
      {
        name: "LM Note",
        value:
          "Requires basic staining (like methylene blue) to clearly distinguish the nucleus and cytoplasm.",
      },
      {
        name: "EM Note",
        value:
          "Reveals complex organelle collaboration and cytoskeletal structures.",
      },
      {
        name: "Key Structures",
        value: {
          "Cell Membrane":
            "Phospholipid bilayer, selectively controls substance entry and exit via the fluid mosaic model",
          Nucleus: "Genetic center, contains DNA, chromatin and nucleolus",
        },
      },
    ],
    funFact:
      "An average adult human body contains approximately 37 trillion cells.",
    teachingFocus:
      "Focus on the Endomembrane System (ER -> Golgi -> Membrane) to understand how secretory proteins are synthesized.",
    tags: [
      "Eukaryote",
      "Heterotrophic",
      "Fluid Mosaic",
      "Organelle Cooperation",
    ],
    model3D: {
      modelUrl: "/models/animal-cell.glb",
      imageUrl: "/models/animal-cell.webp",
      fileSize: 2527628,
      defaultRotation: { x: 87, y: 20, z: 0 },
      displayScale: 1.0,
    },
    generationPrompts: {
      full3DPrompt:
        "Full 3D digital asset of a hemisphere animal cell, designed as a perfect 1/2 longitudinal cross-section, presented at a 30-degree tilted isometric perspective. The model is cleanly divided into two halves; the prominent flat interior cross-section face completely exposes cellular anatomy: a prominent blue spherical nucleus, pink rough endoplasmic reticulum, and orange mitochondria embedded in cytoplasm. The exact flip side (posterior) forms the remaining intact 1/2 hemisphere dome showing a continuous outer cell membrane with a microscopic lipid fluid mosaic texture. Complete half-sphere volumetric 3D mesh, sharp rim boundaries, solid pure white background, shadowless studio lighting, centered positioning, square aspect ratio --ar 1:1",
      frontPrompt:
        "3D medical illustration of a spherical animal cell cut exactly in half (1/2 cross-section view), viewed from an isometric perspective tilted at a 30-degree angle. The large, flat, circular internal plane faces the camera, fully exposing the detailed cellular interior embedded in translucent pink cytoplasm: a massive blue nucleus with chromatin fibers, extensive dense pink rough endoplasmic reticulum with tiny ribosomes, and vibrant orange mitochondria. The razor-sharp cut rim defines the circular boundary of the cell membrane. High-fidelity cinematic scientific render, ambient occlusion, solid pure white background, shadowless, centered, square aspect ratio --ar 1:1",
      backPrompt:
        "3D medical illustration of a hemisphere animal cell, intact posterior full view from the exact back, matching the 30-degree tilted orientation perfectly. Since the cell is cut in half, this view shows the completely unbroken, continuous 1/2 dome exterior shell of the animal cell membrane from behind. The surface features a rich microscopic fluid mosaic lipid bilayer texture, dotted with fine glycoprotein receptors. Solid half-sphere silhouette that perfectly mirrors and aligns with the 1/2 front cross-section. Professional 3D asset style, solid pure white background, uniform laboratory diffuse lighting, shadowless, centered, square aspect ratio --ar 1:1",
    },
  },
  {
    id: "bacterial-cell",
    name: "Bacterial Cell",
    subtitle: "Prokaryotic Cell · Unicellular Organism",
    mainCategory: "Cells",
    subCategory: "Basic Cell Types",
    accent: "#4da6db",
    description:
      "Bacterial cells represent prokaryotic life. They lack a nuclear membrane and membrane-bound organelles. Their genetic material floats freely in the nucleoid region.",
    attributes: [
      { name: "Size Range", unit: "μm", min: 0.5, max: 5 },
      {
        name: "Location",
        value: "Soil, water, air, and inside or on other organisms",
      },
      {
        name: "Where It Occurs",
        value:
          "Bacteria thrive in every habitat on Earth, from deep-sea hydrothermal vents to Antarctic ice sheets.",
      },
      { name: "Habitat", value: "Global Biosphere · Microflora" },
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
          "Requires Gram staining or oil immersion lenses to resolve cell shapes clearly due to their tiny size.",
      },
      {
        name: "EM Note",
        value:
          "Clearly differentiates the capsule, cell wall, and internal ribosome distribution.",
      },
      {
        name: "Key Structures",
        value: {
          "Nucleoid (Genophore)":
            "Region containing a single, circular DNA molecule, lacking a surrounding nuclear membrane",
          "Cell Wall (Peptidoglycan)":
            "Rigid layer outside the membrane protecting against osmotic lysis",
        },
      },
    ],
    funFact: "The microbes in your body outnumber your human cells.",
    teachingFocus:
      "The ultimate model to teach 'Prokaryote vs Eukaryote'. Emphasize the absolute absence of a nuclear membrane.",
    tags: ["Prokaryote", "Nucleoid", "Peptidoglycan", "Flagellum", "Plasmids"],
    model3D: {
      modelUrl: "/models/bacterial-cell.glb",
      imageUrl: "/models/bacterial-cell.webp",
      fileSize: 2037060,
      defaultRotation: { x: 0, y: -51.57, z: 0 },
      displayScale: 1.5,
    },
    generationPrompts: {
      full3DPrompt:
        "Full 3D digital asset of a capsule-shaped bacterium, 90-degree wedge cutout styling. One-quarter of the rod-shaped body is sliced out from the front right quadrant. The exposed internal planes display a tangled central mass of light-blue nucleoid DNA strands, red plasmids, and granular ribosomes, bounded by three distinct structural layers (membrane, cell wall, capsule). The remaining three-quarters shows an unbroken, glossy protective capsule envelope with microscopic hair-like pili and long flagella tails emerging from the base. Complete volumetric 3D mesh, precise geometric orientation, solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
      frontPrompt:
        "3D microbiological asset of a capsule-shaped bacterium, 90-degree wedge cutout view from the front, eye-level. One-quarter of the rod-shaped capsule is cleanly sliced out from the front right quadrant, forming perpendicular internal cross-section planes. The interior reveals a dense tangled central mass of light-blue circular nucleoid DNA strands, red plasmids, and granular ribosomes. The sharp multi-layer cut edge beautifully outlines the inner cell membrane, middle peptidoglycan cell wall, and outermost protective capsule layer. Long flagella tails originate from the base. Hyper-precise scientific visualization, pure white background, studio lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
      backPrompt:
        "3D microbiological asset of a capsule-shaped bacterium, intact posterior full view from the back, eye-level. Showing the unbroken, smooth exterior capsule envelope of the rod-shaped prokaryote. The capsule has a glossy, organic protective layer texture. Multiple thin, hair-like pili project evenly across the surface, and several long, whip-like flagella tails emerge from the rear end, matching the exact spatial alignment of the front view. Clean geometric 3D asset style, solid pure white background, uniform professional illumination, shadowless, centered positioning, square aspect ratio --ar 1:1",
    },
  },
  {
    id: "white-blood-cell",
    name: "White Blood Cell",
    subtitle: "Immune Cell · Body's Guardian",
    mainCategory: "Cells",
    subCategory: "Specialized Cells",
    accent: "#c8a2d8",
    description:
      "White blood cells are core members of the immune system, patrolling through blood and lymph. They can recognize invading pathogens and protect the body's homeostasis.",
    attributes: [
      { name: "Size Range", value: "6 – 20", unit: "μm", min: 6, max: 20 },
      {
        name: "Location",
        value: "Blood, lymphatic system, bone marrow, and infected tissues",
      },
      {
        name: "Where It Occurs",
        value:
          "In every drop of blood, millions of white blood cells patrol your body around the clock.",
      },
      { name: "Habitat", value: "Blood · Bone Marrow · Spleen · Lymph Nodes" },
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
          "Requires Wright's or Giemsa staining in blood smears to view the distinct lobed nuclei.",
      },
      {
        name: "EM Note",
        value:
          "Shows active surface pseudopodia and rich intracellular phagocytic vesicles.",
      },
      {
        name: "Key Structures",
        value: {
          "Irregular Nucleus":
            "Varies by subtype; lobed (Neutrophils) or horseshoe-shaped (Monocytes) to help pass through narrow gaps",
          "Cell Membrane & Pseudopodia":
            "Can actively deform for amoeboid movement",
        },
      },
    ],
    funFact:
      "A healthy adult produces approximately 100 billion new white blood cells daily.",
    teachingFocus:
      "Observe how its lobed nucleus and dynamic membrane facilitate amoeboid movement.",
    tags: [
      "Immune Response",
      "Phagocytosis",
      "Amoeboid Movement",
      "Active Deformation",
    ],
    model3D: {
      modelUrl: "/models/white-blood-cell.glb",
      imageUrl: "/models/white-blood-cell.webp",
      fileSize: 3531228,
      defaultRotation: { x: 0, y: 0, z: 20 },
      displayScale: 1.1,
    },
    generationPrompts: {
      full3DPrompt:
        "Full 3D digital asset of an amoeboid white blood cell, 90-degree wedge cutout styling. A 1/4 section is cut away from the front right side to reveal flat perpendicular internal planes showing a deeply segmented lobed purple nucleus and digestive lysosomes inside granular cytoplasm. The rest of the 3D model forms a continuous, highly dynamic outer plasma membrane covered in irregular ruffles, microvilli, and prominent pseudopodia extensions. Complete multi-lobed geometric 3D structure, clear sectional depth, pure solid white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
      frontPrompt:
        "3D immunobiological rendering of an irregular, amoeboid white blood cell, 90-degree wedge cutout view from the front, eye-level. A 1/4 section is cleanly cut away from the front right side, exposing flat perpendicular internal planes. Inside the granular cytoplasm, a deeply segmented lobed purple nucleus, microscopic lysosomes, and active phagocytic vacuoles are revealed in sharp detail. The complex asymmetric perimeter of the cell's membrane pseudopodia is captured perfectly along the 3/4 remaining body. Premium laboratory visualization style, extreme structural definition, solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
      backPrompt:
        "3D immunobiological rendering of an irregular, amoeboid white blood cell (leukocyte), intact posterior full view from the back, eye-level. Showing the highly dynamic, heavily ruffled outer plasma membrane. The surface is covered in irregular folds, microvilli, and prominent pseudopodia arm extensions frozen in a predatory movement state. The silhouette matches the complex, asymmetric boundary of the front view exactly. Clean 3D asset presentation, solid pure white background, uniform studio lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
    },
  },
  {
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
      modelUrl: "/models/neuron.glb",
      imageUrl: "/models/neuron.webp",
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
  },
  {
    id: "mitochondrion",
    name: "Mitochondrion",
    subtitle: "Organelle · Cell's Powerhouse",
    mainCategory: "Organelles",
    subCategory: "Subcellular Structures",
    accent: "#d97b5a",
    description:
      "Mitochondria are the 'powerhouses' of eukaryotic cells, with nearly all energy-requiring life activities depending on them. Through aerobic respiration, they convert chemical energy into ATP.",
    attributes: [
      { name: "Size Range", unit: "μm", min: 1, max: 10 },
      { name: "Location", value: "Cytoplasm of almost all eukaryotic cells" },
      {
        name: "Where It Occurs",
        value:
          "Denser in cells with high energy demands, such as cardiac muscle, skeletal muscle, and liver cells.",
      },
      { name: "Habitat", value: "Animals · Plants · Fungi · Protists" },
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
          "Visible as tiny granules or rods only after Janus Green B vital staining.",
      },
      {
        name: "EM Note",
        value:
          "Displays detailed double-membrane structure and the elaborate folds of internal cristae.",
      },
      {
        name: "Key Structures",
        value: {
          "Inner Membrane & Cristae":
            "Folds inward to form 'cristae', expanding surface area for electron transport chain enzymes",
          Matrix:
            "Fluid region enclosed by the inner membrane; contains enzymes for the Krebs cycle",
        },
      },
    ],
    funFact:
      "Mitochondria are believed to have originated from an ancient aerobic bacterium engulfed by a primitive eukaryote.",
    teachingFocus:
      "Correlate structural compartmentalization with biochemical steps: Krebs cycle occurs in the Matrix; ETC occurs on the Cristae.",
    tags: [
      "Double Membrane",
      "ATP Synthesis",
      "Aerobic Respiration",
      "Endosymbiosis",
      "Maternal Inheritance",
    ],
    model3D: {
      modelUrl: "/models/mitochondrion.glb",
      imageUrl: "/models/mitochondrion.webp",
      fileSize: 1240456,
      defaultRotation: { x: 20, y: 90, z: 60 },
      displayScale: 1.2,
    },
    generationPrompts: {
      full3DPrompt:
        "Full 3D digital asset of an oval mitochondrion, 90-degree wedge cutout styling. A 1/4 piece is carved out from the front right quadrant of the bean-shaped organelle. The perpendicular cross-section planes reveal double-membrane anatomy: a smooth outer membrane border, an inner membrane folding into pinkish-orange cristae channels, and a fluid central matrix. The remaining 3/4 forms a continuous, completely enclosed capsule exterior with an organic matte brown lipid texture. Accurate 3D asset geometry, high-end medical definition, solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
      frontPrompt:
        "3D organelle model of an oval mitochondrion, 90-degree wedge cutout view from the front, eye-level. A 1/4 piece is cleanly removed from the front right quadrant of the bean-shaped organelle with sharp perpendicular cut lines. The exposed internal planes display the dual-membrane anatomy perfectly: a smooth outer membrane border, an inner membrane folding intricately into sharp, pinkish-orange cristae channels, and a central matrix fluid containing mitochondrial DNA and tiny ATP synthase spheres. Hyper-detailed medical illustration, clear geometric structure, pure solid white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
      backPrompt:
        "3D organelle model of an oval mitochondrion, intact posterior full view from the exact back, eye-level. Representing the totally enclosed, continuous, smooth capsule-like exterior shell of the organelle. The outer membrane displays an organic matte, warm brown lipid texture with fine, clean pores. Capsule silhouette aligns exactly with the cutaway front counterpart. Professional 3D science asset style, solid pure white background, uniform soft lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
    },
  },
  {
    id: "chloroplast",
    name: "Chloroplast",
    subtitle: "Organelle · Site of Photosynthesis",
    mainCategory: "Organelles",
    subCategory: "Subcellular Structures",
    accent: "#4daf7c",
    description:
      "Chloroplasts are unique organelles found in green plants and some algae, hailed as the 'green factories' of cells. They capture solar energy to synthesize organic molecules.",
    attributes: [
      {
        name: "Size Range",
        value: "5 – 10",
        unit: "μm (Length)",
        min: 5,
        max: 10,
      },
      {
        name: "Location",
        value:
          "Mesophyll cells of green plants, young stems, and green algal cells",
      },
      {
        name: "Where It Occurs",
        value:
          "All eukaryotic photosynthetic organisms rely on chloroplasts to drive the carbon and oxygen cycles of Earth.",
      },
      {
        name: "Habitat",
        value: "Terrestrial Plants · Green Algae · Mosses & Ferns",
      },
      {
        name: "Microscope Visibility",
        value: {
          "Light Microscope": "Visible",
          "Electron Microscope": "Visible",
        },
      },
      {
        name: "LM Note",
        value:
          "Directly visible as green ellipsoids or discs without any chemical staining due to chlorophyll.",
      },
      {
        name: "EM Note",
        value:
          "Reveals detailed internal thylakoids, stacked grana structures, and stroma regions.",
      },
      {
        name: "Key Structures",
        value: {
          "Thylakoids & Grana":
            "Flat sac-like membranes stacked into 'grana', maximizing the surface area for light reactions",
          Stroma:
            "The fluid compartment containing enzymes required for the Calvin Cycle",
        },
      },
    ],
    funFact:
      "The light reactions split water to release O₂ on the thylakoid membrane, while the dark reactions fix CO₂ into sugar inside the stroma.",
    teachingFocus:
      "Understand the division of labor during photosynthesis: Light reactions take place on the Thylakoids, Dark reactions in the Stroma.",
    tags: [
      "Double Membrane",
      "Photosynthesis",
      "Thylakoid",
      "Carbon Fixation",
      "Endosymbiosis",
    ],
    model3D: {
      modelUrl: "/models/chloroplast.glb",
      imageUrl: "/models/chloroplast.webp",
      fileSize: 1102320,
      defaultRotation: { x: 0, y: 0, z: 0 },
      displayScale: 1.0,
    },
    generationPrompts: {
      full3DPrompt:
        "Full 3D digital asset of an ellipsoidal chloroplast, 90-degree wedge cutout styling. One-quarter of the green oval envelope is removed from the front right quadrant. Perpendicular internal planes expose organized columns of dark green coin-like thylakoid discs stacked into grana, linked by stroma lamellae threads in an emerald fluid stroma. The remaining 3/4 forms a completely seamless, egg-shaped outer green membrane with a fine organic kelly green micro-texture. Complete 3D volumetric mesh, clean biological definitions, solid pure white background, shadowless laboratory lighting, centered positioning, square aspect ratio --ar 1:1",
      frontPrompt:
        "3D scientific model of an ellipsoidal chloroplast, 90-degree wedge cutout view from the front, eye-level. One-quarter of the green oval envelope is cleanly carved away from the front right quadrant with precise perpendicular cross-section surfaces. The interior displays neat columns of dark green thylakoid discs stacked into grana, connected by stroma lamellae fibers. The background fluid stroma is a clear, emerald liquid containing tiny starch granules. Brilliant depth contrast, crisp biological textures, solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
      backPrompt:
        "3D scientific model of an ellipsoidal chloroplast, intact posterior full view from the back, eye-level. Showing the completely seamless, smooth, egg-shaped green outer envelope. The outer membrane features a vibrant organic kelly green color with a fine biological micro-texture and subtle dual-layer depth lines. Perfect geometrical symmetry matching the front slice. Clean 3D asset presentation, solid pure white background, uniform diffuse lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
    },
  },
  {
    id: "cell-membrane",
    name: "Cell Membrane",
    subtitle: "Subcellular Structure · Fluid Mosaic Model",
    mainCategory: "Organelles",
    subCategory: "Subcellular Structures",
    accent: "#e67e22",
    description:
      "The cell membrane is a dynamic, semi-permeable biological membrane that regulates the transport of materials and mediates cell signaling.",
    attributes: [
      {
        name: "Size Range",
        value: "7 – 10",
        unit: "nm (Thickness)",
        min: 7,
        max: 10,
      },
      {
        name: "Location",
        value: "Surrounding the cytoplasm of all living cells",
      },
      {
        name: "Where It Occurs",
        value:
          "An absolute universal component of life—no cell can exist without a cell membrane to define its boundaries.",
      },
      { name: "Habitat", value: "All Living Organisms" },
      {
        name: "Microscope Visibility",
        value: {
          "Light Microscope": "Invisible",
          "Electron Microscope": "Visible",
        },
      },
      {
        name: "LM Note",
        value: "Too thin (~10nm) to be resolved by optical light microscopes.",
      },
      {
        name: "EM Note",
        value:
          "Appears as a classic 'dark-light-dark' trilaminar structure under TEM.",
      },
      {
        name: "Key Structures",
        value: {
          "Phospholipid Bilayer":
            "The core framework; hydrophilic phosphate heads face outward, hydrophobic fatty acid tails face inward",
          "Embedded Proteins":
            "Integral and peripheral proteins acting as channels, pumps, or receptors",
        },
      },
    ],
    funFact: "The cell membrane is as fluid as olive oil!",
    teachingFocus:
      "Master the structure of phospholipids (amphipathic nature) and distinguish between Passive and Active Transport.",
    tags: [
      "Phospholipid Bilayer",
      "Fluid Mosaic",
      "Selective Permeability",
      "Glycoprotein",
      "Transport",
    ],
    model3D: {
      modelUrl: "/models/cell-membrane.glb",
      imageUrl: "/models/cell-membrane.webp",
      fileSize: 4790932,
      defaultRotation: { x: 45, y: 0, z: 45 },
      displayScale: 1.1,
    },
    generationPrompts: {
      full3DPrompt:
        "Full 3D macromolecular block diagram of the cell membrane fluid mosaic model, 90-degree corner cutout perspective. A 1/4 corner block is removed from the front right side, exposing perpendicular vertical cross-section planes that show dual-layer lipid alignments (blue hydrophilic head spheres, yellow fatty acid tails) and sliced purple protein channels. The remaining outer surfaces form a continuous extracellular sheet showing an organized mosaic landscape of blue lipid spheres with green branched glycoprotein chains sprouting upward. Technical 3D graphic block mesh, solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
      frontPrompt:
        "3D macromolecular block diagram of the cell membrane fluid mosaic model, 90-degree corner cutout perspective view from the front. A 1/4 corner block is cleanly removed from the front right side, exposing two sharp perpendicular vertical cross-section planes. The cuts show the exact internal arrangement of the lipid bilayer with blue hydrophilic head spheres and yellow fatty acid tails, alongside massive purple protein channels sliced in half. The top surface remains intact showing a mosaic landscape of lipid heads and glycoproteins. Technical asset style, pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
      backPrompt:
        "3D macromolecular block diagram of the cell membrane fluid mosaic model, intact posterior full view from the opposite angle, eye-level. Showing the continuous, unbroken extracellular top surface sheet. The surface is an organized mosaic landscape composed entirely of dense blue lipid spheres, from which multiple green branched carbohydrate chains (glycoproteins and glycolipids) sprout upward like tiny antennas. Clean block boundary alignment that matches the front cutaway structure. Technical 3D graphic asset, solid pure white background, uniform flat lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
    },
  },
  {
    id: "dna",
    name: "DNA Double Helix",
    subtitle: "Genetic Molecule · Blueprint of Life",
    mainCategory: "Biomolecules",
    subCategory: "Macromolecules",
    accent: "#9cc4e4",
    description:
      "DNA consists of two complementary nucleotide chains twisted into an elegant double helix. It writes life's instructions with four letters—A, T, G, C.",
    attributes: [
      { name: "Size Range", value: "Diameter ~2 nm, length varies" },
      {
        name: "Location",
        value: "Nucleus, mitochondria, chloroplasts, and prokaryotic nucleoids",
      },
      {
        name: "Where It Occurs",
        value:
          "From ancient archaea to human cells, it acts as the universal storage of genetic blueprints.",
      },
      { name: "Habitat", value: "All Cellular Organisms · DNA Viruses" },
      {
        name: "Microscope Visibility",
        value: {
          "Light Microscope": "Invisible",
          "Electron Microscope": "Visible",
        },
      },
      {
        name: "LM Note",
        value:
          "Individual double helix chains are invisible, though condensed chromosomes are visible during cell division.",
      },
      {
        name: "EM Note",
        value:
          "Requires advanced techniques like Cryo-EM or AFM to resolve the distinct helical contours.",
      },
      {
        name: "Key Structures",
        value: {
          "Sugar-Phosphate Backbone":
            "Formed by alternating phosphate and deoxyribose units linked by phosphodiester bonds",
          "Complementary Base Pairs":
            "Adenine pairs with Thymine, Guanine pairs with Cytosine via hydrogen bonds",
        },
      },
    ],
    funFact:
      "If uncoiled, the DNA in a single human cell would extend about 2 meters.",
    teachingFocus:
      "Master Chargaff's Rules (A=T, G=C) and visualize how hydrogen bonding holds the central rungs together.",
    tags: [
      "Double Helix",
      "Base Pairing",
      "Hydrogen Bonds",
      "Genetic Code",
      "Antiparallel",
    ],
    model3D: {
      modelUrl: "/models/dna.glb",
      imageUrl: "/models/dna.webp",
      fileSize: 1600924,
      defaultRotation: { x: 0, y: 0, z: 0 },
      displayScale: 1.2,
    },
    generationPrompts: {
      full3DPrompt:
        "Full 3D atomic-scale molecular mesh of a vertical DNA double helix strand. Features two anti-parallel spiraling backbones made of metallic blue sugar-phosphate chains twisting gracefully upwards, forming accurate major and minor grooves. Symmetrical horizontal nucleotide base rungs link them together with explicit color-coding: Adenine (crimson), Thymine (gold), Cytosine (emerald green), and Guanine (vibrant purple), joined by dotted silver links. Complete volumetric 3D molecular asset, sharp geometry from all 360-degree viewing angles, specular highlights, solid pure white background, shadowless studio lighting, centered positioning, square aspect ratio --ar 1:1",
      frontPrompt:
        "3D atomic-scale molecular model of a vertical DNA double helix strand, front view, eye-level. The model uses a highly detailed semi-glossy finish. Two anti-parallel spiraling backbones made of metallic blue sugar-phosphate chains twist gracefully upwards. Symmetrical horizontal nucleotide base rungs link them together, with clear color coding for bases: Adenine (crimson), Thymine (gold), Cytosine (emerald green), and Guanine (vibrant purple), connected by visible dotted silver hydrogen bond links. Sharp chemical asset styling, crisp specular highlights, solid pure white background, studio shadowless lighting, centered positioning, square aspect ratio --ar 1:1",
      backPrompt:
        "3D atomic-scale molecular model of a vertical DNA double helix strand, full back view rotated exactly 180 degrees, eye-level. Showing the continuous reverse curves of the winding blue sugar-phosphate helical backbones. Focuses on the pristine geometry of the spiraling major grooves and minor grooves winding around the central axis, with the back profiles of the colorful base rungs visible through the spiral openings. Perfectly symmetrical, solid pure white background, uniform flat lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
    },
  },
  {
    id: "bacteriophage",
    name: "T4 Bacteriophage",
    subtitle: "Virus · Bacterial Parasite",
    mainCategory: "Viruses",
    subCategory: "Non-cellular Entities",
    accent: "#e74c3c",
    description:
      "Bacteriophages are viruses that infect and replicate within bacteria. The T4 bacteriophage possesses an intricate 'lunar lander' structure.",
    attributes: [
      { name: "Size Range", value: "60 – 200", unit: "nm", min: 60, max: 200 },
      {
        name: "Location",
        value:
          "Anywhere bacteria exist; highly abundant in soil, oceans, and animal guts",
      },
      {
        name: "Where It Occurs",
        value:
          "Phages are everywhere bacteria reside, serving as critical regulators of bacterial populations in global ecosystems.",
      },
      { name: "Habitat", value: "Oceans · Soil · Animal Microbiome" },
      {
        name: "Microscope Visibility",
        value: {
          "Light Microscope": "Invisible",
          "Electron Microscope": "Visible",
        },
      },
      {
        name: "LM Note",
        value:
          "Far smaller than the wavelength of visible light; can only be inferred through plaque assays.",
      },
      {
        name: "EM Note",
        value:
          "Easily visualized using negative staining TEM, revealing its geometric crystalline head.",
      },
      {
        name: "Key Structures",
        value: {
          "Icosahedral Head (Capsid)":
            "A protein shell composed of capsomeres that tightly packs and protects the viral dsDNA genome",
          "Sheath & Core Tube":
            "A contractile tail structure that acts like a molecular syringe to punch through the cell wall",
        },
      },
    ],
    funFact:
      "Bacteriophages are the most abundant biological entities on Earth!",
    teachingFocus:
      "The prime example of 'Non-cellular life'. Excellent for teaching the Hershey-Chase experiment.",
    tags: [
      "Virus",
      "Capsid",
      "Non-cellular",
      "Lytic Cycle",
      "Genetic Injection",
    ],
    model3D: {
      modelUrl: "/models/bacteriophage.glb",
      imageUrl: "/models/bacteriophage.webp",
      fileSize: 2202052,
      defaultRotation: { x: 0, y: 0, z: 0 },
      displayScale: 1.2,
    },
    generationPrompts: {
      full3DPrompt:
        "Full 3D biomechanical asset of a T4 bacteriophage virus standing upright, featuring a 90-degree wedge cutout applied to the crystalline head. A 1/4 wedge is cleanly cut from the front right side of the icosahedral protein head capsid, revealing an inner coiled mass of glowing blue viral DNA. The vertical ribbed tail sheath, hexagonal baseplate, and six long spider-like tail fibers remain entirely whole and unbroken. Complete volumetric 3D mesh with absolute front-to-back geometric alignment, micro-specular gloss, solid pure white background, shadowless studio lighting, centered positioning, square aspect ratio --ar 1:1",
      frontPrompt:
        "3D biomechanical asset of a T4 bacteriophage virus standing upright, 90-degree wedge cutout view of the head from the front, eye-level. A 1/4 wedge is cleanly sliced out from the front right side of the icosahedral geometric protein head capsid, revealing two sharp internal planes. The cutout exposes a tightly coiled inner mass of glowing blue double-stranded viral DNA, while the remaining 3/4 capsid preserves its crystalline structural facets. The vertical ribbed tail sheath and six long spider-like tail fibers remain whole and symmetrical. Hyper-detailed medical asset, solid pure white background, shadowless, centered positioning, square aspect ratio --ar 1:1",
      backPrompt:
        "3D biomechanical asset of a T4 bacteriophage virus standing upright, intact posterior full view from the exact back, eye-level. Displays the completely unbroken, solid crystalline geometric facets of the icosahedral capsid head protein shell. The long vertical tail sheath cylinder and the intranet hexagonal baseplate are fully intact from behind, with the reverse angles of the long spider-like tail fibers wrapping around symmetrically. Absolute geometric alignment with the front view. Sleek matte technical material, solid pure white background, uniform flat lab lighting, shadowless, centered positioning, square aspect ratio --ar 1:1",
    },
  },
];

export const bioProject: Project = {
  name: "Biological Entities",
  slug: "bio",
  icon: "🧬",
  description:
    "Explore cells, organelles, biomolecules, and viruses in interactive 3D",
  tabName: "Bio-Models",
  models: ENTITIES,
};
