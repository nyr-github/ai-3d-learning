---
name: gen-project-3d-model
description: Process GLB models and images for a project, optimize them using pnpm scripts, analyze with AI, generate project data structure, and organize files. Use when the user wants to add a new 3D model to a project, process GLB files, generate project configurations, or organize model assets.
---

# Generate Project 3D Model

## Overview

This skill automates the workflow of adding a new 3D model to a project:
1. Optimize GLB files using `pnpm optimize:glb:models`
2. Convert images to WebP using `pnpm convert:webp:images`
3. Analyze output images with AI
4. Generate project data structure matching `data/projects/` format
5. Move optimized files to `public/models/[project]/`
6. Update project configuration

## Input Requirements

Ask the user for:
1. **Project name**: The project slug (e.g., `bio`, `char`, `moto`)
2. **GLB file name**: The name of the GLB file in `public/models/new/` (e.g., `1.glb`)

## Workflow

### Step 1: Verify Input Files

Check that the required files exist:
- GLB file: `public/models/new/[filename].glb`
- Image file: `public/models/new/[filename].png` (or other image format)

If files don't exist, ask the user to verify the file names.

### Step 2: Run Optimization Scripts

Execute the following commands in sequence:

```bash
# Optimize GLB files
pnpm optimize:glb:models

# Convert images to WebP
pnpm convert:webp:images
```

Both scripts will save output to `public/models/new/out/` directory.

**Expected output files:**
- `public/models/new/out/[filename].glb` - Optimized GLB
- `public/models/new/out/[filename].webp` - Converted WebP image

### Step 3: Analyze Output Image with AI

Use the pollinations MCP `generateImageUrl` or `describeImage` tool to analyze the WebP image:

1. Read the WebP image from `public/models/new/out/[filename].webp`
2. Analyze the image to understand:
   - What the 3D model represents
   - Key visual features
   - Suggested name and description
   - Appropriate categories and tags

### Step 4: Generate Project Data Structure

Read the target project file from `data/projects/[project-name].ts` to understand the existing structure.

**Reference structure** (from `data/types.ts`):

```typescript
interface Entity3D {
  id: string;              // Unique identifier (kebab-case)
  name: string;            // Display name
  subtitle: string;        // Short subtitle
  mainCategory: string;    // Main category
  subCategory: string;     // Sub-category
  accent: string;          // Accent color (hex)
  description: string;     // Detailed description
  attributes: Attribute[]; // Key-value attributes
  funFact: string;         // Interesting fact
  teachingFocus: string;   // Educational focus
  tags: string[];          // Tags for filtering
  model3D: {
    modelUrl: string;      // "/models/[project]/[name].glb"
    imageUrl: string;      // "/models/[project]/[name].webp"
    fileSize: number;      // File size in bytes
    defaultRotation: {     // Default rotation in degrees
      x: number;
      y: number;
      z: number;
    };
    displayScale: number;  // Scale factor
  };
  generationPrompts?: {    // AI generation prompts
    full3DPrompt?: string;
    frontPrompt?: string;
    backPrompt?: string;
  };
}
```

Generate a new entity entry based on:
- AI analysis of the image
- Project conventions from existing entries
- Reasonable defaults for missing data

### Step 5: Move Files to Project Directory

Move the optimized files:
```
From: public/models/new/out/[filename].glb
To:   public/models/[project]/[new-name].glb

From: public/models/new/out/[filename].webp
To:   public/models/[project]/[new-name].webp
```

Where `[new-name]` is the kebab-case version of the entity name (e.g., `plant-cell`).

**Use file operations:**
1. Read the files from `out/` directory
2. Create files in target project directory
3. Delete files from `out/` directory

### Step 6: Update Project Configuration

1. Read the project file: `data/projects/[project-name].ts`
2. Add the new entity to the `ENTITIES` array
3. Update the paths in `model3D`:
   - `modelUrl`: `/models/[project]/[new-name].glb`
   - `imageUrl`: `/models/[project]/[new-name].webp`
4. Set `fileSize` to the actual GLB file size
5. Set reasonable defaults:
   - `defaultRotation`: `{ x: 0, y: 0, z: 0 }`
   - `displayScale`: `1.0`

### Step 7: Verify and Confirm

Show the user:
1. ✅ Files processed and moved successfully
2. ✅ Project data structure generated
3. 📝 Preview of the new entity entry
4. Ask for confirmation before finalizing

## Important Notes

- Always verify file existence before processing
- Use actual file sizes from the filesystem
- Follow existing project conventions (categories, tags format, etc.)
- Accent colors should match project theme
- Keep descriptions concise but informative
- Generate meaningful `funFact` and `teachingFocus` based on the model

## Error Handling

- If optimization scripts fail, check error messages and suggest fixes
- If AI analysis fails, ask the user to provide model details manually
- If file operations fail, verify permissions and paths
- Always provide clear error messages with actionable suggestions

## Example Usage

**User**: "Add a new model to the bio project, the file is 1.glb"

**You**:
1. Verify files exist in `public/models/new/`
2. Run `pnpm optimize:glb:models` and `pnpm convert:webp:images`
3. Analyze the output WebP image
4. Generate entity data matching bio.ts structure
5. Move files to `public/models/bio/`
6. Update `data/projects/bio.ts`
7. Show preview and confirm
