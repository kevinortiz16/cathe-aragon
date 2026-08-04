import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/format";
import { BuyButton } from "@/components/tienda/buy-button";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("name, description, cover_image")
    .eq("slug", slug)
    .single();

  if (!product) return {};

  return {
    title: `${product.name} | Tienda Cathe Aragon`,
    description: product.description ?? undefined,
    openGraph: {
      title: product.name,
      description: product.description ?? undefined,
      images: product.cover_image ? [product.cover_image] : undefined,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .single();

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="aspect-video bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary/40 mb-8">
        {product.cover_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.cover_image}
            alt={product.name}
            className="w-full h-full object-cover rounded-2xl"
          />
        ) : (
          product.file_format ?? "Sin imagen"
        )}
      </div>

      <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
      <p className="text-dark/60 mb-6">{product.description}</p>

      <div className="flex items-center justify-between border-t border-black/5 pt-6">
        <span className="text-2xl font-semibold text-primary">
          {formatPrice(product.price_cents, product.currency)}
        </span>
        <BuyButton productId={product.id} />
      </div>
    </div>
  );
}