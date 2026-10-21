import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/tienda/product-card";
import type { Product } from "@/types/product";
import { SubscribeForm } from "@/components/forms/subscribe-form";

export const metadata = {
  title: "Productos | Tienda TATAKOA",
  description: "Organizadores, ropa y accesorios TATAKOA para el camino.",
};

export default async function ProductosPage() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .eq("product_type", "physical")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-semibold mb-2">Productos</h1>
      <p className="text-tatakoa-charcoal/60 mb-12">
        Organizadores, ropa y accesorios TATAKOA — próximamente disponibles.
      </p>

      {(!products || products.length === 0) && (
        <div className="max-w-xl rounded-3xl bg-tatakoa-sand/10 p-6 md:p-8">
          <SubscribeForm
            source="waitlist-organizadores"
            title="Nuestros organizadores de viaje vienen en camino"
            text="Estamos preparando la primera línea TATAKOA. Déjanos tu email y te avisamos primero el día del lanzamiento."
            buttonLabel="Avísame"
            successText="¡Estás en la lista! Te avisamos primero."
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