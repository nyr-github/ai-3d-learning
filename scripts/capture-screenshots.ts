import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdirSync, existsSync, renameSync, unlinkSync } from 'fs';
import { join } from 'path';

const BASE_URL = "http://localhost:3000";
const SCREENSHOTS_DIR = join(process.cwd(), "public", "screenshots");
const MAX_WIDTH = 800;

// 确保目录存在
if (!existsSync(SCREENSHOTS_DIR)) {
  mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

// 生成时间戳
const timestamp = new Date()
  .toISOString()
  .replace(/[-:T]/g, "")
  .slice(0, 15)
  .replace(" ", "_");

// 定义要捕获的页面
const pages = [
  { route: "/", name: "homepage", viewport: { width: 1280, height: 720 } },
  { route: "/converter", name: "converter", viewport: { width: 1280, height: 720 } },
  { route: "/optimize", name: "optimizer", viewport: { width: 1280, height: 720 } },
];

async function compressImage(inputPath: string, outputPath: string) {
  const tempPath = inputPath.replace('.png', '_temp.png');
  
  await sharp(inputPath)
    .resize(MAX_WIDTH, undefined, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .toFile(tempPath);
  
  // 替换原文件
  unlinkSync(inputPath);
  renameSync(tempPath, outputPath);
  
  console.log(`✓ Compressed: ${outputPath}`);
}

async function capturePage(
  browser: any,
  route: string,
  name: string,
  viewport: { width: number; height: number }
) {
  const page = await browser.newPage({ viewport });
  const fileName = `${name}_${timestamp}.png`;
  const filePath = join(SCREENSHOTS_DIR, fileName);

  try {
    console.log(`Capturing: ${route}...`);
    
    // 导航到页面
    const response = await page.goto(`${BASE_URL}${route}`, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });
    
    if (!response) {
      console.error(`  - No response received`);
      return;
    }
    
    console.log(`  - Response status: ${response.status()}`);
    
    // 调试：检查页面内容
    const title = await page.title();
    console.log(`  - Page title: ${title}`);
    
    // 检查页面是否有内容
    const bodyText = await page.innerText('body').catch(() => '');
    console.log(`  - Body text length: ${bodyText.length}`);
    
    if (bodyText.length === 0) {
      console.error(`  - Page appears to be empty`);
      return;
    }
    
    // 等待页面稳定
    await page.waitForTimeout(3000);
    
    // 截图
    await page.screenshot({
      path: filePath,
      fullPage: false,
    });

    // 压缩图片
    await compressImage(filePath, filePath);

    console.log(`✓ Saved: ${fileName}`);
  } catch (error) {
    console.error(`✗ Failed to capture ${route}:`, error);
  } finally {
    await page.close();
  }
}

async function main() {
  console.log('Starting screenshot capture...\n');

  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

  for (const { route, name, viewport } of pages) {
    await capturePage(browser, route, name, viewport);
  }

  await browser.close();

  console.log("\n✓ All screenshots captured!");
  console.log(`Saved to: ${SCREENSHOTS_DIR}`);
}

main().catch(console.error);
