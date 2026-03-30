import { Suspense } from "react";
import CollectionContent from "./CollectionContent";
import { db } from "@/db";
import { products } from "@/db/schema";

export const dynamic = 'force-dynamic';

export default async function CollectionsPage() {
  const allProducts = await db.select().from(products);
  
  return (
    <main className="min-h-screen bg-background px-6 py-20 font-sans">
      <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-accent animate-pulse font-black text-3xl uppercase tracking-widest">Updating Inventory...</div>}>
        <CollectionContent initialProducts={allProducts} />
      </Suspense>
    </main>
  );
}
