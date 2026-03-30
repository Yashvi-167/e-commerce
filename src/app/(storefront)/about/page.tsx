"use client";
import { motion } from "framer-motion";
import { Ghost, Sparkles, Shield, Rocket } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background py-24 px-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full" />

      <div className="max-w-5xl mx-auto space-y-24 relative z-10">
        {/* Header */}
        <div className="space-y-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-primary font-bold tracking-[0.3em] uppercase text-xs"
          >
            <Sparkles size={14} />
            The Origin // protocol
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none"
          >
            Antigravity.Core
          </motion.h1>
        </div>
        
        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 space-y-6 border-white/5 bg-white/[0.02]"
          >
            <Ghost className="text-primary" size={40} />
            <h2 className="text-3xl font-black uppercase tracking-tight">Our Mission</h2>
            <p className="text-white/40 text-lg leading-relaxed">
              We operate at the intersection of aesthetic precision and functional defiance. Antigravity was founded to curate objects that don't just exist—they resonate.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 space-y-6 border-white/5 bg-white/[0.02]"
          >
            <Shield className="text-primary" size={40} />
            <h2 className="text-3xl font-black uppercase tracking-tight">Quality Standards</h2>
            <p className="text-white/40 text-lg leading-relaxed">
              Every asset in our vault undergoes rigorous synchronization checks. We only authorize items that meet our high-altitude durability and design specs.
            </p>
          </motion.div>
        </div>

        {/* Vision Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-16 text-center space-y-10 border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <Rocket size={48} className="mx-auto text-primary animate-bounce" />
          <div className="space-y-6 max-w-2xl mx-auto">
            <h2 className="text-4xl font-black uppercase tracking-tighter italic">Defying the standard.</h2>
            <p className="text-white/60 text-xl leading-relaxed">
              "We don't follow trends; we observe them from a higher orbit. Our goal is to provide a platform where premium design is the baseline, not the exception."
            </p>
          </div>
          <div className="pt-8 border-t border-white/5">
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">Established Sector 7 // 2077</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
