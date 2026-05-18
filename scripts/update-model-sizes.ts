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
): Promise<void> {
  const { modelsFilePath, modelsDir } = options;

  const resolvedModelsFile = resolve(modelsFilePath);
  const resolvedModelsDir = resolve(modelsDir);

  // Check if file exists
  if (!existsSync(resolvedModelsFile)) {
    console.error(`❌ models.ts file not found: ${resolvedModelsFile}`);
    return;
  }

  if (!existsSync(resolvedModelsDir)) {
    console.error(`❌ Models directory not found: ${resolvedModelsDir}`);
    return;
  }

  console.log(`\n📖 Processing: ${modelsFilePath}`);
  const fileContent = readFileSync(resolvedModelsFile, "utf-8");

  // Parse models.ts file content to extract all model objects
  const modelRegex =
    /id:\s*["']([^"']+)["'][\s\S]*?modelUrl:\s*["']\/models\/([^"']+)["']/g;
  let match;
  const models: Array<{
    id: string;
    fileName: string;
    startPos: number;
    endPos: number;
  }> = [];

  // Reset regex lastIndex
  modelRegex.lastIndex = 0;

  while ((match = modelRegex.exec(fileContent)) !== null) {
    const id = match[1];
    const fileName = match[2];
    const startPos = match.index;
    models.push({ id, fileName, startPos, endPos: 0 });
  }

  // Calculate end position for each model
  for (let i = 0; i < models.length; i++) {
    models[i].endPos =
      i < models.length - 1 ? models[i + 1].startPos : fileContent.length;
  }

  console.log(`🔍 Found ${models.length} models`);

  let updatedContent = fileContent;
  let updateCount = 0;

  // Process in reverse order by start position to avoid offset issues during replacement
  for (let i = models.length - 1; i >= 0; i--) {
    const model = models[i];
    const modelFilePath = join(resolvedModelsDir, model.fileName);

    if (!existsSync(modelFilePath)) {
      console.warn(`⚠️  Model file not found: ${modelFilePath}`);
      continue;
    }

    const stats = statSync(modelFilePath);
    const fileSize = stats.size;

    // Find fileSize field in current model block
    const modelBlock = updatedContent.substring(model.startPos, model.endPos);
    const fileSizeRegex = /(fileSize:\s*)(\d+)/;
    const fileSizeMatch = modelBlock.match(fileSizeRegex);

    if (fileSizeMatch) {
      const currentSize = parseInt(fileSizeMatch[2]);
      if (currentSize !== fileSize) {
        console.log(
          `🔄 Updating ${model.id} (${model.fileName}): ${currentSize} -> ${fileSize} bytes`,
        );

        // Replace fileSize value
        const oldFileSizeText = fileSizeMatch[0];
        const newFileSizeText = `fileSize: ${fileSize}`;
        updatedContent = updatedContent.replace(
          oldFileSizeText,
          newFileSizeText,
        );
        updateCount++;
      } else {
        console.log(
          `✅ ${model.id} file size is up to date: ${fileSize} bytes`,
        );
      }
    } else {
      console.warn(`⚠️  ${model.id} fileSize field not found`);
    }
  }

  if (updateCount > 0) {
    console.log(`💾 Saving updated ${modelsFilePath}...`);
    writeFileSync(resolvedModelsFile, updatedContent, "utf-8");
    console.log(`✅ Successfully updated file sizes for ${updateCount} models`);
  } else {
    console.log(`✅ All model file sizes are up to date, no updates needed`);
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

  // Get all .ts files in the projects directory
  const files = readdirSync(resolvedProjectsDir).filter((file) =>
    file.endsWith(".ts"),
  );

  if (files.length === 0) {
    console.log(`⚠️  No TypeScript files found in ${resolvedProjectsDir}`);
    return;
  }

  console.log(`📁 Found ${files.length} project file(s) to process:\n`);
  files.forEach((f) => console.log(`   - ${f}`));
  console.log("");

  let totalUpdated = 0;

  for (const file of files) {
    const filePath = join(resolvedProjectsDir, file);

    try {
      // Temporarily modify the function to return update count
      const result = await processSingleFile({
        modelsFilePath: filePath,
        modelsDir: resolvedModelsDir,
      });
      totalUpdated += result;
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error);
    }
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(
    `🎉 All projects processed! Total models updated: ${totalUpdated}`,
  );
}

async function processSingleFile(options: ModelUpdateOptions): Promise<number> {
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

  // Parse file content to extract all model objects
  const modelRegex =
    /id:\s*["']([^"']+)["'][\s\S]*?modelUrl:\s*["']\/models\/([^"']+)["']/g;
  let match;
  const models: Array<{
    id: string;
    fileName: string;
    startPos: number;
    endPos: number;
  }> = [];

  // Reset regex lastIndex
  modelRegex.lastIndex = 0;

  while ((match = modelRegex.exec(fileContent)) !== null) {
    const id = match[1];
    const fileName = match[2];
    const startPos = match.index;
    models.push({ id, fileName, startPos, endPos: 0 });
  }

  // Calculate end position for each model
  for (let i = 0; i < models.length; i++) {
    models[i].endPos =
      i < models.length - 1 ? models[i + 1].startPos : fileContent.length;
  }

  console.log(`🔍 Found ${models.length} models`);

  let updatedContent = fileContent;
  let updateCount = 0;

  // Process in reverse order by start position to avoid offset issues during replacement
  for (let i = models.length - 1; i >= 0; i--) {
    const model = models[i];
    const modelFilePath = join(resolvedModelsDir, model.fileName);

    if (!existsSync(modelFilePath)) {
      console.warn(`⚠️  Model file not found: ${modelFilePath}`);
      continue;
    }

    const stats = statSync(modelFilePath);
    const fileSize = stats.size;

    // Find fileSize field in current model block
    const modelBlock = updatedContent.substring(model.startPos, model.endPos);
    const fileSizeRegex = /(fileSize:\s*)(\d+)/;
    const fileSizeMatch = modelBlock.match(fileSizeRegex);

    if (fileSizeMatch) {
      const currentSize = parseInt(fileSizeMatch[2]);
      if (currentSize !== fileSize) {
        console.log(
          `🔄 Updating ${model.id} (${model.fileName}): ${currentSize} -> ${fileSize} bytes`,
        );

        // Replace fileSize value
        const oldFileSizeText = fileSizeMatch[0];
        const newFileSizeText = `fileSize: ${fileSize}`;
        updatedContent = updatedContent.replace(
          oldFileSizeText,
          newFileSizeText,
        );
        updateCount++;
      } else {
        console.log(
          `✅ ${model.id} file size is up to date: ${fileSize} bytes`,
        );
      }
    } else {
      console.warn(`⚠️  ${model.id} fileSize field not found`);
    }
  }

  if (updateCount > 0) {
    console.log(`💾 Saving updated ${modelsFilePath}...`);
    writeFileSync(resolvedModelsFile, updatedContent, "utf-8");
    console.log(`✅ Successfully updated file sizes for ${updateCount} models`);
  } else {
    console.log(`✅ All model file sizes are up to date, no updates needed`);
  }

  return updateCount;
}

// Get paths from command line arguments
const projectsDir = process.argv[2] || "./data/projects";
const modelsDir = process.argv[3] || "./public/models";

processAllProjectFiles(projectsDir, modelsDir).catch((error) => {
  console.error("❌ Error during execution:", error);
  process.exit(1);
});
