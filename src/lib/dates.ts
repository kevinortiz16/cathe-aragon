// Fecha de "hoy" en la zona horaria del público (costa este de EE. UU.),
// en formato YYYY-MM-DD para comparar con columnas tipo date.
export const SITE_TIME_ZONE = "America/New_York";

export function todayInSiteZone(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: SITE_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}
