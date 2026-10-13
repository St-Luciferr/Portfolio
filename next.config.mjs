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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/api/portraits/**',
      },
    ],
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

  // Retired service URLs (offers consolidated 2026-10-13, docs/SITE_REVIEW_2026-10.md R1)
  async redirects() {
    return [
      {
        source: '/services/:slug(django-fastapi-backend|ai-chatbot|ml-deployment)',
        destination: '/services',
        permanent: true,
      },
      // Misspelled blog tag renamed 2026-10-13 (todo 12.20)
      {
        source: '/blog/tag/begineer',
        destination: '/blog/tag/beginner',
        permanent: true,
      },
    ];
  },

  // Headers for caching and performance
  async headers() {
    return [
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
