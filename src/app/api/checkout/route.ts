import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const { productId } = await request.json();
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

  const origin = request.headers.get("origin");

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
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
    success_url: `${origin}/tienda/${product.slug}?success=true`,
    cancel_url: `${origin}/tienda/${product.slug}?canceled=true`,
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

  if (insertError) {
    console.error("Error creating order:", insertError);
  }

  return NextResponse.json({ url: session.url });
}