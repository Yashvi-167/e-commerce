"use client";
import { useState, useEffect } from "react";
import { Trash2, Plus, LogOut, Package } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DashboardClient({ initialProducts }: { initialProducts: any[] }) {
  const [productList, setProductList] = useState(initialProducts);
  const router = useRouter();
  
  // Guard access
  useEffect(() => {
    if (!document.cookie.includes("adminAuth=true")) {
      router.push("/admin");
    }
  }, [router]);

  const [form, setForm] = useState({ 
    name: "", price: "", description: "", imageUrl: "", department: "Men", category: "Shirts" 
  });

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProductList(prev => prev.filter(p => p.id !== id));
        toast.success("Product permanently deleted from Neon");
      } else {
        toast.error("Deletion rejected");
      }
    } catch {
      toast.error("Server synchronization failed");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      price: form.price,
      description: form.description || "Premium un-described new addition to our catalog.",
      imageUrl: form.imageUrl || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80",
      department: form.department,
      category: form.category
    };

    try {
      const res = await fetch(`/api/products`, {
        method: "POST",
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const newProd = await res.json();
        setProductList(prev => [...prev, newProd]);
        toast.success(`Inventory updated: ${payload.name} created!`);
        setForm({ name: "", price: "", description: "", imageUrl: "", department: "Men", category: "Shirts" });
      }
    } catch {
      toast.error("Database mutation failed");
    }
  };

  const handleLogout = () => {
    document.cookie = "adminAuth=; max-age=0; path=/";
    router.push("/admin");
  };

  return (
    <main className="min-h-screen bg-primary font-sans">
      {/* Top Navbar */}
      <nav className="border-b border-slate-700/50 bg-secondary/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-primary">
            <Package size={20} />
          </div>
          <div>
            <h1 className="text-xl font-black text-foreground tracking-tight uppercase">Admin Console</h1>
            <p className="text-xs text-slate-400 font-bold tracking-wider">Neon DB Connected</p>
          </div>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-slate-400 hover:text-accent font-bold transition-colors">
          <LogOut size={16} /> Logout
        </button>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-8">
        
        {/* Creation Form Panel */}
        <div className="lg:w-1/3 space-y-6">
          <div className="bg-secondary p-6 rounded-3xl border border-slate-700/50 shadow-lg sticky top-8">
            <h2 className="text-xl font-black text-foreground uppercase tracking-tight mb-6 flex items-center gap-2">
              <Plus size={20} className="text-accent" /> New Product
            </h2>
            
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Name</label>
                <input required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-accent" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Price</label>
                <input required type="number" step="0.01" value={form.price} onChange={e=>setForm({...form, price: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-accent" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Dept</label>
                  <select value={form.department} onChange={e=>setForm({...form, department: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-accent">
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Cat</label>
                  <select value={form.category} onChange={e=>setForm({...form, category: e.target.value})} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-accent">
                    <option value="Shirts">Shirts</option>
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Pants">Pants</option>
                    <option value="Jeans">Jeans</option>
                    <option value="Dresses">Dresses</option>
                    <option value="Kurta">Kurta</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">Image URL</label>
                <input value={form.imageUrl} onChange={e=>setForm({...form, imageUrl: e.target.value})} placeholder="https://unsplash..." className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-accent" />
              </div>
              <button type="submit" className="w-full bg-accent text-primary font-bold py-3 rounded-xl hover:scale-[1.02] transition-transform mt-4">
                Push to Neon
              </button>
            </form>
          </div>
        </div>

        {/* Database Grid */}
        <div className="lg:w-2/3 bg-secondary rounded-3xl border border-slate-700/50 shadow-lg overflow-hidden flex flex-col h-[700px]">
          <div className="px-6 py-5 border-b border-slate-700/50 bg-slate-800/50 flex justify-between items-center">
            <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Active Inventory</h2>
            <span className="text-accent font-bold bg-accent/10 px-3 py-1 rounded-full text-xs">{productList.length} Items</span>
          </div>
          
          <div className="flex-1 overflow-y-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/80 text-slate-400 text-xs uppercase tracking-widest border-b border-slate-700/50 sticky top-0 z-10">
                  <th className="px-6 py-4 font-bold">Product</th>
                  <th className="px-6 py-4 font-bold">Category</th>
                  <th className="px-6 py-4 font-bold">Price</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {productList.map(product => (
                  <tr key={product.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-800 overflow-hidden border border-slate-700">
                        <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="font-bold text-foreground text-sm">{product.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col text-xs">
                        <span className="font-bold text-slate-300">{product.department}</span>
                        <span className="text-slate-500">{product.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-accent text-sm">
                      ${Number(product.price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(product.id)} className="w-8 h-8 inline-flex items-center justify-center rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}
