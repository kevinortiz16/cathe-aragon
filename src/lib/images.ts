// Decide si una imagen externa puede pasar por el optimizador de Next.js.
//
// Solo optimizamos imágenes del Storage PÚBLICO de nuestro proyecto de Supabase.
// Debe coincidir con `images.remotePatterns` en next.config.ts: si una URL no
// está permitida ahí, <Image> fallaría, así que esas se muestran con <img>.
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

export const SUPABASE_PUBLIC_STORAGE_PATH = "/storage/v1/object/public/";

export function isOptimizableImage(src: string | null | undefined): src is string {
  if (!src || !SUPABASE_URL) return false;
  try {
    const url = new URL(src);
    const supabase = new URL(SUPABASE_URL);
    return (
      url.protocol === "https:" &&
      url.hostname === supabase.hostname &&
      url.pathname.startsWith(SUPABASE_PUBLIC_STORAGE_PATH)
    );
  } catch {
    return false;
  }
}

// `sizes` de las tarjetas en cuadrícula de 3 columnas (md+). Los contenedores
// miden como máximo 6xl/7xl, así que una tarjeta nunca pasa de ~400 px: sin
// ese tope, en una pantalla de 1920 px "33vw" pediría una copia de ~640 px.
// Grillas de 1 columna hasta md (blog, inicio, tienda, destinos):
export const CARD_SIZES = "(min-width: 1200px) 400px, (min-width: 768px) 33vw, 100vw";
// Grillas con 2 columnas desde sm (planes):
export const CARD_SIZES_SM2 =
  "(min-width: 1200px) 400px, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw";
