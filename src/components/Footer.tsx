import Link from "next/link";
export default function Footer() {
  return (
    <footer className="w-full bg-secondary py-16 px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link href="/" className="text-3xl font-black text-foreground tracking-widest hover:text-accent transition-colors">
            AURALIS<span className="text-accent">.</span>
          </Link>
          <p className="text-slate-400 text-base leading-relaxed max-w-sm">Your destination for premium quality products and uncompromising style.</p>
        </div>
        <div>
          <h4 className="font-black text-foreground mb-6 uppercase tracking-wider text-sm">Shop</h4>
          <ul className="space-y-4 text-base font-medium text-slate-400">
            <li><Link href="/collections" className="hover:text-accent transition-colors">New Arrivals</Link></li>
            <li><Link href="/collections" className="hover:text-accent transition-colors">Best Sellers</Link></li>
            <li><Link href="/collections" className="hover:text-accent transition-colors">All Products</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-foreground mb-6 uppercase tracking-wider text-sm">Support</h4>
          <ul className="space-y-4 text-base font-medium text-slate-400">
            <li><Link href="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
            <li><Link href="/shipping-returns" className="hover:text-accent transition-colors">Shipping & Returns</Link></li>
            <li><Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-foreground mb-6 uppercase tracking-wider text-sm">Legal</h4>
          <ul className="space-y-4 text-base font-medium text-slate-400">
            <li><Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-accent transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 font-medium text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; 2025 AURALIS. All Rights Reserved.</p>
        <div className="flex gap-4">
          <span className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-[10px] text-slate-400">VISA</span>
          <span className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-[10px] text-slate-400">MC</span>
          <span className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-[10px] text-slate-400">AMEX</span>
        </div>
      </div>
    </footer>
  );
}
