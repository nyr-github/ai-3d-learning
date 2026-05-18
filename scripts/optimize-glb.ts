import { execSync } from "child_process";
import { readdirSync, mkdirSync, existsSync } from "fs";
import { join, resolve } from "path";

interface OptimizeOptions {
  inputDir: string;
  outputDir?: string;
  textureCompress?: "webp" | "avif" | "jpeg" | "png";
  compress?: "draco" | "meshopt";
}

async function optimizeGlbFiles(options: OptimizeOptions): Promise<void> {
  const {
    inputDir,
    outputDir,
    textureCompress = "webp",
    compress = "draco",
  } = options;

  const resolvedInputDir = resolve(inputDir);
  const resolvedOutputDir = outputDir
    ? resolve(outputDir)
    : join(resolvedInputDir, "out");

  // Check if input directory exists
  if (!existsSync(resolvedInputDir)) {
    console.error(`❌ Input directory not found: ${resolvedInputDir}`);
    process.exit(1);
  }

  // Create output directory
  if (!existsSync(resolvedOutputDir)) {
    mkdirSync(resolvedOutputDir, { recursive: true });
    console.log(`📁 Created output directory: ${resolvedOutputDir}`);
  }

  // Get all GLB files
  const files = readdirSync(resolvedInputDir).filter((file) =>
    file.toLowerCase().endsWith(".glb"),
  );

  if (files.length === 0) {
    console.log(`⚠️  No GLB files found in ${resolvedInputDir}`);
    return;
  }

  console.log(`🚀 Starting to process ${files.length} GLB files...`);
  console.log(`📂 Input directory: ${resolvedInputDir}`);
  console.log(`📤 Output directory: ${resolvedOutputDir}`);
  console.log("─".repeat(50));

  let successCount = 0;
  let failCount = 0;

  for (const file of files) {
    const inputFile = join(resolvedInputDir, file);
    const outputFile = join(resolvedOutputDir, file);

    console.log(`\n⏳ Processing: ${file}`);

    try {
      const command = `npx @gltf-transform/cli optimize "${inputFile}" "${outputFile}" --texture-compress ${textureCompress} --compress ${compress}`;

      execSync(command, {
        stdio: "inherit",
        cwd: process.cwd(),
      });

      console.log(`✅ Successfully processed: ${file}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to process: ${file}`);
      console.error(`   Error message: ${(error as Error).message}`);
      failCount++;
    }
  }

  console.log("\n" + "═".repeat(50));
  console.log("📊 Processing complete:");
  console.log(`   ✅ Success: ${successCount} files`);
  console.log(`   ❌ Failed: ${failCount} files`);
  console.log(`   📁 Output directory: ${resolvedOutputDir}`);
  console.log("═".repeat(50));

  if (failCount > 0) {
    process.exit(1);
  }
}

// Get input directory from command line arguments
const inputDir = process.argv[2];

if (!inputDir) {
  console.error("❌ Please provide an input directory path");
  console.error(
    "Usage: npx tsx scripts/optimize-glb.ts <input-directory> [output-directory]",
  );
  console.error("Example: npx tsx scripts/optimize-glb.ts ./public/models");
  process.exit(1);
}

const outputDir = process.argv[3];

optimizeGlbFiles({
  inputDir,
  outputDir,
}).catch((error) => {
  console.error("❌ Error during execution:", error);
  process.exit(1);
});
