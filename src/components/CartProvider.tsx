"use client";
import React, { createContext, useContext, useState } from "react";

type CartItem = { id: string; name: string; price: number; quantity: number; image?: string };

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i));
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  
  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) {
      removeFromCart(id);
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  };
  
  const clearCart = () => setItems([]);
  
  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
