"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Filter, Search, Sparkles } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function CollectionContent({ initialProducts }: { initialProducts: any[] }) {
  const searchParams = useSearchParams();
  const department = searchParams.get('dept') || "All";
  const query = searchParams.get('q') || "";
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    setCategoryFilter("All");
  }, [department]);

  let filterTabs = ["All", "Apparel", "Footwear", "Accessories"];
  if (department === "Men") {
    filterTabs = ["All", "Shirts", "T-Shirts", "Pants", "Footwear", "Accessories"];
  } else if (department === "Women") {
    filterTabs = ["All", "Shirts", "T-Shirts", "Dresses", "Kurta", "Jeans", "Traditional", "Casual", "Footwear", "Accessories"];
  }

  const filteredProducts = initialProducts.filter((p) => {
    if (department !== "All" && p.department !== department) return false;
    if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
    if (categoryFilter !== "All") {
       if (categoryFilter === "Apparel" && !["Footwear", "Accessories"].includes(p.category)) {
          return true;
       }
       if (p.category !== categoryFilter) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-12">
      {/* Header Section */}
      <div className="flex flex-col gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-primary font-bold tracking-[0.3em] uppercase text-xs"
        >
          <Sparkles size={14} />
          Navigation // Grid
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none"
        >
          {query ? `Results for "${query}"` : department === "All" ? "Collection" : `${department}'s`}
        </motion.h1>
      </div>

      {/* Filter Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-3 overflow-x-auto w-full pb-4 md:pb-0 scrollbar-hide">
          <div className="p-3 glass rounded-xl text-white/40">
            <Filter size={18} />
          </div>
          {filterTabs.map(cat => (
            <button 
              key={cat} 
              onClick={() => setCategoryFilter(cat)}
              className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${categoryFilter === cat ? 'bg-primary text-white neon-border' : 'glass text-white/40 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="glass px-6 py-3 rounded-xl text-xs font-bold tracking-widest uppercase text-white/40 whitespace-nowrap border-white/5">
          {filteredProducts.length} SIGNALS FOUND
        </div>
      </motion.div>

      {/* Product Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/product/${product.id}`} className="group flex flex-col gap-6">
                <div className="glass-card aspect-[4/5] relative overflow-hidden group-hover:neon-border transition-all">
                  <img src={product.imageUrl} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute top-6 left-6">
                    <div className="glass px-3 py-1 rounded-full text-[10px] font-bold text-white/60 tracking-widest uppercase border-white/10">
                      {product.category}
                    </div>
                  </div>

                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 translate-y-20 group-hover:translate-y-0 transition-transform bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 opacity-0 group-hover:opacity-100 shadow-2xl z-20 whitespace-nowrap">
                    EXPLORE <ArrowRight size={18} />
                  </div>
                </div>
                
                <div className="space-y-1 px-2">
                  <div className="flex justify-between items-end">
                    <h3 className="text-xl font-bold uppercase tracking-tight text-white/80 group-hover:text-white transition-colors">{product.name}</h3>
                    <span className="text-primary font-black text-xl italic leading-none">${Number(product.price).toFixed(2)}</span>
                  </div>
                  <p className="text-white/20 text-xs font-bold uppercase tracking-widest">{product.vendor} // AEROSPACE GRADE</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredProducts.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-full py-40 flex flex-col items-center gap-6 glass rounded-[3rem] border-white/5"
        >
          <Search size={48} className="text-white/10" />
          <p className="text-white/40 font-bold tracking-[0.2em] uppercase text-sm">No signals found in this sector.</p>
        </motion.div>
      )}
    </div>
  );
}
