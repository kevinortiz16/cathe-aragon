import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/sobre-mi',
        destination: '/sobre-tatakoa',
        permanent: true,
      },
      // Portafolio (de cathearagon.com) ya no es parte de TATAKOA.
      {
        source: '/portafolio',
        destination: '/sobre-tatakoa',
        permanent: true,
      },
      {
        source: '/cuenta',
        destination: '/cuenta/compras',
        permanent: false,
      },
      {
        source: '/guias',
        destination: '/tienda/plantillas',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
