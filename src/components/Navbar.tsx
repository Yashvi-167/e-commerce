"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, User, X, ArrowRight, Ghost } from 'lucide-react';
import { useCart } from './CartProvider';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const { items, setIsCartOpen } = useCart();
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/collections?q=${searchQuery}`);
    }
  };

  return (
    <>
      <nav className="w-full sticky top-0 z-50 px-4 py-4 pointer-events-none">
        <div className="max-w-7xl mx-auto glass rounded-2xl px-6 h-16 flex items-center justify-between pointer-events-auto neon-border border-white/10">
          
          <Link href="/" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-2 text-xl font-bold tracking-tighter hover:neon-text transition-all duration-300">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Ghost className="text-primary w-6 h-6" />
            </motion.div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">ANTIGRAVITY</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60 uppercase tracking-widest">
            {['New Arrivals', 'Collections', 'About'].map((item) => (
              <Link key={item} href="/collections" className="hover:text-white hover:neon-text transition-all duration-300">
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <button onClick={() => setIsSearchOpen(true)} className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
              <Search size={18} />
            </button>
            <Link href="/login" className="hidden sm:block text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
              <User size={18} />
            </Link>
            <button onClick={() => setIsCartOpen(true)} className="relative text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary neon-border text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="md:hidden text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Floating Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 bg-black/60 z-[100] flex flex-col items-center justify-center"
          >
            <motion.button 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => setIsSearchOpen(false)} 
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
            >
              <X size={32} />
            </motion.button>
            
            <motion.form 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              onSubmit={handleSearch} 
              className="w-full max-w-2xl px-6"
            >
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={24} />
                <input 
                  autoFocus
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH THE FUTURE..." 
                  className="w-full glass rounded-2xl text-2xl font-medium text-white placeholder-white/10 pl-16 pr-8 py-6 focus:outline-none focus:neon-border transition-all tracking-widest uppercase"
                />
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full glass z-40 md:hidden flex flex-col p-10 pt-32 gap-8"
          >
            {['New Arrivals', 'Collections', 'About', 'Account'].map((item) => (
              <Link 
                key={item}
                href={item === 'Account' ? '/login' : '/collections'} 
                onClick={() => setIsMobileOpen(false)} 
                className="text-4xl font-black uppercase tracking-tighter hover:text-primary transition-colors flex items-center justify-between"
              >
                {item} <ArrowRight size={32} className="text-white/20" />
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
