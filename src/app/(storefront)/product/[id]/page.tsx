import { ShoppingBag, Star, Check, Tag, Sparkles, Ghost } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import { prisma } from "@/lib/prisma";
import { cache } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export const dynamic = 'force-dynamic';

const getProduct = cache(async (id: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: id }
    });
    return product;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
});

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Product Not Found | ANTIGRAVITY" };
  
  return {
    title: `${product.name} | ANTIGRAVITY`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 bg-black">
        <div className="glass-card p-12 text-center max-w-lg space-y-6">
          <Ghost size={64} className="text-primary mx-auto animate-bounce" />
          <h1 className="text-3xl font-black uppercase tracking-tighter">Signal Lost</h1>
          <p className="text-white/40">The product you are looking for has drifted out of range.</p>
          <Link href="/collections" className="inline-block bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:neon-border transition-all">
            RETURN TO GRID
          </Link>
        </div>
      </main>
    );
  }

  const features = product.features as string[] || [];
  const variants = product.variants as string[] || [];

  return (
    <main className="min-h-screen bg-background pb-32 pt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left: Product Gallery */}
        <div className="sticky top-32 space-y-6">
          <div className="glass-card aspect-square lg:h-[700px] w-full relative overflow-hidden group neon-border">
             <img 
               src={product.imageUrl || ""} 
               alt={product.name} 
               className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
             {product.compareAtPrice && (
                <div className="absolute top-8 left-8 glass px-4 py-2 rounded-full text-[10px] font-bold text-white uppercase tracking-[0.2em] neon-border bg-primary/20">
                  Experimental // Rare
                </div>
             )}
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-card aspect-square border-white/5 hover:border-primary/40 cursor-pointer overflow-hidden opacity-40 hover:opacity-100 transition-all">
                <img src={product.imageUrl || ""} alt="" className="w-full h-full object-cover scale-150 grayscale group-hover:grayscale-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col gap-10 py-4">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="glass px-3 py-1 rounded-full text-[10px] font-bold text-white/40 tracking-[0.2em] uppercase border-white/10">
                {product.vendor} // {product.category}
              </div>
              <div className="flex items-center gap-1 text-primary">
                <Star size={12} fill="currentColor" />
                <span className="text-[10px] font-bold tracking-widest text-white/60">{product.reviewsRating}</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-6">
              <span className="text-4xl font-black text-white italic drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                ${Number(product.price).toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="text-2xl text-white/20 line-through font-bold">
                  ${Number(product.compareAtPrice).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-white/40 text-lg leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          <div className="glass-card p-8 space-y-8 border-white/5">
            <AddToCartButton 
              variants={variants} 
              product={{ 
                id: String(product.id), 
                name: product.name, 
                price: Number(product.price), 
                image: product.imageUrl || "" 
              }} 
            />
            
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <p className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
                {Number(product.inventory)} Units Remaining in Sector
              </p>
            </div>
          </div>

          {/* Details / Benefits */}
          <div className="space-y-6">
             <div className="flex items-center gap-3 text-white/20">
               <Sparkles size={16} />
               <span className="text-xs font-bold tracking-[0.2em] uppercase">Core Specifications</span>
               <div className="flex-1 h-px bg-white/5" />
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, i) => (
                  <div key={i} className="glass p-5 rounded-2xl border-white/5 flex items-start gap-4 group hover:bg-white/5 transition-all">
                    <Check className="text-primary mt-1 shrink-0" size={16} />
                    <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">{feature}</span>
                  </div>
                ))}
             </div>
          </div>

          {/* Shipping / Info */}
          <div className="glass-card p-6 border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-4 text-white/40">
              <Tag size={18} className="text-primary" />
              <p className="text-sm font-medium leading-relaxed italic">
                Free orbital delivery. Secure transaction via quantum-linked protocols.
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
