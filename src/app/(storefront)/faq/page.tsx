"use client";
import { motion } from "framer-motion";
import { Ghost, Sparkles, ChevronDown, HelpCircle, Zap, Shield } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    { q: "What is the Belle Ame design philosophy?", a: "We focus on a minimalist aesthetic using a curated palette of soft roses, pastel pinks, and blacks for a clean, premium look." },
    { q: "Is my payment information secure?", a: "Yes, every transaction is processed through industry-standard SSL encryption to ensure your data stays safe." },
    { q: "How does international shipping work?", a: "We ship globally via premium express couriers, ensuring your order arrives safely and quickly at your address." },
    { q: "Can I change my order after it has been placed?", a: "Once an order is confirmed, please contact our support team immediately if you need to make any changes." }
  ];

  return (
    <main className="min-h-screen bg-background pb-32 pt-24 px-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[hsla(330,70%,90%,0.3)] blur-[120px] rounded-full" />
      
      <div className="max-w-4xl mx-auto space-y-20 relative z-10">
        
        <div className="space-y-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-pink-500 font-black tracking-[0.4em] uppercase text-[10px]"
          >
            <HelpCircle size={14} className="text-pink-500" />
            Common Inquiries
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none italic text-black"
          >
            Frequently Asked <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-200">Questions</span>
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
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-black italic group-hover:text-pink-500 transition-colors">
                    {faq.q}
                  </h3>
                  <p className="text-lg text-black/40 font-medium lowercase leading-relaxed tracking-tight group-hover:text-black/60 transition-colors">
                    {faq.a}
                  </p>
                </div>
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-pink-500 group-hover:bg-black group-hover:text-white transition-all shadow-sm border-black/5 bg-white">
                   <ChevronDown size={20} className="group-hover:rotate-180 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-black/5">
           <div className="glass p-10 rounded-3xl border-black/5 space-y-4 bg-white shadow-xl">
              <Zap className="text-pink-500" size={24} />
              <h4 className="font-black uppercase tracking-widest text-xs text-black">Fast Support</h4>
              <p className="text-[10px] font-black text-black/10 uppercase tracking-[0.3em]">Response Time: ~10m</p>
           </div>
           <div className="glass p-10 rounded-3xl border-black/5 space-y-4 bg-white shadow-xl">
              <Shield className="text-pink-500" size={24} />
              <h4 className="font-black uppercase tracking-widest text-xs text-black">Secure Shopping</h4>
              <p className="text-[10px] font-black text-black/10 uppercase tracking-[0.3em]">SSL Protected</p>
           </div>
        </div>

      </div>
    </main>
  );
}
