import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.app.goo.gl'], // Allow this domain for external images
  },
};

export default nextConfig;
