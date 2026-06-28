import type { NextConfig } from "next";
import { fileURLToPath } from "url";
import { dirname } from "path";

const nextConfig: NextConfig = {
  // Silence "multiple lockfiles" warning from the parent directory's package-lock.json
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
  // Portfolio images are now served from /public/portfolio/ (committed local
  // assets), so no remote image hosts are required. To re-enable remote images
  // later, add an `images.remotePatterns` entry here.
};

export default nextConfig;
