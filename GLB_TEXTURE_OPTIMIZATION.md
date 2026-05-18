# GLB纹理优化指南

## 📌 核心概念

### 纹理压缩的真相

**你的理解是正确的！** 纹理格式确实主要由GLB文件本身决定，但我们可以做**二次优化**。

---

## 🔍 GLB文件中的纹理

### 1. GPU压缩格式（无法后期转换）

这些格式需要在**3D软件导出GLB时**指定：

| 格式        | 用途          | 平台支持    |
| ----------- | ------------- | ----------- |
| **ASTC**    | 移动端GPU压缩 | iOS/Android |
| **ETC2**    | 移动端GPU压缩 | Android     |
| **BC7/DXT** | 桌面GPU压缩   | Windows     |
| **PVRTC**   | 旧iOS设备压缩 | 旧iOS设备   |

❌ **这些格式无法在GLB创建后转换**

### 2. 图像编码格式（可以后期优化）

GLB内部纹理的编码格式，**可以重新编码**：

| 格式     | 特点               | 适用场景     |
| -------- | ------------------ | ------------ |
| **PNG**  | 无损，支持透明     | Logo、UI元素 |
| **JPEG** | 有损，文件小       | 照片类纹理   |
| **WebP** | 现代格式，高压缩率 | ✅ 推荐通用  |
| **AVIF** | 最新格式，最佳压缩 | ✅ 追求极致  |

✅ **这些格式可以通过 gltf-transform 工具重新编码！**

---

## 🛠️ 项目现有的优化工具

### 基本用法

```bash
# 优化单个目录（默认WebP + Draco）
npx tsx scripts/optimize-glb.ts ./public/models

# 指定输出目录
npx tsx scripts/optimize-glb.ts ./public/models ./public/models-optimized
```

### 高级优化选项

编辑 `scripts/optimize-glb.ts` 调用时的参数：

```typescript
optimizeGlbFiles({
  inputDir: "./public/models",
  outputDir: "./public/models-optimized",

  // 纹理重新编码（减小文件大小）
  textureCompress: "webp", // webp | avif | jpeg | png

  // 网格压缩（减小几何体大小）
  compress: "draco", // draco | meshopt

  // 纹理尺寸限制（进一步减小）
  textureResize: [1024, 1024], // 最大1024x1024

  // 清理未使用的顶点属性
  prune: true,
});
```

---

## 📊 优化策略建议

### 策略1：通用优化（推荐）

```bash
# 当前项目默认配置
npx tsx scripts/optimize-glb.ts ./public/models
```

**效果：**

- 纹理转换为WebP：↓30-50%文件大小
- Draco几何压缩：↓40-60%几何体大小
- 总体积减少：↓40-55%

### 策略2：极致压缩（移动端优先）

修改脚本参数：

```typescript
{
  textureCompress: 'avif',        // 最高压缩率
  compress: 'draco',            // 更好的压缩
  textureResize: [512, 512],      // 限制纹理尺寸
  prune: true,                    // 清理冗余数据
}
```

**效果：**

- 总体积减少：↓60-75%
- 适合：移动端、网络条件差

### 策略3：质量优先（桌面端）

```typescript
{
  textureCompress: 'webp',        // 平衡质量和大小
  compress: 'draco',              // 快速解码
  textureResize: [2048, 2048],    // 保持高质量
  prune: true,
}
```

**效果：**

- 总体积减少：↓35-45%
- 保持高质量视觉

---

## 🎯 实际案例

### 优化前 vs 优化后

```
原始GLB文件：
├─ 几何体：2.5 MB
├─ 纹理（PNG）：8.0 MB
└─ 总计：10.5 MB

优化后（WebP + Draco）：
├─ 几何体：1.0 MB（Draco压缩）
├─ 纹理（WebP）：3.5 MB（重新编码）
└─ 总计：4.5 MB（↓57%）
```

### 加载时间对比

```
10 Mbps网络：
- 优化前：10.5 MB ÷ 1.25 MB/s = 8.4秒
- 优化后：4.5 MB ÷ 1.25 MB/s = 3.6秒
- 提升：↓57% 加载时间
```

---

## ⚠️ 注意事项

### 1. 质量损失

- **WebP/AVIF**：有损压缩，可能有轻微质量损失
- **textureResize**：降低分辨率，近距离可能模糊
- **建议**：优化后检查模型效果

### 2. 透明度

- JPEG不支持透明度
- 需要透明度的纹理使用WebP或PNG

### 3. 兼容性

- **WebP**：现代浏览器都支持 ✅
- **AVIF**：较新浏览器支持（Chrome 85+、Firefox 93+）
- **降级方案**：three.js会自动处理

### 4. 不可逆操作

- 纹理重新编码是**有损操作**
- **建议**：保留原始GLB文件备份

---

## 🔄 完整优化流程

### 步骤1：备份原始文件

```bash
cp -r public/models public/models-original
```

### 步骤2：执行优化

```bash
npx tsx scripts/optimize-glb.ts ./public/models ./public/models-optimized
```

### 步骤3：对比效果

```bash
# 查看文件大小
ls -lh public/models/*.glb
ls -lh public/models-optimized/*.glb
```

### 步骤4：替换文件

```bash
# 确认效果后替换
rm -rf public/models
mv public/models-optimized public/models
```

### 步骤5：测试

```bash
npm run dev
# 在浏览器中检查所有模型显示效果
```

---

## 📈 监控优化效果

### 文件大小对比脚本

创建 `scripts/compare-sizes.ts`：

```typescript
import { readdirSync, statSync } from "fs";
import { join } from "path";

function compareSizes(originalDir: string, optimizedDir: string) {
  const originals = readdirSync(originalDir).filter((f) => f.endsWith(".glb"));

  console.log("文件优化对比：\n");
  console.log(
    "文件名".padEnd(30) +
      "原始大小".padEnd(15) +
      "优化大小".padEnd(15) +
      "压缩率",
  );
  console.log("─".repeat(75));

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const file of originals) {
    const originalSize = statSync(join(originalDir, file)).size;
    const optimizedPath = join(optimizedDir, file);
    const optimizedSize = existsSync(optimizedPath)
      ? statSync(optimizedPath).size
      : originalSize;

    totalOriginal += originalSize;
    totalOptimized += optimizedSize;

    const ratio = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

    console.log(
      file.padEnd(30) +
        (originalSize / 1024 / 1024).toFixed(2) +
        " MB".padEnd(12) +
        (optimizedSize / 1024 / 1024).toFixed(2) +
        " MB".padEnd(12) +
        `↓${ratio}%`,
    );
  }

  const totalRatio = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);
  console.log("─".repeat(75));
  console.log(
    "总计".padEnd(30) +
      (totalOriginal / 1024 / 1024).toFixed(2) +
      " MB".padEnd(15) +
      (totalOptimized / 1024 / 1024).toFixed(2) +
      " MB".padEnd(15) +
      `↓${totalRatio}%`,
  );
}

compareSizes("./public/models-original", "./public/models");
```

---

## 🚀 进阶优化

### 1. 纹理尺寸自动化

根据模型大小自动选择纹理分辨率：

```typescript
// 大模型使用高分辨率
if (fileSize > 5 * 1024 * 1024) {
  textureResize: [2048, 2048];
}
// 小模型使用低分辨率
else {
  textureResize: [1024, 1024];
}
```

### 2. 分批优化

对不同类别的模型使用不同策略：

```typescript
// 重要模型（高质量）
optimizeGlbFiles({
  inputDir: "./public/models/featured",
  textureCompress: "webp",
  textureResize: [2048, 2048],
});

// 普通模型（高压缩）
optimizeGlbFiles({
  inputDir: "./public/models/normal",
  textureCompress: "avif",
  textureResize: [1024, 1024],
});
```

### 3. CI/CD自动优化

在 `.github/workflows/deploy.yml` 中添加：

```yaml
- name: Optimize GLB models
  run: |
    npx tsx scripts/optimize-glb.ts ./public/models ./public/models-optimized
    rm -rf public/models
    mv public/models-optimized public/models
```

---

## 📚 相关资源

- [gltf-transform 官方文档](https://gltf-transform.dev/)
- [WebP 格式介绍](https://developers.google.com/speed/webp)
- [AVIF 格式介绍](https://www.w3.org/TR/avif/)
- [Draco 3D压缩](https://google.github.io/draco/)

---

## ❓ 常见问题

### Q: 优化后模型变模糊怎么办？

A: 增大 `textureResize` 值或改用无损格式

### Q: 能否只优化纹理不压缩几何体？

A: 可以，设置 `compress: undefined`

### Q: ASTC/ETC2真的无法后期添加吗？

A: 正确，这些是GPU格式，需要在导出GLB时指定

### Q: 优化失败怎么办？

A: 检查gltf-transform版本，确保GLB文件格式正确

---

## 📞 需要帮助？

如果遇到优化问题，请检查：

1. gltf-transform版本是否最新
2. GLB文件是否损坏
3. 磁盘空间是否充足
4. Node.js版本是否兼容（建议16+）
