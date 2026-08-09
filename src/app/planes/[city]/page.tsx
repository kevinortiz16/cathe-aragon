import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Plan } from "@/types/plan";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const cityName = decodeURIComponent(city);
  return {
    title: `Mejores planes en ${cityName} | Cathe Aragon`,
    description: `Guía de planes recomendados en ${cityName}.`,
  };
}

export default async function CityPlansPage({ params }: PageProps) {
  const { city } = await params;
  const cityName = decodeURIComponent(city);
  const supabase = await createClient();

  const { data: plans } = await supabase
    .from("plans")
    .select("*")
    .eq("published", true)
    .ilike("city", cityName)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-semibold mb-2 capitalize">
        Mejores planes en {cityName}
      </h1>
      <p className="text-dark/60 mb-12">
        Recomendaciones que he compartido a lo largo del tiempo en {cityName}.
      </p>

      {(!plans || plans.length === 0) && (
        <p className="text-dark/50">Próximamente, planes para esta ciudad.</p>
      )}

      <div className="space-y-6">
        {plans?.map((plan: Plan) => (
          <Link
            key={plan.id}
            href={`/planes/${city}/${plan.slug}`}
            className="block rounded-2xl border border-black/5 p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold">{plan.title}</h2>
            <p className="text-dark/60 mt-2">{plan.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}