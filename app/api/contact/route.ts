import { NextResponse } from "next/server";
import { validateContactPayload } from "@/lib/contact";

export const dynamic = "force-dynamic";

// Contact endpoint for the portfolio form.
//
// Messages are validated (see lib/contact.ts) and logged server-side. No
// email provider is wired up yet, so the message is NOT delivered anywhere —
// the response says so explicitly with `delivered: false`, and the UI reports
// "received" rather than "sent".
//
// To enable real delivery, add an email provider (Resend/SES/etc.), implement
// a deliverMessage() helper that calls it, and return `delivered: true` once
// the provider confirms the send.
export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const validation = validateContactPayload(payload);

  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 422 });
  }

  const { name, email, subject, message } = validation.value;

  // The only delivery channel currently configured. The message body is
  // truncated so a long submission cannot flood the server logs.
  console.log("[contact] new message", {
    name,
    email,
    subject,
    message: message.slice(0, 500),
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true, delivered: false });
}
