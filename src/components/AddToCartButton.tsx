"use client";
import { useCart } from "./CartProvider";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function AddToCartButton({ 
  product, variants = [] 
}: { 
  product: { id: string, name: string, price: number, image: string },
  variants?: string[]
}) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<string | null>(variants.length > 0 ? variants[0] : null);

  const handleAdd = () => {
    if (variants.length > 0 && !selectedVariant) {
       toast.error("Please select a size/variant before adding to cart.");
       return;
    }

    addToCart({ 
      ...product, 
      quantity: 1, 
      image: product.image,
      variant: selectedVariant || undefined,
      // Distinguish varied products by composing ID payload
      id: selectedVariant ? `${product.id}-${selectedVariant}` : product.id
    });
    
    toast.success(`${product.name} ${selectedVariant ? `(${selectedVariant})` : ''} added to your cart!`, {
      style: { background: 'var(--primary)', color: 'var(--foreground)', border: '1px solid var(--color-slate-700)' }
    });
  };

  return (
    <div className="space-y-6">
      {variants.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <span className="text-foreground font-bold uppercase tracking-wider text-sm whitespace-nowrap">Select Variant</span>
          <div className="flex flex-wrap gap-3">
            {variants.map(v => (
              <button 
                key={v} 
                onClick={() => setSelectedVariant(v)}
                className={`px-5 h-12 rounded-xl border flex items-center justify-center font-bold transition-all shadow-sm ${
                  selectedVariant === v 
                  ? "border-accent text-accent bg-accent/10 scale-105 shadow-[0_0_15px_rgba(204,255,0,0.2)]" 
                  : "border-slate-700 text-slate-400 hover:border-accent hover:text-accent hover:bg-slate-800"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <button 
        onClick={handleAdd}
        className="w-full bg-accent text-primary h-16 rounded-full font-black text-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(224,122,95,0.2)]"
      >
        <ShoppingBag size={24} />
        Add To Cart
      </button>
    </div>
  );
}
