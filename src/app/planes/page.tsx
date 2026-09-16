import { createClient } from "@/lib/supabase/server";
import { PlanCard } from "@/components/plans/plan-card";
import type { Plan } from "@/types/plan";

export const metadata = {
  title: "Planes de la semana | TATAKOA",
  description: "Los mejores planes para hacer esta semana en tu ciudad.",
};

export default async function PlanesPage() {
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];

  const { data: plans } = await supabase
    .from("plans")
    .select("*")
    .eq("published", true)
    .gte("valid_until", today)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-semibold mb-2">Planes de la semana</h1>
      <p className="text-tatakoa-charcoal/60 mb-12">
        Los planes que mencioné en el último video — vigentes hasta el domingo, en Washington D.C., New York y Miami.
      </p>

      {(!plans || plans.length === 0) && (
        <p className="text-tatakoa-charcoal/50">
          Vuelve pronto — cada semana subo nuevos planes.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans?.map((plan: Plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
