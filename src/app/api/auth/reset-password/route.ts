import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, gt, isNotNull, and } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json({ error: "Invalid token or missing password configuration." }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "Password must organically span at least 8 characters." }, { status: 400 });
    }

    // 1. Validate token from Neon database and check accurate expiry
    const userRecords = await db.select()
      .from(users)
      .where(
        and(
          eq(users.resetToken, token),
          isNotNull(users.resetTokenExpiry),
          gt(users.resetTokenExpiry, new Date()) // Token logic dictates it must be ahead of current time
        )
      )
      .limit(1);

    const user = userRecords[0];

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired reset token format. Please re-initiate a password reset." }, { status: 400 });
    }

    // 2. Encrypt the new password string utilizing bcrypt processing
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 3. Update the user password specifically and nullify the reset keys to prevent replay attacks
    await db.update(users)
      .set({ 
        password: hashedPassword, 
        resetToken: null, 
        resetTokenExpiry: null 
      })
      .where(eq(users.id, user.id));

    return NextResponse.json({ message: "Network Vault Password Successfully Reset." });

  } catch (error) {
    console.error("Reset Password Server Fault:", error);
    return NextResponse.json({ error: "An internal server error restricted this backend process. Please try again." }, { status: 500 });
  }
}
