# Puesta en marcha de las mejoras (rama `mejoras-sitio`)

Pasos para dejar funcionando lo nuevo. Hacerlos en este orden.

## 1. En tu Mac
```bash
npm install          # instala Next.js 16.4.2 y las dependencias actualizadas
npm run dev          # revisar en http://localhost:3000
```

## 2. Supabase → SQL Editor
Correr `supabase/migrations/20261021_mejoras.sql` **por partes**, leyendo cada SELECT antes del UPDATE:
crea la tabla `subscribers`, agrega columnas al producto, normaliza ciudades, repara links,
crea el índice único de órdenes y muestra el estado de RLS.

## 3. Supabase → Authentication
- **URL Configuration**: Site URL `https://tatakoa.co`; en Redirect URLs agregar
  `https://tatakoa.co/auth/callback**` y `http://localhost:3000/auth/callback**`.
- **Providers → Email**: activado (para el login con link/código).
- **Email Templates → Magic Link**: agregar el código para quien abra el email en otro navegador:
  `Tu código de acceso: {{ .Token }}`

## 4. Vercel → Settings → Environment Variables
- `NEXT_PUBLIC_SITE_URL` = `https://tatakoa.co`

## 5. Stripe → Developers → Webhooks
El endpoint `https://tatakoa.co/api/webhooks/stripe` debe escuchar:
- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`

Y en Settings → Customer emails, activar **Successful payments** (recibo por email).

## 6. Google Analytics → Admin → Events
Marcar como *key events*: `purchase`, `generate_lead`, `begin_checkout`
(aparecen en la lista después de que ocurran por primera vez).

## 7. Datos que faltan decidir
- `src/lib/site.ts`: `LEGAL_OWNER` (TATAKOA LLC / Ureflect LLC) y `CONTACT_EMAIL` (correo de la marca).
- La política de reembolsos en Términos (sección 19) es un borrador: revisarla con un abogado.

## Crear una plantilla en la tienda
Tabla `products`: `product_type = 'digital'`, `active = true`, `price_cents` (0 = gratis a cambio del email),
`file_path` = ruta del archivo en el bucket privado `products`, `cover_image`, `description`,
`long_description` (markdown) y `preview_images` (lista de URLs).
