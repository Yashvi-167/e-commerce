"use client";
import { useCart } from "./CartProvider";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowRight, Ghost, Sparkles } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, cartTotal, totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Fixed Trigger for Demo/Ease */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 right-10 z-40 bg-black text-white p-6 rounded-3xl shadow-2xl hover:scale-110 active:scale-95 transition-all group border-none"
      >
        <ShoppingBag size={24} className="group-hover:rotate-12 transition-transform" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-accent text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border-4 border-white">
            {totalItems}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/10 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[60] flex flex-col"
            >
              <div className="p-8 border-b border-black/5 flex items-center justify-between bg-white/50 backdrop-blur-md sticky top-0 z-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-accent font-black tracking-[0.4em] uppercase text-[10px]">
                    <Sparkles size={14} />
                    Current // Manifest
                  </div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter italic text-black">Vault.Items</h2>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-3 bg-black/5 rounded-2xl hover:bg-black/10 transition-colors">
                  <X size={20} className="text-black" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-20">
                    <Ghost size={80} className="text-black" />
                    <p className="text-xl font-black uppercase tracking-widest italic">Vault is empty.</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex gap-6 group"
                    >
                      <div className="w-24 h-24 rounded-2xl bg-secondary/20 overflow-hidden glass border-black/5">
                        <img src={item.image} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-black text-black uppercase tracking-tighter leading-none">{item.name}</h4>
                          <button onClick={() => removeItem(item.id)} className="text-black/10 hover:text-accent transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                           <p className="text-lg font-black text-black italic">${item.price}</p>
                           <div className="flex items-center glass rounded-xl border-black/5">
                             <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-black/40 hover:text-black">-</button>
                             <span className="px-3 font-black text-xs text-black">{item.quantity}</span>
                             <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-black/40 hover:text-black">+</button>
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="p-8 border-t border-black/5 bg-secondary/5 space-y-8">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-black/20 uppercase tracking-[0.3em]">Total Credits Due</p>
                       <p className="text-4xl font-black text-black italic drop-shadow-sm">${cartTotal.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black text-accent uppercase tracking-widest">Protocol Sync: Active</p>
                    </div>
                  </div>
                  
                  <Link 
                    href="/checkout" 
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-black text-white py-6 rounded-2xl font-black text-lg uppercase tracking-tighter flex items-center justify-center gap-3 shadow-2xl hover:shadow-accent/20 hover:scale-[1.02] transition-all"
                  >
                    AUTHORIZE CHECKOUT
                    <ArrowRight size={20} />
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
