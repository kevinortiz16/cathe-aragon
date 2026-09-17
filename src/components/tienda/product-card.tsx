
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/tienda/${product.slug}`}
      className="group block rounded-2xl border border-black/5 overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-video bg-tatakoa-sand/10 flex items-center justify-center text-tatakoa-sand/40 text-sm">
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
        <h2 className="text-lg font-semibold group-hover:text-tatakoa-terracotta transition-colors">
          {product.name}
        </h2>
        <p className="text-sm text-tatakoa-charcoal/60 mt-2 line-clamp-2">
          {product.description}
        </p>
        <p className="text-tatakoa-terracotta font-semibold mt-3">
          {formatPrice(product.price_cents, product.currency)}
        </p>
      </div>
    </Link>
  );
}