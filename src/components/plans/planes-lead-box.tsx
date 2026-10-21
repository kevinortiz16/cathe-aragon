import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/format";
import { SubscribeForm } from "@/components/forms/subscribe-form";

// Caja de conversión para /planes: promociona la plantilla más reciente
// y, al lado, pide el email para recibir los planes de cada semana.
export async function PlanesLeadBox({ source }: { source: string }) {
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("name, slug, description, price_cents, currency")
    .eq("active", true)
    .eq("product_type", "digital")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <section className="rounded-3xl bg-tatakoa-charcoal text-white p-6 md:p-10 grid gap-8 md:grid-cols-2 md:items-center">
      <SubscribeForm
        source={source}
        tone="dark"
        title="Los planes de la semana, en tu correo"
        text="Cada semana te mandamos los mejores planes de DC, New York y Miami antes del fin de semana."
        buttonLabel="Quiero los planes"
        successText="¡Listo! Te escribimos antes del fin de semana."
      />
      {product && (
        <Link
          href={`/tienda/${product.slug}`}
          className="block rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-colors"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-tatakoa-sand mb-2">
            {product.price_cents === 0 ? "Gratis" : "Plantilla destacada"}
          </p>
          <p className="text-lg font-semibold">{product.name}</p>
          {product.description && (
            <p className="text-sm text-white/70 mt-1 line-clamp-2">{product.description}</p>
          )}
          <p className="text-sm font-medium text-tatakoa-sand mt-3">
            {product.price_cents === 0
              ? "Descárgala gratis →"
              : `${formatPrice(product.price_cents, product.currency)} · Ver plantilla →`}
          </p>
        </Link>
      )}
    </section>
  );
}
