"use client";
import { useCart } from "./CartProvider";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

export default function AddToCartButton({ product }: { product: { id: string, name: string, price: number, image: string } }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({ ...product, quantity: 1, image: product.image });
    toast.success(`${product.name} added to your cart!`, {
      style: { background: 'var(--primary)', color: 'var(--foreground)', border: '1px solid var(--color-slate-700)' }
    });
  };

  return (
    <button 
      onClick={handleAdd}
      className="w-full bg-accent text-primary h-16 rounded-full font-black text-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(224,122,95,0.2)]"
    >
      <ShoppingBag size={24} />
      Add To Cart
    </button>
  );
}
