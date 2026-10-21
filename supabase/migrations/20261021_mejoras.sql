-- =====================================================================
-- TATAKOA · Mejoras del sitio (21 oct 2026)
-- Correr en Supabase → SQL Editor, POR PARTES y en orden.
-- Cada parte tiene primero un SELECT para revisar qué va a cambiar.
-- Nada de esto borra datos.
-- =====================================================================


-- ---------------------------------------------------------------------
-- PARTE 1 · Lista de emails (necesaria para los formularios nuevos)
-- ---------------------------------------------------------------------
create table if not exists public.subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  source      text,                 -- de dónde vino: planes, inicio, gratis:<slug>…
  created_at  timestamptz not null default now()
);

-- Solo el servidor (service role) escribe y lee. Nadie más.
alter table public.subscribers enable row level security;


-- ---------------------------------------------------------------------
-- PARTE 2 · Columnas nuevas para la página de producto (opcionales)
-- ---------------------------------------------------------------------
alter table public.products add column if not exists long_description text;   -- markdown: qué incluye, para quién, FAQ
alter table public.products add column if not exists preview_images  text[];  -- URLs de imágenes de muestra


-- ---------------------------------------------------------------------
-- PARTE 3 · Normalizar ciudades de los planes
-- ---------------------------------------------------------------------
-- 3a) Revisar los valores actuales:
select city, count(*) from public.plans group by city order by 2 desc;

-- 3b) Corregir (DC, Maryland y Virginia van en washington-dc):
update public.plans set city = 'washington-dc'
where lower(city) in ('washington d.c', 'washington d.c.', 'washington dc', 'washington_dc',
                      'washington', 'dc', 'dmv', 'manassas, va');

update public.plans set city = 'new-york'
where lower(city) in ('new york', 'new_york', 'nyc', 'ny', 'new york city');

update public.plans set city = 'miami'
where lower(city) in ('miami, fl', 'miami fl');

-- 3c) Comprobar que solo quedan las tres ciudades oficiales:
select city, count(*) from public.plans group by city order by 2 desc;


-- ---------------------------------------------------------------------
-- PARTE 4 · Reparar links externos de los planes
-- ---------------------------------------------------------------------
-- 4a) Ver los links con problemas (formato [texto](url) o "https:/" con una barra):
select id, title, affiliate_link from public.plans
where affiliate_link like '[%](%)' or affiliate_link ~* '^https?:/[^/]';

-- 4b) Dejar solo la URL cuando está en formato markdown:
update public.plans
set affiliate_link = substring(affiliate_link from '\]\(([^)\s]+)\)')
where affiliate_link like '[%](%)';

-- 4c) Corregir "https:/" → "https://":
update public.plans
set affiliate_link = regexp_replace(affiliate_link, '^(https?):/([^/])', '\1://\2', 'i')
where affiliate_link ~* '^https?:/[^/]';


-- ---------------------------------------------------------------------
-- PARTE 5 · Evitar órdenes duplicadas por sesión de Stripe
-- ---------------------------------------------------------------------
-- 5a) Debe devolver 0 filas antes de crear el índice:
select stripe_session_id, count(*) from public.orders
group by stripe_session_id having count(*) > 1;

-- 5b) Si 5a devolvió 0 filas:
create unique index if not exists orders_stripe_session_id_key
  on public.orders (stripe_session_id);


-- ---------------------------------------------------------------------
-- PARTE 6 · Revisar la seguridad (RLS). Solo lectura.
-- ---------------------------------------------------------------------
-- rowsecurity debe ser TRUE en orders, products, plans, posts y subscribers:
select tablename, rowsecurity from pg_tables
where schemaname = 'public' order by tablename;

-- Políticas actuales. Lo esperado:
--   orders:   SELECT solo donde auth.uid() = user_id (nadie ve compras ajenas)
--   products, plans, posts: SELECT público solo de filas activas/publicadas
--   ninguna tabla con INSERT/UPDATE/DELETE para "anon" o "authenticated"
select tablename, policyname, cmd, roles, qual
from pg_policies where schemaname = 'public' order by tablename;
