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
