"use client";
import { motion } from "framer-motion";
import { Ghost, Sparkles, ChevronDown, HelpCircle, Zap, Shield } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    { q: "How does Antigravity define its design protocol?", a: "We utilize a 60/30/10 ratio of White, Pastel Pink, and Black accents to create a high-contrast weightless atmosphere." },
    { q: "What is the security level of the Registry?", a: "Every transaction is finalized through quantum-linked end-to-end encryption across all sectors." },
    { q: "How are atmospheric assets delivered?", a: "Logistics are handled by our proprietary orbital delivery pulses, ensuring rapid synchronization with your coordinates." },
    { q: "Can I mutate my manifest after authorization?", a: "Once a signal is finalized, changes require a manual override via the Support Hub." }
  ];

  return (
    <main className="min-h-screen bg-background pb-32 pt-24 px-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 blur-[120px] rounded-full" />
      
      <div className="max-w-4xl mx-auto space-y-20 relative z-10">
        
        <div className="space-y-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-accent font-black tracking-[0.4em] uppercase text-[10px]"
          >
            <HelpCircle size={14} />
            Query // Grid
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none italic text-black"
          >
            FAQ. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">Protocol.</span>
          </motion.h1>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 border-black/5 bg-white shadow-xl hover:shadow-2xl group transition-all"
            >
              <div className="flex justify-between items-start gap-6 cursor-pointer">
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-black italic group-hover:text-accent transition-colors">
                    {faq.q}
                  </h3>
                  <p className="text-lg text-black/40 font-medium lowercase leading-relaxed tracking-tight group-hover:text-black/60 transition-colors">
                    {faq.a}
                  </p>
                </div>
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-accent group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                   <ChevronDown size={20} className="group-hover:rotate-180 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-black/5">
           <div className="glass p-10 rounded-3xl border-black/5 space-y-4 bg-white/50 backdrop-blur-sm">
              <Zap className="text-accent" size={24} />
              <h4 className="font-black uppercase tracking-widest text-xs text-black">Rapid Support</h4>
              <p className="text-[10px] font-black text-black/20 uppercase tracking-[0.3em]">Estimated Sync: 10m</p>
           </div>
           <div className="glass p-10 rounded-3xl border-black/5 space-y-4 bg-white/50 backdrop-blur-sm">
              <Shield className="text-accent" size={24} />
              <h4 className="font-black uppercase tracking-widest text-xs text-black">Locked Security</h4>
              <p className="text-[10px] font-black text-black/20 uppercase tracking-[0.3em]">Protocol Multi-Layered</p>
           </div>
        </div>

      </div>
    </main>
  );
}
