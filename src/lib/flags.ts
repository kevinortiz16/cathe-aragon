// Bandera del flujo nuevo de suscripción: plantilla gratis por correo, listas
// "Avísame", newsletter y "Entrar con tu correo". APAGADA por defecto: solo se
// enciende con NEXT_PUBLIC_SUBSCRIBE_ENABLED="true" (exactamente).
//
// Es NEXT_PUBLIC_ porque la leen componentes de cliente: el valor queda fijo en
// la compilación. Para cambiarlo en Vercel hay que volver a desplegar.
//
// Apagada: se ocultan los formularios y POST /api/subscribe y
// POST /api/auth/enlace responden 503. Las páginas que solo se abren con un
// token o una sesión válidos (/descargar, /api/descargar, /baja,
// /auth/confirmar, /cuenta/descargas) siguen funcionando.
//
// Sin imports a propósito: lo usan componentes de servidor y de cliente.
export const SUBSCRIBE_ENABLED = process.env.NEXT_PUBLIC_SUBSCRIBE_ENABLED === "true";

export const SUBSCRIBE_DISABLED_MESSAGE = "Esta función todavía no está disponible.";
