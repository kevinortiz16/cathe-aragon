import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-tatakoa-terracotta mb-3">Error 404</p>
      <h1 className="text-3xl font-semibold mb-3">Este camino no lleva a ningún lado</h1>
      <p className="text-tatakoa-charcoal/60 mb-8">
        La página que buscas no existe o el plan ya pasó. Mira lo que hay esta semana.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button href="/planes" variant="primary">Ver planes de la semana</Button>
        <Button href="/tienda/plantillas" variant="outline">Ver plantillas</Button>
      </div>
    </div>
  );
}
