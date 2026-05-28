import { readFileSync } from "fs";
import * as THREE from "three";
import {
  GLTFLoader,
  type GLTF,
} from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const models = [
  { name: "luffy.glb", url: "/models/luffy.glb" },
  { name: "wooden.glb", url: "/models/wooden.glb" },
  { name: "break-news.glb", url: "/models/break-news.glb" },
];

async function analyzeModelSize(filePath: string, name: string) {
  try {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    dracoLoader.setDecoderConfig({ type: "wasm" });
    dracoLoader.preload();
    loader.setDRACOLoader(dracoLoader);

    const fileBuffer = readFileSync(filePath);
    const arrayBuffer = fileBuffer.buffer.slice(
      fileBuffer.byteOffset,
      fileBuffer.byteOffset + fileBuffer.byteLength,
    );

    const gltf = await new Promise<GLTF>((resolve, reject) => {
      loader.parse(
        arrayBuffer,
        "",
        (data) => resolve(data),
        (error) => reject(error),
      );
    });

    // Calculate bounding box
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);

    console.log(`\n${name}:`);
    console.log(
      `  原始尺寸: ${size.x.toFixed(2)} x ${size.y.toFixed(2)} x ${size.z.toFixed(2)}`,
    );
    console.log(`  最大维度: ${maxDim.toFixed(2)}`);
    console.log(`  归一化后缩放: ${(2.0 / maxDim).toFixed(4)}`);

    return maxDim;
  } catch (error) {
    console.error(`Error analyzing ${name}:`, error);
    return 0;
  }
}

async function main() {
  console.log("分析模型实际尺寸...\n");

  for (const model of models) {
    const filePath = `public/models/${model.name}`;
    await analyzeModelSize(filePath, model.name);
  }
}

main().catch(console.error);
