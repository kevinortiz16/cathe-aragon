// src/app/marcas/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";
import { SUB_BRANDS } from "@/lib/sub-brands";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SUB_BRANDS.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = SUB_BRANDS.find((b) => b.slug === slug);
  return {
    title: brand ? `TATAKOA ${brand.name} | TATAKOA` : "TATAKOA",
    description: brand?.description,
  };
}

export default async function SubBrandPage({ params }: PageProps) {
  const { slug } = await params;
  const brand = SUB_BRANDS.find((b) => b.slug === slug);

  if (!brand) notFound();

  return (
    <div>
      <section className={`${brand.bg} py-20`}>
        <div className="mx-auto max-w-2xl px-4 text-center">
          <Image
            src={brand.logo}
            alt={brand.name}
            width={280}
            height={340}
            className="w-40 md:w-48 h-auto mx-auto mb-6"
          />
          <p className="text-lg text-tatakoa-charcoal/70">{brand.tagline}</p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-tatakoa-charcoal/70 leading-relaxed">
          {brand.description}
        </p>
        <p className="text-sm text-tatakoa-charcoal/40 mt-10">
          Próximamente, productos de esta línea disponibles en la tienda.
        </p>
      </section>
    </div>
  );
}
