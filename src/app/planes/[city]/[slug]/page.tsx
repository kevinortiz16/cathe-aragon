import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ReactMarkdown from "react-markdown";

interface PageProps {
  params: Promise<{ city: string; slug: string }>;
}

export default async function PlanDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: plan } = await supabase
    .from("plans")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!plan) {
    notFound();
  }

  const hasLocation = plan.latitude && plan.longitude;

  return (
    <article className="mx-auto max-w-4xl px-4 py-16">
      {/* Imagen destacada */}
      <div className="aspect-video bg-secondary/10 rounded-2xl overflow-hidden mb-8 flex items-center justify-center text-secondary/40">
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

      <span className="text-xs font-medium text-primary uppercase tracking-wide">
        {plan.city}
      </span>
      <h1 className="text-3xl font-semibold mt-2 mb-8">{plan.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Descripción */}
        <div className="md:col-span-2">
          <div className="prose max-w-none prose-headings:font-semibold prose-a:text-primary">
            <ReactMarkdown>{plan.content}</ReactMarkdown>
          </div>

          {plan.affiliate_link && (
            <div className="mt-8">
              
              <a  href={plan.affiliate_link}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block bg-primary text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                Reservar / Ver más →
              </a>
              <p className="text-xs text-dark/40 mt-3">
                Este enlace es de afiliado — si reservas a través de él, puedo
                ganar una comisión sin costo extra para ti.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar de ubicación */}
        {hasLocation && (
          <div className="md:col-span-1">
            <div className="rounded-2xl border border-black/5 overflow-hidden sticky top-24">
              
              <a  href={`https://www.google.com/maps/dir/?api=1&destination=${plan.latitude},${plan.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <iframe
                  title={`Mapa de ${plan.location_name ?? plan.title}`}
                  src={`https://www.google.com/maps?q=${plan.latitude},${plan.longitude}&output=embed`}
                  className="w-full aspect-square pointer-events-none"
                  loading="lazy"
                />
              </a>
              <div className="p-4">
                {plan.location_name && (
                  <p className="font-medium text-sm mb-1">{plan.location_name}</p>
                )}
                
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${plan.latitude},${plan.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary font-medium hover:underline"
                >
                  Cómo llegar →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}