"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search, ChevronDown, Sparkles, Ghost, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CollectionContent({ initialProducts }: { initialProducts: any[] }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const categories = ["All", "Shirts", "T-Shirts", "Pants", "Dresses", "Accessories"];

  const filtered = initialProducts.filter(p => 
    (filter === "All" || p.category === filter) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-background pb-32 pt-10">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Search & Filter Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-secondary/10 p-8 rounded-[2.5rem] border border-black/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[50px] rounded-full" />
          
          <div className="flex-1 max-w-md relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-accent transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="SEARCH ASSETS..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-black/5 pl-12 pr-6 py-4 rounded-2xl text-xs font-black tracking-widest focus:outline-none focus:neon-border transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === cat 
                  ? "bg-black text-white shadow-xl" 
                  : "bg-white text-black/40 hover:text-black border border-black/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
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
                      <div className="absolute top-4 right-4 glass p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all text-black translate-y-2 group-hover:translate-y-0">
                         <ShoppingBag size={18} />
                      </div>
                      {i % 3 === 0 && (
                        <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-lg">
                          Antigravity // Elite
                        </div>
                      )}
                    </div>

                    <div className="px-2 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-accent uppercase tracking-widest">{product.category}</p>
                          <h3 className="text-xl font-black text-black uppercase tracking-tighter leading-none italic group-hover:text-accent transition-colors">
                            {product.name}
                          </h3>
                        </div>
                        <span className="text-lg font-black text-black italic">${Number(product.price).toFixed(2)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 pt-2 opacity-20 group-hover:opacity-100 transition-opacity">
                         <div className="h-px flex-1 bg-black/10" />
                         <span className="text-[8px] font-black uppercase tracking-[0.3em] text-black/40">Details // Sync</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="py-40 text-center space-y-6">
             <Ghost className="mx-auto text-black/5" size={80} />
             <p className="text-xl font-black text-black/20 uppercase tracking-widest italic">No signals found in this sector.</p>
          </div>
        )}
      </div>
    </section>
  );
}
