import Link from "next/link";
import { Sparkles, Ghost, Shield, Twitter, Instagram, Github, Mail, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white py-20 px-6 border-t border-black/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
        <div className="space-y-8">
          <Link href="/" className="text-3xl font-black text-black tracking-tighter hover:text-accent transition-all uppercase flex items-center gap-3 italic">
            <Ghost className="text-accent" size={28} />
            BELLE AME
          </Link>
          <p className="text-black/40 text-sm leading-relaxed max-w-sm font-medium uppercase tracking-widest lowercase">
            Defying the standard through aesthetic precision and functional excellence in a pastel ecosystem.
          </p>
          <div className="flex gap-6 text-black/20">
            <Mail size={18} className="hover:text-accent cursor-pointer transition-colors" />
            <Globe size={18} className="hover:text-accent cursor-pointer transition-colors" />
            <Shield size={18} className="hover:text-accent cursor-pointer transition-colors" />
          </div>
        </div>

        <div>
          <h4 className="font-black text-black mb-8 uppercase tracking-[0.3em] text-[10px]">Shop Collections</h4>
          <ul className="space-y-4 text-xs font-bold text-black/40 uppercase tracking-widest">
            <li><Link href="/collections?dept=Men" className="hover:text-accent transition-colors">Men's Collection</Link></li>
            <li><Link href="/collections?dept=Women" className="hover:text-accent transition-colors">Women's Collection</Link></li>
            <li><Link href="/collections?dept=Kids" className="hover:text-accent transition-colors">Kids' Collection</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-black mb-8 uppercase tracking-[0.3em] text-[10px]">Customer Support</h4>
          <ul className="space-y-4 text-xs font-bold text-black/40 uppercase tracking-widest">
            <li><Link href="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
            <li><Link href="/shipping-returns" className="hover:text-accent transition-colors">Shipping & Returns</Link></li>
            <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-black mb-8 uppercase tracking-[0.3em] text-[10px]">Legal Information</h4>
          <ul className="space-y-4 text-xs font-bold text-black/40 uppercase tracking-widest">
            <li><Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-black/20">
        <p>&copy; 2026 BELLE AME. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-4">
          <div className="bg-black/5 px-3 py-1 rounded border border-black/5">VISA</div>
          <div className="bg-black/5 px-3 py-1 rounded border border-black/5">MC</div>
          <div className="bg-black/5 px-3 py-1 rounded border border-black/5">AMEX</div>
        </div>
      </div>
    </footer>
  );
}
