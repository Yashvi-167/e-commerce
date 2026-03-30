"use client";
import { useCart } from "./CartProvider";
import { motion } from "framer-motion";
import { ShoppingBag, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function AddToCartButton({ product }: { product: any }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.imageUrl,
      quantity: 1
    });
    toast.success(`${product.name} synchronized to vault.`, {
      className: "glass border-accent text-black font-black uppercase text-[10px] tracking-widest",
      icon: <Sparkles className="text-accent" size={16} />
    });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleAdd}
      className="w-full bg-black text-white py-6 rounded-2xl font-black text-lg uppercase tracking-tighter flex items-center justify-center gap-4 shadow-2xl hover:shadow-accent/20 transition-all border-none relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="relative z-10 flex items-center gap-4">
        <ShoppingBag size={22} />
        INITIALIZE SYNC
      </span>
    </motion.button>
  );
}
