import { LoginForm } from "@/components/auth/login-form";
import { safeNextPath } from "@/lib/site";

export const metadata = {
  title: "Iniciar sesión | TATAKOA",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ next?: string; error?: string }>;
}

export default async function LoginPage({ searchParams }: PageProps) {
  const { next, error } = await searchParams;

  return (
    <div className="mx-auto max-w-sm px-4 py-20">
      <h1 className="text-2xl font-semibold mb-2 text-center">Inicia sesión</h1>
      <p className="text-tatakoa-charcoal/60 mb-8 text-sm text-center">
        Para comprar y descargar tus plantillas. Sin contraseñas.
      </p>
      {error && (
        <p className="mb-6 rounded-lg bg-red-50 text-red-700 text-sm px-4 py-3 text-center">
          El link expiró o se abrió en otro navegador. Pide uno nuevo o usa el código del email.
        </p>
      )}
      <LoginForm next={safeNextPath(next)} />
    </div>
  );
}
