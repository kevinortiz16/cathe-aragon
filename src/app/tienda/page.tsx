import Link from "next/link";

export const metadata = {
  title: "Tienda | TATAKOA",
  description: "Plantillas descargables y productos físicos para viajeros, nómadas digitales y RV lovers.",
};

export default function TiendaPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-4xl font-semibold mb-2">Tienda</h1>
      <p className="text-tatakoa-charcoal/60 mb-12">
        Todo lo que necesitas para tu próximo viaje, en un solo lugar.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/tienda/plantillas"
          className="group rounded-3xl bg-tatakoa-terracotta/10 hover:bg-tatakoa-terracotta/20 transition-colors px-8 py-14 text-center"
        >
          <h2 className="text-2xl font-semibold mb-2 group-hover:text-tatakoa-terracotta transition-colors">
            Plantillas y Guías
          </h2>
          <p className="text-tatakoa-charcoal/60">
            Descargables digitales para organizar y planear tu viaje.
          </p>
        </Link>

        <Link
          href="/tienda/productos"
          className="group rounded-3xl bg-tatakoa-slate/10 hover:bg-tatakoa-slate/20 transition-colors px-8 py-14 text-center"
        >
          <h2 className="text-2xl font-semibold mb-2 group-hover:text-tatakoa-slate transition-colors">
            Productos
          </h2>
          <p className="text-tatakoa-charcoal/60">
            Organizadores, ropa y accesorios TATAKOA para el camino.
          </p>
        </Link>
      </div>
    </div>
  );
}