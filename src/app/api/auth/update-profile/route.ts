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

    const { name, role } = await request.json();
    
    if (!name && !role) {
       return NextResponse.json({ error: "No fields provided to update" }, { status: 400 });
    }

    const updates: any = {};
    if (name) updates.name = name;
    if (role) updates.role = role;

    // Update database
    await db.update(users)
      .set(updates)
      .where(eq(users.id, session.id));

    // Create a new session payload with the updated values
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
    const updatedSessionPayload = {
      ...session,
      ...updates,
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
