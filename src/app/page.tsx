import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import type { Post } from "@/types/post";
import type { Product } from "@/types/product";

export default async function HomePage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(3);

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-24 text-center">
        <span className="text-sm font-medium text-primary uppercase tracking-wide">
          Viajes · Nómadas · RV · Camping
        </span>
        <h1 className="text-4xl md:text-6xl font-semibold mt-4 mb-6 max-w-3xl mx-auto leading-tight">
          Tips reales para vivir viajando por USA
        </h1>
        <p className="text-dark/60 text-lg max-w-xl mx-auto mb-10">
          Guías, plantillas y recomendaciones de una experta en marketing
          que dejó la oficina por la carretera.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button href="/blog" variant="primary">
            Leer el blog
          </Button>
          <Button href="/tienda" variant="outline">
            Ver tienda
          </Button>
        </div>
      </section>

      {/* Últimos posts */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">Últimos posts</h2>
          <Link href="/blog" className="text-sm text-primary font-medium hover:underline">
            Ver todos →
          </Link>
        </div>

        {(!posts || posts.length === 0) && (
          <p className="text-dark/50">Próximamente, nuevo contenido.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts?.map((post: Post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-black/5 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video bg-secondary/10 flex items-center justify-center text-secondary/40 text-sm">
                {post.cover_image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  "Sin imagen"
                )}
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-primary uppercase tracking-wide">
                  {post.category}
                </span>
                <h3 className="text-lg font-semibold mt-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tienda destacada */}
      <section className="bg-secondary/5 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">Plantillas más populares</h2>
            <Link href="/tienda" className="text-sm text-primary font-medium hover:underline">
              Ver tienda →
            </Link>
          </div>

          {(!products || products.length === 0) && (
            <p className="text-dark/50">Próximamente, nuevas plantillas.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products?.map((product: Product) => (
              <Link
                key={product.id}
                href={`/tienda/${product.slug}`}
                className="group block rounded-2xl border border-black/5 bg-cream overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-secondary/10 flex items-center justify-center text-secondary/40 text-sm">
                  {product.file_format ?? "Sin imagen"}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-primary font-semibold mt-2">
                    {formatPrice(product.price_cents, product.currency)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold mb-3">¿Tienes una marca?</h2>
        <p className="text-dark/60 mb-8 max-w-md mx-auto">
          Conoce las colaboraciones que he hecho con marcas de viaje, RV y camping.
        </p>
        <Button href="/portafolio" variant="primary">
          Ver portafolio
        </Button>
      </section>
    </div>
  );
}