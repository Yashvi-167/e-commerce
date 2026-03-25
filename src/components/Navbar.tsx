"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, User, X, ArrowRight } from 'lucide-react';
import { useCart } from './CartProvider';
import { useRouter } from 'next/navigation';

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
      // Redirects to mock collections page for the MVP demo
      router.push(`/collections`);
    }
  };

  return (
    <>
      <nav className="w-full bg-primary/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <Link href="/" onClick={() => setIsMobileOpen(false)} className="text-2xl font-black text-foreground tracking-widest hover:text-accent transition-colors relative z-50">
            AURALIS<span className="text-accent">.</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-500">
            <Link href="/collections" className="hover:text-foreground transition-colors">New Arrivals</Link>
            <Link href="/collections" className="hover:text-foreground transition-colors">Collections</Link>
            <Link href="/about" className="hover:text-foreground transition-colors">About Us</Link>
          </div>

          <div className="flex items-center gap-6 relative z-50">
            <button onClick={() => setIsSearchOpen(true)} className="text-slate-500 hover:text-accent transition-colors">
              <Search size={20} />
            </button>
            <Link href="/login" className="hidden sm:block text-slate-500 hover:text-accent transition-colors">
              <User size={20} />
            </Link>
            <button onClick={() => setIsCartOpen(true)} className="relative text-slate-500 hover:text-accent transition-colors flex items-center gap-2">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-primary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="md:hidden text-slate-500 hover:text-accent transition-colors">
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-primary/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center animate-in fade-in duration-200">
          <button onClick={() => setIsSearchOpen(false)} className="absolute top-6 right-6 md:top-12 md:right-12 text-slate-400 hover:text-accent transition-colors">
            <X size={40} />
          </button>
          <form onSubmit={handleSearch} className="w-full max-w-4xl px-6 relative">
            <Search className="absolute left-10 md:left-12 top-1/2 -translate-y-1/2 text-slate-400" size={32} />
            <input 
              autoFocus
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..." 
              className="w-full bg-transparent border-b-2 border-slate-700 text-3xl md:text-5xl lg:text-7xl font-black text-foreground placeholder-slate-400/50 px-16 md:px-24 py-8 focus:outline-none focus:border-accent transition-colors tracking-tighter"
            />
          </form>
          <p className="mt-8 text-slate-400 font-medium tracking-widest uppercase">Press Enter to Search</p>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-primary z-30 pt-28 px-6 md:hidden flex flex-col animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-6 text-3xl font-black uppercase tracking-tighter">
            <Link href="/collections" onClick={() => setIsMobileOpen(false)} className="hover:text-accent transition-colors flex items-center justify-between border-b border-slate-700 pb-4">
              New Arrivals <ArrowRight size={24} className="text-slate-400" />
            </Link>
            <Link href="/collections" onClick={() => setIsMobileOpen(false)} className="hover:text-accent transition-colors flex items-center justify-between border-b border-slate-700 pb-4">
              Collections <ArrowRight size={24} className="text-slate-400" />
            </Link>
            <Link href="/about" onClick={() => setIsMobileOpen(false)} className="hover:text-accent transition-colors flex items-center justify-between border-b border-slate-700 pb-4">
              About Us <ArrowRight size={24} className="text-slate-400" />
            </Link>
            <Link href="/login" onClick={() => setIsMobileOpen(false)} className="hover:text-accent transition-colors flex items-center justify-between border-b border-slate-700 pb-4">
              Account Login <User size={24} className="text-slate-400" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
