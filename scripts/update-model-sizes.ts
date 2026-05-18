import { statSync, existsSync, readFileSync, writeFileSync } from "fs";
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
    process.exit(1);
  }

  if (!existsSync(resolvedModelsDir)) {
    console.error(`❌ Models directory not found: ${resolvedModelsDir}`);
    process.exit(1);
  }

  console.log(`📖 Reading models.ts file...`);
  const fileContent = readFileSync(resolvedModelsFile, "utf-8");

  // Parse models.ts file content to extract all model objects
  const modelRegex =
    /id:\s*["']([^"']+)["'][\s\S]*?modelUrl:\s*asset\(["']models\/([^"']+)["']\)/g;
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
    console.log(`\n💾 Saving updated models.ts file...`);
    writeFileSync(resolvedModelsFile, updatedContent, "utf-8");
    console.log(`✅ Successfully updated file sizes for ${updateCount} models`);
  } else {
    console.log(`✅ All model file sizes are up to date, no updates needed`);
  }
}

// Get paths from command line arguments
const modelsFilePath = process.argv[2] || "./app/data/models.ts";
const modelsDir = process.argv[3] || "./public/models";

updateModelFileSizes({
  modelsFilePath,
  modelsDir,
}).catch((error) => {
  console.error("❌ Error during execution:", error);
  process.exit(1);
});
