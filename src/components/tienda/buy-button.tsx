"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function BuyButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert(data.error ?? "Error al procesar la compra");
      setLoading(false);
    }
  };

  return (
    <Button variant="primary" onClick={handleBuy} disabled={loading}>
      {loading ? "Procesando..." : "Comprar ahora"}
    </Button>
  );
}