// Datos del sitio en un solo lugar.
// SITE_URL se usa para links absolutos (Stripe, emails, metadata).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://tatakoa.co"
).replace(/\/$/, "");

export const SITE_NAME = "TATAKOA";

// Titular legal que aparece en Términos, Privacidad y Cookies.
// Cambiar aquí cuando se decida la entidad (p. ej. "TATAKOA LLC").
export const LEGAL_OWNER = "TATAKOA";

// Correo de contacto público (legal, soporte de compras).
export const CONTACT_EMAIL = "infocathearagon@gmail.com";

// Devuelve una ruta interna segura para redirigir después del login.
// Solo acepta rutas que empiezan con "/" (no "//" ni URLs externas).
export function safeNextPath(next: string | null | undefined, fallback = "/"): string {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) {
    return fallback;
  }
  return next;
}
