"use client";
import { useState } from "react";
import { Trash2, Plus, LogOut, Package, Users, ShoppingCart, DollarSign, ArrowRight, Ghost, Sparkles, User } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardClient({ 
  initialProducts, 
  stats, 
  role = "ADMIN" 
}: { 
  initialProducts: any[], 
  stats: any, 
  role?: "ADMIN" | "RETAILER" 
}) {
  const [productList, setProductList] = useState(initialProducts);
  const router = useRouter();
  
  const [form, setForm] = useState({ 
    name: "", price: "", description: "", imageUrl: "", department: "Men", category: "Shirts" 
  });

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProductList(prev => prev.filter(p => p.id !== id));
        toast.success("Signal terminated: Asset removed from vault.", {
          className: "glass neon-border text-white border-primary/50",
        });
      }
    } catch {
      toast.error("Shield interference: Protocol failed.");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, price: parseFloat(form.price) };

    try {
      const res = await fetch(`/api/products`, {
        method: "POST",
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const newProd = await res.json();
        setProductList(prev => [newProd, ...prev]);
        toast.success(`Registry Synchronized: ${payload.name} deployed!`, {
          className: "glass neon-border text-white border-primary/50",
        });
        setForm({ name: "", price: "", description: "", imageUrl: "", department: "Men", category: "Shirts" });
      }
    } catch {
      toast.error("Registry Mutation Failure.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-background text-foreground pb-20 pt-10 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-primary font-bold tracking-[0.3em] uppercase text-xs"
            >
              <Ghost size={14} />
              {role === "ADMIN" ? "Central Intelligence // Admin" : "Merchant Node // Retailer"}
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              {role === "ADMIN" ? "Console.Main" : "Vault.Manager"}
            </h1>
          </div>
          
          <button onClick={handleLogout} className="glass px-6 py-3 rounded-xl flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-red-500 hover:neon-border transition-all w-max">
            <LogOut size={16} /> TERMINATE SESSION
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Revenue Flux", value: stats.totalRevenue || stats.myRevenue, icon: <DollarSign size={20} />, trend: "+24% Signal" },
            { label: role === "ADMIN" ? "Active Nodes" : "Customer Reach", value: stats.activeUsers || stats.customerReach, icon: <Users size={20} />, trend: "Stable" },
            { label: role === "ADMIN" ? "Pending Tasks" : "Active Orders", value: stats.pendingOrders || stats.activeOrders, icon: <ShoppingCart size={20} />, trend: "Action Req" },
            { label: role === "ADMIN" ? "Total Assets" : "Total Listings", value: stats.totalProducts || stats.totalListings, icon: <Package size={20} />, trend: "Syncing" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 space-y-6 border-white/5"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 glass rounded-xl text-primary">{stat.icon}</div>
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{stat.trend}</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{stat.label}</p>
                <p className="text-3xl font-black tracking-tighter text-white">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Creation Panel */}
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className="space-y-6"
          >
            <div className="glass-card p-10 border-white/5 space-y-8 sticky top-32">
              <div className="space-y-2">
                <h2 className="text-2xl font-black uppercase tracking-tighter">Manifest New Asset</h2>
                <div className="w-12 h-1 bg-primary rounded-full" />
              </div>

              <form onSubmit={handleCreate} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase ml-4">Identifier // Name</label>
                    <input required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="w-full glass rounded-xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:neon-border transition-all border-white/5" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase ml-4">Value // Price</label>
                    <input required type="number" step="0.01" value={form.price} onChange={e=>setForm({...form, price: e.target.value})} className="w-full glass rounded-xl px-4 py-3 text-xs font-bold text-white focus:outline-none focus:neon-border transition-all border-white/5" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase ml-4">Sector // Dept</label>
                      <select value={form.department} onChange={e=>setForm({...form, department: e.target.value})} className="w-full glass rounded-xl px-4 py-3 text-[10px] font-bold text-white focus:outline-none focus:neon-border transition-all appearance-none border-white/5 bg-black/40">
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase ml-4">Type // Cat</label>
                      <select value={form.category} onChange={e=>setForm({...form, category: e.target.value})} className="w-full glass rounded-xl px-4 py-3 text-[10px] font-bold text-white focus:outline-none focus:neon-border transition-all appearance-none border-white/5 bg-black/40">
                        {['Shirts', 'T-Shirts', 'Pants', 'Jeans', 'Dresses', 'Footwear', 'Accessories'].map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full bg-primary text-white font-black py-4 rounded-2xl hover:neon-border transition-all uppercase tracking-[0.2em] text-xs">
                  EXECUTE MANIFEST
                </button>
              </form>
            </div>
          </motion.div>

          {/* Asset List */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card overflow-hidden border-white/5 flex flex-col h-[700px]">
              <div className="px-8 py-6 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                <h2 className="text-xl font-black uppercase tracking-tighter">
                  {role === "ADMIN" ? "Active Signals // Global Inventory" : "Sector Assets // My Products"}
                </h2>
                <span className="glass px-4 py-1 rounded-full text-[10px] font-bold text-primary tracking-widest">{productList.length} ASSETS REGISTERED</span>
              </div>
              
              <div className="flex-1 overflow-y-auto w-full scrollbar-hide">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-black text-white/20 text-[10px] font-bold uppercase tracking-widest border-b border-white/5 sticky top-0 z-10 backdrop-blur-md">
                      <th className="px-8 py-5">Object</th>
                      {role === "ADMIN" && <th className="px-8 py-5 text-center">Owner</th>}
                      <th className="px-8 py-5">Sector</th>
                      <th className="px-8 py-5">Value</th>
                      <th className="px-8 py-5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {productList.map(product => (
                      <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-8 py-6 flex items-center gap-5">
                          <div className="w-14 h-14 rounded-xl glass overflow-hidden border-white/5 bg-black/40">
                            <img src={product.imageUrl} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-white text-sm uppercase tracking-tight">{product.name}</span>
                            <span className="text-[10px] font-bold text-white/20 tracking-widest uppercase">ID: {String(product.id).substring(0, 8)}</span>
                          </div>
                        </td>
                        {role === "ADMIN" && (
                          <td className="px-8 py-6 text-center">
                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{product.retailer?.email || "SYSTEM"}</span>
                          </td>
                        )}
                        <td className="px-8 py-6">
                          <div className="glass px-3 py-1 rounded-full text-[10px] font-bold text-white/40 tracking-widest uppercase border-white/10 w-max">
                            {product.department} // {product.category}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                           <span className="text-white font-black italic">${Number(product.price).toFixed(2)}</span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button onClick={() => handleDelete(product.id)} className="p-3 glass rounded-xl text-white/10 hover:text-red-500 hover:neon-border transition-all">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
