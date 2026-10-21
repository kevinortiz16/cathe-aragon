"use client";

import { useState } from "react";
import { trackEvent } from "@/components/analytics/gtag";

// Descarga gratis a cambio del email (productos con precio 0).
export function FreeDownloadForm({ productId, productName }: { productId: string; productName: string }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const website = new FormData(e.currentTarget).get("website");
    try {
      const res = await fetch("/api/free-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, email, website }),
      });
      const data = await res.json();
      if (data.url) {
        trackEvent("generate_lead", { lead_source: `gratis:${productName}` });
        setDone(true);
        window.location.href = data.url;
      } else {
        setError(data.error ?? "No pudimos generar la descarga.");
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    }
    setLoading(false);
  };

  if (done) {
    return <p className="font-medium text-tatakoa-terracotta">¡Tu descarga empezó! Si no, recarga la página e intenta de nuevo.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-2">
      <div className="flex flex-col sm:flex-row gap-2">
        <label htmlFor="free-email" className="sr-only">Email</label>
        <input
          id="free-email"
          type="email"
          autoComplete="email"
          required
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-full bg-white border border-black/10 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tatakoa-terracotta/30"
        />
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-tatakoa-terracotta text-white px-5 py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Preparando..." : "Descargar gratis"}
        </button>
      </div>
      <p className="text-xs text-tatakoa-charcoal/50">
        Te enviaremos planes y novedades de TATAKOA. Puedes darte de baja cuando quieras.
      </p>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </form>
  );
}
