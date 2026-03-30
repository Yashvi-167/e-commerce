"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, User, Menu, X, Ghost, Sparkles, ChevronRight, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartProvider";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 py-4 ${
        isScrolled ? "bg-white/70 backdrop-blur-md border-b border-black/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ rotate: 180 }}
            className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white shadow-lg"
          >
            <Ghost size={20} />
          </motion.div>
          <div className="flex flex-col -space-y-1">
             <span className="text-xl font-black tracking-tighter text-black uppercase italic">Antigravity</span>
             <span className="text-[8px] font-black tracking-[0.4em] text-accent uppercase">Pastel // Grid</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          {['Collections', 'New Arrivals', 'About', 'Contact'].map((item) => (
            <Link 
              key={item} 
              href={`/${item.toLowerCase().replace(' ', '-')}`} 
              className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 hover:text-black transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
          <Link href="/profile" className="p-3 glass rounded-xl text-black/60 hover:text-black hover:border-accent transition-all relative">
            <User size={18} />
          </Link>
          
          <button className="p-3 bg-black text-white rounded-xl hover:scale-105 transition-all relative shadow-xl">
             <ShoppingCart size={18} />
             {totalItems > 0 && (
               <motion.span 
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white"
               >
                 {totalItems}
               </motion.span>
             )}
          </button>

          <button 
            className="md:hidden p-3 glass rounded-xl text-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-16">
               <div className="flex items-center gap-2">
                 <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white"><Ghost size={16}/></div>
                 <span className="font-black uppercase tracking-tighter">Antigravity</span>
               </div>
               <button onClick={() => setIsMenuOpen(false)} className="p-3 bg-black/5 rounded-xl"><X size={20}/></button>
            </div>
            
            <div className="space-y-8">
              {['Collections', 'New Arrivals', 'About', 'Contact'].map((item, i) => (
                <motion.div 
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    href={`/${item.toLowerCase().replace(' ', '-')}`} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-4xl font-black uppercase tracking-tighter flex items-center justify-between group"
                  >
                    {item}
                    <ChevronRight className="text-accent opacity-0 group-hover:opacity-100 transition-all" size={32} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
