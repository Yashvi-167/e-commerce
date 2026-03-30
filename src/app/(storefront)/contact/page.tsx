"use client";
import { motion } from "framer-motion";
import { Mail, MessageSquare, MapPin, Phone, ArrowRight, Sparkles, Ghost } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Signal transmitted. Awaiting sync response.", {
      className: "glass border-accent text-black font-black uppercase text-[10px] tracking-widest",
      icon: <Sparkles className="text-accent" size={16} />
    });
  };

  return (
    <main className="min-h-screen bg-background pb-32 pt-24 px-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        <div className="flex flex-col md:flex-row items-end justify-between gap-12 border-b border-black/5 pb-20">
          <div className="space-y-6 max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-accent font-black tracking-[0.4em] uppercase text-[10px]"
            >
              <Sparkles size={14} />
              Comms // Hub
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none italic text-black"
            >
              Contact. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">Registry.</span>
            </motion.h1>
          </div>
          <div className="md:w-1/3 text-right">
             <p className="text-xl text-black/40 font-medium leading-relaxed lowercase tracking-tight italic">
               Synchronize your queries with our central intelligence node.
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          <div className="space-y-12">
            {[
              { icon: <Mail size={24} />, title: "Transmission Node", detail: "Registry@antigravity.sector" },
              { icon: <Phone size={24} />, title: "Quantum Line", detail: "+077 (0) 954.SYC" },
              { icon: <MapPin size={24} />, title: "Coordinate Set", detail: "Sector 7, Atmospheric Grid" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-8 group"
              >
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-accent group-hover:bg-black group-hover:text-white transition-all duration-500 border-black/5 shadow-lg bg-white">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-black text-black uppercase tracking-widest">{item.title}</h3>
                  <p className="text-xl font-bold text-black/40 uppercase tracking-tighter italic">{item.detail}</p>
                </div>
              </motion.div>
            ))}

            <div className="glass-card p-10 border-black/5 space-y-6 bg-secondary/10">
               <Ghost className="text-black/5" size={64} />
               <p className="text-sm font-black text-black/20 uppercase tracking-[0.3em]">Estimated Sync Delta: 2.4ms</p>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-10 md:p-16 border-black/5 bg-white shadow-3xl space-y-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[40px] rounded-full" />
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/20 ml-2">Identifier</label>
                  <input required placeholder="NAME" className="w-full glass border-black/5 px-6 py-4 text-xs font-black tracking-widest text-black focus:outline-none focus:neon-border transition-all bg-secondary/5" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/20 ml-2">Coordinate</label>
                  <input required type="email" placeholder="EMAIL" className="w-full glass border-black/5 px-6 py-4 text-xs font-black tracking-widest text-black focus:outline-none focus:neon-border transition-all bg-secondary/5" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-black/20 ml-2">Manifest // Message</label>
                <textarea rows={4} required placeholder="DESCRIBE YOUR QUERY..." className="w-full glass border-black/5 px-6 py-4 text-xs font-black tracking-widest text-black focus:outline-none focus:neon-border transition-all bg-secondary/5 resize-none" />
              </div>
              <button className="w-full bg-black text-white font-black py-6 rounded-2xl hover:bg-accent transition-all uppercase tracking-tighter text-lg shadow-xl flex items-center justify-center gap-4 group">
                TRANSMIT SIGNAL
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
