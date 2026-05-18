import { readdirSync, mkdirSync, existsSync } from "fs";
import { join, resolve, extname } from "path";
import sharp from "sharp";

interface ImageOptions {
  inputDir: string;
  outputDir?: string;
  maxWidth?: number;
  quality?: number;
}

async function convertImagesToWebp(options: ImageOptions): Promise<void> {
  const { inputDir, outputDir, maxWidth = 400, quality = 80 } = options;

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

  // Supported image formats
  const supportedExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".tiff",
    ".tif",
    ".webp",
  ];

  // Get all image files
  const files = readdirSync(resolvedInputDir).filter((file) => {
    const ext = extname(file).toLowerCase();
    return supportedExtensions.includes(ext);
  });

  if (files.length === 0) {
    console.log(`⚠️  No supported image files found in ${resolvedInputDir}`);
    console.log(`   Supported formats: ${supportedExtensions.join(", ")}`);
    return;
  }

  console.log(`🚀 Starting to process ${files.length} image files...`);
  console.log(`📂 Input directory: ${resolvedInputDir}`);
  console.log(`📤 Output directory: ${resolvedOutputDir}`);
  console.log(`📏 Max width: ${maxWidth}px`);
  console.log(`✨ Quality: ${quality}%`);
  console.log("─".repeat(50));

  let successCount = 0;
  let failCount = 0;

  for (const file of files) {
    const inputFile = join(resolvedInputDir, file);
    const fileName = file.replace(/\.[^/.]+$/, ""); // Remove extension
    const outputFile = join(resolvedOutputDir, `${fileName}.webp`);

    console.log(`\n⏳ Processing: ${file}`);

    try {
      // Process image using sharp library
      await sharp(inputFile)
        .resize({
          width: maxWidth,
          withoutEnlargement: true, // Don't enlarge if image is already smaller than max width
          fit: "inside", // Maintain aspect ratio
        })
        .webp({ quality })
        .toFile(outputFile);

      console.log(`✅ Successfully processed: ${file} -> ${fileName}.webp`);
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
    "Usage: npx tsx scripts/convert-images-to-webp.ts <input-directory> [output-directory]",
  );
  console.error(
    "Example: npx tsx scripts/convert-images-to-webp.ts ./public/images",
  );
  process.exit(1);
}

const outputDir = process.argv[3];

convertImagesToWebp({
  inputDir,
  outputDir,
  maxWidth: 200,
  quality: 80,
}).catch((error) => {
  console.error("❌ Error during execution:", error);
  process.exit(1);
});
