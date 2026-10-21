import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/format";
import { BuyButton } from "@/components/tienda/buy-button";
import { DownloadButton } from "@/components/tienda/download-button";
import { FreeDownloadForm } from "@/components/tienda/free-download-form";
import type { Product } from "@/types/product";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ canceled?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("name, description, cover_image")
    .eq("slug", slug)
    .eq("active", true)
    .single();

  if (!product) return {};

  return {
    title: `${product.name} | Tienda TATAKOA`,
    description: product.description ?? undefined,
    alternates: { canonical: `/tienda/${slug}` },
    openGraph: {
      title: product.name,
      description: product.description ?? undefined,
      images: product.cover_image ? [product.cover_image] : undefined,
    },
  };
}

export default async function ProductPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { canceled } = await searchParams;
  const supabase = await createClient();

  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .single();

  if (!data) {
    notFound();
  }
  const product = data as Product;
  const isFree = product.price_cents === 0;
  const isPhysical = product.product_type === "physical";

  // ¿Ya lo compró? Entonces mostramos la descarga en vez de "Comprar".
  const { data: { user } } = await supabase.auth.getUser();
  let owned = false;
  if (user && !isFree) {
    const { data: order } = await supabase
      .from("orders")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", product.id)
      .eq("status", "completed")
      .limit(1)
      .maybeSingle();
    owned = !!order;
  }

  const previews = (product.preview_images ?? []).filter(Boolean);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      <Link href="/tienda/plantillas" className="text-sm text-tatakoa-charcoal/60 hover:text-tatakoa-terracotta">
        ← Plantillas y guías
      </Link>

      {canceled && (
        <p className="mt-6 rounded-lg bg-tatakoa-sand/15 px-4 py-3 text-sm">
          Cancelaste el pago. No se hizo ningún cobro; puedes intentarlo cuando quieras.
        </p>
      )}

      <div className="aspect-video bg-tatakoa-sand/10 rounded-2xl flex items-center justify-center text-tatakoa-sand/60 my-6 overflow-hidden">
        {product.cover_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.cover_image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          product.file_format ?? "TATAKOA"
        )}
      </div>

      <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
      {product.description && <p className="text-tatakoa-charcoal/70 mb-6">{product.description}</p>}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-y border-black/5 py-6">
        <div>
          <span className="text-2xl font-semibold text-tatakoa-terracotta">
            {isFree ? "Gratis" : formatPrice(product.price_cents, product.currency)}
          </span>
          {product.file_format && (
            <p className="text-xs text-tatakoa-charcoal/50 mt-1">
              Formato: {product.file_format}
              {!isPhysical && " · Descarga inmediata"}
            </p>
          )}
        </div>
        {isPhysical ? (
          <p className="text-sm text-tatakoa-charcoal/60">Próximamente.</p>
        ) : isFree ? (
          <div className="sm:max-w-sm w-full">
            <FreeDownloadForm productId={product.id} productName={product.name} />
          </div>
        ) : owned ? (
          <div className="flex flex-col items-start sm:items-end gap-1">
            <p className="text-xs text-tatakoa-charcoal/60">Ya compraste esta plantilla.</p>
            <DownloadButton productId={product.id} />
          </div>
        ) : (
          <BuyButton
            productId={product.id}
            productName={product.name}
            price={product.price_cents / 100}
            currency={product.currency.toUpperCase()}
          />
        )}
      </div>

      {product.long_description && (
        <div className="prose max-w-none mt-8 prose-headings:font-semibold prose-a:text-tatakoa-terracotta">
          <ReactMarkdown>{product.long_description}</ReactMarkdown>
        </div>
      )}

      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mt-8">
          {previews.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt={`Vista previa de ${product.name}`} className="w-full rounded-xl border border-black/5" loading="lazy" />
          ))}
        </div>
      )}

      {!isFree && !isPhysical && (
        <p className="text-xs text-tatakoa-charcoal/50 mt-10">
          Pago seguro con Stripe. Al comprar aceptas los{" "}
          <Link href="/legal/terminos#reembolsos" className="underline">
            Términos y la política de reembolsos
          </Link>
          .
        </p>
      )}
    </div>
  );
}
