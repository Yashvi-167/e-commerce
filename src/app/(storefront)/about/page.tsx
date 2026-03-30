"use client";
import { motion } from "framer-motion";
import { Sparkles, Ghost, Shield, Zap, Heart, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pb-32 pt-24 px-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-accent/10 blur-[120px] rounded-full" />

      <div className="max-w-4xl mx-auto space-y-20 relative z-10">
        
        <div className="text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-accent font-black tracking-[0.4em] uppercase text-[10px]"
          >
            <Sparkles size={14} />
            Origin // Protocol
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none italic text-black"
          >
            Defying. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">Standard.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-black/40 font-medium max-w-2xl mx-auto leading-relaxed lowercase tracking-tight italic"
          >
            Antigravity is more than a registry; it is a weightless ecosystem where aesthetic precision meets quantum-linked functional excellence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { icon: <Shield size={24} />, title: "Secure // Sync", text: "End-to-end encrypted design protocols ensuring every asset is verified for the elite collection." },
            { icon: <Zap size={24} />, title: "Rapid // Pulse", text: "Optimized orbital delivery systems that defy traditional logistics through sheer velocity." },
            { icon: <Heart size={24} />, title: "Soul // Logic", text: "A curated pallet of sunset oranges and pastel pinks designed to resonate with the atmospheric spirit." },
            { icon: <Globe size={24} />, title: "Global // Grid", text: "Bridging the gap between the physical and the weightless across all sectors." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 space-y-6 border-black/5 bg-white shadow-xl hover:shadow-2xl group transition-all"
            >
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white group-hover:bg-accent transition-colors shadow-lg">
                {item.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black uppercase tracking-tighter text-black italic leading-none">{item.title}</h3>
                <p className="text-sm text-black/40 font-medium lowercase leading-relaxed tracking-tight">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="glass-card p-10 md:p-16 border-black/5 bg-black text-white text-center space-y-10 relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px] rounded-full" />
           <Ghost size={64} className="mx-auto text-accent animate-pulse" />
           <div className="space-y-4">
              <h2 className="text-4xl font-black uppercase tracking-tighter italic">Join the Weightless.</h2>
              <p className="text-white/40 max-w-lg mx-auto lowercase font-medium text-lg leading-tight">
                Authorize your coordinates and begin your synchronization with the Antigravity Registry.
              </p>
           </div>
           <button className="bg-white text-black font-black uppercase px-12 py-5 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl">
              INITIALIZE SYNC
           </button>
        </motion.div>

      </div>
    </main>
  );
}
