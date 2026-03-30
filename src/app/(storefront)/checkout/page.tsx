"use client";
import { useCart } from "@/components/CartProvider";
import { ArrowLeft, CheckCircle2, ShieldCheck, CreditCard, Sparkles, Ghost, Package } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Compute Bill Details
  const tax = cartTotal * 0.18;
  const shipping = cartTotal > 150 || items.length === 0 ? 0 : 15.00;
  const finalTotal = cartTotal + tax + shipping;

  const handlePay = () => {
    if (items.length === 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      if (clearCart) clearCart();
      toast.success("Transaction localized and verified.", {
        className: "glass neon-border text-white border-primary/50",
      });
    }, 2500);
  }

  if (isSuccess) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card p-16 flex flex-col items-center gap-8 max-w-xl border-primary/20 shadow-[0_0_50px_rgba(139,92,246,0.2)]"
        >
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center text-primary animate-pulse neon-border">
            <CheckCircle2 size={48} />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Sync Complete</h1>
            <p className="text-white/40 text-lg leading-relaxed">
              Your transmission has been verified. Assets are currently being routed to your coordinates.
            </p>
          </div>
          <Link href="/collections" className="bg-primary text-white font-black uppercase text-lg px-12 py-5 rounded-2xl hover:neon-border transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)]">
            RETURN TO GRID
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-32 pt-10 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link href="/collections" className="inline-flex items-center gap-3 text-white/20 hover:text-white font-bold uppercase tracking-[0.2em] text-xs transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> BACK TO SECTOR
          </Link>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold tracking-[0.3em] uppercase text-xs">
              <Sparkles size={14} />
              Financial // protocol
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">Finalize.Manifest</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Detailed Bill / Order Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 glass-card p-10 border-white/5 space-y-10"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
              <h2 className="text-xl font-black uppercase tracking-tighter">Registry Summary</h2>
              <span className="glass px-4 py-1 rounded-full text-[10px] font-bold text-primary tracking-widest uppercase">{items.length} ITEMS DETECTED</span>
            </div>

            {items.length === 0 ? (
              <div className="py-20 text-center space-y-6">
                <Ghost size={48} className="text-white/5 mx-auto" />
                <p className="text-white/20 font-bold tracking-widest uppercase">No signals found in manifest.</p>
              </div>
            ) : (
              <div className="space-y-12">
                <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-4 scrollbar-hide">
                  {items.map(product => (
                    <div key={product.id} className="flex gap-8 items-center glass p-6 rounded-3xl border-white/5 group hover:border-primary/20 transition-all">
                      <div className="w-24 h-24 rounded-2xl glass border-white/5 overflow-hidden bg-black/40">
                        <img src={product.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="font-bold text-white text-xl uppercase tracking-tight">{product.name}</h4>
                        {product.variant && (
                          <div className="flex">
                            <span className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase glass px-3 py-1 rounded-full border-primary/20">
                              {product.variant}
                            </span>
                          </div>
                        )}
                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Quantity: {product.quantity}</p>
                      </div>
                      <div className="text-2xl font-black text-white italic">
                        ${(product.price * product.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-white/5 pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="glass p-6 rounded-2xl border-white/5 space-y-1">
                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Subtotal</p>
                        <p className="text-xl font-bold text-white/60">${cartTotal.toFixed(2)}</p>
                     </div>
                     <div className="glass p-6 rounded-2xl border-white/5 space-y-1">
                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Orbital Tax (18%)</p>
                        <p className="text-xl font-bold text-white/60">${tax.toFixed(2)}</p>
                     </div>
                     <div className="glass p-6 rounded-2xl border-white/5 space-y-1">
                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Secure Delivery</p>
                        <p className={`text-xl font-bold ${shipping === 0 ? "text-primary" : "text-white/60"}`}>
                          {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                        </p>
                     </div>
                  </div>

                  <div className="flex justify-between items-end bg-white/[0.02] p-8 rounded-[2rem] border border-white/5">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Total Credits Due</p>
                      <p className="text-5xl font-black text-white italic drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">${finalTotal.toFixed(2)}</p>
                    </div>
                    <div className="hidden md:block">
                       <ShieldCheck className="text-primary/40" size={32} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Payment Simulator Block */}
          <div className="space-y-8 sticky top-32">
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="glass-card p-10 border-white/5 space-y-8 bg-primary/5 neon-border"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="text-primary" size={24} />
                  <h3 className="font-black text-white uppercase tracking-tighter text-xl">Authorization</h3>
                </div>
                <p className="text-xs text-white/40 font-medium leading-relaxed tracking-wide">
                  This transaction is protected by quantum-linked encryption. Initializing checkout will finalize your manifest and clear current cache.
                </p>
              </div>
              
              <button
                onClick={handlePay}
                disabled={isProcessing || items.length === 0}
                className="w-full bg-primary text-white h-20 rounded-2xl font-black text-lg uppercase tracking-tighter flex items-center justify-center gap-4 neon-border hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                   <div className="flex items-center gap-3">
                     <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                     VERIFYING...
                   </div>
                ) : (
                  <>AUTHORIZE TRANSACTION</>
                )}
              </button>
            </motion.div>

            <div className="glass-card p-6 border-white/5 text-center">
               <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Sector 7 Security Protocol Active</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
