"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Sparkles, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      if (typeof window !== "undefined") {
        document.cookie = "adminAuth=true; path=/";
        toast.success("Authentication successful", {
          className: "glass border-pink-500 text-black font-black uppercase text-[10px] tracking-widest",
          icon: <Sparkles className="text-pink-500" size={16} />
        });
        router.push("/admin/dashboard");
      }
    } else {
      toast.error("Unauthorized. Invalid credentials.");
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center font-sans px-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[hsla(330,70%,90%,0.3)] blur-[150px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[hsla(330,70%,95%,0.3)] blur-[150px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card p-12 border-black/5 bg-white shadow-3xl space-y-10 relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent" />
          
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center text-white shadow-2xl relative group">
              <div className="absolute inset-0 bg-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all" />
              <Lock size={32} className="relative z-10" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-pink-500 font-black tracking-[0.4em] uppercase text-[10px]">
                <ShieldCheck size={14} />
                Secure Gateway
              </div>
              <h1 className="text-4xl font-black text-black uppercase tracking-tighter leading-none italic">Admin Access</h1>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-8 text-left">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-black/20 ml-4 pb-1 block">Master Password</label>
              <input 
                type="password" 
                autoFocus
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full glass border-black/5 rounded-2xl px-6 py-5 text-xs font-black tracking-widest text-black focus:outline-none focus:ring-2 focus:ring-pink-500/10 transition-all bg-pink-50/5"
                placeholder="PROCEED WITH AUTH..."
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-black text-white font-black py-6 rounded-2xl hover:bg-pink-500 transition-all uppercase tracking-[0.2em] text-[10px] shadow-2xl"
            >
              ACCESS BACKOFFICE
            </button>
          </form>

          <div className="pt-8 border-t border-black/5">
             <p className="text-[9px] font-black uppercase tracking-[0.4em] text-black/10">BELLE AME | CENTRAL ADMINISTRATION</p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
