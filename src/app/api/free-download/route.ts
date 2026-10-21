import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { normalizeEmail } from "@/lib/validation/email";
import { saveSubscriber } from "@/lib/subscribers";

// Descarga de productos gratis (precio 0) a cambio del email.
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  if (body.website) {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const email = normalizeEmail(body.email);
  if (!email) {
    return NextResponse.json({ error: "Escribe un email válido" }, { status: 400 });
  }
  if (typeof body.productId !== "string") {
    return NextResponse.json({ error: "Producto inválido" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: product, error: productError } = await admin
    .from("products")
    .select("id, slug, price_cents, file_path, active, product_type")
    .eq("id", body.productId)
    .maybeSingle();

  // Motivo exacto en los logs de Vercel (al cliente solo "no disponible").
  const reason = productError
    ? `error de Supabase: ${productError.message}`
    : !product
      ? "no existe un producto con ese id"
      : !product.active
        ? "producto inactivo"
        : product.product_type !== "digital"
          ? `product_type es "${product.product_type}", no "digital"`
          : product.price_cents !== 0
            ? `price_cents es ${product.price_cents}, no 0`
            : !product.file_path
              ? "file_path vacío"
              : null;

  if (reason || !product) {
    console.error(`[free-download] ${body.productId}: ${reason}`);
    return NextResponse.json({ error: "Producto no disponible" }, { status: 404 });
  }

  await saveSubscriber(email, `gratis:${product.slug}`);

  const { data: signed, error } = await admin.storage
    .from("products")
    .createSignedUrl(product.file_path, 600, { download: true });

  if (error || !signed) {
    console.error(`[free-download] link firmado para "${product.file_path}":`, error?.message);
    return NextResponse.json({ error: "Error al generar el link" }, { status: 500 });
  }

  return NextResponse.json({ url: signed.signedUrl });
}
