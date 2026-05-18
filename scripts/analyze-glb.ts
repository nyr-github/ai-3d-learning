import { readdirSync, statSync, existsSync, readFileSync } from "fs";
import { join, resolve } from "path";

interface TextureInfo {
  mimeType: string;
  width?: number;
  height?: number;
  size: number;
}

interface GLBInfo {
  filename: string;
  fileSize: number;
  hasDraco: boolean;
  hasMeshopt: boolean;
  compressionMethod: string;
  textureCount: number;
  textures: TextureInfo[];
  totalTextureSize: number;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function analyzeGLBBuffer(buffer: Buffer): {
  hasDraco: boolean;
  hasMeshopt: boolean;
  textures: TextureInfo[];
} {
  const hasDraco = buffer.includes(Buffer.from("KHR_draco_mesh_compression"));
  const hasMeshopt = buffer.includes(Buffer.from("EXT_meshopt_compression"));

  // Find texture information by searching for common image signatures
  const textures: TextureInfo[] = [];

  // PNG signature: 89 50 4E 47 0D 0A 1A 0A
  const pngSignature = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  ]);
  // JPEG signature: FF D8 FF
  const jpegSignature = Buffer.from([0xff, 0xd8, 0xff]);
  // WebP signature: RIFF....WEBP
  const webpSignature = Buffer.from("RIFF");
  // AVIF signature: ftyp...avif
  const avifSignature = Buffer.from("ftyp");

  let offset = 0;
  while (offset < buffer.length - 8) {
    // Check for PNG
    if (buffer.slice(offset, offset + 8).equals(pngSignature)) {
      // Read PNG dimensions (at offset 16-23: width and height as 4-byte big-endian)
      if (offset + 24 < buffer.length) {
        const width = buffer.readUInt32BE(offset + 16);
        const height = buffer.readUInt32BE(offset + 20);

        // Find end of PNG (search for IEND chunk)
        let endOffset = offset + 8;
        let foundIEND = false;
        while (endOffset < buffer.length - 12) {
          const chunkLength = buffer.readUInt32BE(endOffset);
          const chunkType = buffer
            .slice(endOffset + 4, endOffset + 8)
            .toString();
          if (chunkType === "IEND") {
            foundIEND = true;
            const pngSize = endOffset + 12 - offset;
            textures.push({
              mimeType: "image/png",
              width,
              height,
              size: pngSize,
            });
            offset = endOffset + 12;
            break;
          }
          endOffset += chunkLength + 12; // chunk length + header + CRC
        }
        if (!foundIEND) offset += 8;
      } else {
        offset += 8;
      }
    }
    // Check for JPEG
    else if (buffer.slice(offset, offset + 3).equals(jpegSignature)) {
      // Find end of JPEG (FF D9)
      let endOffset = offset + 3;
      while (endOffset < buffer.length - 2) {
        if (buffer[endOffset] === 0xff && buffer[endOffset + 1] === 0xd9) {
          const jpegSize = endOffset + 2 - offset;
          textures.push({
            mimeType: "image/jpeg",
            size: jpegSize,
          });
          offset = endOffset + 2;
          break;
        }
        endOffset++;
      }
      if (endOffset >= buffer.length - 2) offset += 3;
    }
    // Check for WebP
    else if (buffer.slice(offset, offset + 4).equals(webpSignature)) {
      const webpMarker = buffer.slice(offset + 8, offset + 12).toString();
      if (webpMarker === "WEBP") {
        const riffSize = buffer.readUInt32LE(offset + 4);
        const webpSize = riffSize + 8;
        textures.push({
          mimeType: "image/webp",
          size: webpSize,
        });
        offset += webpSize;
      } else {
        offset += 4;
      }
    }
    // Check for AVIF (in ftyp box)
    else if (buffer.slice(offset + 4, offset + 8).equals(avifSignature)) {
      const ftypSize = buffer.readUInt32BE(offset);
      const avifMarker = buffer.slice(offset + 8, offset + 12).toString();
      if (avifMarker.includes("avif") || avifMarker.includes("avis")) {
        textures.push({
          mimeType: "image/avif",
          size: ftypSize,
        });
        offset += ftypSize;
      } else {
        offset += 4;
      }
    } else {
      offset++;
    }
  }

  return { hasDraco, hasMeshopt, textures };
}

async function analyzeAllGLBFiles(inputDir: string): Promise<void> {
  const resolvedInputDir = resolve(inputDir);

  if (!existsSync(resolvedInputDir)) {
    console.error(`❌ Input directory not found: ${resolvedInputDir}`);
    process.exit(1);
  }

  const files = readdirSync(resolvedInputDir).filter((file) =>
    file.toLowerCase().endsWith(".glb"),
  );

  if (files.length === 0) {
    console.log(`⚠️  No GLB files found in ${resolvedInputDir}`);
    return;
  }

  console.log(`🔍 Analyzing ${files.length} GLB files...\n`);
  console.log(`📂 Directory: ${resolvedInputDir}\n`);

  const results: GLBInfo[] = [];

  for (const file of files) {
    const filePath = join(resolvedInputDir, file);
    console.log(`⏳ Analyzing: ${file}`);

    try {
      const buffer = readFileSync(filePath);
      const fileSize = statSync(filePath).size;
      const { hasDraco, hasMeshopt, textures } = analyzeGLBBuffer(buffer);

      let compressionMethod = "none";
      if (hasDraco) compressionMethod = "draco";
      if (hasMeshopt) compressionMethod = "meshopt";

      const totalTextureSize = textures.reduce((sum, t) => sum + t.size, 0);

      results.push({
        filename: file,
        fileSize,
        hasDraco,
        hasMeshopt,
        compressionMethod,
        textureCount: textures.length,
        textures,
        totalTextureSize,
      });

      console.log(`✅ Done: ${file}\n`);
    } catch (error) {
      console.error(`❌ Failed to analyze: ${file}`);
      console.error(`   Error: ${(error as Error).message}\n`);
    }
  }

  // Print summary
  printSummary(results);
}

function printSummary(results: GLBInfo[]): void {
  console.log("\n" + "═".repeat(120));
  console.log("📊 GLB文件纹理分析报告");
  console.log("═".repeat(120));

  // Overall statistics
  const totalFiles = results.length;
  const totalSize = results.reduce((sum, r) => sum + r.fileSize, 0);
  const totalTextureSize = results.reduce(
    (sum, r) => sum + r.totalTextureSize,
    0,
  );
  const totalTextures = results.reduce((sum, r) => sum + r.textureCount, 0);
  const withDraco = results.filter((r) => r.hasDraco).length;
  const withMeshopt = results.filter((r) => r.hasMeshopt).length;
  const noCompression = totalFiles - withDraco - withMeshopt;

  console.log("\n📈 总体统计:");
  console.log(`   文件总数: ${totalFiles}`);
  console.log(`   总文件大小: ${formatBytes(totalSize)}`);
  console.log(
    `   总纹理大小: ${formatBytes(totalTextureSize)} (${((totalTextureSize / totalSize) * 100).toFixed(1)}%)`,
  );
  console.log(`   纹理总数: ${totalTextures}`);
  console.log(`   Draco压缩: ${withDraco} 文件`);
  console.log(`   Meshopt压缩: ${withMeshopt} 文件`);
  console.log(`   无压缩: ${noCompression} 文件`);

  // Texture format distribution
  console.log("\n🎨 纹理格式分布:");
  const formatCount: Record<string, number> = {};
  results.forEach((r) => {
    r.textures.forEach((t) => {
      formatCount[t.mimeType] = (formatCount[t.mimeType] || 0) + 1;
    });
  });

  const formatNames: Record<string, string> = {
    "image/png": "PNG (无损)",
    "image/jpeg": "JPEG (有损)",
    "image/webp": "WebP (现代)",
    "image/avif": "AVIF (最新)",
  };

  Object.entries(formatCount).forEach(([format, count]) => {
    const displayName = formatNames[format] || format;
    const percentage = ((count / totalTextures) * 100).toFixed(1);
    console.log(`   ${displayName}: ${count} 个 (${percentage}%)`);
  });

  // Detailed file information
  console.log("\n" + "─".repeat(120));
  console.log("📁 文件详细信息:");
  console.log("─".repeat(120));

  results.forEach((r, index) => {
    console.log(`\n[${index + 1}] ${r.filename}`);
    console.log(`    文件大小: ${formatBytes(r.fileSize)}`);
    console.log(
      `    几何体压缩: ${r.hasDraco ? "✅ Draco" : r.hasMeshopt ? "✅ Meshopt" : "❌ 无"}`,
    );
    console.log(`    纹理数量: ${r.textureCount}`);
    console.log(
      `    纹理总大小: ${formatBytes(r.totalTextureSize)} (${((r.totalTextureSize / r.fileSize) * 100).toFixed(1)}%)`,
    );

    if (r.textures.length > 0) {
      console.log(`    纹理编码:`);
      r.textures.forEach((t, tIndex) => {
        const formatName = formatNames[t.mimeType] || t.mimeType;
        const sizePercent = ((t.size / r.fileSize) * 100).toFixed(1);
        console.log(
          `      ${tIndex + 1}. ${formatName} - ${formatBytes(t.size)} (${sizePercent}%)`,
        );
      });
    }

    // Optimization suggestions
    console.log(`    💡 优化建议:`);
    if (!r.hasDraco && !r.hasMeshopt) {
      console.log(`      ⚠️  未使用几何体压缩，建议: --compress draco`);
    }

    const nonOptimalTextures = r.textures.filter(
      (t) => t.mimeType === "image/png" || t.mimeType === "image/jpeg",
    );
    if (nonOptimalTextures.length > 0) {
      console.log(
        `      ⚠️  有 ${nonOptimalTextures.length} 个纹理可转换为WebP/AVIF`,
      );
    }

    if (r.hasDraco && nonOptimalTextures.length === 0) {
      console.log(`      ✅ 已优化`);
    }
  });

  // Final summary
  console.log("\n" + "═".repeat(120));
  console.log("🎯 总结");
  console.log("═".repeat(120));

  const needsOptimization = results.filter(
    (r) =>
      !r.hasDraco ||
      !r.hasMeshopt ||
      r.textures.some(
        (t) => t.mimeType === "image/png" || t.mimeType === "image/jpeg",
      ),
  ).length;

  if (needsOptimization > 0) {
    console.log(
      `\n⚠️  有 ${needsOptimization}/${totalFiles} 个文件可以进一步优化`,
    );
    console.log("\n推荐优化命令:");
    console.log(`  pnpm analyze:glb:models`);
    console.log(`  pnpm optimize:glb:models`);
  } else {
    console.log(`\n✅ 所有文件都已优化！`);
  }
}

// Get input directory from command line arguments
const inputDir = process.argv[2];

if (!inputDir) {
  console.error("❌ Please provide an input directory path");
  console.error("Usage: npx tsx scripts/analyze-glb.ts <input-directory>");
  console.error("Example: npx tsx scripts/analyze-glb.ts ./public/models");
  process.exit(1);
}

analyzeAllGLBFiles(inputDir).catch((error) => {
  console.error("❌ Error during execution:", error);
  process.exit(1);
});
