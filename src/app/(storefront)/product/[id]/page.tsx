import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { ArrowLeft, Star, ShieldCheck, Truck, Sparkles, Ghost } from "lucide-react";
import Link from "next/link";
import { getSession } from "@/lib/auth";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const productId = parseInt(id);
  if (isNaN(productId)) notFound();

  const [product] = await db.select().from(products).where(eq(products.id, productId));

  if (!product) notFound();

  const variants = (product.variants as string[]) || ['S', 'M', 'L', 'XL'];
  const session = await getSession();

  return (
    <main className="min-h-screen bg-background pb-32 pt-24 px-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[hsla(330,70%,90%,0.5)] blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[hsla(330,70%,90%,0.5)] blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <Link href="/collections" className="group inline-flex items-center gap-3 text-black/20 hover:text-black font-black uppercase tracking-[0.3em] text-[10px] transition-all">
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> BACK TO COLLECTIONS
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="glass-card p-6 border-black/5 bg-white shadow-2xl relative group overflow-hidden">
               <div className="absolute top-10 right-10 z-10 p-3 glass rounded-2xl text-accent border-accent/20 animate-bounce shadow-[0_0_20px_rgba(244,143,177,0.3)]">
                  <Sparkles size={24} />
               </div>
               <img 
                src={product.imageUrl!} 
                className="w-full aspect-square object-cover rounded-2xl grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                alt={product.name} 
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="glass rounded-2xl aspect-square overflow-hidden border-black/5 opacity-40 hover:opacity-100 transition-all cursor-pointer">
                  <img src={product.imageUrl!} className="w-full h-full object-cover" alt={`${product.name} view ${i}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-10 lg:sticky lg:top-32">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-accent font-black tracking-[0.4em] uppercase text-[10px]">
                <Ghost size={14} />
                Product ID // {productId.toString().padStart(6, '0')}
              </div>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic text-black">{product.name}</h1>
              <div className="flex items-center gap-6">
                 <span className="text-4xl font-black text-black italic drop-shadow-sm">₹{Number(product.price).toFixed(2)}</span>
                 <div className="h-8 w-px bg-black/10" />
                 <div className="flex items-center gap-1 text-accent">
                   {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                 </div>
              </div>
            </div>

            <p className="text-xl text-black/40 font-medium leading-relaxed max-w-lg lowercase tracking-tight">
              {product.description || "Premium quality essentials designed for modern comfort and style."}
            </p>

            {(!session || session.role === "BUYER") ? (
              <div className="space-y-6">
                <div className="pt-2">
                   <AddToCartButton product={product} variants={variants} />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                 <div className="pt-2">
                    <Link href="/admin/dashboard" className="w-full bg-accent text-primary py-6 rounded-2xl font-black text-lg uppercase tracking-tighter flex items-center justify-center gap-4 shadow-2xl hover:shadow-[0_0_30px_rgba(244,143,177,0.4)] transition-all">
                       <ShieldCheck size={22} />
                       MANAGE IN DASHBOARD
                    </Link>
                 </div>
              </div>
            )}

            {/* USP Grid */}
            <div className="grid grid-cols-2 gap-6 pt-12 border-t border-black/5">
              {[
                { icon: <ShieldCheck size={20} />, title: "Premium Quality", desc: "Built to Last" },
                { icon: <Truck size={20} />, title: "Fast Delivery", desc: "Global Shipping" }
              ].map((usp, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="p-3 glass rounded-xl text-accent group-hover:bg-accent group-hover:text-white group-hover:shadow-[0_0_20px_rgba(244,143,177,0.4)] transition-all duration-500">
                    {usp.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-tight text-black">{usp.title}</h4>
                    <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">{usp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
