import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Secure Check to prevent enumeration attacks
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (existingUser.length === 0) {
      // Return success anyway to avoid revealing if an email exists on the platform
      return NextResponse.json({ message: "If an account exists, a secure email has been sent." });
    }

    // 1. Generate token and expiry
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 3600000); // 1 hour duration

    // 2. Save token and expiry into the user's db record
    await db.update(users)
      .set({ resetToken: token, resetTokenExpiry: expiry })
      .where(eq(users.email, email));

    // 3. Create reset link
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;

    // 4. Send email securely via Resend API
    await resend.emails.send({
      from: "onboarding@resend.dev", // default works for testing in dev environments
      to: email,
      subject: "Reset Your AURALIS Password",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #0F172A; text-transform: uppercase; letter-spacing: -1px;">Password Reset Request</h2>
          <p style="color: #64748B; font-size: 16px;">We received a request to securely reset the password for your AURALIS vault associated with this email address.</p>
          <div style="margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #CCFF00; color: #0F172A; text-decoration: none; padding: 15px 30px; border-radius: 5px; font-weight: bold; text-transform: uppercase;">Reset Your Password</a>
          </div>
          <p style="color: #64748B; font-size: 14px;">If you didn't request this, you can safely ignore this email. This link will self-destruct in 1 hour.</p>
        </div>
      `,
    });

    return NextResponse.json({ message: "If an account exists, a secure email has been sent." });

  } catch (error) {
    console.error("Forgot Password Internal Error:", error);
    return NextResponse.json({ error: "Failed to process securely" }, { status: 500 });
  }
}
