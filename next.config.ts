import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true, // Structures export with folder-based index.html for cPanel compatibility
  images: {
    unoptimized: true, // Set to true for cPanel static export; comment out if deploying to Vercel/Node server for dynamic on-the-fly resizing
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wp.newstrendey.com",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "newstrendey.com",
      },
      {
        protocol: "https",
        hostname: "images.cars.com",
      },
    ],
  },
};

export default nextConfig;
