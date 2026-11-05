import ReactMarkdown from "react-markdown";
import { isExternalHref, safeExternalUrl } from "@/lib/links";
import { RemoteImage } from "@/components/ui/remote-image";

// Markdown con links externos seguros: abren en otra pestaña y se reparan
// URLs mal pegadas (para que no terminen como rutas internas rotas).
//
// Las imágenes dentro del texto pasan por <RemoteImage> (next/image): si están
// en el Storage público de Supabase se sirven redimensionadas, en WebP y desde
// la caché de Vercel, y cargan en diferido (lazy). Las de otros sitios caen a
// un <img loading="lazy"> normal.
//
// `imageSizes`: qué tan ancha se ve una imagen en el texto de esa página
// (depende del ancho de la columna), para que el navegador pida la copia justa.
export function Markdown({
  children,
  imageSizes = "(min-width: 768px) 736px, 100vw",
}: {
  children: string | null | undefined;
  imageSizes?: string;
}) {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, children: label }) => {
          const fixed = href && !href.startsWith("/") && !href.startsWith("#") ? safeExternalUrl(href) ?? href : href;
          const external = isExternalHref(fixed);
          return (
            <a
              href={fixed}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {label}
            </a>
          );
        },
        img: ({ src, alt }) => {
          if (typeof src !== "string" || !src) return null;
          // No conocemos las medidas reales: width/height (16:9) solo reservan
          // espacio mientras carga; con h-auto la imagen toma su proporción real.
          return (
            <RemoteImage
              src={src}
              alt={alt ?? ""}
              fill={false}
              sizes={imageSizes}
              className="w-full h-auto rounded-xl"
            />
          );
        },
      }}
    >
      {children ?? ""}
    </ReactMarkdown>
  );
}
