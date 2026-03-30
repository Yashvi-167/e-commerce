"use client";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, removeFromCart, updateQuantity, cartTotal } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" 
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-4 right-4 bottom-4 w-full max-w-md glass z-[101] rounded-[2.5rem] flex flex-col overflow-hidden border-white/10 shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-primary" size={24} />
                <h2 className="text-2xl font-black uppercase tracking-tighter">Your Vault</h2>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="p-2 glass rounded-full text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-6 text-center">
                  <Sparkles size={48} className="text-white/10" />
                  <div className="space-y-2">
                    <p className="font-bold tracking-widest uppercase text-white/40">Vault is empty</p>
                    <p className="text-xs text-white/20 uppercase tracking-[0.2em]">No signals detected</p>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)} 
                    className="glass px-8 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest hover:neon-border transition-all"
                  >
                    RETURN TO GRID
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="glass p-6 rounded-3xl border-white/5 relative group hover:border-primary/30 transition-all"
                  >
                    <div className="flex gap-6 items-center">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/5 bg-black/40">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="font-bold text-white uppercase tracking-tight text-lg">{item.name}</h4>
                        {item.variant && <p className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase">{item.variant}</p>}
                        <div className="text-white font-black italic">${(item.price * item.quantity).toFixed(2)}</div>
                        
                        {/* Quantity Adjuster */}
                        <div className="flex items-center gap-4 mt-4">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                            className="w-8 h-8 glass rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-black text-white text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                            className="w-8 h-8 glass rounded-full flex items-center justify-center text-white/40 hover:text-white transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="absolute top-6 right-6 text-white/20 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 border-t border-white/5 glass shadow-2xl space-y-6">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">Total Value</span>
                    <div className="text-3xl font-black text-white italic">${cartTotal.toFixed(2)}</div>
                  </div>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-primary text-white flex items-center justify-center gap-3 h-16 rounded-2xl font-black text-lg uppercase tracking-tighter neon-border hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                >
                  INITIALIZE CHECKOUT
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
