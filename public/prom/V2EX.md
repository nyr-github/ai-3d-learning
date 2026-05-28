# AI 3D Learning Platform - 基于中国AI工具链的3D在线展示方案

## 项目简介

大家好，分享一个我最近完成的开源项目。

**核心问题**：AI生成3D模型已经很成熟了，但生成后的展示和分享还是个问题。很多人用AI工具生成GLB模型后，只能本地查看，无法在线分享。

**我的解决方案**：用一套完整的中国AI工具链，从模型生成到网站部署，全流程打通，并开源整个方案。

## 技术实现

### 工具链

1. **图像生成**：豆包（详细prompt控制，生成科学插图）
2. **3D转换**：混元3D（单图转GLB模型）
3. **网站开发**：Qoder（AI编程助手，快速搭建）
4. **模型优化**：glTF Transform（DRACO压缩 + WebP纹理）

### 技术栈

```
前端：Next.js 16 (App Router + 静态导出)
3D渲染：Three.js + React Three Fiber + Drei
样式：Tailwind CSS v4
部署：GitHub Pages（零服务器成本）
```

### 核心架构

**数据驱动**：采用通用Entity3D模型，JSON配置即可扩展

```typescript
interface Entity3D {
  id: string;
  name: string;
  description: string;
  attributes: Attribute[];
  features: Feature[];
  model3D: Model3DMetadata;
}
```

**智能加载**：状态机 + 缓存策略

```
加载流程：
1. 检查内存缓存 → 命中则直接返回
2. 未命中 → 下载GLB文件（带进度跟踪）
3. DRACO解码 → 解析模型
4. 存入缓存 → 返回给组件

预加载机制：预测用户下一个可能查看的模型，提前加载
```

**性能优化**：

- DRACO压缩：模型文件减少50-80%
- WebP纹理：图片体积减少30-50%
- 自适应DPR：`[1, 2]` 平衡清晰度和性能
- 智能缓存：已加载模型保存在内存，切换秒开

### 响应式布局

```
桌面端（>640px）：
┌─────────────────────────────────┐
│ Sidebar │ 3D Viewer │ InfoPanel │
│  (20%)  │   (55%)   │  (25%)    │
│ Resizable Panels                │
└─────────────────────────────────┘

移动端（<640px）：
┌──────────────────────┐
│   3D Viewer (Full)   │
│   + Control Buttons  │
└──────────────────────┘
     ↓ Swipe/Tap
┌──────────────┐
│  Sidebar     │ (Overlay)
└──────────────┘
```

## 功能特性

### 核心功能

- **3D交互查看**：旋转、缩放、平移，支持鼠标和触摸
- **DRACO支持**：自动解码压缩GLB模型
- **智能加载**：缓存 + 预加载，无需等待
- **响应式设计**：桌面到移动端完美适配

### 教育功能

- **详细元数据**：描述、趣味知识、教学重点
- **考试重点标注**：高频考点特别标记
- **显微镜可见性**：光学/电子显微镜提示
- **尺寸范围可视化**：交互式滑块展示

### 开发者友好

- **完全开源**：MIT协议
- **配置驱动**：添加模型只需配置JSON
- **内置工具**：模型优化、图片转换脚本
- **可扩展**：通用数据模型支持多学科

## 实际应用

已完成生物学项目，包含：

**细胞**：植物细胞、动物细胞、细菌细胞、白细胞、神经元

**细胞器**：线粒体、叶绿体、细胞膜

**生物分子**：DNA双螺旋

**病毒**：T4噬菌体

每个模型都配有完整的元数据和教学标注。

## 快速开始

```bash
# 克隆
git clone <repository-url>
cd ai-3d-learning

# 安装依赖
pnpm install

# 开发
pnpm dev

# 构建
pnpm build
```

### 添加自定义模型

1. GLB文件 → `public/models/`
2. 预览图（WebP）→ `public/images/`
3. 配置 `data/projects/` 下的数据文件
4. 运行优化脚本：
   ```bash
   pnpm optimize:glb ./public/models
   pnpm convert:webp ./public/images
   pnpm update:model-sizes
   ```

### 部署

```bash
pnpm build
git push  # 自动触发GitHub Actions部署
```

## 扩展场景

这个平台不只是教育工具，还可以用于：

1. **产品展示**：3D产品预览
2. **设计作品集**：交互式3D作品展示
3. **游戏开发**：角色、场景预览
4. **电商**：3D商品展示

只需更换数据配置和模型，无需修改代码。

## 开源地址

📦 GitHub: https://github.com/[你的用户名]/ai-3d-learning

🌐 在线演示: https://[你的用户名].github.io/ai-3d-learning

## 征求反馈

作为开发者，我想了解：

1. **这种AI生成+在线展示的工作流，对你的项目有用吗？**
2. **你希望增加什么功能？**
   - 动画支持？
   - 自定义标注？
   - 多语言？
   - 性能监控？
3. **你会用它展示什么类型的3D模型？**
4. **使用中遇到了什么问题？**

欢迎在GitHub提Issue或PR，也可以在这里交流。

你的反馈对项目改进很重要，感谢！

## 技术细节

### 关于DRACO压缩

DRACO是Google的3D几何压缩算法，本项目：

- 预置解码器文件（`public/draco/`）
- GLTFLoader自动配置DRACOLoader
- 支持`.glb`和`.gltf + .bin`格式

### 关于模型优化

glTF Transform优化流程：

1. 纹理重编码为WebP
2. 应用DRACO几何压缩
3. 移除冗余数据
4. 优化网格结构

### 关于静态导出

Next.js静态导出配置：

```javascript
const nextConfig = {
  output: "export",
};
```

动态路由需要实现`generateStaticParams`：

```typescript
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
```

---

**总结**：这是一个完整的3D展示解决方案，从AI模型生成到网站部署，全流程开源。希望能为有类似需求的开发者提供参考。

欢迎使用和反馈 🙏
