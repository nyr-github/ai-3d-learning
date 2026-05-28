/**
 * 模型文件重组脚本
 *
 * 功能：
 * 1. 将 public/models 下的文件按照项目分文件夹
 * 2. 修改项目文件中的资源路径
 *
 * 使用方法：
 * npx tsx scripts/reorganize-models.ts
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, "..");
const MODELS_DIR = path.join(ROOT_DIR, "public", "models");
const PROJECTS_DIR = path.join(ROOT_DIR, "data", "projects");

// 项目与模型文件的映射关系
interface ProjectModels {
  [projectSlug: string]: {
    file: string;
    models: string[]; // 模型ID列表
  };
}

// 分析每个项目使用的模型
function analyzeProjectModels(): ProjectModels {
  const projectFiles = fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".ts"));
  const projectModels: ProjectModels = {};

  for (const file of projectFiles) {
    const filePath = path.join(PROJECTS_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");

    // 提取项目slug
    const slugMatch = content.match(/slug:\s*['"]([^'"]+)['"]/);
    if (!slugMatch) continue;

    const slug = slugMatch[1];

    // 提取所有模型ID和对应的文件路径
    const modelMatches = content.matchAll(
      /modelUrl:\s*['"]\/models\/([^'"]+)['"]/g,
    );
    const models: string[] = [];

    for (const match of modelMatches) {
      const modelFile = match[1];
      const modelId = modelFile.replace(/\.(glb|gltf)$/, "");
      models.push(modelId);
    }

    if (models.length > 0) {
      projectModels[slug] = {
        file,
        models,
      };
    }
  }

  return projectModels;
}

// 获取模型相关的所有文件（.glb, .webp, .png等）
function getModelFiles(modelId: string): string[] {
  const allFiles = fs.readdirSync(MODELS_DIR);
  const relatedFiles = allFiles.filter(
    (file) =>
      file.startsWith(modelId + ".") &&
      (file.endsWith(".glb") ||
        file.endsWith(".gltf") ||
        file.endsWith(".webp") ||
        file.endsWith(".png") ||
        file.endsWith(".jpg")),
  );
  return relatedFiles;
}

// 创建文件夹并移动文件
function organizeFiles(projectModels: ProjectModels) {
  console.log("\n📁 开始重组模型文件...\n");

  for (const [slug, project] of Object.entries(projectModels)) {
    const projectModelsDir = path.join(MODELS_DIR, slug);

    // 创建项目文件夹
    if (!fs.existsSync(projectModelsDir)) {
      fs.mkdirSync(projectModelsDir, { recursive: true });
      console.log(`✓ 创建文件夹: public/models/${slug}/`);
    }

    // 移动每个模型的相关文件
    for (const modelId of project.models) {
      const files = getModelFiles(modelId);

      for (const file of files) {
        const srcPath = path.join(MODELS_DIR, file);
        const destPath = path.join(projectModelsDir, file);

        if (fs.existsSync(srcPath) && !fs.existsSync(destPath)) {
          fs.copyFileSync(srcPath, destPath);
          console.log(`  ✓ 移动: ${file} -> ${slug}/`);
        }
      }
    }
  }

  console.log("\n✅ 文件重组完成！\n");
}

// 更新项目文件中的路径
function updateProjectPaths(projectModels: ProjectModels) {
  console.log("\n📝 开始更新项目文件路径...\n");

  for (const [slug, project] of Object.entries(projectModels)) {
    const filePath = path.join(PROJECTS_DIR, project.file);
    let content = fs.readFileSync(filePath, "utf-8");

    // 替换所有 /models/xxx.glb 为 /models/slug/xxx.glb
    const originalContent = content;
    content = content.replace(
      /(modelUrl:\s*['"])\/models\/([^'"]+)(['"])/g,
      `$1/models/${slug}/$2$3`,
    );
    content = content.replace(
      /(imageUrl:\s*['"])\/models\/([^'"]+)(['"])/g,
      `$1/models/${slug}/$2$3`,
    );

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, "utf-8");
      console.log(`✓ 更新: ${project.file} (${project.models.length} 个模型)`);
    }
  }

  console.log("\n✅ 路径更新完成！\n");
}

// 主函数
function main() {
  console.log("🚀 模型文件重组脚本启动\n");
  console.log("=".repeat(60));

  // 1. 分析项目模型
  console.log("\n📊 分析项目模型使用情况...\n");
  const projectModels = analyzeProjectModels();

  console.log("发现的项目和模型：");
  for (const [slug, project] of Object.entries(projectModels)) {
    console.log(
      `  • ${slug}: ${project.models.length} 个模型 [${project.models.join(", ")}]`,
    );
  }

  // 2. 重组文件
  organizeFiles(projectModels);

  // 3. 更新路径
  updateProjectPaths(projectModels);

  console.log("=".repeat(60));
  console.log("\n🎉 所有任务完成！\n");
  console.log("📂 新的文件结构：");
  console.log("  public/models/");
  for (const slug of Object.keys(projectModels)) {
    console.log(`    ├── ${slug}/`);
    const projectDir = path.join(MODELS_DIR, slug);
    if (fs.existsSync(projectDir)) {
      const files = fs.readdirSync(projectDir);
      files.forEach((file, index) => {
        const isLast = index === files.length - 1;
        console.log(`    │   ${isLast ? "└──" : "├──"} ${file}`);
      });
    }
  }
  console.log("\n");
}

// 运行脚本
main();
