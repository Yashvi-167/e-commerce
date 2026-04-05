"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Lock, ArrowRight, CheckCircle2, Loader2, KeyRound, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!token) {
    return (
      <div className="glass-card p-12 md:p-16 border-black/5 bg-white shadow-3xl text-center space-y-8 relative overflow-hidden">
        <div className="w-20 h-20 bg-black/5 text-black/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <KeyRound size={40} />
        </div>
        <h2 className="text-3xl font-black uppercase text-black italic tracking-tighter">Broken Link</h2>
        <p className="text-[10px] font-black uppercase tracking-widest text-black/40 leading-relaxed">
          This secure access token is missing or compromised. Request a new one to continue.
        </p>
        <Link href="/forgot-password" size="lg" className="inline-block bg-black text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-transform hover:scale-105 shadow-2xl active:scale-95">
          REQUEST NEW LINK
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("Credentials mismatch. Encryption failed.");
      return;
    }
    
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Reset operation failed");
      }

      setIsSuccess(true);
      toast.success("Security Update Complete", {
        className: "glass border-accent text-black font-black uppercase text-[10px] tracking-widest",
        icon: <Sparkles className="text-accent" size={16} />
      });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="glass-card p-12 md:p-16 border-black/5 bg-white shadow-3xl text-center space-y-10 relative overflow-hidden">
         <motion.div 
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           className="w-24 h-24 bg-black rounded-3xl flex items-center justify-center text-accent mx-auto mb-8 shadow-2xl"
         >
           <CheckCircle2 size={48} />
         </motion.div>
         <div className="space-y-4">
           <h1 className="text-4xl font-black text-black uppercase tracking-tighter italic">Vault Secured</h1>
           <p className="text-[11px] font-black uppercase tracking-widest text-black/40 leading-relaxed">Your new credentials have been securely registered to the Belle Ame network.</p>
         </div>
         <Link href="/login" className="w-full bg-black text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl hover:bg-accent transition-all hover:scale-[1.02] active:scale-95">
           ACCESS ACCOUNT <ArrowRight size={20} />
         </Link>
      </div>
    );
  }

  return (
    <div className="glass-card p-12 md:p-16 border-black/5 bg-white shadow-3xl text-center space-y-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
      
      <div className="space-y-6">
        <motion.div 
           animate={{ y: [0, -10, 0] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center text-white mx-auto shadow-2xl"
        >
          <Lock size={32} />
        </motion.div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-accent font-black tracking-[0.4em] uppercase text-[10px]">
            <Sparkles size={14} />
            Security Protocol
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-black leading-none">New Access</h1>
          <p className="text-[10px] font-black uppercase tracking-widest text-black/20 pt-2 italic leading-relaxed">
            Encrypt a new password for your account.
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/20 ml-4 pb-1 block">New Password</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-accent transition-colors" size={18} />
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••" 
                disabled={isLoading}
                className="w-full glass border-black/5 px-14 py-5 rounded-2xl text-xs font-black tracking-widest text-black focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all bg-white" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/20 ml-4 pb-1 block">Confirm Password</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-accent transition-colors" size={18} />
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••" 
                disabled={isLoading}
                className="w-full glass border-black/5 px-14 py-5 rounded-2xl text-xs font-black tracking-widest text-black focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all bg-white" 
              />
            </div>
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-black text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl hover:bg-accent transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 mt-4 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-white/5 to-accent/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          {isLoading ? (
            <Loader2 size={24} className="animate-spin text-accent" />
          ) : (
            <span className="relative z-10 flex items-center gap-3">UPDATE PASSWORD <ArrowRight size={20} /></span>
          )}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
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
        <Suspense fallback={
          <div className="glass-card p-12 border-black/5 bg-white shadow-3xl text-center space-y-6">
            <Loader2 size={40} className="animate-spin text-accent mx-auto" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/20">Verifying Secure Protocol...</p>
          </div>
        }>
          <ResetPasswordForm />
        </Suspense>
        
        <p className="mt-8 text-center text-[10px] font-black uppercase tracking-[0.4em] text-black/20">BELLE AME AUTHENTICATION CENTER</p>
      </motion.div>
    </main>
  );
}
