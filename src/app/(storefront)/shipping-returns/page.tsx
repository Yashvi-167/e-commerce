"use client";
import { motion } from "framer-motion";
import { Package, Truck, RotateCcw, ShieldCheck, Sparkles, Ghost } from "lucide-react";

export default function ShippingReturnsPage() {
  return (
    <main className="min-h-screen bg-background pb-32 pt-24 px-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 blur-[120px] rounded-full" />

      <div className="max-w-4xl mx-auto space-y-20 relative z-10">
        
        <div className="space-y-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-accent font-black tracking-[0.4em] uppercase text-[10px]"
          >
            <Truck size={14} />
            Logistics // Portal
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none italic text-black"
          >
            Ships. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">Returns.</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="glass-card p-10 md:p-16 border-black/5 bg-white shadow-3xl space-y-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[40px] rounded-full" />
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white shadow-xl">
               <Package size={32} />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-black uppercase tracking-tighter italic text-black leading-none">Orbital Delivery</h2>
              <div className="space-y-4">
                 <p className="text-xl font-bold text-black/40 uppercase tracking-tighter leading-tight italic">Antigravity utilizes premium orbital pulse delivery across all sectors. All assets are synchronized within 2-4 solar cycles.</p>
                 <div className="h-px w-20 bg-accent rounded-full" />
                 <p className="text-xs text-black/20 font-black uppercase tracking-[0.3em]">Sector 7 protocol active for local transfers.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="glass-card p-10 md:p-16 border-black/5 bg-secondary/5 shadow-2xl space-y-10 relative overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/20 blur-[40px] rounded-full" />
            <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-accent shadow-lg bg-white border-black/5">
               <RotateCcw size={32} />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-black uppercase tracking-tighter italic text-black leading-none">Manifest Reversal</h2>
              <div className="space-y-4">
                 <p className="text-xl font-bold text-black/40 uppercase tracking-tighter leading-tight italic">If an asset fails to synchronize with your expectations, manifest reversal is authorized within 14 cycles of reception.</p>
                 <div className="h-px w-20 bg-black/10 rounded-full" />
                 <p className="text-xs text-black/20 font-black uppercase tracking-[0.3em]">Refunds localized within 5 sync intervals.</p>
              </div>
            </div>
          </motion.div>

        </div>

        <div className="glass-card p-10 border-black/5 flex flex-col md:flex-row items-center justify-between gap-8 bg-white shadow-xl relative overflow-hidden">
           <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-accent/5 blur-[80px] rounded-full" />
           <div className="flex items-center gap-6 relative z-10">
              <div className="p-4 bg-black rounded-2xl text-white shadow-xl">
                 <ShieldCheck size={32} />
              </div>
              <div className="space-y-1">
                 <h4 className="text-xl font-black uppercase tracking-tighter italic text-black">Quantum Insured</h4>
                 <p className="text-xs font-black text-black/30 uppercase tracking-[0.2em] italic">All shipments are locked and prioritized.</p>
              </div>
           </div>
           <Ghost className="opacity-5 relative z-10" size={80} />
        </div>

      </div>
    </main>
  );
}
