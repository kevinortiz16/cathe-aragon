import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { normalizeEmail } from "@/lib/validation/email";

const REASONS = ["colaboracion", "pregunta", "soporte", "otro"];

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  // Campo trampa: si viene lleno es un bot. Respondemos "ok" sin guardar.
  if (body.website) {
    return NextResponse.json({ success: true });
  }

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "";
  const email = normalizeEmail(body.email);
  const reason = REASONS.includes(body.reason) ? body.reason : null;

  if (!name || !email || !reason || !message) {
    return NextResponse.json({ error: "Revisa los campos: todos son obligatorios" }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin.from("contact_submissions").insert({
    name,
    email,
    reason,
    message,
  });

  if (error) {
    console.error("Error saving contact submission:", error);
    return NextResponse.json({ error: "Error al enviar el mensaje" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
