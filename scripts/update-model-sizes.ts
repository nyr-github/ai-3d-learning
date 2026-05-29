import {
  statSync,
  existsSync,
  readFileSync,
  writeFileSync,
  readdirSync,
} from "fs";
import { join, resolve } from "path";

interface ModelUpdateOptions {
  modelsFilePath: string;
  modelsDir: string;
}

async function updateModelFileSizes(
  options: ModelUpdateOptions,
): Promise<number> {
  const { modelsFilePath, modelsDir } = options;

  const resolvedModelsFile = resolve(modelsFilePath);
  const resolvedModelsDir = resolve(modelsDir);

  // Check if file exists
  if (!existsSync(resolvedModelsFile)) {
    console.error(`❌ File not found: ${resolvedModelsFile}`);
    return 0;
  }

  if (!existsSync(resolvedModelsDir)) {
    console.error(`❌ Models directory not found: ${resolvedModelsDir}`);
    return 0;
  }

  console.log(`\n📖 Processing: ${modelsFilePath}`);
  const fileContent = readFileSync(resolvedModelsFile, "utf-8");

  // Parse file content to extract modelUrl and fileSize
  const modelUrlRegex = /modelUrl:\s*["']\/models\/([^"']+)["']/;
  const fileSizeRegex = /fileSize:\s*(\d+)/;

  const modelUrlMatch = fileContent.match(modelUrlRegex);
  const fileSizeMatch = fileContent.match(fileSizeRegex);

  if (!modelUrlMatch) {
    console.warn(`⚠️  No modelUrl found in ${modelsFilePath}`);
    return 0;
  }

  if (!fileSizeMatch) {
    console.warn(`⚠️  No fileSize found in ${modelsFilePath}`);
    return 0;
  }

  const modelFileName = modelUrlMatch[1];
  const currentFileSize = parseInt(fileSizeMatch[1]);
  const modelFilePath = join(resolvedModelsDir, modelFileName);

  if (!existsSync(modelFilePath)) {
    console.warn(`⚠️  Model file not found: ${modelFilePath}`);
    return 0;
  }

  const stats = statSync(modelFilePath);
  const actualFileSize = stats.size;

  if (currentFileSize !== actualFileSize) {
    console.log(
      `🔄 Updating ${modelsFilePath}: ${currentFileSize} -> ${actualFileSize} bytes`,
    );

    // Replace fileSize value
    const updatedContent = fileContent.replace(
      /fileSize:\s*\d+/,
      `fileSize: ${actualFileSize}`,
    );

    writeFileSync(resolvedModelsFile, updatedContent, "utf-8");
    console.log(`✅ Successfully updated file size`);
    return 1;
  } else {
    console.log(`✅ File size is up to date: ${actualFileSize} bytes`);
    return 0;
  }
}

async function processAllProjectFiles(
  projectsDir: string,
  modelsDir: string,
): Promise<void> {
  const resolvedProjectsDir = resolve(projectsDir);
  const resolvedModelsDir = resolve(modelsDir);

  if (!existsSync(resolvedProjectsDir)) {
    console.error(`❌ Projects directory not found: ${resolvedProjectsDir}`);
    process.exit(1);
  }

  if (!existsSync(resolvedModelsDir)) {
    console.error(`❌ Models directory not found: ${resolvedModelsDir}`);
    process.exit(1);
  }

  // Get all subdirectories in projects directory (e.g., bio, char, lizard, motor)
  const projectDirs = readdirSync(resolvedProjectsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  if (projectDirs.length === 0) {
    console.log(`⚠️  No project directories found in ${resolvedProjectsDir}`);
    return;
  }

  console.log(`📁 Found ${projectDirs.length} project(s) to process:\n`);
  projectDirs.forEach((d) => console.log(`   - ${d}`));
  console.log("");

  let totalUpdated = 0;
  let totalFiles = 0;

  for (const projectDir of projectDirs) {
    const projectPath = join(resolvedProjectsDir, projectDir);

    // Get all .ts files in the project subdirectory
    const tsFiles = readdirSync(projectPath).filter((file) =>
      file.endsWith(".ts"),
    );

    if (tsFiles.length === 0) {
      console.log(`⚠️  No TypeScript files found in ${projectDir}/`);
      continue;
    }

    console.log(
      `\n📂 Processing project: ${projectDir} (${tsFiles.length} files)`,
    );

    for (const file of tsFiles) {
      const filePath = join(projectPath, file);
      totalFiles++;

      try {
        const updated = await updateModelFileSizes({
          modelsFilePath: filePath,
          modelsDir: resolvedModelsDir,
        });
        totalUpdated += updated;
      } catch (error) {
        console.error(`❌ Error processing ${projectDir}/${file}:`, error);
      }
    }
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(
    `🎉 All projects processed! Total files: ${totalFiles}, Updated: ${totalUpdated}`,
  );
}

// Get paths from command line arguments
const projectsDir = process.argv[2] || "./data/projects";
const modelsDir = process.argv[3] || "./public/models";

processAllProjectFiles(projectsDir, modelsDir).catch((error) => {
  console.error("❌ Error during execution:", error);
  process.exit(1);
});
