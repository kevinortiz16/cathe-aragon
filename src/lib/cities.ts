// src/lib/cities.ts
// Ciudades activas de /planes. El slug es la única forma válida en URLs.
export const CITY_LABELS: Record<string, string> = {
  "washington-dc": "Washington D.C.",
  "new-york": "New York",
  "miami": "Miami",
};

export const CITY_SLUGS = Object.keys(CITY_LABELS);

// Variantes que aparecen en la base de datos y a qué ciudad pertenecen.
// (El script SQL de limpieza las corrige; esto evita links rotos mientras tanto.)
const CITY_ALIASES: Record<string, string> = {
  "washington-d-c": "washington-dc",
  "washington-dc": "washington-dc",
  "washington": "washington-dc",
  "dc": "washington-dc",
  "dmv": "washington-dc",
  "manassas-va": "washington-dc",
  "new-york-city": "new-york",
  "nyc": "new-york",
  "ny": "new-york",
};

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Convierte cualquier variante ("Washington D.C", "washington_dc") al slug oficial.
export function normalizeCitySlug(raw: string | null | undefined): string {
  if (!raw) return "";
  const slug = slugify(decodeURIComponentSafe(raw));
  return CITY_ALIASES[slug] ?? slug;
}

export function isKnownCity(slug: string): boolean {
  return slug in CITY_LABELS;
}

export function getCityLabel(slug: string): string {
  return CITY_LABELS[normalizeCitySlug(slug)] ?? slug;
}

function decodeURIComponentSafe(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
