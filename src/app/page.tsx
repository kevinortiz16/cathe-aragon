import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { SUB_BRANDS } from "@/lib/sub-brands";
import type { Post } from "@/types/post";
import type { Product } from "@/types/product";

// Placeholder estático hasta confirmar tabla real de ciudades en Supabase
const FEATURED_CITIES = [
  {
    name: "Washington D.C.",
    tag: "Museos · Planes · Restaurantes",
    slug: "washington-dc",
    image: "/destinos/washington-dc.jpg",
  },
  {
    name: "Miami",
    tag: "Playas · Experiencias · Tips",
    slug: "miami",
    image: "/destinos/miami.jpg",
  },
  {
    name: "New York",
    tag: "Qué hacer · Dónde comer · Guías",
    slug: "new-york",
    image: "/destinos/new-york.png",
  },
];

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
      {/* Hero de marca */}
      <section className="relative h-[520px] md:h-[640px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/tatakoa-hero.png"
            alt="TATAKOA — Where Every Journey Begins"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <Image
            src="/logo/tatakoa-isologo.svg"
            alt=""
            width={56}
            height={56}
            className="mx-auto mb-5 opacity-95"
          />
          <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
            Viajes · Nómadas · RV · Camping
          </span>
          <h1 className="text-4xl md:text-6xl font-semibold mt-4 mb-5 text-white leading-tight">
            Donde Cada Viaje Comienza
          </h1>
         <p className="text-white/85 text-base md:text-lg max-w-xl mx-auto mb-8">
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button href="/sobre-tatakoa" variant="primary">
              Conoce TATAKOA
            </Button>
            <Button
              href="/blog"
              className="bg-white/10 border border-white text-white hover:bg-white/20"
            >
              Ver el blog
            </Button>
          </div>
        </div>
      </section>

      {/* Destinos destacados */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-semibold">Destinos destacados</h2>
          <Link href="/planes" className="text-sm text-tatakoa-terracotta font-medium hover:underline">
            Ver todos los destinos →
          </Link>
        </div>
        <p className="text-tatakoa-charcoal/60 mb-8">
          Descubre planes, guías y recomendaciones para tu próxima aventura.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURED_CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/planes/${city.slug}`}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-tatakoa-charcoal"
            >
              {city.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={city.image}
                  alt={city.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 p-4 text-white transition-transform duration-300 group-hover:-translate-y-1">
                <p className="font-semibold">{city.name}</p>
                <p className="text-xs text-white/80">{city.tag}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Sub-marcas TATAKOA — hero de 3 cuadros */}
      <section className="py-16 mx-auto max-w-6xl px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold">Nuestras líneas de producto</h2>
          <p className="text-tatakoa-charcoal/60 mt-1">
            Tres formas de vivir el viaje TATAKOA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUB_BRANDS.map((brand) => (
            <Link
              key={brand.slug}
              href={`/marcas/${brand.slug}`}
              className={`group flex flex-col items-center justify-center text-center rounded-3xl px-8 py-16 transition-all duration-300 hover:scale-[1.02] ${brand.bg} ${brand.hoverBg}`}
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={280}
                height={340}
                className={`${brand.imgWidthClass} h-auto mb-6`}
              />
              <p className="text-sm text-tatakoa-charcoal/60 group-hover:text-white/90 transition-colors duration-300 max-w-[220px]">
                {brand.tagline}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Últimos posts */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">Últimos posts</h2>
          <Link href="/blog" className="text-sm text-tatakoa-terracotta font-medium hover:underline">
            Ver todos →
          </Link>
        </div>

        {(!posts || posts.length === 0) && (
          <p className="text-tatakoa-charcoal/50">Próximamente, nuevo contenido.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts?.map((post: Post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl bg-white border border-black/5 shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video bg-tatakoa-sand/10 flex items-center justify-center text-tatakoa-sand/40 text-sm">
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
                <span className="text-xs font-medium text-tatakoa-terracotta uppercase tracking-wide">
                  {post.category}
                </span>
                <h3 className="text-lg font-semibold mt-2 group-hover:text-tatakoa-terracotta transition-colors">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tienda destacada */}
      <section className="bg-tatakoa-sand/5 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">Plantillas más populares</h2>
            <Link href="/tienda" className="text-sm text-tatakoa-terracotta font-medium hover:underline">
              Ver tienda →
            </Link>
          </div>

          {(!products || products.length === 0) && (
            <p className="text-tatakoa-charcoal/50">Próximamente, nuevas plantillas.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products?.map((product: Product) => (
              <Link
                key={product.id}
                href={`/tienda/${product.slug}`}
                className="group block rounded-2xl border border-black/5 bg-tatakoa-white overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-tatakoa-sand/10 flex items-center justify-center text-tatakoa-sand/40 text-sm">
                  {product.file_format ?? "Sin imagen"}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold group-hover:text-tatakoa-terracotta transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-tatakoa-terracotta font-semibold mt-2">
                    {formatPrice(product.price_cents, product.currency)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
