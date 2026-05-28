import type { SupportedFormat } from "./types";

export interface ConversionScenario {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  sourceFormats: SupportedFormat[];
  targetFormat: SupportedFormat;
  features: string[];
  tips: string[];
}

export const CONVERSION_SCENARIOS: Record<string, ConversionScenario> = {
  "game-dev": {
    id: "game-dev",
    title: "Game Development Model Conversion",
    subtitle: "OBJ/FBX → GLB",
    description:
      "Prepare model assets for engines like Unity, Unreal Engine, and Web games. GLB format provides extreme compression and cross-platform compatibility.",
    sourceFormats: ["obj", "fbx", "gltf"],
    targetFormat: "glb",
    features: [
      "Preserve skeletal animations",
      "Extreme file compression",
      "Cross-platform engine compatibility",
    ],
    tips: [
      "Ensure polygon count is suitable for real-time rendering",
      "Check if UV unwrapping is correct",
      "Verify bone hierarchy structure",
    ],
  },
  "3d-print": {
    id: "3d-print",
    title: "3D Printing Model Conversion",
    subtitle: "Any Format → STL",
    description:
      "Convert 3D models to standard triangle mesh format recognized by 3D printers, supporting direct import into slicing software.",
    sourceFormats: ["obj", "ply", "glb", "gltf"],
    targetFormat: "stl",
    features: [
      "Mesh discretization",
      "Print-ready format",
      "Slicing software compatibility",
    ],
    tips: [
      "Check if model is watertight (no holes)",
      "Confirm normal directions are correct",
      "Optimize mesh density to avoid over-refinement",
    ],
  },
  "web-ar": {
    id: "web-ar",
    title: "Web AR/VR Model Conversion",
    subtitle: "OBJ/FBX → GLB/glTF",
    description:
      "Optimize models for web display, AR/VR applications, and mobile devices. GLB is the industry standard format for Web 3D.",
    sourceFormats: ["obj", "fbx", "gltf", "ply"],
    targetFormat: "glb",
    features: [
      "Extreme compression size",
      "Millisecond loading",
      "Full WebXR compatibility",
    ],
    tips: [
      "Compress textures to reduce file size",
      "Use Draco compression for geometry",
      "Optimize material count to reduce draw calls",
    ],
  },
  "gis-pointcloud": {
    id: "gis-pointcloud",
    title: "Point Cloud Data Conversion",
    subtitle: "PLY → GLB",
    description:
      "Convert LiDAR scanned point cloud data to 3D models viewable on the web, used for digital twins and visualization.",
    sourceFormats: ["ply"],
    targetFormat: "glb",
    features: [
      "Point cloud meshing",
      "Web visualization",
      "Large-scale data support",
    ],
    tips: [
      "Point cloud data is recommended to be downsampled first",
      "Check if coordinate system direction is correct",
      "Consider using normals to enhance visual effects",
    ],
  },
  architecture: {
    id: "architecture",
    title: "Architecture Drawing Conversion",
    subtitle: "DXF → GLB",
    description:
      "Convert CAD architectural drawings to 3D models for web display, design review, and collaborative communication.",
    sourceFormats: ["dxf"],
    targetFormat: "glb",
    features: [
      "CAD drawing 3D-ification",
      "Preserve geometric structure",
      "Instant web viewing",
    ],
    tips: [
      "Ensure DXF file contains 3D entities",
      "Check if layers and line types are correct",
      "Complex drawings are recommended to be exported in layers",
    ],
  },
};
