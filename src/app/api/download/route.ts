import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const { productId } = await request.json();
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Debes iniciar sesión" }, { status: 401 });
  }

  const { data: order } = await supabase
    .from("orders")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .eq("status", "completed")
    .limit(1)
    .single();

  if (!order) {
    return NextResponse.json(
      { error: "No tienes acceso a este producto" },
      { status: 403 }
    );
  }

  const { data: product } = await supabase
    .from("products")
    .select("file_path")
    .eq("id", productId)
    .single();

  if (!product?.file_path) {
    return NextResponse.json({ error: "Archivo no disponible" }, { status: 404 });
  }

  const admin = createAdminClient();
  const { data: signedUrl, error } = await admin.storage
    .from("products")
    .createSignedUrl(product.file_path, 300);

  if (error || !signedUrl) {
    console.error("Error creating signed URL:", error);
    return NextResponse.json({ error: "Error al generar el link" }, { status: 500 });
  }

  return NextResponse.json({ url: signedUrl.signedUrl });
}