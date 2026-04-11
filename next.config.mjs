/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile Three.js related packages
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Optimize package imports
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-icons'],
  },

  // Webpack config for Three.js compatibility
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      three: 'three',
    };
    return config;
  },
};

export default nextConfig;
