import type { NextConfig } from "next";

/**
 * Cloudflare Pages deployment configuration.
 *
 * Uses static export for optimal compatibility with Cloudflare Pages.
 * Images are unoptimized as Cloudflare doesn't support Next.js Image Optimization.
 */
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
