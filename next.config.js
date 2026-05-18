/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React 19 support
  reactStrictMode: true,

  // Enable static export (for GitHub Pages deployment)
  output: "export",

  // Configure static asset path
  assetPrefix: process.env.NEXT_PUBLIC_BASE_URL || "",

  // Configure Turbopack (default in Next.js 16)
  turbopack: {},

  // Optimize webpack config for Three.js modules
  webpack: (config) => {
    // Handle 3D model files like .glb
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

export default nextConfig;
