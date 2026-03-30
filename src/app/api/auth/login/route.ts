import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // Check if user exists, or create them
  let user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    user = await prisma.user.create({
      data: { email, role: "BUYER" }
    });
  }

  // Create magic link token (simple implementation for demo)
  const token = Math.random().toString(36).substring(7);
  const expires = new Date(Date.now() + 3600000); // 1 hour

  await prisma.user.update({
    where: { email },
    data: { resetToken: token, resetTokenExpiry: expires }
  });

  const magicLink = `${new URL(request.url).origin}/api/auth/verify?token=${token}&email=${email}`;

  try {
    await resend.emails.send({
      from: "ANTIGRAVITY <onboarding@resend.dev>",
      to: email,
      subject: "Access Your Antigravity Vault",
      html: `
        <div style="background-color: #050505; color: #ffffff; padding: 40px; font-family: sans-serif; text-align: center; border-radius: 20px;">
          <h1 style="text-transform: uppercase; letter-spacing: 0.2em; font-weight: 900;">Antigravity // Access</h1>
          <p style="color: #666; margin-bottom: 30px;">Initialize your session by clicking the button below.</p>
          <a href="${magicLink}" style="background-color: #8b5cf6; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 12px; font-weight: bold; text-transform: uppercase;">INITIALIZE SESSION</a>
          <p style="color: #333; margin-top: 30px; font-size: 10px;">If you did not request this, ignore this transmission.</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Magic link sent" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
