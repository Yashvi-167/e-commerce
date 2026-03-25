"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Filter } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function CollectionContent({ initialProducts }: { initialProducts: any[] }) {
  const searchParams = useSearchParams();
  const department = searchParams.get('dept') || "All";
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
      <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-b border-slate-700 pb-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black text-foreground uppercase tracking-tighter">
            {department === "All" ? "Collection" : `${department}'s Collection`}
          </h1>
          <p className="text-slate-500 max-w-xl text-lg font-medium">
            Explore {department === "All" ? "our completely pristine" : `our pristine ${department}'s`} gear. Filter by precise Categories below.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-secondary p-4 rounded-2xl border border-slate-700/50 shadow-lg">
          <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 sm:pb-0 scrollbar-hide">
            <Filter size={20} className="text-slate-400 mr-2 shrink-0" />
            {filterTabs.map(cat => (
              <button 
                key={cat} 
                onClick={() => setCategoryFilter(cat)}
                className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 ${categoryFilter === cat ? 'bg-accent text-primary shadow-[0_0_15px_rgba(204,255,0,0.3)] scale-105' : 'bg-primary text-slate-400 hover:text-foreground border border-slate-700/50 hover:border-accent/40'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="text-sm font-bold text-slate-400 shrink-0 px-4">
            {filteredProducts.length} Items
          </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col gap-4">
            <div className={`w-full aspect-[4/5] rounded-3xl bg-slate-800 relative overflow-hidden flex items-center justify-center border border-slate-700/50 group-hover:border-accent/40 transition-colors`}>
              <img src={product.imageUrl} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-transparent group-hover:bg-primary/10 transition-colors z-10"></div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-20 group-hover:translate-y-0 transition-transform bg-primary text-accent px-6 py-3 rounded-full font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 shadow-2xl z-20">
                View Details <ArrowRight size={16} />
              </div>
            </div>
            <div className="flex justify-between items-start px-2">
              <div>
                <h3 className="text-foreground font-bold text-xl tracking-tight">{product.name}</h3>
                <p className="text-slate-400 text-sm font-medium">{product.department} &middot; {product.category}</p>
              </div>
              <span className="text-accent font-black text-lg">₹{Number(product.price).toFixed(2)}</span>
            </div>
          </Link>
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-24 text-center text-slate-400 font-medium">
            No products found matching your current filters.
          </div>
        )}
      </div>
    </div>
  );
}
