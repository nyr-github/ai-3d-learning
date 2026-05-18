import { asset } from "@/lib/utils";
import type { Entity3D, Project } from "@/data/types";

export const BIO_ENTITIES: Entity3D[] = [
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
      {
        name: "Habitat",
        value: "Terrestrial Plants · Aquatic Algae · Ferns",
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
      modelUrl: asset("models/plant-cell-1.glb"),
      imageUrl: asset("images/plant-cell.webp"),
      fileSize: 2746988,
      defaultRotation: { x: 60, y: 20, z: 0 },
      displayScale: 1.4,
    },
    generationPrompts: {
      frontPrompt:
        "3D medical illustration of a plant cell cross-section, front view, eye-level angle. Showing the inner structured layers: rigid green cell wall, large transparent blue central vacuole, green oval chloroplasts, and a purple nucleus. Clean 3D asset style, solid pure white background, studio lighting, shadowless, hyper-detailed biological textures.",
      backPrompt:
        "3D medical illustration of a plant cell, back view, eye-level angle. Showing the intact exterior structure of the rigid, polygonal green plant cell wall with prominent cellulose fiber textures and interconnected plasmodesmata channels. Clean 3D asset style, solid pure white background, shadowless, uniform lighting.",
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
      {
        name: "Habitat",
        value: "Mammals · Fish · Insects · Birds",
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
      modelUrl: asset("models/animal-cell.glb"),
      imageUrl: asset("images/animal-cell.webp"),
      fileSize: 10673912,
      defaultRotation: { x: 150, y: 20, z: 0 },
      displayScale: 1.2,
    },
    generationPrompts: {
      frontPrompt:
        "3D medical rendering of a typical animal cell cross-section, front view, eye-level angle. Exposing the semi-transparent cytoplasm, large spherical central blue nucleus, pink folded rough endoplasmic reticulum, and orange oval mitochondria. Spherical overall shape. Clean 3D asset style, solid pure white background, studio lighting, shadowless.",
      backPrompt:
        "3D medical rendering of a typical animal cell, back view, eye-level angle. Showing the continuous, curved exterior of the flexible lipid bilayer cell membrane, featuring subtle surface receptor proteins and microvilli textures. Clean 3D asset style, solid pure white background, uniform shadowless lighting.",
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
      {
        name: "Habitat",
        value: "Global Biosphere · Microflora",
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
      modelUrl: asset("models/bacterial-cell.glb"),
      imageUrl: asset("images/bacterial-cell.webp"),
      fileSize: 2984560,
      defaultRotation: { x: 0, y: -51.57, z: 0 },
      displayScale: 1.5,
    },
    generationPrompts: {
      frontPrompt:
        "3D scientific illustration of a capsule-shaped bacterium cut open horizontally, front view, eye-level angle. Revealing the interior with tangled blue circular nucleoid DNA strands, red plasmids, and floating tiny ribosomes. Long flagella tails extend from one end. Clean 3D asset style, solid pure white background, shadowless.",
      backPrompt:
        "3D scientific illustration of a capsule-shaped bacterium, back view, eye-level angle. Showing the intact capsule protective layer and smooth outer cell wall envelope. Long flagella tails and small pili hairs are visible on the exterior surface. Clean 3D asset style, solid pure white background, shadowless.",
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
      {
        name: "Habitat",
        value: "Blood · Bone Marrow · Spleen · Lymph Nodes",
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
      modelUrl: asset("models/white-blood-cell.glb"),
      imageUrl: asset("images/white-blood-cell.webp"),
      fileSize: 10812336,
      defaultRotation: { x: 0, y: -45, z: 0 },
      displayScale: 1.4,
    },
    generationPrompts: {
      frontPrompt:
        "3D medical asset of a cross-section of an irregular, amoeboid white blood cell (leukocyte), front view, eye-level. Showing a purple multi-lobed nucleus, numerous digestive lysosomes, and phagocytic vesicles in the pink cytoplasm. Clean 3D asset style, solid pure white background, studio lighting, shadowless.",
      backPrompt:
        "3D medical asset of an irregular, amoeboid white blood cell (leukocyte), back view, eye-level. Showing the highly textured, bumpy outer plasma membrane with active pseudopodia protrusions ready to engulf pathogens. Clean 3D asset style, solid pure white background, shadowless.",
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
      modelUrl: asset("models/neuron.glb"),
      imageUrl: asset("images/neuron.webp"),
      fileSize: 2298720,
      defaultRotation: { x: 0, y: -45, z: 0 },
      displayScale: 1.8,
    },
    generationPrompts: {
      frontPrompt:
        "3D medical graphic of a single multipolar neuron, front view, eye-level angle. Showing the star-shaped cell body (soma) with radiating branching dendrites, an exposed central orange nucleus, and the beginning of the long axon tail. Clean 3D asset style, solid pure white background, studio lighting, shadowless.",
      backPrompt:
        "3D medical graphic of a single multipolar neuron, back view, eye-level angle. Showing the continuous back profile of the star-shaped cell body (soma) extending into the long axon cylinder wrapped in yellow segmented myelin sheath blocks. Clean 3D asset style, solid pure white background, shadowless.",
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
      {
        name: "Size Range",
        unit: "μm",
        min: 1,
        max: 10,
      },
      { name: "Location", value: "Cytoplasm of almost all eukaryotic cells" },
      {
        name: "Where It Occurs",
        value:
          "Denser in cells with high energy demands, such as cardiac muscle, skeletal muscle, and liver cells.",
      },
      {
        name: "Habitat",
        value: "Animals · Plants · Fungi · Protists",
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
      modelUrl: asset("models/mitochondrion.glb"),
      imageUrl: asset("images/mitochondrion.webp"),
      fileSize: 2129324,
      defaultRotation: { x: 0, y: -45, z: 0 },
      displayScale: 1.4,
    },
    generationPrompts: {
      frontPrompt:
        "3D organelle model of an oval mitochondrion cut open longitudinally, front view, eye-level. Showing the smooth brown outer membrane and the highly folded pink inner membrane forming finger-like cristae, enclosing the central fluid matrix. Clean 3D asset style, solid pure white background, high-end medical illustration, shadowless.",
      backPrompt:
        "3D organelle model of an oval mitochondrion, back view, eye-level. Showing the completely intact, smooth, capsule-like brown outer membrane with subtle pore textures. Clean 3D asset style, solid pure white background, uniform studio lighting, shadowless.",
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
      modelUrl: asset("models/chloroplast.glb"),
      imageUrl: asset("images/chloroplast.webp"),
      fileSize: 2014460,
      defaultRotation: { x: 0, y: -45, z: 0 },
      displayScale: 1.4,
    },
    generationPrompts: {
      frontPrompt:
        "3D model of an ellipsoidal green chloroplast cut open to reveal the inside, front view, eye-level angle. Showing the stacked coin-like structures of green thylakoids (grana stacks) connected by stroma lamellae in a clear fluid stroma. Clean 3D asset style, solid pure white background, shadowless medical lighting.",
      backPrompt:
        "3D model of an ellipsoidal green chloroplast, back view, eye-level angle. Showing the fully intact, smooth green double-membrane outer envelope with organic curvature. Clean 3D asset style, solid pure white background, shadowless, uniform exposure.",
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
      {
        name: "Habitat",
        value: "All Living Organisms",
      },
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
      modelUrl: asset("models/cell-membrane.glb"),
      imageUrl: asset("images/cell-membrane.webp"),
      fileSize: 5982004,
      defaultRotation: { x: 0, y: -45, z: 0 },
      displayScale: 1.3,
    },
    generationPrompts: {
      frontPrompt:
        "3D scientific cutaway block diagram of the cell membrane fluid mosaic model, front perspective view. Showing the cross-section of the phospholipid bilayer with round blue hydrophilic heads and yellow hydrophobic tails, with giant purple protein channels embedded across it. Clean 3D asset style, solid pure white background, clear textures, shadowless.",
      backPrompt:
        "3D scientific block diagram of the cell membrane fluid mosaic model, back perspective view. Showing the continuous outer extracellular surface sheet covered in dense blue lipid heads with branching, antenna-like green glycoprotein carbohydrate chains. Clean 3D asset style, solid pure white background, shadowless.",
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
      {
        name: "Habitat",
        value: "All Cellular Organisms · DNA Viruses",
      },
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
      modelUrl: asset("models/dna.glb"),
      imageUrl: asset("images/dna.webp"),
      fileSize: 9977020,
      defaultRotation: { x: 0, y: 0, z: 0 },
      displayScale: 1.2,
    },
    generationPrompts: {
      frontPrompt:
        "3D molecular model of a vertical DNA double helix fragment, front view, eye-level angle. Showing the dual spiraling blue sugar-phosphate ribbons linked by multi-colored horizontal chemical base rungs (Adenine, Thymine, Cytosine, Guanine). Clean 3D asset style, solid pure white background, crisp semi-glossy plastic textures, shadowless.",
      backPrompt:
        "3D molecular model of a vertical DNA double helix fragment rotated 180 degrees, back view, eye-level angle. Showing the continuous alternate spiral curves of the blue backbones twisting away, detailing the major and minor grooves from behind. Clean 3D asset style, solid pure white background, shadowless.",
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
      {
        name: "Habitat",
        value: "Oceans · Soil · Animal Microbiome",
      },
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
      modelUrl: asset("models/bacteriophage.glb"),
      imageUrl: asset("images/bacteriophage.webp"),
      fileSize: 2600432,
      defaultRotation: { x: 0, y: -90, z: 0 },
      displayScale: 1.6,
    },
    generationPrompts: {
      frontPrompt:
        "3D biomechanical asset of a T4 bacteriophage virus, front view, eye-level angle. Features a highly geometric, sharp-edged icosahedral head capsule with semi-translucent crystalline protein facets, showing a faint glow of viral DNA packed inside. The central tail sheath is a tightly wound, ribbed macromolecular cylinder. Symmetrical, ultra-realistic spider-like tail fibers extend outward and anchor firmly. Hyper-detailed organic protein texture, subtle micro-specular gloss, studio lighting with zero hard shadows, isolated on a solid pure white background.",
      backPrompt:
        "3D biomechanical asset of a T4 bacteriophage virus, full back view, eye-level angle. Showcasing the perfect reverse-angle symmetry of the crystalline head facets and the intricate hexagonal baseplate structure. The long tail fibers wrap and extend symmetrically toward the background. Sharp geometric silhouettes, clean tactile protein material, completely shadowless with uniform professional laboratory lighting, isolated on a solid pure white background.",
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
  models: BIO_ENTITIES,
};
