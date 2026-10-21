import { createClient } from "@/lib/supabase/server";
import { PlanCard } from "@/components/plans/plan-card";
import { PlanesLeadBox } from "@/components/plans/planes-lead-box";
import { todayInSiteZone } from "@/lib/dates";
import type { Plan } from "@/types/plan";

export const metadata = {
  title: "Planes de la semana en DC, New York y Miami | TATAKOA",
  description:
    "Los mejores planes para este fin de semana en Washington D.C., New York y Miami: festivales, eventos gratis y actividades en familia.",
  alternates: { canonical: "/planes" },
};

export default async function PlanesPage() {
  const supabase = await createClient();

  const { data: plans } = await supabase
    .from("plans")
    .select("*")
    .eq("published", true)
    .gte("valid_until", todayInSiteZone())
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-semibold mb-2">Planes de la semana</h1>
      <p className="text-tatakoa-charcoal/60 mb-10">
        Los planes que mencionamos en el último video — vigentes hasta el domingo, en Washington D.C., New York y Miami.
      </p>

      {(!plans || plans.length === 0) && (
        <p className="text-tatakoa-charcoal/50 mb-10">
          Vuelve pronto — cada semana subimos nuevos planes.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {plans?.slice(0, 6).map((plan: Plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      <div className="my-12">
        <PlanesLeadBox source="planes" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {plans?.slice(6).map((plan: Plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
