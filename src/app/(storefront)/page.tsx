"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Star, Ghost, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Hero from "@/components/Hero";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. TRUST BADGES / USP SECTION */}
      <section className="w-full py-20 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Truck size={32} />, title: "Hyper-Speed Shipping", desc: "Coordinated logistics for near-instant delivery." },
            { icon: <ShieldCheck size={32} />, title: "Quantum Security", desc: "Encryption that exceeds current standard requirements." },
            { icon: <RotateCcw size={32} />, title: "Seamless Returns", desc: "Zero-friction return process for total peace of mind." }
          ].map((usp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 flex flex-col items-center text-center gap-6 group hover:neon-border"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                {usp.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight uppercase">{usp.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{usp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED COLLECTIONS */}
      <section className="w-full py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col items-center text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold tracking-[0.3em] uppercase text-xs"
            >
              Curated Selection
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
            >
              The 2077 Collections
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Men's Core", img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80", dept: "Men" },
              { title: "Women's Neo", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80", dept: "Women" }
            ].map((collection, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Link href={`/collections?dept=${collection.dept}`} className="group relative h-[500px] rounded-[2rem] overflow-hidden block">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10"></div>
                  <img src={collection.img} alt={collection.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-15" />
                  <div className="absolute bottom-10 left-10 z-20 space-y-4">
                    <h3 className="text-4xl font-black uppercase tracking-tighter text-white">{collection.title}</h3>
                    <div className="flex items-center gap-3 text-primary font-bold group-hover:translate-x-2 transition-transform">
                      VIEW COLLECTION <ArrowRight size={20} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA / NEWSLETTER */}
      <section className="w-full py-32 px-6 relative">
        <div className="max-w-4xl mx-auto glass-card p-16 flex flex-col items-center text-center gap-10 overflow-hidden relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/20 blur-[100px] rounded-full" />
          
          <Ghost size={64} className="text-primary animate-bounce" />
          <div className="space-y-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Become a Pioneer</h2>
            <p className="text-white/40 text-lg max-w-lg mx-auto">
              Join our network to receive early access to experimental drops and exclusive holographic assets.
            </p>
          </div>
          
          <form className="w-full max-w-md flex flex-col sm:flex-row gap-4 relative z-10">
            <input 
              type="email" 
              placeholder="ENTER YOUR COORDINATES (EMAIL)" 
              className="flex-1 glass rounded-2xl px-6 py-4 text-xs font-bold tracking-widest focus:outline-none focus:neon-border transition-all"
            />
            <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:neon-border transition-all whitespace-nowrap">
              STAY SYNCED
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
