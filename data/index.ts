// Generic types
export type {
  Entity3D,
  Project,
  Model3DMetadata,
  GenerationPrompts,
  Attribute,
} from "./types";

// Project list
import { bioProject } from "@/data/projects/bio";
export const projects = [bioProject];

// Utility functions
export const getProjectBySlug = (slug: string) => {
  return projects.find((p) => p.slug === slug);
};

export const getAllEntities = () => {
  return projects.flatMap((p) => p.models);
};

export const getEntityById = (id: string) => {
  return getAllEntities().find((e) => e.id === id);
};
