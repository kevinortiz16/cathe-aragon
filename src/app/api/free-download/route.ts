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
  const { data: product } = await admin
    .from("products")
    .select("id, slug, price_cents, file_path, active, product_type")
    .eq("id", body.productId)
    .single();

  if (
    !product ||
    !product.active ||
    product.product_type !== "digital" ||
    product.price_cents !== 0 ||
    !product.file_path
  ) {
    return NextResponse.json({ error: "Producto no disponible" }, { status: 404 });
  }

  await saveSubscriber(email, `gratis:${product.slug}`);

  const { data: signed, error } = await admin.storage
    .from("products")
    .createSignedUrl(product.file_path, 600, { download: true });

  if (error || !signed) {
    console.error("Error creating signed URL:", error);
    return NextResponse.json({ error: "Error al generar el link" }, { status: 500 });
  }

  return NextResponse.json({ url: signed.signedUrl });
}
