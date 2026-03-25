"use client";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { X, Trash2, Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, removeFromCart, updateQuantity, cartTotal } = useCart();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCartOpen(false); // smoothly close the navigational drawer
    router.push('/checkout'); // fire direct navigation to bill page
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity" onClick={() => setIsCartOpen(false)} />
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-secondary border-l border-slate-700 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <h2 className="text-2xl font-black text-foreground uppercase tracking-tighter">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-accent transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-slate-400 flex flex-col items-center justify-center h-full gap-4">
              <span className="text-5xl opacity-50">🛍️</span>
              <p className="font-medium">Your cart is empty.</p>
              <button onClick={() => setIsCartOpen(false)} className="mt-4 px-6 py-2 border border-slate-400 rounded-full font-bold hover:bg-slate-800 hover:text-foreground hover:border-transparent transition-all">
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 items-center bg-primary p-4 rounded-2xl border border-slate-700 shadow-sm relative group">
                <img src={item.image || "https://images.unsplash.com/photo-1556821840?auto=format&fit=crop&q=80"} alt={item.name} className="w-20 h-20 bg-slate-800 rounded-xl flex-shrink-0 object-cover" />
                <div className="flex-1 space-y-1">
                  <h4 className="font-bold text-foreground leading-tight">{item.name}</h4>
                  <div className="text-accent font-black">${(item.price * item.quantity).toFixed(2)}</div>
                  
                  {/* Quantity Adjuster */}
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center text-slate-500 hover:text-foreground transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="font-bold text-foreground text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 bg-slate-800 rounded-full flex items-center justify-center text-slate-500 hover:text-foreground transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                
                <button onClick={() => removeFromCart(item.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-slate-700 bg-primary shadow-[0_-10px_40px_rgba(0,0,0,0.05)] space-y-4">
            <div className="flex justify-between items-end mb-4">
              <span className="text-slate-500 font-bold uppercase tracking-wider text-sm">Subtotal</span>
              <span className="text-2xl font-black text-foreground">${cartTotal.toFixed(2)}</span>
            </div>
            <p className="text-sm text-slate-400 text-center mb-2">Shipping and taxes calculated at checkout.</p>
            <button 
              onClick={handleCheckout}
              className="w-full bg-accent text-primary flex items-center justify-center gap-2 h-14 rounded-full font-black text-lg hover:scale-[1.02] shadow-[0_0_20px_rgba(224,122,95,0.3)] transition-transform"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
