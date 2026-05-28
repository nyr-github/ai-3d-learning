export type SupportedFormat =
  | "obj"
  | "stl"
  | "glb"
  | "gltf"
  | "ply"
  | "3mf"
  | "dxf"
  | "usdz"
  | "fbx";

export interface ConversionState {
  status:
    | "idle"
    | "uploading"
    | "parsing"
    | "converting"
    | "exporting"
    | "completed"
    | "error";
  progress: number;
  error?: string;
  resultBlob?: Blob;
  resultFileName?: string;
}

export interface FormatInfo {
  format: SupportedFormat;
  label: string;
  description: string;
  mimeType: string;
  extensions: string[];
}

export const SUPPORTED_FORMATS: FormatInfo[] = [
  {
    format: "glb",
    label: "GLB",
    description: "Binary glTF (compressed 3D format)",
    mimeType: "model/gltf-binary",
    extensions: [".glb"],
  },
  {
    format: "gltf",
    label: "GLTF",
    description: "glTF JSON format",
    mimeType: "model/gltf+json",
    extensions: [".gltf"],
  },
  {
    format: "obj",
    label: "OBJ",
    description: "Wavefront OBJ format",
    mimeType: "model/obj",
    extensions: [".obj"],
  },
  {
    format: "stl",
    label: "STL",
    description: "Stereolithography format",
    mimeType: "model/stl",
    extensions: [".stl"],
  },
  {
    format: "ply",
    label: "PLY",
    description: "Polygon File Format",
    mimeType: "model/ply",
    extensions: [".ply"],
  },
  {
    format: "3mf",
    label: "3MF",
    description: "3D Manufacturing Format",
    mimeType: "model/3mf",
    extensions: [".3mf"],
  },
  {
    format: "dxf",
    label: "DXF",
    description: "Drawing Exchange Format (CAD)",
    mimeType: "application/dxf",
    extensions: [".dxf"],
  },
  {
    format: "usdz",
    label: "USDZ",
    description: "Universal Scene Description (Apple AR)",
    mimeType: "model/vnd.usdz+zip",
    extensions: [".usdz"],
  },
  {
    format: "fbx",
    label: "FBX",
    description: "Filmbox format (Autodesk)",
    mimeType: "application/octet-stream",
    extensions: [".fbx"],
  },
];

export function getFormatByExtension(
  extension: string,
): SupportedFormat | null {
  const ext = extension.toLowerCase();
  for (const format of SUPPORTED_FORMATS) {
    if (format.extensions.includes(ext)) {
      return format.format;
    }
  }
  return null;
}

export function getFormatInfo(format: SupportedFormat): FormatInfo | undefined {
  return SUPPORTED_FORMATS.find((f) => f.format === format);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
