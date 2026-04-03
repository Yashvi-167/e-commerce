"use client";
import { useCart } from "./CartProvider";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import QuantitySelector from "./QuantitySelector";

export default function AddToCartButton({ product, variants = ['S', 'M', 'L', 'XL'] }: { product: any, variants?: string[] }) {
  const [selectedSize, setSelectedSize] = useState(variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = async () => {
    setIsAdding(true);
    
    // Artificial delay for premium feel
    await new Promise(resolve => setTimeout(resolve, 500));

    addToCart({
      id: `${product.id}-${selectedSize}`,
      name: product.name,
      price: Number(product.price),
      image: product.imageUrl,
      quantity: quantity,
      variant: selectedSize
    });

    toast.success(`${product.name} added to your cart.`, {
      className: "glass border-accent text-black font-black uppercase text-[10px] tracking-widest",
      icon: <Sparkles className="text-accent" size={16} />
    });

    setIsAdding(false);
  };

  return (
    <div className="space-y-10">
      {/* 1. Size Selection */}
      <div className="flex flex-col gap-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-black/20 ml-2 italic">Select // Size</label>
        <div className="flex flex-wrap gap-4">
          {variants.map(v => (
            <motion.button 
              key={v} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isAdding}
              onClick={() => setSelectedSize(v)}
              className={`min-w-[80px] px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all duration-300 relative overflow-hidden ${
                v === selectedSize 
                ? 'bg-black text-white border-black shadow-2xl' 
                : 'glass text-black/40 hover:text-black border-black/5 hover:border-black/20 bg-white'
              }`}
            >
              <span className="relative z-10">{v}</span>
              {v === selectedSize && (
                <motion.div 
                  layoutId="active-size"
                  className="absolute inset-0 bg-black"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* 2. Quantity & Action */}
      <div className="flex flex-col md:flex-row items-end gap-8 pt-4">
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        
        <div className="flex-1 w-full">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isAdding}
            onClick={handleAdd}
            className="w-full h-20 bg-black text-white rounded-3xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 shadow-3xl hover:bg-black/90 transition-all relative overflow-hidden group"
          >
            {/* Animated accent background */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-secondary opacity-0 group-hover:opacity-10 transition-opacity" />
            
            <AnimatePresence mode="wait">
              {isAdding ? (
                <motion.div 
                  key="adding"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                  ADDING...
                </motion.div>
              ) : (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3"
                >
                  <ShoppingBag size={20} className="group-hover:rotate-12 transition-transform" />
                  ADD TO CART
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
