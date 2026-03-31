import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { encrypt } from "@/lib/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const userRecords = await db.select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
      
    const user = userRecords[0];

    if (!user || !user.password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create session
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
    const sessionPayload = { 
      id: user.id, 
      name: user.name,
      email: user.email, 
      role: user.role, 
      expiresAt 
    };
    
    let session;
    try {
      session = await encrypt(sessionPayload);
    } catch (encryptError) {
       console.error("Encryption error:", encryptError);
       return NextResponse.json({ error: "Session creation failed" }, { status: 500 });
    }

    const response = NextResponse.json({ 
      message: "Login successful",
      user: sessionPayload
    });

    // Set persistence cookie
    response.cookies.set("session", session, {
      expires: expiresAt,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("LOGIN_FATAL_ERROR", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
