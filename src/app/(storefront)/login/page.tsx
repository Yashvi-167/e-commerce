"use client";
import { useState } from "react";
import { Ghost, Mail, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        toast.success("Magic link dispatched to your vault.", {
          className: "glass border-accent text-black font-black uppercase text-[10px] tracking-widest",
          icon: <Sparkles className="text-accent" size={16} />
        });
      } else {
        toast.error("Transmission failed. Verify coordinates.");
      }
    } catch (err) {
      toast.error("System interference detected.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="glass-card p-12 md:p-16 border-black/5 bg-white shadow-3xl text-center space-y-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
          
          <div className="space-y-6">
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="w-20 h-20 bg-black rounded-[2rem] flex items-center justify-center text-white mx-auto shadow-2xl"
            >
              <Ghost size={32} />
            </motion.div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-accent font-black tracking-[0.4em] uppercase text-[10px]">
                <Sparkles size={14} />
                Access // Portal
              </div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-black leading-none">Initialize.Sync</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3 text-left">
              <label className="text-[10px] font-black uppercase tracking-widest text-black/20 ml-4 lowercase">Authentication Coordinates</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-accent transition-colors" size={18} />
                <input 
                  required
                  type="email" 
                  placeholder="USER@DOMAIN.COM"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass border-black/5 px-14 py-5 rounded-2xl text-xs font-black tracking-widest text-black focus:outline-none focus:neon-border transition-all bg-white" 
                />
              </div>
            </div>

            <button 
              disabled={isLoading}
              className="w-full bg-black text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl hover:bg-accent transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 group"
            >
              {isLoading ? (
                 <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>REQUEST MAGIC LINK <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <div className="pt-8 border-t border-black/5 flex items-center justify-center gap-3 text-black/20">
             <ShieldCheck size={16} />
             <p className="text-[10px] font-black uppercase tracking-[0.3em]">End-to-End Encryption Active</p>
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] font-black uppercase tracking-[0.4em] text-black/20">Sector 7 Central Identity Registry</p>
      </motion.div>
    </main>
  );
}
