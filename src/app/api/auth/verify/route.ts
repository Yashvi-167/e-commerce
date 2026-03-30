import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq, and, gt } from "drizzle-orm";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (!token || !email) {
    return NextResponse.redirect(new URL("/login?error=Invalid link", request.url));
  }

  const [user] = await db.select()
    .from(users)
    .where(
      and(
        eq(users.email, email),
        eq(users.resetToken, token),
        gt(users.resetTokenExpiry, new Date())
      )
    );

  if (!user) {
    return NextResponse.redirect(new URL("/login?error=Expired or invalid link", request.url));
  }

  // Clear token
  await db.update(users)
    .set({ resetToken: null, resetTokenExpiry: null })
    .where(eq(users.id, user.id));

  // Create session
  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
  const session = await encrypt({ id: user.id, role: user.role, email: user.email, expires });

  // Set cookie
  (await cookies()).set("session", session, { 
    expires, 
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/"
  });

  // Redirect based on role
  if (user.role === "ADMIN") return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  if (user.role === "RETAILER") return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  return NextResponse.redirect(new URL("/", request.url));
}
