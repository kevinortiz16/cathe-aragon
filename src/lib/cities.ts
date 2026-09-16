// src/lib/cities.ts
export const CITY_LABELS: Record<string, string> = {
  "washington-dc": "Washington D.C.",
  "new-york": "New York",
  "miami": "Miami",
};

export function getCityLabel(slug: string): string {
  return CITY_LABELS[slug] ?? slug;
}
