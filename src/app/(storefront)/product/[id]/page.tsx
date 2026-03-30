import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { ArrowLeft, Star, ShieldCheck, Zap, Sparkles, Ghost } from "lucide-react";
import Link from "next/link";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-background pb-32 pt-24 px-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <Link href="/collections" className="group inline-flex items-center gap-3 text-black/20 hover:text-black font-black uppercase tracking-[0.3em] text-[10px] transition-all">
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> BACK TO SECTOR
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="glass-card p-6 border-black/5 bg-white shadow-2xl relative group overflow-hidden">
               <div className="absolute top-10 right-10 z-10 p-3 glass rounded-2xl text-accent border-white animate-bounce">
                  <Sparkles size={24} />
               </div>
               <img 
                src={product.imageUrl} 
                className="w-full aspect-square object-cover rounded-2xl grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                alt={product.name} 
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="glass rounded-2xl aspect-square overflow-hidden border-black/5 opacity-40 hover:opacity-100 transition-all cursor-pointer">
                  <img src={product.imageUrl} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-10 lg:sticky lg:top-32">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-accent font-black tracking-[0.4em] uppercase text-[10px]">
                <Ghost size={14} />
                Asset id // {params.id.substring(0, 8)}
              </div>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic text-black">{product.name}</h1>
              <div className="flex items-center gap-6">
                 <span className="text-4xl font-black text-black italic drop-shadow-sm">${Number(product.price).toFixed(2)}</span>
                 <div className="h-8 w-px bg-black/10" />
                 <div className="flex items-center gap-1 text-accent">
                   {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                 </div>
              </div>
            </div>

            <p className="text-xl text-black/40 font-medium leading-relaxed max-w-lg lowercase tracking-tight">
              {product.description || "Synthesizing premium design with functional defiance. This asset is optimized for maximum atmospheric presence and weightless mobility."}
            </p>

            <div className="space-y-6">
              <div className="flex flex-col gap-3">
                 <label className="text-[10px] font-black uppercase tracking-widest text-black/20 ml-2">Configuration // Variant</label>
                 <div className="flex gap-3">
                    {['Standard', 'Elite', 'Prototype'].map(v => (
                       <button key={v} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${v === 'Standard' ? 'bg-black text-white' : 'glass text-black/40 hover:text-black border-black/5'}`}>
                          {v}
                       </button>
                    ))}
                 </div>
              </div>

              <div className="pt-8">
                 <AddToCartButton product={product} />
              </div>
            </div>

            {/* USP Grid */}
            <div className="grid grid-cols-2 gap-6 pt-12 border-t border-black/5">
              {[
                { icon: <ShieldCheck size={20} />, title: "Quantum Shield", desc: "Permanent Durability" },
                { icon: <Zap size={20} />, title: "Rapid Sync", desc: "Orbital Delivery" }
              ].map((usp, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="p-3 glass rounded-xl text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
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
