import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        protocol:"https",
        hostname:"s6.imgcdn.dev"
      }
    ]
  }
};

export default nextConfig;
