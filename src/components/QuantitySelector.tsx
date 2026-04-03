"use client";
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (qty: number) => void;
  max?: number;
}

export default function QuantitySelector({ quantity, setQuantity, max = 99 }: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    if (quantity < max) setQuantity(quantity + 1);
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="text-[10px] font-black uppercase tracking-widest text-black/20 ml-2">Select // Quantity</label>
      <div className="flex items-center gap-1 glass rounded-2xl p-1 w-fit border-black/5 bg-white/40 shadow-sm">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={handleDecrement}
          className="p-4 hover:bg-black/5 rounded-xl transition-colors text-black/40 hover:text-black"
          aria-label="Decrease quantity"
        >
          <Minus size={16} strokeWidth={3} />
        </motion.button>
        
        <span className="w-12 text-center font-black text-sm text-black italic tabular-nums select-none">
          {quantity.toString().padStart(2, '0')}
        </span>
        
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={handleIncrement}
          className="p-4 hover:bg-black/5 rounded-xl transition-colors text-black/40 hover:text-black"
          aria-label="Increase quantity"
        >
          <Plus size={16} strokeWidth={3} />
        </motion.button>
      </div>
    </div>
  );
}
