import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (!token || !email) {
    return NextResponse.redirect(new URL("/login?error=Invalid link", request.url));
  }

  const user = await prisma.user.findFirst({
    where: { 
      email,
      resetToken: token,
      resetTokenExpiry: { gt: new Date() }
    }
  });

  if (!user) {
    return NextResponse.redirect(new URL("/login?error=Expired or invalid link", request.url));
  }

  // Clear token
  await prisma.user.update({
    where: { id: user.id },
    data: { resetToken: null, resetTokenExpiry: null }
  });

  // Create session
  const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
  const session = await encrypt({ userId: user.id, role: user.role, email: user.email, expires });

  // Set cookie
  (await cookies()).set("session", session, { expires, httpOnly: true });

  // Redirect based on role
  if (user.role === "ADMIN") return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  if (user.role === "RETAILER") return NextResponse.redirect(new URL("/retailer/dashboard", request.url));
  return NextResponse.redirect(new URL("/", request.url));
}
