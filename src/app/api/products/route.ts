import { NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const department = searchParams.get('dept');
  
  try {
    if (department && department !== "All") {
      const data = await db.select().from(products).where(eq(products.department, department));
      return NextResponse.json(data);
    }
    const data = await db.select().from(products);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized. Please sign in." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const result = await db.insert(products).values({
      ...body,
      retailerId: session.id
    }).returning();
    
    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Product creation error:", error);
    return NextResponse.json({ error: "Failed to create product." }, { status: 500 });
  }
}
