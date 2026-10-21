"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function DownloadButton({
  productId,
  label = "Descargar",
}: {
  productId: string;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.url) {
        // En celular, abrir en la misma pestaña evita bloqueos de pop-ups.
        window.location.href = data.url;
      } else {
        setError(data.error ?? "Error al descargar");
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <Button variant="primary" onClick={handleDownload} disabled={loading}>
        {loading ? "Generando link..." : label}
      </Button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
