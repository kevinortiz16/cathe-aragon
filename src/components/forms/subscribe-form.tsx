"use client";

import { useState } from "react";
import { trackEvent } from "@/components/analytics/gtag";

// Formulario de email reutilizable. `source` dice de dónde vino el email
// (por ejemplo "planes", "inicio", "waitlist-organizadores").
export function SubscribeForm({
  source,
  title,
  text,
  buttonLabel = "Suscribirme",
  successText = "¡Listo! Revisa tu correo.",
  tone = "light",
}: {
  source: string;
  title?: string;
  text?: string;
  buttonLabel?: string;
  successText?: string;
  tone?: "light" | "dark";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const dark = tone === "dark";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const website = new FormData(e.currentTarget).get("website");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, website }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("done");
        trackEvent("generate_lead", { lead_source: source });
        return;
      }
      setError(data.error ?? "Algo salió mal.");
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    }
    setStatus("error");
  };

  return (
    <div className={dark ? "text-white" : "text-tatakoa-charcoal"}>
      {title && <h2 className="text-xl md:text-2xl font-semibold mb-2">{title}</h2>}
      {text && (
        <p className={`text-sm mb-4 ${dark ? "text-white/75" : "text-tatakoa-charcoal/70"}`}>{text}</p>
      )}
      {status === "done" ? (
        <p className={`font-medium ${dark ? "text-tatakoa-sand" : "text-tatakoa-terracotta"}`}>{successText}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <label htmlFor={`email-${source}`} className="sr-only">Email</label>
          <input
            id={`email-${source}`}
            type="email"
            autoComplete="email"
            required
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`flex-1 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tatakoa-terracotta/40 ${
              dark ? "bg-white/10 text-white placeholder-white/50 border border-white/20" : "bg-white border border-black/10"
            }`}
          />
          {/* Campo trampa para bots: oculto para personas */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-full bg-tatakoa-terracotta text-white px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {status === "loading" ? "Enviando..." : buttonLabel}
          </button>
        </form>
      )}
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </div>
  );
}
