import { NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    await db.delete(products).where(eq(products.id, parseInt(id)));
    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    return NextResponse.json({ error: "Database failed to delete product" }, { status: 500 });
  }
}
