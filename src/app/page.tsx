import React from "react";
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Star, Mail, Quote } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-primary font-sans overflow-hidden">
      
      {/* 1. HERO BANNER WITH CTA */}
      <section className="w-full min-h-[90vh] flex flex-col items-center justify-center p-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary/50 pointer-events-none" />
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-slate-700/50">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span className="text-sm font-medium tracking-wide text-slate-300">Premium Quality</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-foreground uppercase tracking-tighter leading-[0.9]">
              The Standard <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-green-400">
                Of Excellence
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
              Discover our latest collection of premium apparel and accessories, designed for everyday comfort and uncompromising style.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/collections" className="bg-accent text-primary px-8 py-4 font-bold text-lg rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(204,255,0,0.3)]">
                Shop Collection
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full bg-secondary aspect-square rounded-[2.5rem] border border-slate-700/50 flex items-center justify-center relative shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-700 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BADGES / USP SECTION */}
      <section className="w-full border-y border-slate-800 bg-secondary/30 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          <div className="flex flex-col items-center text-center space-y-4 px-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-accent"><Truck size={32} /></div>
            <h3 className="text-foreground font-bold text-xl">Fast Worldwide Shipping</h3>
            <p className="text-slate-400 text-sm">We partner with premium carriers for fast and reliable delivery.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4 px-4 pt-8 md:pt-0">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-accent"><ShieldCheck size={32} /></div>
            <h3 className="text-foreground font-bold text-xl">Secure Checkout</h3>
            <p className="text-slate-400 text-sm">Your payment information is processed entirely securely.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4 px-4 pt-8 md:pt-0">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-accent"><RotateCcw size={32} /></div>
            <h3 className="text-foreground font-bold text-xl">30-Day Returns</h3>
            <p className="text-slate-400 text-sm">Not completely satisfied? Return it seamlessly within 30 days.</p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED COLLECTIONS */}
      <section className="w-full py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tighter">Featured Collections</h2>
            <div className="w-24 h-1 bg-accent rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/collections?dept=Men" className="group relative h-96 rounded-3xl overflow-hidden bg-secondary">
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10"></div>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-50 group-hover:scale-105 transition-transform duration-700"></div>
              <div className="absolute bottom-8 left-8 z-20">
                <h3 className="text-3xl font-black text-foreground uppercase tracking-tight">Men's Apparel</h3>
                <div className="flex items-center gap-2 text-accent font-bold mt-2">
                  Shop Now <ArrowRight size={16} />
                </div>
              </div>
            </Link>
            <Link href="/collections?dept=Women" className="group relative h-96 rounded-3xl overflow-hidden bg-secondary">
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10"></div>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-50 group-hover:scale-105 transition-transform duration-700"></div>
              <div className="absolute bottom-8 left-8 z-20">
                <h3 className="text-3xl font-black text-foreground uppercase tracking-tight">Women's Apparel</h3>
                <div className="flex items-center gap-2 text-accent font-bold mt-2">
                  Shop Now <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT HIGHLIGHTS & BEST SELLING */}
      <section className="w-full bg-secondary py-24 px-6 border-y border-slate-700/50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 w-full aspect-square bg-primary rounded-3xl border border-slate-700 overflow-hidden relative group shadow-2xl">
             {/* Highlight Product Image */}
             <img src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80" alt="Best Seller" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent z-10"></div>
             <div className="absolute bottom-8 left-8 right-8 z-20 space-y-4">
               <div className="bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full w-max">Best Seller</div>
               <h3 className="text-4xl font-black text-foreground uppercase tracking-tight">Premium Alpha Jacket</h3>
               <p className="text-slate-400">Engineered for extreme environments. Fully waterproof and breathable.</p>
               <Link href="/product/1" className="inline-block bg-foreground text-primary px-8 py-3 rounded-full font-bold hover:bg-accent transition-colors">
                  View Product
               </Link>
             </div>
          </div>
          <div className="flex-1 space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tighter">Trending Now</h2>
              <p className="text-slate-400">Discover what our community is loving right now.</p>
            </div>
            <div className="space-y-6">
              {[
                { id: "2", name: "Utility Cargo Pants", price: 189.50, img: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&q=80" },
                { id: "3", name: "Performance Sneaker", price: 245.00, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80" },
                { id: "4", name: "Everyday Hoodie", price: 115.00, img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80" }
              ].map((item) => (
                <Link href={`/product/${item.id}`} key={item.id} className="flex gap-6 items-center p-4 rounded-2xl bg-primary border border-slate-700/50 hover:border-accent/50 transition-colors group cursor-pointer">
                  <div className="w-24 h-24 bg-slate-800 rounded-xl overflow-hidden shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">{item.name}</h4>
                    <div className="flex items-center gap-1 text-accent my-1">
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                    </div>
                    <span className="text-slate-400 font-medium">${item.price.toFixed(2)}</span>
                  </div>
                  <div className="pr-4"><ArrowRight className="text-slate-600 group-hover:text-accent" /></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CUSTOMER TESTIMONIALS */}
      <section className="w-full py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16 text-center">
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tighter">Community Feedback</h2>
            <div className="w-24 h-1 bg-accent rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { name: "Alex R.", text: "The cleanest storefront I've ever experienced. Loading times are non-existent." },
              { name: "Sarah M.", text: "Incredible attention to detail in the UI. The 60-30-10 color rule really shines here." },
              { name: "Jason K.", text: "Checkout was flawless. This brand genuinely feels premium and ready-to-sell." }
            ].map((review, i) => (
              <div key={i} className="bg-secondary p-8 rounded-3xl border border-slate-700/30 relative">
                <Quote className="absolute top-8 right-8 text-slate-700" size={40} />
                <div className="flex items-center gap-2 text-accent mb-6">
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                  <Star size={18} fill="currentColor" />
                </div>
                <p className="text-slate-300 text-lg leading-relaxed mb-8">"{review.text}"</p>
                <div className="font-bold text-foreground flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-accent">{review.name.charAt(0)}</div>
                  {review.name}
                  <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded ml-auto">Verified Buyer</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. NEWSLETTER SIGNUP */}
      <section className="w-full bg-accent py-24 px-6 border-t border-slate-700/50">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
            Stay Connected
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter">Join The Club</h2>
          <p className="text-primary/80 text-lg font-medium max-w-xl mx-auto">
            Subscribe to our exclusive newsletter to get early access to new drops, distinct promotions, and inside looks at our design process.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto w-full pt-4" action="/collections">
            <input 
              type="email" 
              placeholder="Enter your email address..." 
              className="flex-1 bg-primary border-none rounded-xl px-6 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-foreground placeholder:text-slate-500 font-medium shadow-xl"
              required 
            />
            <button type="submit" className="bg-foreground text-primary shadow-xl font-bold px-10 py-4 rounded-xl hover:scale-105 transition-transform whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </main>
  );
}
