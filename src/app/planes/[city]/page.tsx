import { createClient } from "@/lib/supabase/server";
import { PlanCard } from "@/components/plans/plan-card";
import { getCityLabel } from "@/lib/cities";
import type { Plan } from "@/types/plan";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const cityName = getCityLabel(city);
  return {
    title: `Mejores planes en ${cityName} | TATAKOA`,
    description: `Guía de planes recomendados en ${cityName}.`,
  };
}

export default async function CityPlansPage({ params }: PageProps) {
  const { city } = await params;
  const cityName = getCityLabel(city);
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];

  const { data: plans } = await supabase
    .from("plans")
    .select("*")
    .eq("published", true)
    .eq("city", city)
    .gte("valid_until", today)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-semibold mb-2">
        Mejores planes en {cityName}
      </h1>
      <p className="text-tatakoa-charcoal/60 mb-12">
        Planes vigentes esta semana en {cityName}.
      </p>

      {(!plans || plans.length === 0) && (
        <p className="text-tatakoa-charcoal/50">Próximamente, planes para esta ciudad.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans?.map((plan: Plan) => (
          <PlanCard key={plan.id} plan={plan} showCity={false} />
        ))}
      </div>
    </div>
  );
}
