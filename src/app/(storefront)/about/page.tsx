"use client";
import { motion } from "framer-motion";
import { Sparkles, Ghost, Shield, Zap, Heart, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pb-32 pt-24 px-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[hsla(330,70%,90%,0.3)] blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[hsla(330,70%,95%,0.3)] blur-[120px] rounded-full" />

      <div className="max-w-4xl mx-auto space-y-20 relative z-10">
        
        <div className="text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-pink-500 font-black tracking-[0.4em] uppercase text-[10px]"
          >
            <Sparkles size={14} />
            Our Brand Story
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none italic text-black"
          >
            Redefining <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-200">Quality</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-black/40 font-medium max-w-2xl mx-auto leading-relaxed lowercase tracking-tight italic"
          >
            Belle Ame is a premium minimalist brand dedicated to blending aesthetic precision with everyday functional excellence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { icon: <Shield size={24} />, title: "Premium Quality", text: "Every product is meticulously crafted and verified to ensure it meets our high standards for the modern home." },
            { icon: <Zap size={24} />, title: "Fast Shipping", text: "We partner with global logistics leaders to provide reliable and rapid shipping to our international community." },
            { icon: <Heart size={24} />, title: "Curated Design", text: "Our signature palette of soft roses and pastel pinks is designed to bring a sense of luxury to your lifestyle." },
            { icon: <Globe size={24} />, title: "Our Community", text: "Connecting minimalist lovers across the globe through a shared passion for clean, functional design." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-10 space-y-6 border-black/5 bg-white shadow-xl hover:shadow-2xl group transition-all"
            >
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white group-hover:bg-pink-500 transition-colors shadow-lg">
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
           <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/20 blur-[100px] rounded-full" />
           <Ghost size={64} className="mx-auto text-pink-500 animate-pulse" />
           <div className="space-y-4">
              <h2 className="text-4xl font-black uppercase tracking-tighter italic">Join the Belle Ame Community</h2>
              <p className="text-white/40 max-w-lg mx-auto lowercase font-medium text-lg leading-tight">
                Sign up for our newsletter to receive exclusive updates and early access to our latest collections.
              </p>
           </div>
           <button className="bg-white text-black font-black uppercase px-12 py-5 rounded-2xl hover:bg-pink-500 hover:text-white transition-all shadow-2xl">
              JOIN NOW
           </button>
        </motion.div>

      </div>
    </main>
  );
}
