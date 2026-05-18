# AI 3D Learning Platform

An interactive 3D educational platform for exploring biological entities, chemical molecules, and physical structures. Built with Next.js, Three.js, and React Three Fiber.

## 🌟 Features

### Interactive 3D Viewing
- **Real-time 3D Rendering**: Explore scientific models with full rotation, zoom, and pan controls
- **Optimized Model Loading**: Intelligent caching and preloading system for instant access
- **DRACO Compression**: Supports compressed GLB models for faster loading
- **Responsive Design**: Adapts seamlessly from desktop to mobile devices

### Educational Content
- **Rich Metadata**: Each entity includes detailed descriptions, fun facts, and teaching focus points
- **Key Structures**: Highlight important anatomical or molecular features with test point markers
- **Microscope Visibility**: Information about visibility under light and electron microscopes
- **Size Ranges**: Interactive sliders showing realistic scale with units

### Multi-Discipline Architecture
- **Extensible Data Model**: Generic entity system supports biology, chemistry, physics, and more
- **Project-based Organization**: Group related models into educational projects
- **Categorization System**: Main categories and sub-categories for easy navigation
- **Attribute System**: Flexible key-value attributes for domain-specific data

### Modern UI/UX
- **Resizable Panels**: Desktop layout with adjustable sidebar, viewer, and info panel
- **Mobile-First Design**: Touch-optimized controls with slide-out drawers
- **Academic Theme**: Clean, modern laboratory-inspired design system
- **Accessibility**: Proper ARIA labels and keyboard navigation support

## 🏗️ Architecture

### Technology Stack

**Core Framework:**
- **Next.js 16** - React framework with App Router and static export
- **React 19** - Latest React with concurrent features
- **TypeScript** - Full type safety across the codebase

**3D Rendering:**
- **Three.js** - Core 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **Drei** - Useful helpers for React Three Fiber (Environment, OrbitControls, etc.)
- **DRACO** - 3D model compression for optimized loading

**Styling & UI:**
- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Modern icon library
- **CSS Variables** - Theme system with custom properties

**Development Tools:**
- **Sharp** - Image processing for WebP conversion
- **glTF Transform** - 3D model optimization
- **ESLint** - Code quality and consistency

### Project Structure

```
ai-3d-learning/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Homepage with project overview
│   ├── layout.tsx                # Root layout with metadata
│   ├── globals.css               # Global styles and CSS variables
│   └── project/[slug]/           # Dynamic route for each project
│       ├── page.tsx              # Server component with static params
│       └── ProjectClient.tsx     # Client component with interactive UI
├── components/                   # React components
│   ├── EntityViewer.tsx          # 3D canvas viewer with controls
│   ├── EntityInfoPanel.tsx       # Entity details and attributes
│   ├── EntitySidebar.tsx         # Model selection sidebar
│   ├── ModelScene.tsx            # Three.js scene wrapper
│   ├── Layout.tsx                # Header and Footer
│   └── ui/                       # Reusable UI primitives
├── data/                         # Content and data models
│   ├── types.ts                  # TypeScript interfaces
│   ├── index.ts                  # Data utilities and exports
│   └── projects/                 # Project-specific data
│       └── bio.ts                # Biology project entities
├── hooks/                        # Custom React hooks
│   └── useModel.ts               # Model loading state management
├── lib/                          # Core utilities
│   ├── modelLoader.ts            # Advanced model loading system
│   └── utils.ts                  # Helper functions
├── public/                       # Static assets
│   ├── models/                   # 3D GLB model files
│   ├── images/                   # Entity preview images (WebP)
│   └── draco/                    # DRACO decoder files
└── scripts/                      # Build and optimization scripts
    ├── optimize-glb.ts           # GLB model optimization
    ├── convert-images-to-webp.ts # Image conversion to WebP
    └── update-model-sizes.ts     # Sync model file sizes
```

## 🔬 How It Works

### 1. Data Model System

The platform uses a generic entity-based data model that can represent any 3D educational content:

```typescript
interface Entity3D {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  mainCategory: string;          // Primary classification
  subCategory: string;           // Secondary classification
  description: string;           // Detailed description
  funFact: string;               // Engaging trivia
  teachingFocus: string;         // Educational objectives
  attributes: Attribute[];       // Flexible key-value data
  features: Feature[];           // Key structures/test points
  model3D: Model3DMetadata;      // 3D model configuration
}
```

This design allows:
- **Extensibility**: Add new disciplines without code changes
- **Consistency**: Uniform data structure across all entities
- **Rich Metadata**: Support for domain-specific attributes

### 2. Model Loading Pipeline

The custom model loader implements an optimized loading strategy:

```
1. Request Initiation
   ↓
2. Check Cache (in-memory Map)
   ↓ (cache miss)
3. Download with Progress Tracking
   ↓
4. Parse GLB with DRACO Decoder
   ↓
5. Store in Cache
   ↓
6. Resolve Promise to Component
```

**Key Features:**
- **State-driven**: Tracks phases (idle → downloading → parsing → completed)
- **Promise-based**: Components await model readiness
- **Intelligent Caching**: Prevents redundant downloads
- **Preloading**: Anticipates next model user might view

### 3. 3D Rendering Architecture

```
EntityViewer (React Component)
└── Canvas (React Three Fiber)
    ├── Lighting Setup
    │   ├── Ambient Light
    │   └── Directional Lights (with shadows)
    ├── Environment (Studio preset)
    ├── ModelScene (GLTF content)
    ├── ContactShadows (Ground reflection)
    └── OrbitControls (User interaction)
```

**Optimization Strategies:**
- **Adaptive DPR**: `[1, 2]` for retina displays
- **Shadow Maps**: 1024x1024 for balance of quality/performance
- **Environment Maps**: Studio lighting for realistic materials
- **Lazy Loading**: Suspense boundaries for async content

### 4. Responsive Layout System

**Desktop (>640px):**
```
┌─────────────────────────────────────────┐
│              Header                      │
├──────────┬──────────────┬───────────────┤
│ Sidebar  │   3D Viewer  │  Info Panel   │
│  (20%)   │   (55%)      │    (25%)      │
│Resizable │  Resizable   │  Resizable    │
├──────────┴──────────────┴───────────────┤
│              Footer                      │
└─────────────────────────────────────────┘
```

**Mobile (<640px):**
```
┌──────────────────────┐
│    Header            │
├──────────────────────┤
│ [Menu] [Info]        │ ← Control buttons
├──────────────────────┤
│                      │
│   3D Viewer (Full)   │
│                      │
├──────────────────────┤
│    Footer            │
└──────────────────────┘
     ↓ Swipe/Tap
┌──────────────┐
│  Sidebar     │ ← Slide-out drawer
│  (Overlay)   │
└──────────────┘
```

### 5. Static Site Generation

The platform uses Next.js static export for GitHub Pages deployment:

```typescript
// Generate all project routes at build time
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
```

**Benefits:**
- **Zero Server Required**: Pure static HTML/CSS/JS
- **Fast Loading**: Pre-rendered pages
- **CDN Ready**: Deploy anywhere (GitHub Pages, Vercel, Netlify)
- **SEO Friendly**: Server-rendered metadata

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ 
- **pnpm** 10+ (or npm/yarn)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ai-3d-learning

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Build static site
pnpm build

# Preview production build
pnpm start
```

Static files are generated in the `out/` directory.

## 🛠️ Development Scripts

### Model Optimization

```bash
# Optimize all GLB models
pnpm optimize:glb ./public/models

# Optimize with custom output directory
pnpm optimize:glb ./public/models ./public/models-optimized
```

Uses glTF Transform to:
- Compress textures to WebP
- Apply DRACO mesh compression
- Reduce file sizes by 50-80%

### Image Conversion

```bash
# Convert images to WebP
pnpm convert:webp ./public/images
```

Converts PNG/JPG to optimized WebP format with:
- Max width: 400px
- Quality: 80%
- Maintains aspect ratio

### Update Model Metadata

```bash
# Sync file sizes in data models
pnpm update:model-sizes
```

Automatically updates `fileSize` fields in model definitions based on actual GLB file sizes.

## 📦 Adding New Content

### 1. Create Entity Data

Add new entities in `data/projects/<project>.ts`:

```typescript
{
  id: "my-entity",
  name: "My Entity",
  subtitle: "Description",
  mainCategory: "Category",
  subCategory: "Subcategory",
  accent: "#hexcolor",
  description: "Detailed explanation...",
  funFact: "Interesting fact!",
  teachingFocus: "Learning objective...",
  attributes: [
    { name: "Size Range", value: "10-100", unit: "μm" },
    // ... more attributes
  ],
  features: [
    { name: "Feature 1", detail: "Description", isHighFreqTestPoint: true },
    // ... more features
  ],
  whereItOccurs: {
    text: "Where to find it...",
    habitat: "Habitat info..."
  },
  model3D: {
    modelUrl: asset("models/my-entity.glb"),
    imageUrl: asset("images/my-entity.webp"),
    fileSize: 1234567,
    defaultRotationY: -Math.PI / 4,
    displayScale: 1.4,
  }
}
```

### 2. Add 3D Model

Place your GLB file in `public/models/`:
```bash
cp my-entity.glb public/models/
```

**Optimization recommended:**
```bash
pnpm optimize:glb ./public/models
```

### 3. Add Preview Image

Place WebP image in `public/images/`:
```bash
cp my-entity.webp public/images/
```

**Or convert from PNG/JPG:**
```bash
pnpm convert:webp ./public/images
```

### 4. Update File Sizes

```bash
pnpm update:model-sizes
```

### 5. Test Locally

```bash
pnpm dev
```

Navigate to `http://localhost:3000/project/<project-slug>` to see your new entity.

## 🌐 Deployment

### GitHub Pages

The project includes a complete GitHub Actions workflow:

```yaml
# .github/workflows/deploy.yml
# Automatically deploys on push to main branch
```

**Setup:**
1. Push to `main` branch
2. GitHub Actions builds and deploys
3. Site available at `https://<username>.github.io/<repo>`

### Other Platforms

Since it's a static site, you can deploy to:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop `out/` folder
- **AWS S3**: Upload `out/` to S3 bucket
- **Any CDN**: Serve static files

## 🎓 Educational Use Cases

### For Teachers
- **Visual Demonstrations**: Show complex 3D structures in class
- **Self-Study Resource**: Students can explore at their own pace
- **Test Preparation**: High-frequency test points highlighted
- **Comparative Learning**: Side-by-side model comparisons

### For Students
- **Interactive Exploration**: Rotate, zoom, and examine every detail
- **Contextual Learning**: Fun facts and real-world applications
- **Microscope Prep**: Know what to expect before lab sessions
- **Scale Understanding**: Size ranges with visual sliders

### For Content Creators
- **Extensible Platform**: Add your own 3D models and data
- **Multi-Discipline**: Support any scientific field
- **AI-Generated Models**: Includes prompts for AI 3D generation
- **Open Architecture**: Modify and customize freely

## 📊 Current Content

### Biology Project (`/project/bio`)

**Cells:**
- Plant Cell (Eukaryotic, Autotrophic)
- Animal Cell (Eukaryotic, Heterotrophic)
- Bacterial Cell (Prokaryotic)
- White Blood Cell (Immune System)
- Neuron (Nervous System)

**Organelles:**
- Mitochondrion (Powerhouse)
- Chloroplast (Photosynthesis)
- Cell Membrane (Fluid Mosaic Model)

**Biomolecules:**
- DNA Double Helix (Genetic Code)

**Viruses:**
- T4 Bacteriophage (Bacterial Virus)

## 🔧 Troubleshooting

### Models Not Loading
- Check GLB files exist in `public/models/`
- Verify file sizes match in data definitions
- Run `pnpm update:model-sizes` to sync

### Build Fails
- Ensure all TypeScript types are correct
- Check that `generateStaticParams` returns valid slugs
- Clear `.next/` cache: `rm -rf .next`

### Performance Issues
- Optimize GLB files: `pnpm optimize:glb`
- Convert images to WebP: `pnpm convert:webp`
- Check browser console for Three.js warnings

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Three.js** community for amazing 3D web tools
- **React Three Fiber** for seamless React integration
- **Next.js** team for the excellent framework
- **Educators** who inspired this platform

---

Built with ❤️ for science education

**Explore. Learn. Discover.**
