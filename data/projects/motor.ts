import { asset } from "@/lib/utils";
import type { Entity3D, Project } from "@/data/types";

const ENTITIES: Entity3D[] = [
  {
    id: "zx-820rr-rs",
    name: "Zhang Xue 820RR-RS",
    subtitle: "In-line Four Cylinder · High-Performance Race Replica",
    mainCategory: "Motorcycles",
    subCategory: "Racing Sport",
    accent: "#e74c3c", // 采用充满竞技激情的赛车红作为主题高亮色
    description:
      "The Zhang Xue 820RR-RS is a cutting-edge, high-performance racing motorcycle driven by a high-revving in-line four-cylinder engine. Engineered for track dominance and aerodynamic efficiency, it features a lightweight chassis, aggressive race-replica ergonomics, and advanced downforce winglets, delivering a raw and visceral mechanical experience.",
    attributes: [
      { name: "Engine Displacement", unit: "cc", value: 820 },
      {
        name: "Engine Type",
        value: "In-line 4-cylinder, liquid-cooled, DOHC 16-valve",
      },
      { name: "Max Power Output", unit: "hp", value: 120 }, // 示例性能数据
      { name: "Curb Weight", unit: "kg", value: 168 }, // 突出极限轻量化特点
      { name: "Top Speed", unit: "km/h", value: 260 },
      {
        name: "Awards",
        value: [
          "International Motorcycle Engineering Innovation Award 2026",
          "National Track Racing Championship - Best Concept Chassis Design",
        ],
      },
      {
        name: "Chassis & Suspension",
        value: {
          "Frame Type": "Lightweight steel trellis & aluminum composite frame",
          "Front Fork": "Fully adjustable inverted USD telescopic fork",
          "Rear Shock": "Link-type Monoshock with piggyback reservoir",
        },
      },
      {
        name: "Braking System",
        value: {
          "Front Brake":
            "Dual semi-floating discs with radial-mount 4-piston calipers",
          "Rear Brake": "Single disc with opposed 2-piston caliper",
          "ABS System": "Dual-channel Cornering ABS with track mode",
        },
      },
      {
        name: "Aerodynamics & Electronics",
        value: {
          Winglets:
            "Integrated carbon-fiber winglets providing high-speed frontal downforce",
          Dashboard:
            "5-inch full-color TFT display with lap timer and telemetry integration",
          "Rider Aids":
            "Multi-level Traction Control (TC), Quickshifter (Up & Down), Launch Control",
        },
      },
    ],
    funFact:
      "Designed with extreme power-to-weight optimization in mind, every gram shaved off the chassis allows the 4-cylinder engine to scream past 14,000 RPM with unmatched agility.",
    teachingFocus:
      "Analyze the aerodynamic efficiency of high-speed sportbikes, explore the mechanical layout of compact in-line four engines, and understand how chassis geometry impacts track cornering dynamics.",
    tags: [
      "In-line Four",
      "Race Replica",
      "High-Revving",
      "Aerodynamic Winglets",
      "Lightweight Chassis",
    ],
    model3D: {
      modelUrl: "/models/zx-820rr-rs.glb",
      imageUrl: "/models/zx-820rr-rs.webp",
      fileSize: 2701280, // 摩托车模型由于机械零件复杂，文件体积通常较大
      defaultRotation: { x: 10, y: -45, z: 0 }, // 经典的3/4侧前向展示视角
      displayScale: 1.0,
    },
    generationPrompts: {
      // 3dPrompt 采用30度倾斜的纵向1/2对半剖切逻辑，一面是饱满整流罩，一面是全裸露发动机硬核机械
      full3DPrompt:
        "Full 3D digital asset of a high-performance racing motorcycle, stylized as a perfect 1/2 longitudinal mechanical cross-section, presented at a 30-degree tilted isometric perspective. The model is cleanly divided down the centerline: the left side showcases the complete glossy red aerodynamic race fairings, carbon-fiber winglets, and sharp geometric bodywork. The exact right side reveals a highly detailed internal engineering cutaway: exposing a metallic silver in-line four-cylinder engine with cooling fins, a gold exhaust header network, a black steel trellis frame, and intricate wiring. Complete volumetric 3D vehicle mesh, razor-sharp edge boundaries, solid pure white background, shadowless studio illumination, centered positioning, square aspect ratio --ar 1:1",

      // 前向视角专注于展示赛车正面气流整流罩与裸露剖面带来的工业视觉冲击力
      frontPrompt:
        "3D industrial rendering of a racing motorcycle cut exactly in half (1/2 mechanical cross-section view), viewed from an isometric front-three-quarter perspective tilted at a 30-degree angle. The flat centerline cut faces the camera, fully exposing the complex interior powerplant: an intricate in-line 4-cylinder engine block sliced open, showing pistons and gear shafts, alongside the radiator core and fuel injection systems. The remaining half presents the aggressive front fairing with a singular sleek LED headlight and a prominent aerodynamic winglet extending outward. High-fidelity cinematic CAD render, metallic and carbon textures, crisp ambient occlusion, solid pure white background, shadowless, centered, square aspect ratio --ar 1:1",

      // 后向视角专注于展示完整的后半部分车身（后单摇臂/双摇臂、宽幅热熔胎、排气管及后尾壳）
      backPrompt:
        "3D industrial rendering of a hemisphere-style racing motorcycle asset, intact posterior full view from the exact back, matching the 30-degree tilted orientation perfectly. Showing the continuous, unbroken opposite side of the motorcycle from behind. Features a fat rear slick racing tire, a beautifully sculpted aluminum rear swingarm, an aggressive upswept carbon-fiber exhaust muffler, and the sharp aerodynamic tail cowl with minimalist brake lights. Symmetrical half-vehicle silhouette that aligns seamlessly with the front cutaway mesh. Professional 3D object format, solid pure white background, uniform laboratory diffuse lighting, shadowless, centered, square aspect ratio --ar 1:1",
    },
  },
];
export const motorcycleProject: Project = {
  name: "Race Motorcycles",
  slug: "moto",
  icon: "🏍️",
  description:
    "Experience high-performance racing motorcycles and engineering aesthetics in interactive 3D",
  tabName: "Moto-Models",
  models: ENTITIES, // 对应你未来定义的摩托车模型数据集
};
