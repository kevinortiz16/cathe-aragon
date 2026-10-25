import type { NextConfig } from "next";

// Dominio del proyecto de Supabase (las fotos de planes, posts y productos viven
// en su Storage). Se toma de la variable de entorno para no repetirlo.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://ntdvhcxrtvkitimzuuxs.supabase.co";

const nextConfig: NextConfig = {
  images: {
    // Lista blanca: solo se optimizan imágenes del Storage PÚBLICO de nuestro
    // proyecto. Cualquier otra URL es rechazada (evita que terceros usen
    // nuestro optimizador para procesar sus imágenes a nuestra costa).
    remotePatterns: [new URL(`${supabaseUrl}/storage/v1/object/public/**`)],
    // Anchos que se generan. Menos variantes = menos trabajo y menos copias
    // en caché; estas cubren celulares (640–828), tablets y escritorio.
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [256, 384],
    // Calidad 75: buen equilibrio peso/nitidez para fotos (obligatorio en Next 16).
    qualities: [75],
    // Cuánto tiempo se reutiliza una copia optimizada antes de volver a pedirle
    // el original a Supabase: 7 días (un plan dura una semana). No hay forma de
    // invalidar la caché: si reemplazan una foto con el MISMO nombre de archivo,
    // la vieja puede verse hasta 7 días. Subir con nombre nuevo lo evita.
    minimumCacheTTL: 604800,
  },
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
