import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession, encrypt } from "@/lib/auth";
import { cookies } from "next/headers";

export async function PATCH(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name } = await request.json();
    if (!name) {
       return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Update database
    await db.update(users)
      .set({ name })
      .where(eq(users.id, session.id));

    // Create a new session payload with the updated name
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
    const updatedSessionPayload = {
      ...session,
      name,
      expiresAt
    };

    const encryptedSession = await encrypt(updatedSessionPayload);

    const response = NextResponse.json({
      message: "Profile updated successfully",
      user: updatedSessionPayload
    });

    // Update the session cookie
    (await cookies()).set("session", encryptedSession, {
      expires: expiresAt,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Update Profile Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
