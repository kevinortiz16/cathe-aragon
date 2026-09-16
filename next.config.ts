import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/sobre-mi',
        destination: '/sobre-tatakoa',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
