"use client";
import { useEffect, useState } from "react";
import { User, Package, LogOut, ChevronRight, Ghost, Sparkles, ShieldCheck, Edit3, Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function ProfilePage() {
  const [session, setSession] = useState<any>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      if (res.ok && data.authenticated) {
        setSession(data.user);
        setNewName(data.user.name || "");
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

  const handleUpdateName = async () => {
    if (!newName.trim()) return;
    setIsUpdating(true);
    try {
      const res = await fetch("/api/auth/update-profile", {
        method: "PATCH",
        body: JSON.stringify({ name: newName }),
      });
      const data = await res.json();
      if (res.ok) {
        setSession(data.user);
        setIsEditingName(false);
        toast.success("Profile updated successfully", {
          className: "glass border-pink-500 text-black font-black uppercase text-[10px] tracking-widest",
          icon: <Sparkles className="text-pink-500" size={16} />
        });
      } else {
        toast.error(data.error || "Update failed");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBecomeRetailer = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch("/api/auth/update-profile", {
        method: "PATCH",
        body: JSON.stringify({ role: "RETAILER" }),
      });
      const data = await res.json();
      if (res.ok) {
        setSession(data.user);
        toast.success("Account upgraded to Retailer successfully!", {
          className: "glass border-pink-500 text-black font-black uppercase text-[10px] tracking-widest",
          icon: <Sparkles className="text-pink-500" size={16} />
        });
        
        // Ensure navbar and other components see the new role
        router.refresh();
        
        // Redirect to the now-accessible dashboard
        setTimeout(() => {
          router.push("/retailer/dashboard");
        }, 1500);
      } else {
        toast.error(data.error || "Upgrade failed");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!session) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
        <Ghost className="text-pink-200" size={48} />
      </motion.div>
    </div>
  );

  return (
    <main className="min-h-screen bg-background pb-32 pt-24 px-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[hsla(330,70%,90%,0.5)] blur-[150px] rounded-full" />
      
      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-black/5 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-pink-500 font-black tracking-[0.4em] uppercase text-[10px]">
              <Sparkles size={14} />
              Personal Profile
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none italic text-black">Your Profile</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="glass px-8 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-black hover:border-pink-500 transition-all bg-white shadow-sm"
          >
            <LogOut size={16} /> SIGN OUT
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
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
              <div className="space-y-4 pt-4">
                 <div className="flex items-center justify-center gap-3 group/name">
                   {isEditingName ? (
                     <div className="flex items-center gap-2 bg-pink-50/50 p-2 rounded-xl border border-pink-100">
                        <input 
                          autoFocus
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="bg-transparent text-xl font-black tracking-tighter italic text-black focus:outline-none w-auto min-w-[160px]"
                        />
                        <button disabled={isUpdating} onClick={handleUpdateName} className="p-2 bg-black text-white rounded-lg hover:bg-pink-500 transition-all disabled:opacity-50 inline-flex items-center justify-center">
                          {isUpdating ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Check size={14} />}
                        </button>
                        <button onClick={() => { setIsEditingName(false); setNewName(session.name || ""); }} className="p-2 bg-white border border-black/5 rounded-lg hover:text-red-500 transition-all inline-flex items-center justify-center">
                          <X size={14} />
                        </button>
                     </div>
                   ) : (
                     <>
                        <h2 className="text-3xl font-black tracking-tighter italic text-black leading-none">{session.name || session.email.split('@')[0]}</h2>
                        <button 
                          onClick={() => setIsEditingName(true)}
                          className="p-2 glass rounded-lg text-black/10 hover:text-pink-500 hover:border-pink-200 transition-all opacity-0 group-hover/name:opacity-100 shadow-sm bg-white"
                        >
                          <Edit3 size={14} />
                        </button>
                     </>
                   )}
                 </div>
                 <p className="text-xs font-black text-black/20 uppercase tracking-widest">{session.email}</p>
              </div>
              <div className="pt-6 grid grid-cols-2 gap-4">
                 <div className="glass p-4 rounded-2xl border-black/5 bg-white shadow-sm flex flex-col justify-between">
                    <div>
                      <p className="text-[8px] font-black text-black/20 uppercase tracking-widest leading-none">Role Status</p>
                      <p className="text-xs font-black text-pink-500 uppercase tracking-tighter mt-1 italic leading-none">{session.role}</p>
                    </div>
                    {session.role === "BUYER" && (
                      <button disabled={isUpdating} onClick={handleBecomeRetailer} className="mt-4 text-[8px] font-black bg-pink-500 text-white uppercase tracking-widest px-3 py-1.5 rounded-lg hover:bg-black transition-all text-center w-full disabled:opacity-50">
                        {isUpdating ? "UPGRADING..." : "BECOME RETAILER"}
                      </button>
                    )}
                 </div>
                 <div className="glass p-4 rounded-2xl border-black/5 bg-white shadow-sm">
                    <p className="text-[8px] font-black text-black/20 uppercase tracking-widest leading-none">Account Access</p>
                    <p className="text-xs font-black text-black uppercase tracking-tighter mt-1 italic leading-none">VERIFIED</p>
                 </div>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl border-black/5 bg-black text-white space-y-4 shadow-xl">
               <ShieldCheck className="text-pink-500" size={32} />
               <p className="text-[10px] font-black uppercase tracking-[0.3em] leading-relaxed">Secure Account Protection Active.</p>
            </div>
          </motion.div>

          {/* Orders / Activity List */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="glass-card border-black/5 bg-white shadow-2xl h-[600px] flex flex-col relative overflow-hidden">
               <div className="px-10 py-8 border-b border-black/5 bg-pink-50/10 flex justify-between items-center sticky top-0 bg-white/50 backdrop-blur-md z-10">
                  <h2 className="text-2xl font-black uppercase tracking-tighter italic text-black leading-none">Order History</h2>
                  <span className="glass px-6 py-2 rounded-full text-[10px] font-black text-pink-500 tracking-widest uppercase italic border-pink-100/50 bg-white shadow-sm">NO ORDERS FOUND</span>
               </div>
               
               <div className="flex-1 overflow-y-auto px-10 py-20 flex flex-col items-center justify-center text-center space-y-8 opacity-20 scrollbar-hide">
                  <Package size={80} className="text-black" />
                  <div className="space-y-2">
                    <p className="text-xl font-black uppercase tracking-widest italic text-black">Your history is empty.</p>
                    <p className="text-xs font-bold lowercase tracking-normal text-black font-medium">You haven't placed any orders yet. Explore our collections to get started.</p>
                  </div>
                  <button onClick={() => router.push('/collections')} className="bg-black text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-pink-500 transition-all opacity-100">
                     EXPLORE COLLECTIONS
                  </button>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
