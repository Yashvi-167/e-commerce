"use client";

import { useState } from "react";
import { Mail, ArrowRight, Sparkles, KeyRound, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        toast.success("Security dispatch complete. Check your inbox.", {
          className: "glass border-accent text-black font-black uppercase text-[10px] tracking-widest",
          icon: <Sparkles className="text-accent" size={16} />
        });
      } else {
        toast.error(data.error || "Request failed. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred during process execution.");
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
          
          {isSuccess ? (
            <div className="space-y-8 py-4">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center text-accent mx-auto shadow-2xl"
              >
                <CheckCircle2 size={32} />
              </motion.div>
              <div className="space-y-4">
                <h1 className="text-3xl font-black uppercase tracking-tighter italic text-black leading-tight">Verification Sent</h1>
                <p className="text-[11px] font-black uppercase tracking-widest text-black/40 leading-relaxed">
                  If an account exists for <span className="text-accent">{email}</span>, a secure password reset link has been dispatched to your inbox.
                </p>
              </div>
              <Link 
                href="/login"
                className="w-full bg-black text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl hover:bg-accent transition-all hover:scale-[1.02] active:scale-95"
              >
                RETURN TO LOGIN <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center text-white mx-auto shadow-2xl relative group"
                >
                  <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
                  <KeyRound size={32} className="relative z-10" />
                </motion.div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-accent font-black tracking-[0.4em] uppercase text-[10px]">
                    <Sparkles size={14} />
                    Account Recovery
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-black leading-none">Forgot Access</h1>
                  <p className="text-[10px] font-black uppercase tracking-widest text-black/20 pt-2 px-4 italic leading-relaxed">
                    Enter your email to receive a secure decryption link.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/20 ml-4 pb-1 block">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-accent transition-colors" size={18} />
                    <input 
                      required
                      type="email" 
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full glass border-black/5 px-14 py-5 rounded-2xl text-xs font-black tracking-widest text-black focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all bg-white" 
                    />
                  </div>
                </div>

                <button 
                  disabled={isLoading}
                  className="w-full bg-black text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl hover:bg-accent transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 group mt-4 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-white/5 to-accent/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  {isLoading ? (
                     <Loader2 size={20} className="animate-spin text-accent" />
                  ) : (
                    <span className="relative z-10 flex items-center gap-3">SEND RESET LINK <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></span>
                  )}
                </button>
              </form>

              <div className="pt-8 border-t border-black/5">
                 <Link href="/login" className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 hover:text-accent transition-colors">
                   Suddenly remembered? Sign Back In
                 </Link>
              </div>
            </>
          )}
        </div>

        <p className="mt-8 text-center text-[10px] font-black uppercase tracking-[0.4em] text-black/20">BELLE AME AUTHENTICATION CENTER</p>
      </motion.div>
    </main>
  );
}
