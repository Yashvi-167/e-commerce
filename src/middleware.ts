import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip session check for internal Next.js requests and public static assets
  if (
    pathname.startsWith("/_next") || 
    pathname.startsWith("/static") || 
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api/auth") // Allow auth APIs to pass through middleware logic to avoid circular issues
  ) {
    return NextResponse.next();
  }

  let session = null;
  try {
    session = await getSession();
  } catch (error) {
    console.error("Middleware Session Error:", error);
  }

  // Protect Admin/Management routes
  if (pathname.startsWith("/admin")) {
    if (!session || (session.role !== "ADMIN" && session.role !== "RETAILER")) {
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
  matcher: ["/admin/:path*", "/retailer/:path*", "/login", "/api/auth/:path*"],
};
