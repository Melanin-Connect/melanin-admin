import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { 
    domains: ['images.app.goo.gl', 'th.bing.com', 'img.freepik.com'], // Allow this domain for external images
  },
};

export default nextConfig;
