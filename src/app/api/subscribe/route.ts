import { NextResponse } from "next/server";
import { normalizeEmail } from "@/lib/validation/email";
import { saveSubscriber } from "@/lib/subscribers";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  // Campo trampa: los bots lo llenan, las personas no lo ven.
  if (body.website) {
    return NextResponse.json({ success: true });
  }

  const email = normalizeEmail(body.email);
  if (!email) {
    return NextResponse.json({ error: "Escribe un email válido" }, { status: 400 });
  }

  const source =
    typeof body.source === "string" && body.source.length <= 80 ? body.source : "web";

  const ok = await saveSubscriber(email, source);
  if (!ok) {
    return NextResponse.json({ error: "No pudimos guardar tu email. Intenta de nuevo." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
