"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Star, Mail, ShoppingBag } from "lucide-react";
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
            { icon: <Truck size={32} />, title: "Fast Shipping", desc: "Express delivery for all your essentials." },
            { icon: <ShieldCheck size={32} />, title: "Secure Payments", desc: "Safe and encrypted checkout processing." },
            { icon: <RotateCcw size={32} />, title: "Easy Returns", desc: "Hassle-free return policy for peace of mind." }
          ].map((usp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 flex flex-col items-center text-center gap-6 group hover:neon-border"
            >
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(244,143,177,0.2)]">
                {usp.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight uppercase">{usp.title}</h3>
                <p className="text-black/40 text-sm leading-relaxed">{usp.desc}</p>
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
              Featured Collections
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Men's Core", img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80", dept: "Men" },
              { title: "Women's Neo", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80", dept: "Women" },
              { title: "Kids' Alpha", img: "/kids-alpha.png", dept: "Kids" }
            ].map((collection, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/collections?dept=${collection.dept}`} className="group relative h-[500px] rounded-[2rem] overflow-hidden block border border-black/5 hover:border-accent/30 transition-all">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10"></div>
                  <img src={collection.img} alt={collection.title} className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-15" />
                  <div className="absolute bottom-10 left-10 z-20 space-y-4">
                    <p className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">Premium Selection 0{i+1}</p>
                    <h3 className="text-4xl font-black uppercase tracking-tighter text-white italic">{collection.title}</h3>
                    <div className="flex items-center gap-3 text-white font-bold group-hover:text-accent transition-colors">
                      VIEW COLLECTION <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CONTACT SECTION */}
      <section className="w-full py-32 px-6 relative">
        <div className="max-w-4xl mx-auto glass-card p-16 flex flex-col items-center text-center gap-12 overflow-hidden relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent/20 blur-[100px] rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/20 blur-[100px] rounded-full" />
          
          <div className="flex flex-col items-center gap-6 relative z-10">
            <div className="w-20 h-20 glass rounded-3xl flex items-center justify-center text-accent shadow-[0_0_30px_rgba(244,143,177,0.3)] bg-white/5 border-white/10 animate-pulse">
              <Mail size={40} />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Contact Belle Ame</h2>
              <p className="text-white/40 text-lg max-w-lg mx-auto leading-relaxed">
                Reach out for inquiries, collaborations, or custom commissions. Our team will respond shortly.
              </p>
            </div>
          </div>
          
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              import("sonner").then(({ toast }) => {
                toast.success("Message sent successfully.", {
                  className: "glass border-accent text-black font-black uppercase text-[10px] tracking-widest",
                  icon: <Star className="text-accent" size={16} />
                });
              });
            }}
            className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 text-left"
          >
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-black/30 ml-2 italic">Your Name</label>
              <input required placeholder="JOHN DOE" className="w-full glass border-black/5 px-8 py-5 text-xs font-bold tracking-widest text-black focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all bg-white/2" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-black/30 ml-2 italic">Email Address</label>
              <input required type="email" placeholder="NAME@EXAMPLE.COM" className="w-full glass border-black/5 px-8 py-5 text-xs font-bold tracking-widest text-black focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all bg-white/2" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-black/30 ml-2 italic">Message</label>
              <textarea required rows={4} placeholder="DESCRIBE YOUR QUERY..." className="w-full glass border-black/5 px-8 py-5 text-xs font-bold tracking-widest text-black focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all bg-white/2 resize-none" />
            </div>
            <button className="md:col-span-2 bg-gradient-to-r from-accent to-secondary text-black py-6 rounded-3xl font-black hover:scale-[1.02] transition-all text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-4 group mt-4 shadow-[0_20px_40px_rgba(244,143,177,0.2)]">
              SEND MESSAGE
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
