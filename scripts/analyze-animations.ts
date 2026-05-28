import { readdirSync, statSync, existsSync, readFileSync } from "fs";
import { join, resolve } from "path";

interface AnimationInfo {
  name: string;
  duration: number;
  tracks: number;
}

interface SkeletonInfo {
  jointCount: number;
  skinCount: number;
  hasSkeleton: boolean;
}

interface GLBAnalysis {
  filename: string;
  fileSize: number;
  animations: AnimationInfo[];
  skeleton: SkeletonInfo;
  hasAnimations: boolean;
  hasSkeleton: boolean;
  hasSkinning: boolean;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

async function analyzeGLBFile(filePath: string): Promise<GLBAnalysis> {
  const fileName = filePath.split("/").pop() || "unknown.glb";
  const fileSize = statSync(filePath).size;

  try {
    const buffer = readFileSync(filePath);

    // Parse GLB header
    // GLB format: magic (4 bytes) + version (4 bytes) + length (4 bytes)
    const magic = buffer.readUInt32LE(0);
    if (magic !== 0x46546c67) {
      // 'glTF' in little-endian
      throw new Error("Not a valid GLB file");
    }

    const version = buffer.readUInt32LE(4);
    const totalLength = buffer.readUInt32LE(8);

    // Parse chunks starting at byte 12
    let offset = 12;
    let jsonChunk: any = null;

    while (offset < totalLength) {
      const chunkLength = buffer.readUInt32LE(offset);
      const chunkType = buffer.toString("utf8", offset + 4, offset + 8);

      if (chunkType === "JSON") {
        const jsonBuffer = buffer.slice(offset + 8, offset + 8 + chunkLength);
        jsonChunk = JSON.parse(jsonBuffer.toString("utf8"));
        break;
      }

      offset += 8 + chunkLength;
    }

    if (!jsonChunk) {
      throw new Error("No JSON chunk found in GLB file");
    }

    // Analyze animations from JSON
    const animations: AnimationInfo[] = [];
    if (jsonChunk.animations && Array.isArray(jsonChunk.animations)) {
      for (const anim of jsonChunk.animations) {
        animations.push({
          name: anim.name || `animation_${animations.length}`,
          duration: 0, // Duration calculation requires accessing sampler data
          tracks: anim.channels ? anim.channels.length : 0,
        });
      }
    }

    // Analyze skins (skeletons)
    const skins = jsonChunk.skins || [];
    let totalJoints = 0;

    for (const skin of skins) {
      if (skin.joints) {
        totalJoints += skin.joints.length;
      }
    }

    const skeletonInfo: SkeletonInfo = {
      jointCount: totalJoints,
      skinCount: skins.length,
      hasSkeleton: totalJoints > 0,
    };

    // Check for skinning attributes in meshes
    let hasSkinning = false;
    if (jsonChunk.accessors && Array.isArray(jsonChunk.accessors)) {
      for (const accessor of jsonChunk.accessors) {
        if (
          accessor.name &&
          (accessor.name.includes("JOINTS") ||
            accessor.name.includes("WEIGHTS"))
        ) {
          hasSkinning = true;
          break;
        }
      }
    }

    // Also check mesh primitives for skinning attributes
    if (jsonChunk.meshes && Array.isArray(jsonChunk.meshes)) {
      for (const mesh of jsonChunk.meshes) {
        if (mesh.primitives) {
          for (const primitive of mesh.primitives) {
            if (
              primitive.attributes &&
              (primitive.attributes.JOINTS_0 || primitive.attributes.WEIGHTS_0)
            ) {
              hasSkinning = true;
              break;
            }
          }
        }
        if (hasSkinning) break;
      }
    }

    return {
      filename: fileName,
      fileSize,
      animations,
      skeleton: skeletonInfo,
      hasAnimations: animations.length > 0,
      hasSkeleton: skeletonInfo.hasSkeleton,
      hasSkinning,
    };
  } catch (error) {
    console.error(`❌ Error analyzing ${fileName}:`, (error as Error).message);
    return {
      filename: fileName,
      fileSize,
      animations: [],
      skeleton: { jointCount: 0, skinCount: 0, hasSkeleton: false },
      hasAnimations: false,
      hasSkeleton: false,
      hasSkinning: false,
    };
  }
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

  console.log(
    `🔍 Analyzing ${files.length} GLB files for animations and skeletons...\n`,
  );
  console.log(`📂 Directory: ${resolvedInputDir}\n`);

  const results: GLBAnalysis[] = [];

  for (const file of files) {
    const filePath = join(resolvedInputDir, file);
    console.log(`⏳ Analyzing: ${file}`);

    const result = await analyzeGLBFile(filePath);
    results.push(result);

    console.log(`✅ Done: ${file}\n`);
  }

  // Print summary
  printSummary(results);
}

function printSummary(results: GLBAnalysis[]): void {
  console.log("\n" + "═".repeat(120));
  console.log("📊 GLB文件骨骼与动画分析报告");
  console.log("═".repeat(120));

  // Overall statistics
  const totalFiles = results.length;
  const filesWithAnimations = results.filter((r) => r.hasAnimations).length;
  const filesWithSkeletons = results.filter((r) => r.hasSkeleton).length;
  const filesWithSkinning = results.filter((r) => r.hasSkinning).length;

  console.log("\n📈 总体统计:");
  console.log(`   文件总数: ${totalFiles}`);
  console.log(`   包含动画: ${filesWithAnimations} 文件`);
  console.log(`   包含骨骼: ${filesWithSkeletons} 文件`);
  console.log(`   包含蒙皮: ${filesWithSkinning} 文件`);

  // Detailed file information
  console.log("\n" + "─".repeat(120));
  console.log("📁 文件详细信息:");
  console.log("─".repeat(120));

  results.forEach((r, index) => {
    console.log(`\n[${index + 1}] ${r.filename}`);
    console.log(`    文件大小: ${formatBytes(r.fileSize)}`);
    console.log(`    包含动画: ${r.hasAnimations ? "✅ 是" : "❌ 否"}`);
    console.log(`    包含骨骼: ${r.hasSkeleton ? "✅ 是" : "❌ 否"}`);
    console.log(`    包含蒙皮: ${r.hasSkinning ? "✅ 是" : "❌ 否"}`);

    if (r.animations.length > 0) {
      console.log(`    动画列表:`);
      r.animations.forEach((anim, aIndex) => {
        console.log(
          `      ${aIndex + 1}. "${anim.name}" - 时长: ${anim.duration.toFixed(2)}s, 轨迹数: ${anim.tracks}`,
        );
      });
    }

    if (r.skeleton.hasSkeleton) {
      console.log(`    骨骼信息:`);
      console.log(`      骨骼数量: ${r.skeleton.jointCount}`);
      console.log(`      蒙皮数量: ${r.skeleton.skinCount}`);
    }

    // Classification
    const classification = [];
    if (r.hasAnimations) classification.push("动画");
    if (r.hasSkeleton) classification.push("骨骼");
    if (r.hasSkinning) classification.push("蒙皮");

    if (classification.length > 0) {
      console.log(`    类型: ${classification.join(", ")}`);
    } else {
      console.log(`    类型: 静态模型`);
    }
  });

  // Final summary
  console.log("\n" + "═".repeat(120));
  console.log("🎯 总结");
  console.log("═".repeat(120));

  if (filesWithAnimations > 0 || filesWithSkeletons > 0) {
    console.log(
      `\n✅ 发现 ${filesWithAnimations} 个带动画的模型，${filesWithSkeletons} 个带骨骼的模型`,
    );
    console.log("\n支持的模型可以用于:");
    console.log("  - 动画播放和控制");
    console.log("  - 角色骨骼动画");
    console.log("  - 交互式动画触发");
  } else {
    console.log(`\nℹ️  所有模型均为静态模型，不包含动画或骨骼数据`);
  }
}

// Get input directory from command line arguments
const inputDir = process.argv[2];

if (!inputDir) {
  console.error("❌ Please provide an input directory path");
  console.error(
    "Usage: npx tsx scripts/analyze-animations.ts <input-directory>",
  );
  console.error(
    "Example: npx tsx scripts/analyze-animations.ts ./public/models",
  );
  process.exit(1);
}

analyzeAllGLBFiles(inputDir).catch((error) => {
  console.error("❌ Error during execution:", error);
  process.exit(1);
});
