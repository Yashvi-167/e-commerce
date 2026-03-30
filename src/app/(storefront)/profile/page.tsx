"use client";
import { useEffect, useState } from "react";
import { User, Package, LogOut, ChevronRight, Ghost, Sparkles, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/auth/session");
      if (res.ok) {
        setSession(await res.json());
      } else {
        router.push("/login");
      }
    };
    fetchSession();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  if (!session) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
        <Ghost className="text-accent/20" size={48} />
      </motion.div>
    </div>
  );

  return (
    <main className="min-h-screen bg-background pb-32 pt-24 px-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full" />
      
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-black/5 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-accent font-black tracking-[0.4em] uppercase text-[10px]">
              <Sparkles size={14} />
              Identity // Registry
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none italic text-black">Profile.Sync</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="glass px-8 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-black hover:border-accent transition-all bg-white"
          >
            <LogOut size={16} /> TERMINATE SESSION
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* User Info Card */}
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="lg:col-span-1 space-y-8"
          >
            <div className="glass-card p-10 border-black/5 bg-white shadow-2xl space-y-8 relative overflow-hidden text-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
              <div className="w-32 h-32 bg-secondary/30 rounded-[3rem] mx-auto flex items-center justify-center text-black border-4 border-white shadow-xl relative group overflow-hidden">
                 <img src={`https://i.pravatar.cc/150?u=${session.email}`} alt="" className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all" />
                 <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="space-y-1">
                 <h2 className="text-2xl font-black uppercase tracking-tighter italic text-black leading-none">{session.email.split('@')[0]}</h2>
                 <p className="text-xs font-black text-black/20 uppercase tracking-widest">{session.email}</p>
              </div>
              <div className="pt-6 grid grid-cols-2 gap-4">
                 <div className="glass p-4 rounded-2xl border-black/5 bg-white shadow-sm">
                    <p className="text-[8px] font-black text-black/20 uppercase tracking-widest leading-none">Status</p>
                    <p className="text-xs font-black text-accent uppercase tracking-tighter mt-1 italic italic leading-none">{session.role}</p>
                 </div>
                 <div className="glass p-4 rounded-2xl border-black/5 bg-white shadow-sm">
                    <p className="text-[8px] font-black text-black/20 uppercase tracking-widest leading-none">Sync Delta</p>
                    <p className="text-xs font-black text-black uppercase tracking-tighter mt-1 italic leading-none">LOCKED</p>
                 </div>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl border-black/5 bg-black text-white space-y-4 shadow-xl">
               <ShieldCheck className="text-accent" size={32} />
               <p className="text-[10px] font-black uppercase tracking-[0.3em] leading-relaxed">Multi-factor orbital synchronization active.</p>
            </div>
          </motion.div>

          {/* Orders / Activity List */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="glass-card border-black/5 bg-white shadow-2xl h-[600px] flex flex-col relative overflow-hidden">
               <div className="px-10 py-8 border-b border-black/5 bg-secondary/5 flex justify-between items-center sticky top-0 bg-white/50 backdrop-blur-md z-10">
                  <h2 className="text-2xl font-black uppercase tracking-tighter italic text-black leading-none">Order.History</h2>
                  <span className="glass px-6 py-2 rounded-full text-[10px] font-black text-accent tracking-widest uppercase italic border-accent/20 bg-white">0 LOGS DETECTED</span>
               </div>
               
               <div className="flex-1 overflow-y-auto px-10 py-20 flex flex-col items-center justify-center text-center space-y-8 opacity-20 scrollbar-hide">
                  <Package size={80} className="text-black" />
                  <div className="space-y-2">
                    <p className="text-xl font-black uppercase tracking-widest italic text-black">Primary manifest empty.</p>
                    <p className="text-xs font-bold lowercase tracking-normal text-black font-medium">No assets have been synchronized to this coordinate yet.</p>
                  </div>
                  <button onClick={() => router.push('/collections')} className="bg-black text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-accent transition-all opacity-100">
                     INITIALIZE DISCOVERY
                  </button>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
