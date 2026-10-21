"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

const inputClass =
  "w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tatakoa-terracotta/30";

export function LoginForm({ next }: { next: string }) {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Se calcula al hacer clic (window no existe durante el render en servidor).
  const callbackUrl = () =>
    `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: callbackUrl() },
    });
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: callbackUrl(), shouldCreateUser: true },
    });
    setLoading(false);
    if (error) {
      setError("No pudimos enviar el email. Revisa la dirección e intenta de nuevo.");
      return;
    }
    setStep("code");
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code.trim(),
      type: "email",
    });
    setLoading(false);
    if (error) {
      setError("El código no es válido o ya expiró.");
      return;
    }
    router.push(next);
    router.refresh();
  };

  if (step === "code") {
    return (
      <div className="space-y-4">
        <p className="text-sm text-tatakoa-charcoal/70 text-center">
          Te enviamos un email a <strong>{email}</strong>. Abre el link desde este
          mismo navegador, o escribe aquí el código que viene en el email.
        </p>
        <form onSubmit={handleVerifyCode} className="space-y-3">
          <input
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="Código de 6 dígitos"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={`${inputClass} text-center tracking-widest`}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Verificando..." : "Entrar"}
          </Button>
        </form>
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        <button
          type="button"
          onClick={() => setStep("email")}
          className="block mx-auto text-xs text-tatakoa-charcoal/60 hover:underline"
        >
          Usar otro email
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSendEmail} className="space-y-3">
        <label htmlFor="email" className="block text-sm font-medium">
          Tu email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          required
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Enviando..." : "Enviarme un link de acceso"}
        </Button>
      </form>

      <div className="flex items-center gap-3 text-xs text-tatakoa-charcoal/40">
        <span className="h-px flex-1 bg-black/10" />o<span className="h-px flex-1 bg-black/10" />
      </div>

      <Button variant="outline" onClick={handleGoogle} className="w-full">
        Continuar con Google
      </Button>

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
    </div>
  );
}
