"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold mb-2">Bienvenido de vuelta</h1>
      <p className="text-dark/60 mb-8 text-sm">
        Inicia sesión para acceder a tu contenido y compras.
      </p>
      <Button onClick={handleGoogleLogin} className="w-full">
        Continuar con Google
      </Button>
    </div>
  );
}