# 模型骨骼和动画检测功能

## 功能概述

已在 ModelInfoPanel 中集成了模型骨骼和动画检测功能，可以实时显示模型是否支持：

- **骨骼系统 (Skeleton)** - 显示骨骼关节数量
- **预设动画 (Animations)** - 显示动画片段数量和名称

## 实现原理

### 1. 分析工具库 (`lib/modelCapabilities.ts`)

提供了三个核心功能：

#### `analyzeModelCapabilities(gltf: GLTF)`

- 分析已加载的 GLTF 模型
- 检测 SkinnedMesh 和 Bone 对象
- 提取动画片段信息
- 返回完整的模型能力信息

#### `getModelCapabilities(modelUrl: string)`

- 异步加载并分析模型
- 使用缓存避免重复分析
- 返回 `ModelCapabilityInfo` 对象

#### `clearCapabilityCache()`

- 清理缓存，释放内存

### 2. UI 组件 (`components/ModelInfoPanel.tsx`)

在原有的模型信息面板中新增：

#### 骨骼信息

- 图标：🦴 Bone
- 显示内容：
  - 有骨骼：显示关节数量 (如 "41 joints")
  - 无骨骼：显示 "None"
- 样式：有骨骼时使用强调色高亮

#### 动画信息

- 图标：▶️ Play
- 显示内容：
  - 有动画：显示片段数量 (如 "3 clips")
  - 无动画：显示 "None"
- 样式：有动画时使用强调色高亮

#### 动画名称列表

- 当模型有动画时，显示前 2 个动画名称
- 超过 2 个时显示 "+N" 提示
- 使用标签样式展示

## 使用示例

### 在代码中使用

```typescript
import { getModelCapabilities } from "@/lib/modelCapabilities";

// 分析模型能力
const capabilities = await getModelCapabilities("/models/break-news.glb");

console.log(capabilities);
// 输出:
// {
//   hasAnimations: false,
//   animationCount: 0,
//   animationNames: [],
//   hasSkeleton: true,
//   jointCount: 41,
//   skinCount: 1,
//   hasSkinning: true
// }
```

### 在 React 组件中使用

```typescript
import { useState, useEffect } from "react";
import { getModelCapabilities } from "@/lib/modelCapabilities";

function MyComponent({ modelUrl }) {
  const [caps, setCaps] = useState(null);

  useEffect(() => {
    getModelCapabilities(modelUrl).then(setCaps);
  }, [modelUrl]);

  if (!caps) return <div>Loading...</div>;

  return (
    <div>
      <p>骨骼: {caps.hasSkeleton ? `${caps.jointCount} joints` : "None"}</p>
      <p>动画: {caps.hasAnimations ? `${caps.animationCount} clips` : "None"}</p>
    </div>
  );
}
```

## 当前项目模型分析结果

根据 `pnpm analyze:animations:models` 的分析结果：

### 支持骨骼的模型 (3个)

1. **break-news.glb** - 41 个骨骼关节，1 个蒙皮
2. **sss.glb** - 41 个骨骼关节，1 个蒙皮
3. **wooden.glb** - 39 个骨骼关节，1 个蒙皮

### 静态模型 (12个)

其他所有模型都是静态模型，不包含骨骼或动画数据。

## 性能优化

### 缓存机制

- 使用 Map 缓存分析结果
- Key: 模型 URL
- Value: ModelCapabilityInfo 对象
- 避免重复加载和分析同一模型

### 内存管理

- 提供 `clearCapabilityCache()` 函数
- 可在需要时手动清理缓存
- 组件卸载时自动清理（通过 useEffect cleanup）

### 异步加载

- 不阻塞 UI 渲染
- 显示 "Analyzing..." 加载状态
- 分析完成后更新显示

## 下一步扩展

### 1. 动画播放功能

可以为有动画的模型添加播放控制：

```typescript
import { AnimationMixer } from "three";

// 在 ModelScene 中添加
const mixer = new AnimationMixer(gltf.scene);
gltf.animations.forEach((clip) => {
  const action = mixer.clipAction(clip);
  // 可以添加播放/暂停控制
});
```

### 2. 骨骼可视化

添加骨骼可视化工具：

```typescript
import { SkeletonHelper } from "three";

const helper = new SkeletonHelper(gltf.scene);
scene.add(helper);
```

### 3. 动画混合

支持多个动画的混合播放：

```typescript
const action1 = mixer.clipAction(clip1);
const action2 = mixer.clipAction(clip2);

// 混合两个动画
action1.setEffectiveWeight(0.7);
action2.setEffectiveWeight(0.3);
```

## 测试方法

1. 启动开发服务器：`pnpm dev`
2. 访问任意项目页面
3. 查看左下角的 Model Info 面板
4. 应该能看到：
   - 文件大小
   - 压缩方式
   - 纹理格式
   - **骨骼信息** (新增)
   - **动画信息** (新增)

## 相关文件

- `lib/modelCapabilities.ts` - 模型能力分析工具
- `components/ModelInfoPanel.tsx` - 信息展示面板
- `scripts/analyze-animations.ts` - 批量分析脚本
- `components/EntityViewer.tsx` - 使用 ModelInfoPanel 的地方
