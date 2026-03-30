import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const { pathname } = request.nextUrl;

  // Protect Admin routes
  if (pathname.startsWith("/admin")) {
    if (!session || session.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Protect Retailer routes
  if (pathname.startsWith("/retailer")) {
    if (!session || session.role !== "RETAILER") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Redirect from login if already logged in
  if (pathname === "/login" && session) {
    if (session.role === "ADMIN") return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    if (session.role === "RETAILER") return NextResponse.redirect(new URL("/retailer/dashboard", request.url));
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/retailer/:path*", "/login"],
};
