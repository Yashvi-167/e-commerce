import { NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const department = searchParams.get('dept');
  
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "No Database connection configured. Please populate `.env.local` with your Neon connection string." }, { status: 500 });
  }

  try {
    if (department && department !== "All") {
      const data = await db.select().from(products).where(eq(products.department, department));
      return NextResponse.json(data);
    }
    const data = await db.select().from(products);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products from Neon Postgres." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await db.insert(products).values(body).returning();
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to insert product into Neon Postgres." }, { status: 500 });
  }
}
