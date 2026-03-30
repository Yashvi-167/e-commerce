import Link from "next/link";
import { Sparkles, Ghost, Shield, Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-background py-20 px-6 border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
        <div className="space-y-8">
          <Link href="/" className="text-3xl font-black text-white tracking-tighter hover:text-primary transition-all uppercase flex items-center gap-3">
            <Ghost className="text-primary" size={28} />
            ANTIGRAVITY
          </Link>
          <p className="text-white/40 text-sm leading-relaxed max-w-sm font-medium uppercase tracking-widest">
            Defying the standard through aesthetic precision and functional excellence.
          </p>
          <div className="flex gap-6 text-white/20">
            <Twitter size={18} className="hover:text-primary cursor-pointer transition-colors" />
            <Instagram size={18} className="hover:text-primary cursor-pointer transition-colors" />
            <Github size={18} className="hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>

        <div>
          <h4 className="font-black text-white mb-8 uppercase tracking-[0.3em] text-[10px]">Registry // Shop</h4>
          <ul className="space-y-4 text-xs font-bold text-white/40 uppercase tracking-widest">
            <li><Link href="/collections" className="hover:text-primary transition-colors">Sector: New</Link></li>
            <li><Link href="/collections" className="hover:text-primary transition-colors">Best Sellers</Link></li>
            <li><Link href="/collections" className="hover:text-primary transition-colors">All Assets</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-white mb-8 uppercase tracking-[0.3em] text-[10px]">Nodes // Support</h4>
          <ul className="space-y-4 text-xs font-bold text-white/40 uppercase tracking-widest">
            <li><Link href="/faq" className="hover:text-primary transition-colors">Query Grid</Link></li>
            <li><Link href="/shipping-returns" className="hover:text-primary transition-colors">Logistics</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Comms Sync</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-white mb-8 uppercase tracking-[0.3em] text-[10px]">Secure // Legal</h4>
          <ul className="space-y-4 text-xs font-bold text-white/40 uppercase tracking-widest">
            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Protocol</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Sync</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">
        <p>&copy; 2077 ANTIGRAVITY. SYNCED IN SECTOR 7.</p>
        <div className="flex gap-4">
          <div className="glass px-3 py-1 rounded border border-white/5">VISA</div>
          <div className="glass px-3 py-1 rounded border border-white/5">MC</div>
          <div className="glass px-3 py-1 rounded border border-white/5">CRYPTO</div>
        </div>
      </div>
    </footer>
  );
}
