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
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent">BELLE AME</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-black italic"
          >
            Timeless <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">Elegance.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-black/40 font-medium max-w-lg leading-relaxed lowercase tracking-tight"
          >
            Experience the art of dressing beautifully. Premium essentials and curated collections designed to elevate your everyday style.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link 
                href="/collections" 
                className="group bg-black text-white px-10 py-5 rounded-2xl font-black text-lg uppercase tracking-tighter flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-accent/20"
              >
                SHOP NOW
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="flex items-center gap-3 glass px-6 py-4 rounded-2xl border-white/20 shadow-sm">
                 <span className="text-[10px] font-black uppercase tracking-widest text-black/30 mr-2 flex items-center gap-2">
                   Explore <Ghost className="w-3 h-3 inline-block opacity-50"/>
                 </span>
                 {['Men', 'Women', 'Kids'].map(dept => (
                   <Link 
                     key={dept} 
                     href={`/collections?dept=${dept}`} 
                     className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-black/70 hover:text-white hover:bg-black transition-all hover:scale-105 active:scale-95 border border-transparent hover:border-black/10"
                   >
                      {dept}
                   </Link>
                 ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Floating Cards (Restored) */}
        <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
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
                  <p className="text-[10px] font-black text-white uppercase tracking-widest">Premium Selection</p>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter italic leading-none">BELLE AME Core</h3>
                </div>
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-white">
                  <ShoppingBag size={18} />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="glass-card absolute top-10 right-0 md:-right-10 w-48 p-4 z-30 shadow-xl border-white"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                <span className="text-[8px] font-black uppercase tracking-widest text-black/60">New Arrivals</span>
              </div>
              <div className="h-1 bg-black/5 rounded-full overflow-hidden">
                <motion.div animate={{ width: ["100%", "30%", "100%"] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-accent" />
              </div>
              <p className="text-[10px] font-bold text-black uppercase italic leading-tight">Stock Updated</p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
