/**
 * Generic 3D Entity Data Model Type Definitions
 * Supports 3D model display for biology, chemistry, physics, and other disciplines
 */

// Project Definition
export interface Project {
  name: string;
  slug: string;
  icon: string;
  description: string;
  tabName: string;
  models: Entity3D[];
}

// 3D Model Generic Metadata
export interface Model3DMetadata {
  modelUrl: string;
  imageUrl: string;
  fileSize: number;
  defaultRotation: {
    x: number; // degrees
    y: number; // degrees
    z: number; // degrees
  };
  displayScale: number;
}

// AI Generation Prompts
export interface GenerationPrompts {
  frontPrompt?: string;
  backPrompt?: string;
  full3DPrompt?: string;
}

// Attribute Key-Value Pair
// Supports multiple value types for flexible display
export interface Attribute {
  name: string;
  // Value can be: string, number, string array, string dictionary, or number array
  value?: string | number | string[] | Record<string, string> | number[];
  unit?: string;
  // Range value (for size and other range data)
  min?: number;
  max?: number;
}

// Base Entity Type - Shared across all disciplines
export interface Entity3D {
  id: string;
  name: string;
  subtitle: string;
  // Main category (e.g., Cells, Molecules, Structures, etc.)
  mainCategory: string;
  // Sub-category (e.g., Basic Cell Types, Organic Molecules, etc.)
  subCategory: string;
  // Accent color
  accent: string;
  // Description
  description: string;
  // Fun fact
  funFact: string | undefined;
  // Teaching/Display focus
  teachingFocus: string | undefined;
  // Tags for categorization and filtering
  tags: string[];
  // 3D Model related
  model3D: Model3DMetadata;
  // AI generation prompts (optional)
  generationPrompts?: GenerationPrompts;

  // Extended attributes (using KV dictionary instead of specific type fields)
  attributes?: Attribute[];
}
