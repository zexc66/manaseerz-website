import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance: modern image formats (AVIF preferred)
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },

  // Performance: bundle external packages server-side
  bundlePagesRouterDependencies: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@radix-ui/react-accordion'],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
        ],
      },
    ];
  },

  // Compress responses
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
