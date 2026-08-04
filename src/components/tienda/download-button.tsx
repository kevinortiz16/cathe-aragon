"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function DownloadButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    const res = await fetch("/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();

    if (data.url) {
      window.open(data.url, "_blank");
    } else {
      alert(data.error ?? "Error al descargar");
    }
    setLoading(false);
  };

  return (
    <Button variant="secondary" onClick={handleDownload} disabled={loading}>
      {loading ? "Generando link..." : "Descargar"}
    </Button>
  );
}