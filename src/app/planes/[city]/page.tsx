import { notFound, permanentRedirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PlanCard } from "@/components/plans/plan-card";
import { PlanesLeadBox } from "@/components/plans/planes-lead-box";
import { getCityLabel, isKnownCity, normalizeCitySlug } from "@/lib/cities";
import { todayInSiteZone } from "@/lib/dates";
import type { Plan } from "@/types/plan";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const slug = normalizeCitySlug(city);
  if (!isKnownCity(slug)) return {};
  const cityName = getCityLabel(slug);
  return {
    title: `Planes en ${cityName} esta semana | TATAKOA`,
    description: `Qué hacer en ${cityName} este fin de semana: festivales, eventos gratis y planes recomendados.`,
    alternates: { canonical: `/planes/${slug}` },
  };
}

export default async function CityPlansPage({ params }: PageProps) {
  const { city } = await params;
  const slug = normalizeCitySlug(city);

  if (!isKnownCity(slug)) notFound();
  if (slug !== city) permanentRedirect(`/planes/${slug}`);

  const cityName = getCityLabel(slug);
  const supabase = await createClient();

  const { data } = await supabase
    .from("plans")
    .select("*")
    .eq("published", true)
    .gte("valid_until", todayInSiteZone())
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  // Filtramos por ciudad normalizada (la base puede tener variantes escritas a mano).
  const plans = (data ?? []).filter((p: Plan) => normalizeCitySlug(p.city) === slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-semibold mb-2">Planes en {cityName}</h1>
      <p className="text-tatakoa-charcoal/60 mb-10">Planes vigentes esta semana en {cityName}.</p>

      {plans.length === 0 && (
        <p className="text-tatakoa-charcoal/50 mb-10">Próximamente, nuevos planes para esta ciudad.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {plans.map((plan: Plan) => (
          <PlanCard key={plan.id} plan={plan} showCity={false} />
        ))}
      </div>

      <div className="mt-12">
        <PlanesLeadBox source={`planes-${slug}`} />
      </div>
    </div>
  );
}
