import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader.js";
import { ThreeMFLoader } from "three/examples/jsm/loaders/3MFLoader.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter.js";
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter.js";
import { PLYExporter } from "three/examples/jsm/exporters/PLYExporter.js";

import { DxfParser } from "dxf-parser";
import type { SupportedFormat } from "./types";

export class ModelConverter {
  private loaders: {
    gltf: GLTFLoader;
    stl: STLLoader;
    obj: OBJLoader;
    ply: PLYLoader;
    threeMF: ThreeMFLoader;
    fbx: FBXLoader;
  };

  constructor() {
    this.loaders = {
      gltf: new GLTFLoader(),
      stl: new STLLoader(),
      obj: new OBJLoader(),
      ply: new PLYLoader(),
      threeMF: new ThreeMFLoader(),
      fbx: new FBXLoader(),
    };
  }

  /**
   * 加载模型文件到Three.js场景
   */
  async loadModel(file: File): Promise<THREE.Scene> {
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!extension) {
      throw new Error("无法识别文件格式");
    }

    const arrayBuffer = await file.arrayBuffer();
    const scene = new THREE.Scene();

    switch (extension) {
      case "glb":
      case "gltf":
        await this.loadGLTF(arrayBuffer, file.name, scene);
        break;

      case "stl":
        return this.loadSTL(arrayBuffer, scene);

      case "obj":
        return this.loadOBJ(arrayBuffer, scene);

      case "ply":
        return this.loadPLY(arrayBuffer, scene);

      case "3mf":
        return this.load3MF(arrayBuffer, scene);

      case "dxf":
        return this.loadDXF(arrayBuffer, scene);

      case "fbx":
        return this.loadFBX(arrayBuffer, scene);

      default:
        throw new Error(`不支持的文件格式: .${extension}`);
    }

    return scene;
  }

  /**
   * 导出场景到目标格式
   */
  async exportScene(
    scene: THREE.Scene,
    targetFormat: SupportedFormat,
  ): Promise<Blob> {
    switch (targetFormat) {
      case "glb":
        return this.exportGLB(scene);

      case "gltf":
        return this.exportGLTF(scene);

      case "stl":
        return this.exportSTL(scene);

      case "obj":
        return this.exportOBJ(scene);

      case "ply":
        return this.exportPLY(scene);

      case "usdz":
        // USDZ 转换较为复杂，暂时导出为 GLB
        // 后续可以集成 @google/model-viewer 的 usd_from_gltf WASM 模块
        console.warn("USDZ 格式尚未完全支持，将导出为 GLB 格式");
        return this.exportGLB(scene);

      case "fbx":
        // three.js 没有内置的 FBXExporter
        // 暂时导出为 GLB，并提示用户
        console.warn("FBX 导出格式暂不支持，将导出为 GLB 格式");
        return this.exportGLB(scene);

      case "3mf":
      case "dxf":
        throw new Error(`${targetFormat.toUpperCase()} 格式暂不支持导出`);

      default:
        throw new Error(`不支持的导出格式: ${targetFormat}`);
    }
  }

  /**
   * 转换文件
   */
  async convert(
    file: File,
    targetFormat: SupportedFormat,
  ): Promise<{ blob: Blob; fileName: string }> {
    const scene = await this.loadModel(file);
    const blob = await this.exportScene(scene, targetFormat);

    // 清理场景资源
    scene.traverse((object) => {
      if ((object as THREE.Mesh).geometry) {
        (object as THREE.Mesh).geometry.dispose();
      }
      if ((object as THREE.Mesh).material) {
        const material = (object as THREE.Mesh).material as THREE.Material;
        if (Array.isArray(material)) {
          material.forEach((m) => m.dispose());
        } else {
          material.dispose();
        }
      }
    });

    const baseName = file.name.replace(/\.[^/.]+$/, "");
    const extension = targetFormat === "gltf" ? ".gltf" : `.${targetFormat}`;
    const fileName = `${baseName}_converted${extension}`;

    return { blob, fileName };
  }

  // ========== 加载器实现 ==========

  private async loadGLTF(
    arrayBuffer: ArrayBuffer,
    fileName: string,
    scene: THREE.Scene,
  ): Promise<void> {
    const blob = new Blob([arrayBuffer]);
    const url = URL.createObjectURL(blob);

    try {
      const isBinary = fileName.toLowerCase().endsWith(".glb");
      const gltf = await this.loaders.gltf.loadAsync(url);
      scene.add(gltf.scene);
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  private async loadSTL(
    arrayBuffer: ArrayBuffer,
    scene: THREE.Scene,
  ): Promise<THREE.Scene> {
    const geometry = this.loaders.stl.parse(arrayBuffer);
    const material = new THREE.MeshStandardMaterial({
      color: 0x888888,
      metalness: 0.3,
      roughness: 0.4,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    return scene;
  }

  private async loadOBJ(
    arrayBuffer: ArrayBuffer,
    scene: THREE.Scene,
  ): Promise<THREE.Scene> {
    const text = new TextDecoder().decode(arrayBuffer);
    const obj = this.loaders.obj.parse(text);
    scene.add(obj);
    return scene;
  }

  private async loadPLY(
    arrayBuffer: ArrayBuffer,
    scene: THREE.Scene,
  ): Promise<THREE.Scene> {
    const geometry = this.loaders.ply.parse(arrayBuffer);
    const material = new THREE.MeshStandardMaterial({
      color: 0x888888,
      metalness: 0.3,
      roughness: 0.4,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    return scene;
  }

  private async load3MF(
    arrayBuffer: ArrayBuffer,
    scene: THREE.Scene,
  ): Promise<THREE.Scene> {
    const group = this.loaders.threeMF.parse(arrayBuffer);
    scene.add(group);
    return scene;
  }

  private async loadDXF(
    arrayBuffer: ArrayBuffer,
    scene: THREE.Scene,
  ): Promise<THREE.Scene> {
    const text = new TextDecoder().decode(arrayBuffer);
    const parser = new DxfParser();
    const dxfData = parser.parseSync(text);
    const material = new THREE.LineBasicMaterial({ color: 0x000000 });

    // 遍历 DXF entities 并创建 Three.js 对象
    if (dxfData?.entities) {
      dxfData.entities.forEach((entity: any) => {
        switch (entity.type) {
          case "LINE":
            if (entity.vertices && entity.vertices.length >= 2) {
              const geometry = new THREE.BufferGeometry();
              const points = entity.vertices
                .map((v: any) =>
                  v.x !== undefined
                    ? new THREE.Vector3(v.x, v.y || 0, v.z || 0)
                    : null,
                )
                .filter(Boolean);
              geometry.setFromPoints(points);
              const line = new THREE.Line(geometry, material);
              scene.add(line);
            }
            break;

          case "POLYLINE":
          case "LWPOLYLINE":
            if (entity.vertices && entity.vertices.length > 0) {
              const geometry = new THREE.BufferGeometry();
              const points = entity.vertices
                .map((v: any) =>
                  v.x !== undefined
                    ? new THREE.Vector3(v.x, v.y || 0, v.z || 0)
                    : null,
                )
                .filter(Boolean);
              geometry.setFromPoints(points);
              const line = new THREE.Line(geometry, material);
              scene.add(line);
            }
            break;

          case "CIRCLE":
            if (entity.center) {
              const radius = entity.radius || 1;
              const geometry = new THREE.CircleGeometry(radius, 32);
              const meshMaterial = new THREE.MeshBasicMaterial({
                color: 0x000000,
                side: THREE.DoubleSide,
              });
              const circle = new THREE.Mesh(geometry, meshMaterial);
              circle.position.set(
                entity.center.x,
                entity.center.y || 0,
                entity.center.z || 0,
              );
              scene.add(circle);
            }
            break;

          case "ARC":
            if (entity.center) {
              const radius = entity.radius || 1;
              const startAngle = (entity.startAngle || 0) * (Math.PI / 180);
              const endAngle = (entity.endAngle || 360) * (Math.PI / 180);
              const geometry = new THREE.RingGeometry(
                radius - 0.01,
                radius + 0.01,
                32,
                1,
                startAngle,
                endAngle - startAngle,
              );
              const meshMaterial = new THREE.MeshBasicMaterial({
                color: 0x000000,
                side: THREE.DoubleSide,
              });
              const arc = new THREE.Mesh(geometry, meshMaterial);
              arc.position.set(
                entity.center.x,
                entity.center.y || 0,
                entity.center.z || 0,
              );
              scene.add(arc);
            }
            break;

          case "POINT":
            if (entity.position) {
              const geometry = new THREE.SphereGeometry(0.1, 8, 8);
              const meshMaterial = new THREE.MeshBasicMaterial({
                color: 0x000000,
              });
              const point = new THREE.Mesh(geometry, meshMaterial);
              point.position.set(
                entity.position.x,
                entity.position.y || 0,
                entity.position.z || 0,
              );
              scene.add(point);
            }
            break;

          // 可以添加更多 entity 类型的支持
          default:
            console.warn(`未处理的 DXF entity 类型: ${entity.type}`);
        }
      });
    }

    return scene;
  }

  private async loadFBX(
    arrayBuffer: ArrayBuffer,
    scene: THREE.Scene,
  ): Promise<THREE.Scene> {
    const blob = new Blob([arrayBuffer]);
    const url = URL.createObjectURL(blob);

    try {
      const fbx = await this.loaders.fbx.loadAsync(url);
      scene.add(fbx);
      return scene;
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  // ========== 导出器实现 ==========

  private async exportGLB(scene: THREE.Scene): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const exporter = new GLTFExporter();
      exporter.parse(
        scene,
        (result: any) => {
          const blob = new Blob([result], { type: "application/octet-stream" });
          resolve(blob);
        },
        (error) => reject(error),
        { binary: true },
      );
    });
  }

  private async exportGLTF(scene: THREE.Scene): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const exporter = new GLTFExporter();
      exporter.parse(
        scene,
        (result: any) => {
          const jsonStr = JSON.stringify(result, null, 2);
          const blob = new Blob([jsonStr], { type: "application/json" });
          resolve(blob);
        },
        (error) => reject(error),
        { binary: false },
      );
    });
  }

  private async exportSTL(scene: THREE.Scene): Promise<Blob> {
    const exporter = new STLExporter();
    const result = exporter.parse(scene, { binary: true });
    return new Blob([result], { type: "application/octet-stream" });
  }

  private async exportOBJ(scene: THREE.Scene): Promise<Blob> {
    const exporter = new OBJExporter();
    const result = exporter.parse(scene);
    return new Blob([result], { type: "text/plain" });
  }

  private async exportPLY(scene: THREE.Scene): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const exporter = new PLYExporter();
      exporter.parse(
        scene,
        (result: string | ArrayBuffer) => {
          const blob = new Blob([result], { type: "application/octet-stream" });
          resolve(blob);
        },
        { binary: true },
      );
    });
  }
}
