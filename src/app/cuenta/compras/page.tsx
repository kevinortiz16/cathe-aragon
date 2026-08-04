import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/format";
import { DownloadButton } from "@/components/tienda/download-button";

export const metadata = {
  title: "Mis compras | Cathe Aragon",
};

export default async function ComprasPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  const { data: orders, error } = await supabase
    .from("orders")
    .select("id, status, amount_cents, created_at, products(id, name, slug, file_format)")
    .eq("user_id", user.id)
    .eq("status", "completed")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold mb-2">Mis compras</h1>
      <p className="text-dark/60 mb-10">
        Aquí puedes descargar las plantillas y guías que has comprado.
      </p>

      {(!orders || orders.length === 0) && (
        <div className="text-center py-16 border border-black/5 rounded-2xl">
          <p className="text-dark/50 mb-4">Todavía no tienes compras.</p>
          <Link href="/tienda" className="text-primary font-medium hover:underline">
            Ver tienda
          </Link>
        </div>
      )}

      <div className="space-y-4">
        {orders?.map((order) => {
          const product = Array.isArray(order.products) ? order.products[0] : order.products;
          if (!product) return null;

          return (
            <div
              key={order.id}
              className="flex items-center justify-between border border-black/5 rounded-2xl p-5"
            >
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-dark/50">
                  {product.file_format} · Comprado el{" "}
                  {new Date(order.created_at).toLocaleDateString("es-MX", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  · {formatPrice(order.amount_cents)}
                </p>
              </div>
              <DownloadButton productId={product.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}