#!/usr/bin/env node
// Comprime las fotos pesadas de public/ (una sola vez).
//
// - Fotos PNG de >1 MB  → WebP de máx. 1600 px de ancho y < 300 KB.
// - Imagen OG           → public/og.jpg de 1200x630 y < 300 KB (JPG: lo
//                          aceptan todas las redes sociales).
// - Los originales se MUEVEN a _originales/<misma ruta> (está en .gitignore).
//
// Uso: node scripts/optimizar-imagenes-public.mjs
// Usa `sharp`, que ya viene instalado con Next.js.

import { mkdirSync, readdirSync, renameSync, statSync, existsSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC = join(ROOT, "public");
const BACKUP = join(ROOT, "_originales");
const MAX_WIDTH = 1600;
const MAX_BYTES = 300 * 1024;
const MIN_PNG_BYTES = 1024 * 1024;
const OG_SOURCE = "tatakoa-hero.png"; // relativo a public/

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]
  );
}

// Baja la calidad de 5 en 5 hasta quedar por debajo del límite.
async function encodeUnder(pipeline, format, startQuality = 82) {
  for (let q = startQuality; q >= 40; q -= 5) {
    const buf = await pipeline.clone()[format]({ quality: q, ...(format === "jpeg" ? { mozjpeg: true } : { effort: 6 }) }).toBuffer();
    if (buf.length <= MAX_BYTES) return { buf, q };
  }
  throw new Error(`No se pudo bajar de ${kb(MAX_BYTES)} en ${format}`);
}

function backup(src) {
  const dest = join(BACKUP, relative(PUBLIC, src));
  if (existsSync(dest)) throw new Error(`Ya existe ${relative(ROOT, dest)}; no lo sobrescribo`);
  mkdirSync(dirname(dest), { recursive: true });
  renameSync(src, dest);
  return dest;
}

const pngs = walk(PUBLIC).filter((f) => f.endsWith(".png") && statSync(f).size > MIN_PNG_BYTES);
if (pngs.length === 0) {
  console.log("No hay PNG pesados en public/. Nada que hacer.");
  process.exit(0);
}

for (const src of pngs) {
  const rel = relative(PUBLIC, src);
  const input = sharp(src).rotate(); // respeta la orientación EXIF

  // Imagen OG (antes de mover el original).
  if (rel === OG_SOURCE) {
    const og = input.clone().resize(1200, 630, { fit: "cover", position: "attention" });
    const { buf, q } = await encodeUnder(og, "jpeg");
    await sharp(buf).toFile(join(PUBLIC, "og.jpg"));
    console.log(`og.jpg  1200x630  ${kb(buf.length)}  (q${q})`);
  }

  const resized = input.clone().resize({ width: MAX_WIDTH, withoutEnlargement: true });
  const { buf, q } = await encodeUnder(resized, "webp");
  const out = src.replace(/\.png$/, ".webp");
  const before = statSync(src).size;
  backup(src);
  await sharp(buf).toFile(out);
  const { width, height } = await sharp(buf).metadata();
  console.log(`${relative(PUBLIC, out)}  ${width}x${height}  ${kb(before)} → ${kb(buf.length)}  (q${q})`);
}
