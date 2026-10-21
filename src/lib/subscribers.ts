import { createAdminClient } from "@/lib/supabase/admin";

// Guarda un email en la lista. Si ya existe, no lo duplica.
// Requiere la tabla `subscribers` (supabase/migrations/20261021_mejoras.sql).
export async function saveSubscriber(email: string, source: string) {
  const admin = createAdminClient();
  const { error } = await admin
    .from("subscribers")
    .upsert({ email, source }, { onConflict: "email", ignoreDuplicates: true });
  if (error) {
    console.error("Error saving subscriber:", error);
    return false;
  }
  return true;
}
