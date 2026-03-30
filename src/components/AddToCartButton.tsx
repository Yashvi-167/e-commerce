"use client";
import { useCart } from "./CartProvider";
import { ShoppingBag, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AddToCartButton({ 
  product, variants = [] 
}: { 
  product: { id: string, name: string, price: number, image: string },
  variants?: string[]
}) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<string | null>(variants.length > 0 ? variants[0] : null);

  const handleAdd = () => {
    if (variants.length > 0 && !selectedVariant) {
       toast.error("Please select a variant before initializing transfer.", {
          className: "glass neon-border text-white border-primary/50",
       });
       return;
    }

    addToCart({ 
      ...product, 
      quantity: 1, 
      image: product.image,
      variant: selectedVariant || undefined,
      id: selectedVariant ? `${product.id}-${selectedVariant}` : product.id
    });
    
    toast.success(`${product.name} synced to your vault!`, {
      icon: <Sparkles className="text-primary" />,
      className: "glass neon-border text-white border-primary/50",
    });
  };

  return (
    <div className="space-y-8">
      {variants.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">
            Select Configuration // Size
          </div>
          <div className="flex flex-wrap gap-3">
            {variants.map(v => (
              <button 
                key={v} 
                onClick={() => setSelectedVariant(v)}
                className={`px-6 h-14 rounded-2xl border flex items-center justify-center font-bold text-sm tracking-widest transition-all duration-300 ${
                  selectedVariant === v 
                  ? "bg-primary text-white neon-border scale-105" 
                  : "glass text-white/40 hover:text-white border-white/5"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAdd}
        className="w-full bg-primary text-white h-20 rounded-[2rem] font-black text-xl uppercase tracking-tighter flex items-center justify-center gap-4 neon-border shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] transition-all"
      >
        <ShoppingBag size={24} />
        INITIALIZE TRANSFER
      </motion.button>
    </div>
  );
}
