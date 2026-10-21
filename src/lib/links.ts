// Devuelve una URL externa válida o null.
// Repara errores comunes al pegar links: formato markdown "[texto](url)",
// "https:/" con una sola barra, o falta de protocolo.
export function safeExternalUrl(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let value = raw.trim();

  const markdown = value.match(/\]\(([^)\s]+)\)/);
  if (markdown) value = markdown[1];
  value = value.replace(/^\[|\]$/g, "");

  value = value.replace(/^(https?):\/(?!\/)/i, "$1://");
  if (/^www\./i.test(value)) value = `https://${value}`;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export function isExternalHref(href: string | undefined): boolean {
  return !!href && /^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?tatakoa\.co/i.test(href);
}
