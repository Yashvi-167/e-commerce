"use client";
import { useCart } from "./CartProvider";
import { motion } from "framer-motion";
import { ShoppingBag, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { useState } from "react";

export default function AddToCartButton({ product, variants = ['S', 'M', 'L', 'XL'] }: { product: any, variants?: string[] }) {
  const [selectedSize, setSelectedSize] = useState(variants[0]);
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      id: `${product.id}-${selectedSize}`,
      name: product.name,
      price: Number(product.price),
      image: product.imageUrl,
      quantity: 1,
      variant: selectedSize
    });
    toast.success(`${product.name} added to your cart.`, {
      className: "glass border-accent text-black font-black uppercase text-[10px] tracking-widest",
      icon: <Sparkles className="text-accent" size={16} />
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        <label className="text-[10px] font-black uppercase tracking-widest text-black/20 ml-2">Select // Size</label>
        <div className="flex flex-wrap gap-3">
          {variants.map(v => (
            <button 
              key={v} 
              onClick={() => setSelectedSize(v)}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${v === selectedSize ? 'bg-black text-white border-black shadow-lg scale-105' : 'glass text-black/40 hover:text-black border-black/5 hover:border-black/20'}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAdd}
          className="w-full bg-black text-white py-6 rounded-2xl font-black text-lg uppercase tracking-tighter flex items-center justify-center gap-4 shadow-2xl hover:shadow-accent/20 transition-all border-none relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10 flex items-center gap-4">
            <ShoppingBag size={22} />
            ADD TO CART
          </span>
        </motion.button>
      </div>
    </div>
  );
}
