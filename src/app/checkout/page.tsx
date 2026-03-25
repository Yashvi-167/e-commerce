"use client";
import { useCart } from "@/components/CartProvider";
import { ArrowLeft, CheckCircle2, ShieldCheck, CreditCard } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Compute Bill Details
  const tax = cartTotal * 0.08; // 8% generic tax
  const shipping = cartTotal > 150 || items.length === 0 ? 0 : 15.00;
  const finalTotal = cartTotal + tax + shipping;

  const handlePay = () => {
     if (items.length === 0) return;
     
     setIsProcessing(true);
     setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(true);
        if (clearCart) clearCart(); 
        toast.success("Payment authorized successfully!");
     }, 2500);
  }

  if (isSuccess) {
     return (
       <main className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-primary text-center">
         <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-8 animate-bounce">
           <CheckCircle2 size={48} />
         </div>
         <h1 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter mb-4">Payment Confirmed</h1>
         <p className="text-slate-400 text-lg font-medium mb-12 max-w-lg mx-auto">
           Your extremely premium mock payment was processed flawlessly! A detailed digital receipt mapping your exact bill has been virtually emailed to you.
         </p>
         <Link href="/collections" className="bg-accent text-primary font-black uppercase text-lg px-12 py-5 rounded-2xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(224,122,95,0.2)]">
           Return to Storefront
         </Link>
       </main>
     );
  }

  return (
    <main className="min-h-screen bg-primary">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link href="/collections" className="inline-flex items-center gap-2 text-slate-400 hover:text-accent font-bold uppercase tracking-widest text-sm mb-12 transition-colors">
          <ArrowLeft size={16} /> Back to Catalog
        </Link>
        
        <h1 className="text-5xl md:text-6xl font-black text-foreground uppercase tracking-tighter mb-12">Finalize Invoice</h1>
        
        <div className="flex flex-col lg:flex-row gap-12">
           {/* Detailed Bill / Order Summary */}
           <div className="flex-1 bg-secondary p-8 md:p-12 rounded-[2.5rem] border border-slate-700/50 shadow-2xl relative">
              <h2 className="text-2xl font-black text-foreground uppercase tracking-tight mb-8">Official Bill details</h2>
              
              {items.length === 0 ? (
                 <div className="text-slate-400 font-medium py-12 text-center text-lg">Your cart is completely bare. There is nothing to bill.</div>
              ) : (
                <div className="space-y-8">
                  {/* Map physical products directly onto the invoice */}
                  <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 scrollbar-hide">
                    {items.map(product => (
                      <div key={product.id} className="flex gap-6 items-center bg-primary p-5 rounded-2xl border border-slate-700/30">
                        <img src={product.image} className="w-20 h-20 rounded-xl bg-slate-800 object-cover shadow-inner" />
                        <div className="flex-1">
                          <h4 className="font-bold text-foreground text-lg">{product.name}</h4>
                          <p className="text-sm font-bold text-slate-500 mt-1">Qty: {product.quantity}</p>
                        </div>
                        <div className="font-black text-accent text-xl">
                          ${(product.price * product.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Calculated Values */}
                  <div className="pt-6 border-t border-slate-700/50 space-y-4 font-bold text-sm tracking-wide">
                    <div className="flex justify-between text-slate-400">
                      <span>Subtotal</span>
                      <span className="text-foreground">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Computed State Tax (8%)</span>
                      <span className="text-foreground">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Express Shipping</span>
                      <span className={shipping === 0 ? "text-green-400" : "text-foreground"}>
                        {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-700/50 flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-2">
                    <span className="text-lg font-bold text-slate-400 uppercase tracking-widest">Total Amount Due</span>
                    <span className="text-5xl font-black text-foreground tracking-tighter">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              )}
           </div>

           {/* Payment Simulator Block */}
           <div className="lg:w-[400px] space-y-6">
              <div className="bg-secondary p-8 rounded-3xl border border-slate-700/50 shadow-lg sticky top-24">
                 <h3 className="font-black text-foreground uppercase tracking-tighter mb-4 flex items-center gap-3 text-xl">
                   <ShieldCheck className="text-accent" size={24} /> Encrypted Node
                 </h3>
                 <p className="text-sm text-slate-400 font-medium mb-8 leading-relaxed">
                   This interface securely renders the contextual cart state. Clicking the authorization button below simulates withdrawing funds and physically clearing your active session state.
                 </p>
                 <button 
                  onClick={handlePay}
                  disabled={isProcessing || items.length === 0}
                  className="w-full bg-accent text-primary h-16 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] shadow-[0_0_20px_rgba(224,122,95,0.3)] transition-transform disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
                 >
                   {isProcessing ? "Authorizing Network..." : <><CreditCard size={20} /> Authorize Payment</>}
                 </button>
              </div>
           </div>
        </div>
      </div>
    </main>
  );
}
