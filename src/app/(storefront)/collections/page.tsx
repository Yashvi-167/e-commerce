import { Suspense } from "react";
import CollectionContent from "./CollectionContent";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function CollectionsPage() {
  const allProducts = await prisma.product.findMany();
  
  return (
    <main className="min-h-screen bg-background px-6 py-20 font-sans">
      <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-primary animate-pulse font-black text-3xl uppercase tracking-widest">Scanning Grid...</div>}>
        <CollectionContent initialProducts={allProducts} />
      </Suspense>
    </main>
  );
}
