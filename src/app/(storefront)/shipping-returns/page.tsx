"use client";
import { motion } from "framer-motion";
import { Truck, RotateCcw, ShieldCheck, Sparkles, Box, Clock } from "lucide-react";

export default function ShippingReturnsPage() {
  return (
    <main className="min-h-screen bg-background py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full" />

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        <div className="space-y-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-primary font-bold tracking-[0.3em] uppercase text-xs"
          >
            <Truck size={14} />
            Logistics // Policy
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none"
          >
            Shipping.Returns
          </motion.h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Shipping Sector */}
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="glass-card p-12 space-y-8 border-white/5 bg-white/[0.02]"
          >
            <div className="flex items-center gap-4">
              <Box className="text-primary" size={32} />
              <h2 className="text-3xl font-black uppercase tracking-tight">Shipping Protocol</h2>
            </div>
            
            <div className="space-y-6 text-white/40 text-lg leading-relaxed">
              <p>Assets are dynamically processed and dispatched within 24-48 hours of synchronization.</p>
              <div className="space-y-4">
                 {[
                   { label: "Standard Grid (3-5 Days)", value: "FREE OVER $150" },
                   { label: "Express Orbital (1-2 Days)", value: "$15.00" },
                   { label: "International Sync", value: "CALCULATED AT HEX" }
                 ].map((item, i) => (
                   <div key={i} className="flex justify-between items-center bg-white/[0.03] p-4 rounded-xl border border-white/5">
                     <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                     <span className="text-xs font-black text-primary">{item.value}</span>
                   </div>
                 ))}
              </div>
            </div>
          </motion.div>

          {/* Returns Sector */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="glass-card p-12 space-y-8 border-white/5 bg-white/[0.02]"
          >
            <div className="flex items-center gap-4">
              <RotateCcw className="text-primary" size={32} />
              <h2 className="text-3xl font-black uppercase tracking-tight">Return Framework</h2>
            </div>
            
            <div className="space-y-6 text-white/40 text-lg leading-relaxed">
              <p>We offer a 30-day de-synchronization window for all authorized assets in their original state.</p>
              <div className="space-y-4">
                <div className="glass p-6 rounded-xl border-white/5 flex items-start gap-4">
                  <Clock className="text-primary shrink-0" size={18} />
                  <p className="text-xs font-medium leading-relaxed">Returns are processed within 5 cycles of receipt. Credits are restored to original payment node.</p>
                </div>
                <div className="glass p-6 rounded-xl border-white/5 flex items-start gap-4">
                  <ShieldCheck className="text-primary shrink-0" size={18} />
                  <p className="text-xs font-medium leading-relaxed">Ensure all security tags and original containment modules are intact for valid processing.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Global Support Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 text-center border-white/5 bg-primary/5"
        >
          <p className="text-white/40 text-sm font-medium italic">
            For complex logistics queries, please open a direct channel with our <a href="/contact" className="text-primary hover:underline font-black">SUPPORT NODES</a>.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
