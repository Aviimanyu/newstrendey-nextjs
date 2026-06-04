import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true, // Structures export with folder-based index.html for cPanel compatibility
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
