# 3D模型加载性能优化文档

## 优化概览

本次优化主要解决3D模型加载和缓存管理中的性能问题，包含三个核心优化：

1. **LRU缓存策略** - 限制缓存数量，自动淘汰最久未使用的模型
2. **内存监控** - 使用 `performance.memory` API监控内存使用，动态调整缓存
3. **预加载策略优化** - 只预加载当前项目内的模型，而非所有模型

---

## 1. LRU缓存策略

### 实现位置

`lib/modelLoader.ts`

### 核心配置

```typescript
/** 缓存中保留的最大模型数量 */
const MAX_CACHE_SIZE = 5;
```

### 工作原理

1. **访问追踪**：每个模型任务添加 `lastAccessed` 时间戳
2. **自动淘汰**：当缓存超过限制时，自动清理最久未使用的模型
3. **触发时机**：每次访问缓存时检查并执行LRU策略

### 关键函数

```typescript
// 更新模型访问时间
function touchModel(modelUrl: string): void;

// 执行LRU策略
function enforceLRUPolicy(maxItems: number = MAX_CACHE_SIZE): void;
```

### 效果

- ✅ 防止缓存无限增长
- ✅ 自动释放不使用的模型内存
- ✅ 保留常用模型以提高加载速度

---

## 2. 内存监控

### 实现位置

`lib/modelLoader.ts`

### 核心配置

```typescript
/** 触发缓存清理的内存阈值（MB） */
const MEMORY_THRESHOLD_MB = 500;
```

### 工作原理

1. **内存检测**：使用浏览器 `performance.memory` API
2. **动态调整**：当内存使用超过阈值时，激进地减少缓存
3. **降级策略**：高内存时将缓存限制降至 `MAX_CACHE_SIZE / 2`

### 关键函数

```typescript
// 获取当前内存使用（MB）
export function getMemoryUsage(): number | null;

// 执行内存限制检查
function enforceMemoryLimit(thresholdMB: number = MEMORY_THRESHOLD_MB): void;
```

### 浏览器兼容性

- ✅ Chrome/Edge: 完整支持
- ⚠️ Firefox/Safari: API不可用，降级为仅使用LRU策略

### 开发环境监控

在开发环境中，每次切换模型时会在控制台输出：

```
[Model Cache] Size: 3, Memory: 245.67 MB
```

---

## 3. 预加载策略优化

### 实现位置

- `lib/modelLoader.ts` - 预加载逻辑
- `app/project/[slug]/ProjectClient.tsx` - 调用点

### 优化前

```typescript
// 加载所有项目的所有模型
initializePreload(firstEntity.id);
```

### 优化后

```typescript
// 只加载当前项目的模型
initializePreload(firstEntity.id, project.slug);
```

### 工作原理

1. **项目过滤**：根据 `projectSlug` 只获取当前项目的模型
2. **动态导入**：使用动态import避免循环依赖
3. **向后兼容**：不提供projectSlug时保持原有行为

### 效果

- ✅ 减少不必要的模型预加载
- ✅ 降低初始内存占用
- ✅ 加快页面加载速度
- ✅ 跨项目切换时不会互相影响

---

## 性能对比

### 优化前

- 缓存数量：无限制（可能达到10+个模型）
- 内存使用：可能超过1GB
- 预加载：所有项目的所有模型（20+个）

### 优化后

- 缓存数量：最多5个模型（可配置）
- 内存使用：控制在500MB以内
- 预加载：仅当前项目的模型（通常5-10个）

---

## 调优建议

### 调整缓存大小

根据目标设备的内存情况，可以调整 `MAX_CACHE_SIZE`：

```typescript
// 低内存设备（如移动设备）
const MAX_CACHE_SIZE = 3;

// 高内存设备（如桌面端）
const MAX_CACHE_SIZE = 8;
```

### 调整内存阈值

根据应用的整体内存预算调整：

```typescript
// 保守策略
const MEMORY_THRESHOLD_MB = 300;

// 激进策略
const MEMORY_THRESHOLD_MB = 800;
```

### 手动清理缓存

如果需要手动清理缓存：

```typescript
import { clearModelCache, evictModelFromCache } from "@/lib/modelLoader";

// 清理所有缓存
clearModelCache();

// 保留当前模型，清理其他
clearModelCache([currentModelUrl]);

// 清理特定模型
evictModelFromCache(modelUrl);
```

---

## 监控和调试

### 开发环境

在浏览器控制台查看缓存和内存信息：

```javascript
// 手动查看
import { getCacheSize, getMemoryUsage } from "@/lib/modelLoader";
console.log("Cache:", getCacheSize());
console.log("Memory:", getMemoryUsage());
```

### 生产环境

可以添加性能监控服务：

```typescript
const memoryUsage = getMemoryUsage();
if (memoryUsage) {
  // 发送到监控服务
  analytics.track("memory_usage", { mb: memoryUsage });
}
```

---

## 注意事项

1. **首次加载**：优化后可能需要重新加载之前缓存的模型，但速度仍然很快（浏览器HTTP缓存）
2. **内存API限制**：`performance.memory` 仅在部分浏览器可用，代码已做好降级处理
3. **缓存策略**：当前策略适合大多数场景，如有特殊需求可自定义调整

---

## 未来优化方向

1. **自适应缓存**：根据设备类型自动调整缓存策略
2. **模型压缩**：进一步压缩GLB模型文件大小
3. **渐进式加载**：优先加载模型的可见部分
4. **Web Workers**：将模型解析移到后台线程
5. **IndexedDB缓存**：使用浏览器存储持久化模型缓存

---

## 相关文件

- `lib/modelLoader.ts` - 核心加载和缓存逻辑
- `components/EntityViewer.tsx` - 模型查看器组件
- `components/ModelScene.tsx` - 场景渲染组件
- `hooks/useModel.ts` - 模型加载Hook
- `app/project/[slug]/ProjectClient.tsx` - 项目客户端组件
