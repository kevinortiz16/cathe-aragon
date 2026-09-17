import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "@/components/tienda/product-card";
import type { Product } from "@/types/product";

export const metadata = {
  title: "Plantillas y Guías | Tienda TATAKOA",
  description: "Plantillas descargables para viajeros, nómadas digitales y RV lovers.",
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
        <p className="text-tatakoa-charcoal/50">Aún no hay plantillas disponibles.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products?.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}