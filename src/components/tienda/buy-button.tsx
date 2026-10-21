"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/components/analytics/gtag";

export function BuyButton({
  productId,
  productName,
  price,
  currency = "USD",
}: {
  productId: string;
  productName?: string;
  price?: number;
  currency?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleBuy = async () => {
    setLoading(true);
    setError(null);
    trackEvent("begin_checkout", {
      currency,
      value: price,
      items: [{ item_id: productId, item_name: productName, price, quantity: 1 }],
    });

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (res.status === 401) {
        router.push(`/login?next=${encodeURIComponent(pathname)}`);
        return;
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error ?? "Error al procesar la compra");
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <Button variant="primary" onClick={handleBuy} disabled={loading}>
        {loading ? "Procesando..." : "Comprar ahora"}
      </Button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
