"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Ghost, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function CollectionContent({ initialProducts }: { initialProducts: any[] }) {
  const searchParams = useSearchParams();
  const [deptFilter, setDeptFilter] = useState(searchParams.get("dept") || "All");
  const [filter, setFilter] = useState(searchParams.get("cat") || "All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setDeptFilter(searchParams.get("dept") || "All");
    setFilter(searchParams.get("cat") || "All");
  }, [searchParams]);

  const departments = ["All", "Men", "Women", "Kids"];
  
  // Dynamically calculate available categories based on selected department
  const availableCategories = ["All", ...Array.from(new Set(
    initialProducts
      .filter(p => deptFilter === "All" || p.department === deptFilter)
      .map(p => p.category)
  ))].sort((a, b) => {
    if (a === "All") return -1;
    if (b === "All") return 1;
    return a.localeCompare(b);
  });

  const filtered = initialProducts.filter(p => 
    (deptFilter === "All" || p.department === deptFilter) &&
    (filter === "All" || p.category === filter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-background pb-32 pt-10">
      <div className="max-w-7xl mx-auto px-6 space-y-24">
        
        {/* Search & Global Filter Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-secondary/10 p-8 rounded-[2.5rem] border border-black/5 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[50px] rounded-full" />
          
          <div className="flex-1 max-w-md relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-pink-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="SEARCH PRODUCTS..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-black/5 pl-12 pr-6 py-4 rounded-2xl text-xs font-black tracking-widest focus:outline-none focus:ring-2 focus:ring-pink-500/10 transition-all font-sans"
            />
          </div>

          <div className="flex flex-col gap-4">
             <div className="flex overflow-x-auto pb-1 scrollbar-hide items-center gap-3 no-scrollbar">
                <span className="text-[10px] font-black uppercase tracking-widest text-black/20 mr-2 md:block hidden">Dept:</span>
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => { setDeptFilter(dept); setFilter("All"); }}
                    className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      deptFilter === dept 
                      ? "bg-pink-500 text-white shadow-xl scale-105" 
                      : "bg-white text-black/40 hover:text-black border border-black/5"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
             </div>

             <div className="flex overflow-x-auto pb-1 scrollbar-hide items-center gap-3 no-scrollbar">
                <span className="text-[10px] font-black uppercase tracking-widest text-black/20 mr-2 md:block hidden">Type:</span>
                {availableCategories.map((cat: string) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      filter === cat 
                      ? "bg-black text-white shadow-xl scale-105" 
                      : "bg-white text-black/40 hover:text-black border border-black/5"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
          </div>
        </div>

        {/* Sectioned Content */}
        {departments.filter(d => d !== "All").map((dept) => {
          const deptProducts = filtered.filter(p => p.department === dept);
          if (deptProducts.length === 0 && deptFilter !== "All" && deptFilter !== dept) return null;
          
          return (
            <div key={dept} className="space-y-10">
              <div className="flex items-end justify-between border-b border-black/5 pb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-pink-500 font-black tracking-[0.4em] uppercase text-[10px]">
                    <Sparkles size={14} />
                    {dept} Collection
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none">{dept}'s Range</h2>
                </div>
                <span className="text-[10px] font-black text-black/20 uppercase tracking-widest">{deptProducts.length} Items Found</span>
              </div>

              {deptProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  <AnimatePresence mode="popLayout">
                    {deptProducts.map((product, i) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link href={`/product/${product.id}`} className="group block">
                          <div className="glass-card p-4 space-y-6 border-black/5">
                            <div className="aspect-[4/5] rounded-2xl bg-secondary/20 overflow-hidden relative">
                              <img 
                                src={product.imageUrl} 
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            </div>
                            <div className="px-2 space-y-3">
                              <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                  <p className="text-[10px] font-black text-accent uppercase tracking-widest">{product.category}</p>
                                  <h3 className="text-xl font-black text-black uppercase tracking-tighter leading-none italic group-hover:text-accent transition-colors">
                                    {product.name}
                                  </h3>
                                </div>
                                <span className="text-lg font-black text-black italic">₹{Number(product.price).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                 <div className="py-20 glass rounded-[2.5rem] text-center border-dashed border-black/10">
                    <Ghost className="mx-auto text-black/5" size={40} />
                    <p className="text-[10px] font-black text-black/20 uppercase tracking-widest mt-4">No {dept} items currently available...</p>
                 </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-40 text-center space-y-6">
             <Ghost className="mx-auto text-black/5" size={80} />
             <p className="text-xl font-black text-black/20 uppercase tracking-widest italic">No items found matching your filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
