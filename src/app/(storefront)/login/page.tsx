"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Loader2, Sparkles, Ghost } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Enter your coordinates (email) to proceed.");
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed to send link");

      setIsSent(true);
      toast.success("Magic link sent to your vault.", {
        className: "glass neon-border text-white border-primary/50",
      });
    } catch (error) {
      toast.error("Failed to initialize session. System error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6 bg-black relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -top-48 -left-48 w-96 h-96 bg-primary/20 blur-[150px] rounded-full"
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute -bottom-48 -right-48 w-96 h-96 bg-secondary/20 blur-[150px] rounded-full"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="glass-card p-12 space-y-10 border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="flex justify-center"
            >
              <Ghost size={48} className="text-primary" />
            </motion.div>
            <h1 className="text-4xl font-black uppercase tracking-tighter text-white">Initialize Session</h1>
            <p className="text-white/40 text-xs font-bold tracking-[0.2em] uppercase">Access your Antigravity Dashboard</p>
          </div>

          <AnimatePresence mode="wait">
            {!isSent ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-8"
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase ml-4">Credentials // Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="USER@DOMAIN.COM" 
                      disabled={isLoading}
                      className="w-full glass rounded-2xl px-16 py-5 text-xs font-bold tracking-widest text-white placeholder-white/5 focus:outline-none focus:neon-border transition-all border-white/5 disabled:opacity-50" 
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-primary text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 neon-border hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <><Loader2 size={18} className="animate-spin" /> SYNCHRONIZING...</>
                  ) : (
                    <><Sparkles size={18} /> REQUEST MAGIC LINK</>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-8"
              >
                <div className="w-20 h-20 rounded-full glass border-primary/50 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                  <Sparkles size={32} className="text-primary" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold uppercase tracking-tight text-white">Transmission Sent</h3>
                  <p className="text-white/40 text-sm leading-relaxed max-w-[250px] mx-auto">
                    A secure access link has been dispatched to <span className="text-white">{email}</span>. Please verify your inbox.
                  </p>
                </div>
                <button 
                  onClick={() => setIsSent(false)} 
                  className="text-[10px] font-bold tracking-[0.3em] text-white/20 hover:text-white uppercase transition-colors"
                >
                  RETRY TRANSMISSION
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <Link href="/" className="block text-center text-[10px] font-bold tracking-[0.3em] text-white/20 hover:text-white uppercase transition-colors">
            RETURN TO SECTOR 0 (HOME)
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
