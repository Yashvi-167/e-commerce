"use client";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Phone, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message synchronized with support nodes.", {
        className: "glass neon-border text-white border-primary/50",
      });
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-background py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full" />

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        <div className="space-y-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 text-primary font-bold tracking-[0.3em] uppercase text-xs"
          >
            <Sparkles size={14} />
            Support // node
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none"
          >
            Establish.Sync
          </motion.h1>
          <p className="text-white/40 text-lg font-medium max-w-lg mx-auto uppercase tracking-widest leading-relaxed">
            Need assistance or have a technical query? Open a direct channel below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {[
              { icon: <Mail size={20} />, label: "Grid Email", value: "support@antigravity.io" },
              { icon: <Phone size={20} />, label: "Direct Comms", value: "+1 (888) 000-0000" },
              { icon: <MessageSquare size={20} />, label: "Chat Status", value: "Always Online" }
            ].map((item, i) => (
              <div key={i} className="glass-card p-8 border-white/5 space-y-4 group hover:border-primary/20 transition-all">
                <div className="p-3 glass rounded-xl text-primary w-min">{item.icon}</div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">{item.label}</p>
                  <p className="text-white font-bold">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 glass-card p-10 md:p-16 border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full" />
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] ml-4">Identifier // Name</label>
                  <input required placeholder="YOUR NAME" className="w-full glass border-white/5 px-6 py-5 rounded-2xl text-white text-xs font-bold tracking-widest focus:outline-none focus:neon-border transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] ml-4">Coordinate // Email</label>
                  <input required type="email" placeholder="USER@DOMAIN.COM" className="w-full glass border-white/5 px-6 py-5 rounded-2xl text-white text-xs font-bold tracking-widest focus:outline-none focus:neon-border transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] ml-4">Transmission // Message</label>
                <textarea required rows={6} placeholder="HOW CAN WE ASSIST?" className="w-full glass border-white/5 px-6 py-5 rounded-2xl text-white text-xs font-bold tracking-widest focus:outline-none focus:neon-border transition-all resize-none" />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full md:w-auto bg-primary text-white px-12 py-5 font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:neon-border transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(139,92,246,0.2)] disabled:opacity-50"
              >
                {loading ? "SENDING..." : <><Send size={18} /> INITIALIZE SYNC</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
