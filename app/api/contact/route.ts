import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Contact endpoint for the portfolio form. Messages are validated and logged
// server-side; plug an email provider (Resend/SES/etc.) into `deliver()` when
// ready. Everything is needed for the delivery: name, email, subject, message.
export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim();
  const subject = String(payload.subject || "").trim();
  const message = String(payload.message || "").trim();

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "All fields (name, email, subject, message) are required." },
      { status: 422 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email address looks invalid." }, { status: 422 });
  }

  console.log("[contact] new message", {
    name,
    email,
    subject,
    message: message.slice(0, 500),
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
