import ReactMarkdown from "react-markdown";
import { isExternalHref, safeExternalUrl } from "@/lib/links";

// Markdown con links externos seguros: abren en otra pestaña y se reparan
// URLs mal pegadas (para que no terminen como rutas internas rotas).
export function Markdown({ children }: { children: string | null | undefined }) {
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
      }}
    >
      {children ?? ""}
    </ReactMarkdown>
  );
}
