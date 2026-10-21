import Link from "next/link";
import { getStripe } from "@/lib/stripe/server";
import { createClient } from "@/lib/supabase/server";
import { fulfillCheckoutSession } from "@/lib/orders/fulfill";
import { DownloadButton } from "@/components/tienda/download-button";
import { PurchaseEvent } from "@/components/analytics/purchase-event";

export const metadata = {
  title: "¡Gracias por tu compra! | TATAKOA",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ session_id?: string }>;
}

async function loadSession(sessionId: string) {
  try {
    return await getStripe().checkout.sessions.retrieve(sessionId);
  } catch {
    return null;
  }
}

export default async function GraciasPage({ searchParams }: PageProps) {
  const { session_id: sessionId } = await searchParams;
  const session = sessionId ? await loadSession(sessionId) : null;

  if (!session) {
    return (
      <Message
        title="No encontramos tu compra"
        text="Si acabas de pagar, revisa Mis compras en unos minutos o escríbenos desde Contacto."
      />
    );
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isOwner = !!user && session.metadata?.user_id === user.id;

  if (session.payment_status !== "paid") {
    return (
      <Message
        title="Tu pago está en proceso"
        text="Te avisaremos por email cuando se confirme. La descarga aparecerá en Mis compras."
      />
    );
  }

  // Por si el webhook todavía no llegó: deja la orden completada ya mismo.
  await fulfillCheckoutSession(session);

  const productId = session.metadata?.product_id;
  const { data: product } = productId
    ? await supabase.from("products").select("id, name, slug, file_format").eq("id", productId).single()
    : { data: null };

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-tatakoa-terracotta mb-3">
        Compra confirmada
      </p>
      <h1 className="text-3xl font-semibold mb-3">¡Gracias por tu compra!</h1>
      {product && (
        <p className="text-tatakoa-charcoal/70 mb-8">
          Ya puedes descargar <strong>{product.name}</strong>
          {product.file_format ? ` (${product.file_format})` : ""}.
        </p>
      )}

      {product && isOwner ? (
        <div className="flex flex-col items-center gap-4">
          <DownloadButton productId={product.id} label="Descargar ahora" />
          <Link href="/cuenta/compras" className="text-sm text-tatakoa-terracotta font-medium hover:underline">
            Ver todas mis compras →
          </Link>
        </div>
      ) : (
        <Link href="/login?next=/cuenta/compras" className="text-tatakoa-terracotta font-medium hover:underline">
          Inicia sesión para descargar →
        </Link>
      )}

      <p className="text-xs text-tatakoa-charcoal/50 mt-10">
        Stripe te envía el recibo por email. Tu descarga queda guardada en Mis compras.
      </p>

      {product && (
        <PurchaseEvent
          transactionId={session.id}
          value={(session.amount_total ?? 0) / 100}
          currency={(session.currency ?? "usd").toUpperCase()}
          itemId={product.id}
          itemName={product.name}
        />
      )}
    </div>
  );
}

function Message({ title, text }: { title: string; text: string }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold mb-3">{title}</h1>
      <p className="text-tatakoa-charcoal/70 mb-8">{text}</p>
      <Link href="/cuenta/compras" className="text-tatakoa-terracotta font-medium hover:underline">
        Ir a Mis compras →
      </Link>
    </div>
  );
}
