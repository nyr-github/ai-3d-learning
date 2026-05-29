# Show3D - Interactive 3D Science Learning Platform

Explore science in 3D! Show3D is an interactive 3D model viewing platform designed for classroom teaching, science communication, and product demonstration.

## 🎯 Project Overview

Show3D provides an immersive way to explore biological entities, chemical molecules, physical structures, and various 3D models through interactive visualization. Built with Next.js, React Three Fiber, and Three.js, it offers real-time 3D rendering with smart caching and optimization.

## 📦 3D Model Collections

The platform currently hosts **6 major project categories** with **40+ high-quality 3D models**:

### 🧬 Biological Entities (Bio-Models)

Explore cells, organelles, biomolecules, and viruses:

- **Plant Cell** - Complete plant cell structure with organelles
- **Animal Cell** - Eukaryotic animal cell model
- **Bacterial Cell** - Prokaryotic cell structure
- **White Blood Cell** - Immune system cell
- **Neuron** - Nerve cell with dendrites and axon
- **Mitochondrion** - Cellular power plant
- **Chloroplast** - Photosynthesis organelle
- **Cell Membrane** - Phospholipid bilayer structure
- **DNA** - Double helix molecular structure
- **Bacteriophage** - Virus infecting bacteria

### 👤 Digital Avatars (Char-Models)

Iconic anime characters, fantasy entities, and creative designs:

- **Donatello** - Teenage Mutant Ninja Turtles character
- **Monkey D. Luffy** - One Piece protagonist
- **Wood Ent** - Fantasy tree creature
- **Shadow Stalker** - Dark fantasy entity
- **Smiley Joy Root** - Creative character design
- **Steampunk Robot** - Victorian-era mechanical design
- **Mech Warrior** - Futuristic combat robot
- **Steampunk Mechanical Bird** - Ornithopter design
- **Pikachu** - Popular Pokémon character

### 🦖 Mesozoic Legends (Paleo-Models)

Scientifically accurate prehistoric dinosaur models:

- **Brachiosaurus** - Massive long-necked herbivore
- **Triceratops** - Three-horned ceratopsian
- **Tyrannosaurus Rex** - Apex predator
- **Velociraptor** - Agile pack hunter

### 🪲 Micro-Monsters (Entomology-Models)

Hyper-realistic insect digital specimens:

- **Ant** - Social insect with complex anatomy
- **Cicada** - Periodical insect with distinctive features
- **Dragonfly** - Ancient flying predator
- **Firefly** - Bioluminescent beetle
- **Grasshopper** - Jumping orthopteran
- **Honeybee** - Essential pollinator
- **Ladybug** - Beneficial beetle
- **Monarch Butterfly** - Migratory lepidopteran
- **Praying Mantis** - Ambush predator
- **Rhinoceros Beetle** - Powerful scarab beetle

### 🦎 The Lizard Chronicles (Saurian-Models)

Diverse squamates and reptilian species:

- **Plumed Basilisk** - Jesus Christ lizard
- **Central Bearded Dragon** - Australian agamid
- **Frilled Lizard** - Defensive display master
- **Green Iguana** - Large arboreal herbivore
- **Komodo Dragon** - Largest living lizard

### 🏍️ Race Motorcycles (Moto-Models)

High-performance engineering designs:

- **ZX-820RR RS** - Sport racing motorcycle

## 🚀 Deployment Guide

### Prerequisites

- **Node.js** 22.x or higher
- **pnpm** 10.x (recommended) or npm/yarn

### Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ai-3d-learning
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm dev
   ```

4. **Open browser**
   Navigate to `http://localhost:3000`

### Production Build

#### Option 1: Static Site Export (Recommended for GitHub Pages)

```bash
# Build static site
pnpm build

# The output will be in the ./out directory
# Deploy the contents of ./out to your static hosting
```

#### Option 2: Node.js Server

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

The server will run on `http://localhost:3000` by default.

### GitHub Pages Deployment

This project includes automated GitHub Pages deployment via GitHub Actions:

1. **Push to master branch**

   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin master
   ```

2. **Automatic deployment**
   - The `.github/workflows/nextjs.yml` workflow will trigger automatically
   - It builds the static site and deploys to GitHub Pages
   - Your site will be available at `https://<username>.github.io/<repository-name>`

3. **Manual trigger**
   - Go to your repository → Actions → "Deploy Next.js site to Pages"
   - Click "Run workflow" to trigger deployment manually

### Deployment to Other Platforms

#### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
pnpm build
netlify deploy --prod --dir=out
```

#### Docker (Optional)

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

## 🛠️ Development Scripts

### Model Processing & Analysis

```bash
# Analyze GLB model metadata
pnpm analyze:glb

# Analyze all models in public/models
pnpm analyze:glb:models

# Analyze animations in models
pnpm analyze:animations

# Optimize GLB models (compression)
pnpm optimize:glb

# Convert images to WebP format
pnpm convert:webp

# Update model size metadata
pnpm update:model-sizes
```

### Standard Scripts

```bash
# Development mode with hot reload
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Run ESLint
pnpm lint
```

## 🏗️ Tech Stack

### Frontend Framework

- **Next.js 16** - React framework with App Router
- **React 19** - UI component library
- **TypeScript** - Type-safe JavaScript

### 3D Rendering

- **Three.js 0.184** - 3D graphics library
- **@react-three/fiber 9** - React renderer for Three.js
- **@react-three/drei 10** - Useful helpers for React Three Fiber
- **@react-three/postprocessing** - Post-processing effects

### Model Processing

- **@gltf-transform** - GLB optimization and transformation
- **draco3dgltf** - Draco compression support
- **meshoptimizer** - Mesh optimization library
- **three-stdlib** - Three.js utilities and loaders

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Beautiful component library
- **Lucide React** - Modern icon library
- **GSAP** - Animation library

### Development Tools

- **ESLint** - Code linting
- **Playwright** - End-to-end testing
- **Sharp** - Image processing

## 📁 Project Structure

```
ai-3d-learning/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Homepage
│   ├── project/[slug]/      # Dynamic project pages
│   ├── viewer/              # 3D GLB Viewer
│   ├── converter/           # 3D format converter
│   └── optimize/            # GLB optimizer
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── converter/           # Converter UI components
│   ├── icons/               # Icon components
│   └── ...                  # Feature components
├── data/                    # Project data & metadata
│   ├── projects/            # Individual project definitions
│   │   ├── bio/             # Biological models
│   │   ├── char/            # Character models
│   │   ├── dinosaur/        # Dinosaur models
│   │   ├── insect/          # Insect models
│   │   ├── lizard/          # Lizard models
│   │   └── motor/           # Motorcycle models
│   ├── index.ts             # Data exports
│   └── types.ts             # TypeScript definitions
├── lib/                     # Utilities & helpers
├── hooks/                   # Custom React hooks
├── public/                  # Static assets
│   ├── models/              # 3D GLB model files
│   ├── hdr/                 # HDR environment maps
│   └── draco/               # Draco decoder
├── scripts/                 # Processing scripts
└── .github/workflows/       # CI/CD configuration
```

## ✨ Key Features

- **Interactive 3D Viewing** - Rotate, zoom, and explore every detail in real-time
- **Smart Loading** - Intelligent caching and preloading for instant access
- **Multi-Discipline Support** - Biology, paleontology, entomology, engineering, and more
- **Red Carpet Mode** - Cinematic slow rotation showcase
- **Model Information Panel** - Detailed metadata and attributes
- **Entity Explorer** - Browse and select individual models
- **GLB Optimizer** - Compress and optimize 3D models
- **Format Converter** - Convert between 3D file formats
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Offline Support** - PWA capabilities for offline viewing

## 📄 License

© 2026 Show3D · Designed for Classroom Teaching & Science Communication & Product Demonstration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions, issues, or feature requests, please open an issue in the repository.
