import type Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";

// Marca como completada la orden de una sesión de Stripe pagada.
// Se llama desde el webhook y desde /gracias: si la orden "pending" no existe
// (porque falló su creación), la crea con los datos de la metadata.
// Es idempotente: llamarla dos veces no duplica órdenes.
export async function fulfillCheckoutSession(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") {
    return { ok: false as const, reason: "not_paid" };
  }

  const productId = session.metadata?.product_id;
  const userId = session.metadata?.user_id;
  if (!productId || !userId) {
    console.error("Checkout session without metadata:", session.id);
    return { ok: false as const, reason: "missing_metadata" };
  }

  const admin = createAdminClient();

  const { data: existing, error: selectError } = await admin
    .from("orders")
    .select("id, status")
    .eq("stripe_session_id", session.id)
    .maybeSingle();

  if (selectError) {
    console.error("Error reading order:", selectError);
    return { ok: false as const, reason: "db_error" };
  }

  if (existing) {
    if (existing.status !== "completed") {
      const { error } = await admin
        .from("orders")
        .update({ status: "completed" })
        .eq("id", existing.id);
      if (error) {
        console.error("Error completing order:", error);
        return { ok: false as const, reason: "db_error" };
      }
    }
    return { ok: true as const, productId, userId };
  }

  const { error: insertError } = await admin.from("orders").insert({
    user_id: userId,
    product_id: productId,
    stripe_session_id: session.id,
    status: "completed",
    amount_cents: session.amount_total ?? 0,
  });

  if (insertError) {
    console.error("Error inserting completed order:", insertError);
    return { ok: false as const, reason: "db_error" };
  }

  return { ok: true as const, productId, userId };
}
