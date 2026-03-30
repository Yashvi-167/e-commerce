"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Ghost, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-6">
      {/* Dynamic Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-secondary/30 blur-[100px] rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/20 blur-[120px] rounded-full animate-pulse" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Content */}
        <div className="space-y-10 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center lg:justify-start gap-3"
          >
            <div className="h-[2px] w-12 bg-accent rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent">Antigravity // Pastel Protocol</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-black italic"
          >
            Defying <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">Gravity.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-black/40 font-medium max-w-lg leading-relaxed lowercase tracking-tight"
          >
            Experience the weightless side of premium essentials. Curated objects in a pallet of sunset oranges and pastel pinks.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4"
          >
            <Link 
              href="/collections" 
              className="group bg-black text-white px-10 py-5 rounded-2xl font-black text-lg uppercase tracking-tighter flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-accent/20"
            >
              INITIALIZE DISCOVERY
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex -space-x-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-secondary/50 flex items-center justify-center overflow-hidden">
                   <img src={`https://i.pravatar.cc/150?u=user${i}`} alt="" />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-4 border-white bg-black flex items-center justify-center text-white text-[10px] font-black">
                +4k
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Floating Cards */}
        <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
           {/* Main Float Card */}
           <motion.div 
             animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             className="glass-card w-[280px] md:w-[350px] aspect-[3/4] p-6 relative z-20 border-white shadow-2xl"
           >
             <div className="w-full h-full rounded-2xl bg-secondary overflow-hidden relative group">
                <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-700 group-hover:scale-110" alt="Product" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-white uppercase tracking-widest">New Arrival</p>
                      <h3 className="text-xl font-black text-white uppercase tracking-tighter italic leading-none">Aura.X1</h3>
                   </div>
                   <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-white">
                      <ShoppingBag size={18} />
                   </div>
                </div>
             </div>
           </motion.div>

           {/* Small Accent Card */}
           <motion.div 
             animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
             transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
             className="glass-card absolute top-10 right-0 md:-right-10 w-48 p-4 z-30 shadow-xl border-white"
           >
             <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-black/60">Live // Registry</span>
               </div>
               <div className="h-1 bg-black/5 rounded-full overflow-hidden">
                 <motion.div 
                   animate={{ width: ["100%", "30%", "100%"] }}
                   transition={{ duration: 4, repeat: Infinity }}
                   className="h-full bg-accent" 
                 />
               </div>
               <p className="text-[10px] font-bold text-black uppercase italic leading-tight">95.4% Sync Correctness</p>
             </div>
           </motion.div>

           {/* Backdrop Card */}
           <motion.div 
             animate={{ scale: [1, 1.05, 1], rotate: [0, -3, 0] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/50 blur-[40px] rounded-[3rem] z-10"
           />
        </div>

      </div>
    </section>
  );
}
