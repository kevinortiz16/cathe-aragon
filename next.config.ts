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
    // 48/96: logos, íconos y avatares chicos (24–36 px) no necesitan 256 px.
    imageSizes: [48, 96, 256, 384],
    // Calidad 75: buen equilibrio peso/nitidez para fotos (obligatorio en Next 16).
    qualities: [75],
    // AVIF primero (más liviano) y WebP para navegadores sin AVIF; si no acepta
    // ninguno, se sirve el formato original. Ojo: cada formato es otra copia en
    // caché y AVIF tarda más en generarse la primera vez.
    formats: ["image/avif", "image/webp"],
    // Cuánto tiempo se reutiliza una copia optimizada antes de volver a pedirle
    // el original a Supabase: 30 días. Las portadas son INMUTABLES: para cambiar
    // una, se sube con OTRO nombre de archivo. No hay forma de invalidar esta
    // caché, así que si se reemplaza una foto con el mismo nombre, la vieja
    // puede seguir viéndose hasta 30 días.
    minimumCacheTTL: 2592000,
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
