import Link from "next/link";
import { cache } from "react";
import { notFound, permanentRedirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCityLabel, normalizeCitySlug } from "@/lib/cities";
import { todayInSiteZone } from "@/lib/dates";
import { safeExternalUrl } from "@/lib/links";
import { Markdown } from "@/components/ui/markdown";
import { PlanesLeadBox } from "@/components/plans/planes-lead-box";
import type { Plan } from "@/types/plan";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ city: string; slug: string }>;
}

// Una sola consulta por request (la usan metadata y la página).
const getPlan = cache(async (slug: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("plans")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return data as Plan | null;
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const plan = await getPlan(slug);
  if (!plan) return {};

  const city = normalizeCitySlug(plan.city);
  const expired = plan.valid_until < todayInSiteZone();
  const description = plan.description ?? `Plan recomendado en ${getCityLabel(city)}.`;

  return {
    title: `${plan.title} | Planes en ${getCityLabel(city)} | TATAKOA`,
    description,
    alternates: { canonical: `/planes/${city}/${plan.slug}` },
    robots: expired ? { index: false, follow: true } : undefined,
    openGraph: {
      title: plan.title,
      description,
      type: "article",
      images: plan.cover_image ? [plan.cover_image] : undefined,
    },
  };
}

export default async function PlanDetailPage({ params }: PageProps) {
  const { city: cityParam, slug } = await params;
  const plan = await getPlan(slug);

  if (!plan) notFound();

  // Una sola URL por plan: si la ciudad de la URL no es la oficial, redirigimos.
  const city = normalizeCitySlug(plan.city);
  if (cityParam !== city) permanentRedirect(`/planes/${city}/${plan.slug}`);

  const expired = plan.valid_until < todayInSiteZone();
  const hasLocation = plan.latitude != null && plan.longitude != null;
  const eventUrl = safeExternalUrl(plan.affiliate_link);
  const directions = hasLocation
    ? `https://www.google.com/maps/dir/?api=1&destination=${plan.latitude},${plan.longitude}`
    : null;

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 md:py-16">
      <Link href={`/planes/${city}`} className="text-sm text-tatakoa-charcoal/60 hover:text-tatakoa-terracotta">
        ← Planes en {getCityLabel(city)}
      </Link>

      {expired && (
        <div className="mt-6 rounded-xl bg-tatakoa-sand/15 px-4 py-3 text-sm">
          Este plan ya pasó.{" "}
          <Link href={`/planes/${city}`} className="font-medium text-tatakoa-terracotta hover:underline">
            Mira los planes de esta semana →
          </Link>
        </div>
      )}

      <div className="aspect-video bg-tatakoa-sand/10 rounded-2xl overflow-hidden my-6 flex items-center justify-center text-tatakoa-sand/40">
        {plan.cover_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={plan.cover_image} alt={plan.title} className="w-full h-full object-cover" />
        ) : (
          "TATAKOA"
        )}
      </div>

      <span className="text-xs font-medium text-tatakoa-terracotta uppercase tracking-wide">
        {getCityLabel(city)}
      </span>
      <h1 className="text-2xl md:text-3xl font-semibold mt-2 mb-8">{plan.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <div className="prose max-w-none prose-headings:font-semibold prose-a:text-tatakoa-terracotta">
            <Markdown>{plan.content}</Markdown>
          </div>

          {eventUrl && (
            <div className="mt-8">
              <a
                href={eventUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block bg-tatakoa-terracotta text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                Reservar / Ver más →
              </a>
              <p className="text-xs text-tatakoa-charcoal/40 mt-3">
                Algunos enlaces son de afiliado: si reservas a través de ellos, podemos
                ganar una comisión sin costo extra para ti.
              </p>
            </div>
          )}
        </div>

        {hasLocation && directions && (
          <div className="md:col-span-1">
            <div className="rounded-2xl border border-black/5 overflow-hidden md:sticky md:top-24">
              <a href={directions} target="_blank" rel="noopener noreferrer" className="block">
                <iframe
                  title={`Mapa de ${plan.location_name ?? plan.title}`}
                  src={`https://www.google.com/maps?q=${plan.latitude},${plan.longitude}&output=embed`}
                  className="w-full aspect-square pointer-events-none"
                  loading="lazy"
                />
              </a>
              <div className="p-4">
                {plan.location_name && <p className="font-medium text-sm mb-1">{plan.location_name}</p>}
                <a
                  href={directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-tatakoa-terracotta font-medium hover:underline"
                >
                  Cómo llegar →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-14">
        <PlanesLeadBox source={`plan-${city}`} />
      </div>
    </article>
  );
}
