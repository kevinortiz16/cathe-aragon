import Image from "next/image";
import { isOptimizableImage } from "@/lib/images";

// Imagen que viene de la base de datos (portadas de planes, posts, productos).
//
// - Si está en el Storage público de Supabase, usa <Image> de Next.js:
//   Vercel la descarga UNA vez, la redimensiona al ancho que necesita cada
//   pantalla, la convierte a WebP y la guarda en caché. Los visitantes reciben
//   esa copia; Supabase no vuelve a enviar el archivo original.
// - Si viene de otro sitio, cae a un <img> normal (no rompe nada).
//
// `fill`: la imagen llena su contenedor (que debe tener `position: relative`
// y un tamaño, p. ej. `aspect-video`). Sin `fill`, se usa width/height solo
// para reservar la proporción y la altura real la decide la imagen (h-auto).
// `sizes`: le dice al navegador qué tan ancha se verá la imagen, para que
// pida el archivo más pequeño que alcance (clave para ahorrar datos en celular).
type Props = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  preload?: boolean;
};

export function RemoteImage({
  src,
  alt,
  sizes,
  className,
  fill = true,
  width = 1200,
  height = 675,
  preload = false,
}: Props) {
  if (!isOptimizableImage(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading={preload ? "eager" : "lazy"}
        className={fill ? `absolute inset-0 w-full h-full ${className ?? ""}` : className}
      />
    );
  }

  return fill ? (
    <Image src={src} alt={alt} fill sizes={sizes} preload={preload} className={className} />
  ) : (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      preload={preload}
      className={className}
    />
  );
}
