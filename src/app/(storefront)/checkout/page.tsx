"use client";
import { useCart } from "@/components/CartProvider";
import { ArrowLeft, CheckCircle2, ShieldCheck, CreditCard, Sparkles, Ghost, Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  useEffect(() => {
    fetch("/api/auth/session")
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        setSession(data?.user || null);
        setIsLoadingSession(false);
      })
      .catch(() => setIsLoadingSession(false));
  }, []);

  // Compute Bill Details
  const tax = cartTotal * 0.18;
  const shipping = cartTotal > 150 || items.length === 0 ? 0 : 15.00;
  const finalTotal = cartTotal + tax + shipping;

  const handlePay = () => {
    if (items.length === 0) return;

    if (!session) {
      toast.error("Account required to complete purchase.", {
        className: "glass border-accent text-black font-black uppercase text-[10px] tracking-widest",
        icon: <Ghost className="text-accent" size={16} />
      });
      router.push("/login?redirect=/checkout");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      if (clearCart) clearCart();
    toast.success("Payment processed successfully.", {
      className: "glass border-accent text-black font-black uppercase text-[10px] tracking-widest",
      icon: <Sparkles className="text-accent" size={16} />
    });
    }, 2500);
  }

  if (isSuccess) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card p-16 flex flex-col items-center gap-8 max-w-xl border-accent/20 shadow-2xl bg-white"
        >
          <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center text-accent animate-pulse border-2 border-accent shadow-lg">
            <CheckCircle2 size={48} />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-black leading-none">Order Confirmed</h1>
            <p className="text-black/40 text-lg leading-relaxed lowercase font-medium">
              Thank you for your purchase. Your order has been received and is being prepared for shipment.
            </p>
          </div>
          <Link href="/collections" className="bg-black text-white font-black uppercase text-lg px-12 py-5 rounded-2xl hover:scale-105 transition-all shadow-xl">
            CONTINUE SHOPPING
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-32 pt-10 px-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[hsla(330,70%,90%,0.5)] blur-[120px] rounded-full" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link href="/collections" className="inline-flex items-center gap-3 text-black/20 hover:text-black font-black uppercase tracking-[0.3em] text-[10px] transition-all group">
            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> BACK TO COLLECTIONS
          </Link>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-accent font-black tracking-[0.4em] uppercase text-[10px]">
              <Sparkles size={14} />
              Secure Checkout
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none italic text-black">Order Summary</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Detailed Bill / Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 glass-card p-10 border-black/5 space-y-10 bg-white"
          >
            <div className="flex items-center justify-between border-b border-black/5 pb-6">
              <h2 className="text-xl font-black uppercase tracking-tighter italic text-black">Order Items</h2>
              <span className="glass px-4 py-1 rounded-full text-[10px] font-black text-accent tracking-widest uppercase border-accent/20">{items.length} ITEMS SELECTED</span>
            </div>

            {items.length === 0 ? (
              <div className="py-20 text-center space-y-6 opacity-20">
                <Ghost size={48} className="text-black mx-auto" />
                <p className="text-black font-black tracking-widest uppercase italic">Your cart is empty.</p>
              </div>
            ) : (
              <div className="space-y-12">
                <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-4 scrollbar-hide">
                  {items.map(product => (
                    <div key={product.id} className="flex gap-8 items-center bg-secondary/5 p-6 rounded-3xl border border-black/5 group hover:border-accent/20 transition-all">
                      <div className="w-24 h-24 rounded-2xl glass border-white overflow-hidden bg-white shadow-sm">
                        <img src={product.image} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h4 className="font-black text-black text-xl uppercase tracking-tighter italic leading-none">{product.name}</h4>
                        <div className="flex items-center gap-3">
                           <p className="text-[10px] font-black text-black/20 uppercase tracking-widest">Quantity: {product.quantity}</p>
                           {product.variant && <span className="text-[10px] font-black uppercase text-accent tracking-widest bg-accent/10 px-2 py-0.5 rounded-md border border-accent/20">SIZE: {product.variant}</span>}
                        </div>
                      </div>
                      <div className="text-2xl font-black text-black italic drop-shadow-sm">
                        ₹{(product.price * product.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-black/5 pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass p-6 rounded-2xl border-black/5 space-y-1 bg-white/40">
                      <p className="text-[10px] font-black text-black/20 uppercase tracking-widest">Subtotal</p>
                      <p className="text-xl font-black text-black/60 italic">₹{cartTotal.toFixed(2)}</p>
                    </div>
                    <div className="glass p-6 rounded-2xl border-black/5 space-y-1 bg-white/40">
                      <p className="text-[10px] font-black text-black/20 uppercase tracking-widest">Sales Tax (18%)</p>
                      <p className="text-xl font-black text-black/60 italic">₹{tax.toFixed(2)}</p>
                    </div>
                    <div className="glass p-6 rounded-2xl border-black/5 space-y-1 bg-white/40">
                      <p className="text-[10px] font-black text-black/20 uppercase tracking-widest">Shipping</p>
                      <p className={`text-xl font-black italic ${shipping === 0 ? "text-accent" : "text-black/60"}`}>
                        {shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-end bg-black text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-[50px] rounded-full group-hover:bg-accent/40 transition-all shadow-[0_0_20px_rgba(244,143,177,0.3)]" />
                    <div className="space-y-1 relative z-10">
                      <p className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">Total Order Value</p>
                      <p className="text-5xl md:text-7xl font-black text-white italic tracking-tighter">₹{finalTotal.toFixed(2)}</p>
                    </div>
                    <div className="hidden md:block relative z-10">
                      <ShieldCheck className="text-accent" size={48} />
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
              className="glass-card p-10 border-black/5 space-y-8 bg-white shadow-2xl"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="text-accent" size={24} />
                  <h3 className="font-black text-black uppercase tracking-tighter italic text-xl">Authorization</h3>
                </div>
                <p className="text-[10px] lowercase font-medium text-black/40 leading-relaxed">
                  This transaction is protected by secure end-to-end encryption. Your order will be processed immediately upon confirmation.
                </p>
              </div>

              <button
                onClick={handlePay}
                disabled={isProcessing || items.length === 0 || isLoadingSession}
                className="w-full bg-black text-white h-20 rounded-2xl font-black text-lg uppercase tracking-tighter flex items-center justify-center gap-4 hover:shadow-[0_0_30px_rgba(244,143,177,0.4)] transition-all shadow-xl disabled:opacity-50 group"
              >
                {isLoadingSession ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    LOADING...
                  </div>
                ) : isProcessing ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    PROCESSING...
                  </div>
                ) : (
                  <>{session ? "COMPLETE PURCHASE" : "LOG IN TO PURCHASE"} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </motion.div>

            <div className="glass-card p-6 border-black/5 text-center bg-white/50 backdrop-blur-sm">
              <p className="text-[10px] font-black text-black/20 uppercase tracking-[0.3em]">Secure SSL Protocol Active</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
