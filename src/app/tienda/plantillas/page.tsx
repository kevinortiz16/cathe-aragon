import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/tienda/product-card";
import type { Product } from "@/types/product";
import { SubscribeForm } from "@/components/forms/subscribe-form";

export const metadata = {
  title: "Plantillas y Guías | Tienda TATAKOA",
  description: "Plantillas y guías descargables para planear tus salidas y viajes: planes por ciudad, escapadas, checklists y planificadores.",
};

export default async function PlantillasPage() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .eq("product_type", "digital")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-semibold mb-2">Plantillas y Guías</h1>
      <p className="text-tatakoa-charcoal/60 mb-12">
        Descargables digitales para organizar y planear tu próximo viaje.
      </p>

      {(!products || products.length === 0) && (
        <div className="max-w-xl rounded-3xl bg-tatakoa-sand/10 p-6 md:p-8">
          <SubscribeForm
            source="waitlist-plantillas"
            title="Las primeras plantillas salen muy pronto"
            text="Déjanos tu email y te avisamos el día que estén disponibles."
            buttonLabel="Avísame"
            successText="¡Listo! Te avisamos el día del lanzamiento."
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products?.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}