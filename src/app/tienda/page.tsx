import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/format";

export const metadata = {
  title: "Tienda | Cathe Aragon",
  description: "Plantillas descargables para viajeros, nómadas digitales y RV lovers.",
};

export default async function TiendaPage() {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-semibold mb-2">Tienda</h1>
      <p className="text-dark/60 mb-12">
        Plantillas y guías descargables para tu próximo viaje.
      </p>

      {(!products || products.length === 0) && (
        <p className="text-dark/50">Aún no hay productos disponibles.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products?.map((product: Product) => (
          <Link
            key={product.id}
            href={`/tienda/${product.slug}`}
            className="group block rounded-2xl border border-black/5 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-video bg-secondary/10 flex items-center justify-center text-secondary/40 text-sm">
              {product.cover_image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.cover_image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                product.file_format ?? "Sin imagen"
              )}
            </div>
            <div className="p-5">
              <h2 className="text-lg font-semibold group-hover:text-primary transition-colors">
                {product.name}
              </h2>
              <p className="text-sm text-dark/60 mt-2 line-clamp-2">
                {product.description}
              </p>
              <p className="text-primary font-semibold mt-3">
                {formatPrice(product.price_cents, product.currency)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}