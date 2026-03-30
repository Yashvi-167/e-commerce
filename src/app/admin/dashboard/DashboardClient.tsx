"use client";
import { useState } from "react";
import { Trash2, Plus, LogOut, Package, Users, ShoppingCart, DollarSign, ArrowRight, Ghost, Sparkles, User } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
        toast.success("Product removed from inventory.", {
          className: "glass border-accent text-black font-black uppercase text-[10px] tracking-widest",
          icon: <Sparkles className="text-accent" size={16} />
        });
      }
    } catch {
      toast.error("Failed to remove product. Please try again.");
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
        toast.success(`${payload.name} added to inventory.`, {
          className: "glass border-accent text-black font-black uppercase text-[10px] tracking-widest",
          icon: <Sparkles className="text-accent" size={16} />
        });
        setForm({ name: "", price: "", description: "", imageUrl: "", department: "Men", category: "Shirts" });
      }
    } catch {
      toast.error("Failed to create product.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-background text-black pb-20 pt-10 px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-accent font-black tracking-[0.4em] uppercase text-[10px]"
            >
              <Package size={14} />
              {role === "ADMIN" ? "Admin Management" : "Retailer Panel"}
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none italic">
              {role === "ADMIN" ? "Dashboard" : "My Inventory"}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="glass px-8 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-accent hover:bg-accent hover:text-white transition-all w-max bg-white shadow-sm border-accent/20">
              VIEW STORE
            </Link>
            <button onClick={handleLogout} className="glass px-8 py-4 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-black hover:border-accent transition-all w-max bg-white shadow-sm">
              <LogOut size={16} /> LOGOUT
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Total Revenue", value: stats.totalRevenue || stats.myRevenue, icon: <DollarSign size={20} />, trend: "Store Performance", color: "bg-secondary" },
            { label: role === "ADMIN" ? "Active Users" : "Customer Reach", value: stats.activeUsers || stats.customerReach, icon: <Users size={20} />, trend: "Active Traffic", color: "bg-accent/10" },
            { label: role === "ADMIN" ? "Pending Orders" : "Recent Sales", value: stats.pendingOrders || stats.activeOrders, icon: <ShoppingCart size={20} />, trend: "Immediate Care", color: "bg-secondary/30" },
            { label: role === "ADMIN" ? "Total Products" : "My Listings", value: stats.totalProducts || stats.totalListings, icon: <Package size={20} />, trend: "Inventory Tracking", color: "bg-white" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-10 space-y-8 border-black/5 ${stat.color} shadow-xl hover:shadow-2xl cursor-default transition-all duration-300`}
            >
              <div className="flex items-center justify-between">
                <div className="p-4 bg-white rounded-2xl text-black shadow-sm group-hover:bg-accent group-hover:text-white transition-colors">{stat.icon}</div>
                <span className="text-[8px] font-black text-black/20 uppercase tracking-widest leading-none">{stat.trend}</span>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-black/40 uppercase tracking-[0.3em] italic leading-none">{stat.label}</p>
                <p className="text-4xl font-black tracking-tighter text-black italic leading-none">
                   {typeof stat.value === 'number' ? `$${stat.value.toLocaleString()}` : stat.value}
                </p>
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
            <div className="glass-card p-10 border-black/5 space-y-10 bg-white shadow-2xl sticky top-32">
              <div className="space-y-3">
                 <div className="flex items-center gap-2 text-accent font-black tracking-[0.4em] uppercase text-[10px]">
                    <Sparkles size={14} />
                    Product Creation
                 </div>
                 <h2 className="text-3xl font-black uppercase tracking-tighter italic leading-none">New Product</h2>
              </div>

              <form onSubmit={handleCreate} className="space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-[0.3em] text-black/20 uppercase ml-4 pb-1 block">Product Name</label>
                    <input required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="w-full glass border-black/5 px-6 py-4 text-xs font-black tracking-widest text-black focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all bg-secondary/5" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-[0.3em] text-black/20 uppercase ml-4 pb-1 block">Base Price ($)</label>
                    <input required type="number" step="0.01" value={form.price} onChange={e=>setForm({...form, price: e.target.value})} className="w-full glass border-black/5 px-6 py-4 text-xs font-black tracking-widest text-black focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all bg-secondary/5" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black tracking-[0.3em] text-black/20 uppercase ml-4 pb-1 block">Department</label>
                      <select value={form.department} onChange={e=>setForm({...form, department: e.target.value})} className="w-full glass border-black/5 px-6 py-4 text-[10px] font-black tracking-widest text-black focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all appearance-none bg-secondary/5">
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black tracking-[0.3em] text-black/20 uppercase ml-4 pb-1 block">Category</label>
                      <select value={form.category} onChange={e=>setForm({...form, category: e.target.value})} className="w-full glass border-black/5 px-6 py-4 text-[10px] font-black tracking-widest text-black focus:outline-none focus:ring-2 focus:ring-accent/10 transition-all appearance-none bg-secondary/5">
                        {['Shirts', 'T-Shirts', 'Pants', 'Jeans', 'Dresses', 'Footwear', 'Accessories'].map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full bg-black text-white font-black py-6 rounded-2xl hover:bg-accent transition-all uppercase tracking-[0.2em] text-[10px] shadow-xl">
                  ADD TO INVENTORY
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
            <div className="glass-card overflow-hidden border-black/5 flex flex-col h-[750px] bg-white shadow-2xl relative">
              <div className="px-10 py-8 border-b border-black/5 bg-secondary/5 flex justify-between items-center">
                <h2 className="text-2xl font-black uppercase tracking-tighter italic text-black">
                  {role === "ADMIN" ? "Store Inventory" : "My Products"}
                </h2>
                <span className="glass px-6 py-2 rounded-full text-[10px] font-black text-accent tracking-widest uppercase italic border-accent/20 bg-white">
                  {productList.length} PRODUCTS LISTED
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto w-full scrollbar-hide">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-white text-black/20 text-[10px] font-black uppercase tracking-widest border-b border-black/5 sticky top-0 z-10 backdrop-blur-md">
                      <th className="px-10 py-6">Product</th>
                      {role === "ADMIN" && <th className="px-10 py-6 text-center">Retailer</th>}
                      <th className="px-10 py-6">Department</th>
                      <th className="px-10 py-6">Price</th>
                      <th className="px-10 py-6 text-right">Settings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {productList.map(product => (
                      <tr key={product.id} className="hover:bg-accent/[0.01] transition-colors group">
                        <td className="px-10 py-8 flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl glass overflow-hidden border-black/5 bg-white shadow-sm flex items-center justify-center relative">
                             <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                             <img src={product.imageUrl} alt="" className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" />
                          </div>
                          <div className="space-y-1">
                            <span className="font-black text-black text-sm uppercase tracking-tight italic group-hover:text-accent transition-colors">{product.name}</span>
                            <span className="block text-[8px] font-black text-black/10 tracking-[0.3em] uppercase">SKU: {String(product.id).padStart(6, '0')}</span>
                          </div>
                        </td>
                        {role === "ADMIN" && (
                          <td className="px-10 py-8 text-center">
                            <span className="text-[10px] font-black text-black/40 uppercase tracking-widest italic">{product.retailer?.email?.split('@')[0] || "BELLE AME"}</span>
                          </td>
                        )}
                        <td className="px-10 py-8">
                          <div className="glass px-4 py-1.5 rounded-full text-[9px] font-black text-black/40 tracking-widest uppercase border-black/5 w-max bg-white/50 flex items-center gap-2">
                            {product.department} <span className="text-pink-500">•</span> {product.category}
                          </div>
                        </td>
                        <td className="px-10 py-8">
                           <span className="text-black font-black italic text-lg drop-shadow-sm">${Number(product.price).toFixed(2)}</span>
                        </td>
                        <td className="px-10 py-8 text-right">
                          <button 
                            onClick={() => handleDelete(product.id)} 
                            className="p-4 glass rounded-2xl text-black/10 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all bg-white shadow-sm"
                            title="Remove Product"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {productList.length === 0 && (
                      <tr>
                        <td colSpan={role === "ADMIN" ? 5 : 4} className="py-20 text-center">
                           <div className="space-y-4 opacity-10">
                              <Package size={40} className="mx-auto" />
                              <p className="font-black uppercase tracking-widest text-xs">No products found in inventory</p>
                           </div>
                        </td>
                      </tr>
                    )}
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
