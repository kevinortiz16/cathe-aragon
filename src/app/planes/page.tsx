import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Plan } from "@/types/plan";

export const metadata = {
  title: "Planes de la semana | Cathe Aragon",
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
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-semibold mb-2">Planes de la semana</h1>
      <p className="text-dark/60 mb-12">
        Los planes que mencioné en el último video — vigentes hasta el domingo.
      </p>

      {(!plans || plans.length === 0) && (
        <p className="text-dark/50">
          Vuelve pronto — cada semana subo nuevos planes.
        </p>
      )}

      <div className="space-y-6">
        {plans?.map((plan: Plan) => (
          <Link
            key={plan.id}
            href={`/planes/${plan.city.toLowerCase()}/${plan.slug}`}
            className="flex gap-5 rounded-2xl border border-black/5 p-5 hover:shadow-lg transition-shadow"
          >
            <div className="w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-xl overflow-hidden bg-secondary/10 flex items-center justify-center text-secondary/40 text-xs">
              {plan.cover_image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={plan.cover_image}
                  alt={plan.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                "Sin imagen"
              )}
            </div>

            <div className="min-w-0">
              <span className="text-xs font-medium text-primary uppercase tracking-wide">
                {plan.city}
              </span>
              <h2 className="text-xl font-semibold mt-1">{plan.title}</h2>
              <p className="text-dark/60 mt-2 line-clamp-2">{plan.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}