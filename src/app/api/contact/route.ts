import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema } from "@/lib/schemas";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { fieldErrors: z.flattenError(parsed.error).fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, message, honeypot } = parsed.data;

  // Non-empty honeypot indicates a bot — return a convincing 200 without dispatching
  if (honeypot) {
    return NextResponse.json({ success: true });
  }

  try {
    await resend.emails.send({
      from:    "Portfolio Contact <onboarding@resend.dev>",
      to:      "amanuelmusa11@gmail.com",
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      // Plain text prevents HTML/script injection if a visitor pastes markup into the message field
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact/route] Resend dispatch failed:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
