import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { SITE_URL } from "@/lib/site";

export async function POST(request: Request) {
  const { productId } = await request.json().catch(() => ({}));
  if (typeof productId !== "string" || !productId) {
    return NextResponse.json({ error: "Producto inválido" }, { status: 400 });
  }

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Debes iniciar sesión" }, { status: 401 });
  }

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .eq("active", true)
    .single();

  if (!product) {
    return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
  }

  if (!product.price_cents || product.price_cents <= 0) {
    return NextResponse.json(
      { error: "Este producto es gratis: descárgalo con tu email." },
      { status: 400 }
    );
  }

  // Si ya lo compró, lo mandamos a sus compras en vez de cobrarle de nuevo.
  const { data: owned } = await supabase
    .from("orders")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", product.id)
    .eq("status", "completed")
    .limit(1)
    .maybeSingle();

  if (owned) {
    return NextResponse.json({ url: "/cuenta/compras" });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: product.currency,
          product_data: { name: product.name },
          unit_amount: product.price_cents,
        },
        quantity: 1,
      },
    ],
    customer_email: user.email ?? undefined,
    client_reference_id: user.id,
    allow_promotion_codes: true,
    success_url: `${SITE_URL}/gracias?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_URL}/tienda/${product.slug}?canceled=true`,
    metadata: {
      product_id: product.id,
      user_id: user.id,
    },
  });

  const admin = createAdminClient();
  const { error: insertError } = await admin.from("orders").insert({
    user_id: user.id,
    product_id: product.id,
    stripe_session_id: session.id,
    status: "pending",
    amount_cents: product.price_cents,
  });

  // No es fatal: el webhook y /gracias crean la orden si no existe.
  if (insertError) {
    console.error("Error creating pending order:", insertError);
  }

  return NextResponse.json({ url: session.url });
}
