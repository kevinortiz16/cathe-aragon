import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PortfolioItem } from "@/app/types/portfolio";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Portafolio | Cathe Aragon",
  description: "Colaboraciones con marcas y resultados de campañas de Cathe Aragon.",
};

export default async function PortafolioPage() {
  const supabase = await createClient();

  const { data: items, error } = await supabase
    .from("portfolio_items")
    .select("*")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching portfolio items:", error);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-semibold mb-2">Portafolio</h1>
          <p className="text-dark/60 max-w-xl">
            Colaboraciones con marcas de viaje, RV y camping — con resultados reales.
          </p>
        </div>
        <Button href="/contacto" variant="primary">
          Trabaja conmigo
        </Button>
      </div>

      {(!items || items.length === 0) && (
        <p className="text-dark/50">Próximamente, casos de éxito con marcas.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items?.map((item: PortfolioItem) => (
          <div
            key={item.id}
            className="rounded-2xl border border-black/5 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-video bg-secondary/10 flex items-center justify-center text-secondary/40 text-sm">
              {item.cover_image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.cover_image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                item.brand_name
              )}
            </div>
            <div className="p-6">
              <span className="text-xs font-medium text-primary uppercase tracking-wide">
                {item.brand_name}
              </span>
              <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
              <p className="text-sm text-dark/60 mt-2">{item.description}</p>

              <div className="flex items-center justify-between mt-5 pt-5 border-t border-black/5">
                {item.metric_label && item.metric_value && (
                  <div>
                    <p className="text-2xl font-semibold text-secondary">
                      {item.metric_value}
                    </p>
                    <p className="text-xs text-dark/50">{item.metric_label}</p>
                  </div>
                )}
                {item.external_link && (
                  <Link
                    href={item.external_link}
                    target="_blank"
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    Ver caso →
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center rounded-2xl bg-secondary/5 py-12 px-6">
        <h2 className="text-2xl font-semibold mb-2">¿Buscas colaborar?</h2>
        <p className="text-dark/60 mb-6 max-w-md mx-auto">
          Descarga el media kit con audiencia, métricas y tipos de colaboración disponibles.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button href="/media-kit.pdf" variant="outline">
            Descargar media kit
          </Button>
          <Button href="/contacto" variant="primary">
            Contactar
          </Button>
        </div>
      </div>
    </div>
  );
}