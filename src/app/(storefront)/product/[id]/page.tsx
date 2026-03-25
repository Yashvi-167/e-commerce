import { ShoppingBag, Star, Check, Tag } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";
import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const dynamic = 'force-dynamic';

// Cache the product fetch to prevent duplicate requests across generateMetadata and ProductPage
const getProduct = cache(async (id: string) => {
  try {
    const productData = await db.select().from(products).where(eq(products.id, parseInt(id)));
    return productData[0] || null;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
});

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Product Not Found | AURALIS" };
  
  return {
    title: product.metaTitle || `${product.name} | AURALIS`,
    description: product.metaDescription || product.description,
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  const product = await getProduct(id);

  if (!product) {
    return <main className="min-h-screen bg-primary flex items-center justify-center font-black text-4xl text-foreground text-center p-6 bg-slate-900 border border-slate-700/50 rounded-2xl max-w-2xl mx-auto mt-24">Product Not Found or Database Connection Failed</main>;
  }


  const features = product.features as string[] || [];
  const variants = product.variants as string[] || [];

  return (
    <main className="min-h-screen bg-primary pb-24">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-16">
        
        <div className="flex-1 w-full bg-slate-800 aspect-square lg:aspect-auto lg:h-[800px] rounded-[3rem] border border-slate-700/50 flex items-center justify-center relative overflow-hidden group shadow-2xl">
          <img src={product.imageUrl || ""} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/20 pointer-events-none z-10"></div>
          {product.compareAtPrice && (
            <div className="absolute top-8 left-8 bg-red-500/90 backdrop-blur text-white font-black text-xs px-4 py-2 rounded-full uppercase tracking-widest shadow-xl flex items-center gap-2">
              <Star size={12} fill="currentColor" /> Premium Sale
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-8 py-8 lg:pr-12">
          
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-500">
              <span className="text-accent bg-accent/10 px-3 py-1 rounded-full">{product.vendor}</span> 
              <span>{product.department}</span> &middot; 
              <span>{product.category}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-foreground uppercase tracking-tighter leading-none">
              {product.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex text-accent">
                 {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <span className="text-slate-400 font-bold text-sm tracking-wide">{product.reviewsRating} ({product.reviewsCount} Verified Reviews)</span>
              <span className="text-slate-600 font-bold text-sm ml-auto bg-secondary px-3 py-1 rounded-md border border-slate-800">SKU: {product.sku}</span>
            </div>

            <div className="flex items-end gap-4 text-xl pt-4">
              <span className="text-accent font-black text-4xl">₹{Number(product.price).toFixed(2)}</span>
              {product.compareAtPrice && (
                <span className="text-slate-500 line-through font-bold text-2xl pb-1">₹{Number(product.compareAtPrice).toFixed(2)}</span>
              )}
            </div>
          </div>

          <p className="text-slate-300 text-lg leading-relaxed font-medium">
            {product.description}
          </p>

          {features.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-700/50">
              <h3 className="text-foreground font-black uppercase tracking-wider text-sm">Key Benefits & Features</h3>
              <ul className="space-y-3">
                {features.map((f, i) => (
                   <li key={i} className="flex items-start gap-3 text-slate-400 font-medium">
                     <div className="mt-1 w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0"><Check size={10} /></div>
                     <span>{f}</span>
                   </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-6 pt-6 border-t border-slate-700/50">
            <AddToCartButton variants={variants} product={{ id: String(product.id), name: product.name, price: Number(product.price), image: product.imageUrl || "" }} />
            
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500 mt-4">
              <span className={Number(product.inventory) > 10 ? "text-green-400 flex items-center gap-2" : "text-amber-500 flex items-center gap-2"}>
                 <div className={`w-2 h-2 rounded-full ${Number(product.inventory) > 10 ? 'bg-green-400' : 'bg-amber-500'} animate-pulse`}></div>
                 {Number(product.inventory) > 0 ? `${product.inventory} UNITS IN STOCK` : "CURRENTLY UNAVAILABLE"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-slate-700/50">
            <div className="bg-secondary p-5 rounded-2xl border border-slate-700/50 shadow-inner">
               <h4 className="text-foreground font-black flex items-center gap-2 text-sm uppercase tracking-wide mb-3"><Tag size={16} className="text-accent" /> Shipping Rules</h4>
               <p className="text-slate-400 text-sm font-medium leading-relaxed">{product.shippingInfo}</p>
            </div>
            <div className="bg-secondary p-5 rounded-2xl border border-slate-700/50 shadow-inner flex flex-col justify-center">
               <span className="text-foreground font-black flex items-center gap-2 text-sm uppercase tracking-wide mb-3"><Star size={16} className="text-accent" /> Product Tags</span>
               <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider flex-wrap">
                 {product.tags?.split(",").map(t => <span key={t} className="bg-primary px-2 py-1 rounded border border-slate-800">{t.trim()}</span>)}
               </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
