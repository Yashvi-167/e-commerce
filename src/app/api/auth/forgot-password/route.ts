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
    const { data, error: resendError } = await resend.emails.send({
      from: "BELLE AME <no-reply@belle-ame.com>", // UPDATE THIS to your verified domain email
      to: email,
      subject: "Access Recovery | BELLE AME",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #ffffff; border: 1px solid #f0f0f0; border-radius: 24px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="background-color: #000000; color: #ffffff; display: inline-block; padding: 15px 25px; border-radius: 12px; font-weight: 900; letter-spacing: 2px; font-style: italic;">BELLE AME</div>
          </div>
          <h2 style="color: #000000; text-transform: uppercase; letter-spacing: -1px; font-weight: 900; font-style: italic; font-size: 24px; text-align: center;">Account Recovery</h2>
          <p style="color: #666666; font-size: 14px; line-height: 1.6; text-align: center; margin-bottom: 30px; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">We received a request to securely decrypt access to your BELLE AME account.</p>
          <div style="text-align: center; margin: 40px 0;">
            <a href="${resetLink}" style="background-color: #000000; color: #f48fb1; text-decoration: none; padding: 20px 40px; border-radius: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; box-shadow: 0 10px 20px rgba(0,0,0,0.1);">Reset Password</a>
          </div>
          <p style="color: #999999; font-size: 11px; text-align: center; margin-top: 40px; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">If you didn't request this, please disregard. This secure link expires in 60 minutes.</p>
        </div>
      `,
    });

    if (resendError) {
      console.error("Resend API Error:", resendError);
      return NextResponse.json({ error: "Failed to dispatch email securely" }, { status: 500 });
    }

    console.log("Resend Dispatch Success:", data);

    return NextResponse.json({ message: "If an account exists, a secure email has been sent." });

  } catch (error) {
    console.error("Forgot Password Internal Error:", error);
    return NextResponse.json({ error: "Failed to process securely" }, { status: 500 });
  }
}
