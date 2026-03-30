"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Sparkles, HelpCircle } from "lucide-react";
import { useState } from "react";

export default function FAQPage() {
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  const faqs = [
    { q: "Is orbital shipping available?", a: "Yes, our delivery network spans across all major terrestrial sectors and initial orbital nodes. We utilize premium logistics for rapid deployment." },
    { q: "How do I synchronize my session?", a: "Sessions are synchronized via the 'Initialize Session' portal using your secure coordinates (email). A magic link will be dispatched to your vault." },
    { q: "What is the return protocol?", a: "We offer a 30-day de-synchronization window. If an asset does not meet your specifications, the return process is seamless and zero-friction." },
    { q: "Are transactions encrypted?", a: "All credit transfers are shielded by 256-bit quantum-linked encryption, ensuring total privacy across the decentralized grid." },
    { q: "Can I upgrade my access role?", a: "Access roles (Buyer, Retailer, Admin) are assigned during registry. To request a role elevation, contact central support nodes." }
  ];
  
  return (
    <main className="min-h-screen bg-background py-24 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        <div className="space-y-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-primary font-bold tracking-[0.3em] uppercase text-xs"
          >
            <HelpCircle size={14} />
            Knowledge // Base
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none"
          >
            Query.Grid
          </motion.h1>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card border-white/5 transition-all duration-500 overflow-hidden ${activeIdx === i ? 'neon-border bg-white/[0.03]' : 'hover:border-white/10'}`}
            >
              <button 
                onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                className="w-full text-left p-8 flex items-center justify-between gap-6"
              >
                <span className="text-xl md:text-2xl font-black uppercase tracking-tight text-white/80">{faq.q}</span>
                <div className={`p-2 glass rounded-full text-primary transition-transform duration-500 ${activeIdx === i ? 'rotate-180' : ''}`}>
                  {activeIdx === i ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              
              <AnimatePresence>
                {activeIdx === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-8 text-white/40 text-lg leading-relaxed border-t border-white/5 pt-6 max-w-3xl">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
