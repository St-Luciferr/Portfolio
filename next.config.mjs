/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile Three.js related packages
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000, // 1 year cache for images
  },

  // Optimize package imports
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-icons', '@react-three/fiber', '@react-three/drei'],
  },

  // Production optimizations
  compress: true,
  poweredByHeader: false,

  // Modern JavaScript optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Headers for caching and performance
  async headers() {
    return [
      {
        source: '/models/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
