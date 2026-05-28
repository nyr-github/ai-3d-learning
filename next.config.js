/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React 19 support
  reactStrictMode: true,

  // Enable static export (for GitHub Pages deployment)
  output: "export",

  // Configure static asset path
  assetPrefix: process.env.NEXT_PUBLIC_BASE_URL || "",
  images: { unoptimized: true },
  // Configure Turbopack (default in Next.js 16)
  turbopack: {
    rules: {},
  },

  // Optimize webpack config for Three.js modules
  webpack: (config) => {
    // Handle 3D model files like .glb
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    // Ignore Node.js built-in modules for browser compatibility
    // This fixes draco3dgltf and other packages that try to use 'fs', 'path', etc.
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
      os: false,
      process: false,
    };

    // Draco3dgltf only has Node.js version, ignore it for browser builds
    // GLB Optimizer will use Meshopt compression instead
    config.resolve.alias = {
      ...config.resolve.alias,
      draco3dgltf: false,
    };

    return config;
  },
};

export default nextConfig;
