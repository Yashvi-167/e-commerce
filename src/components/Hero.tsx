"use client";
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 blur-[120px] rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 blur-[120px] rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <div className="flex flex-col items-start gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass px-4 py-2 rounded-full border-white/10 flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-white/60 uppercase"
          >
            <Sparkles size={14} className="text-primary" />
            Welcome to the Future of Commerce
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white"
          >
            DEFEAT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary">GRAVITY.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md text-lg text-white/40 leading-relaxed font-medium"
          >
            Experience a curated selection of premium goods delivered with zero friction. Our interface is designed to make shopping feel weightless.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/collections" className="glass px-8 py-4 rounded-2xl flex items-center gap-3 font-bold bg-primary text-white hover:neon-border hover:scale-105 transition-all duration-300">
              EXPLORE NOW <ArrowRight size={20} />
            </Link>
            <Link href="/about" className="glass px-8 py-4 rounded-2xl flex items-center gap-3 font-bold text-white hover:bg-white/5 transition-all">
              OUR MISSION
            </Link>
          </motion.div>
        </div>

        {/* Visual Content (Floating Cards) */}
        <div className="relative h-[500px] lg:h-[600px] hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Main Floating Card */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-[300px] h-[400px] glass-card p-6 flex flex-col justify-end gap-4 border-white/20 relative z-20"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/30 blur-2xl rounded-full" />
              <div className="h-48 w-full bg-gradient-to-br from-white/10 to-transparent rounded-xl" />
              <div>
                <h3 className="text-xl font-bold">Neo-Glow Sneakers</h3>
                <p className="text-sm text-white/40">$249.00</p>
              </div>
              <button className="w-full py-3 glass rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary transition-all">
                Quick Add
              </button>
            </motion.div>

            {/* Smaller Floating Cards */}
            <motion.div
              animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-20 right-10 w-48 h-32 glass-card p-4 border-white/10 z-10"
            >
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary/40" />
                <div className="flex-1 space-y-2">
                  <div className="h-2 w-full bg-white/10 rounded" />
                  <div className="h-2 w-2/3 bg-white/10 rounded" />
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-20 left-10 w-56 h-40 glass-card p-5 border-white/10 z-30"
            >
              <div className="flex items-center gap-3 mb-4">
                <ShoppingBag className="text-primary" size={20} />
                <span className="text-xs font-bold uppercase tracking-widest text-white/60">Trending</span>
              </div>
              <div className="h-16 w-full bg-gradient-to-r from-white/5 to-transparent rounded-lg" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
