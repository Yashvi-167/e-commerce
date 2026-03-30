import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { User, Package, Heart, Settings, Ghost, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      orders: {
        include: { items: true },
        orderBy: { createdAt: 'desc' }
      },
      wishlist: {
        include: { product: true }
      }
    }
  });

  if (!user) redirect("/login");

  return (
    <main className="min-h-screen bg-background text-foreground pb-20 pt-10 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold tracking-[0.3em] uppercase text-xs">
              <User size={14} />
              Identity // profile
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Node.{user.email.split('@')[0]}
            </h1>
          </div>
          <div className="flex gap-4">
            <div className="glass px-6 py-3 rounded-xl border-white/5 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-white/40">Status // Synchronized</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Sidebar Info */}
          <div className="space-y-8">
            <div className="glass-card p-10 border-white/5 space-y-8">
              <div className="w-24 h-24 rounded-[2rem] glass border-white/10 flex items-center justify-center text-primary shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                <Ghost size={40} />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold tracking-[0.2em] text-white/20 uppercase">Registry Email</label>
                  <p className="text-white font-bold">{user.email}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold tracking-[0.2em] text-white/20 uppercase">Access Role</label>
                  <p className="text-primary font-black uppercase tracking-widest text-xs italic">{user.role}</p>
                </div>
              </div>
              <button className="w-full glass py-4 rounded-xl text-xs font-bold uppercase tracking-widest border-white/5 hover:neon-border transition-all">
                UPDATE PROTOCOLS
              </button>
            </div>

            <div className="glass-card p-8 border-white/5 bg-white/[0.02]">
              <div className="flex items-center justify-between text-white/40">
                <div className="flex items-center gap-3">
                  <Heart size={18} />
                  <span className="text-xs font-bold uppercase tracking-widest">Wishlist Vault</span>
                </div>
                <span className="text-xs font-black">{user.wishlist.length} Objects</span>
              </div>
            </div>
          </div>

          {/* Main Content: Orders */}
          <div className="lg:col-span-2 space-y-8">
             <div className="flex items-center gap-4">
                <Package className="text-primary" size={24} />
                <h2 className="text-2xl font-black uppercase tracking-tighter">Order Transmissions</h2>
                <div className="flex-1 h-px bg-white/5" />
             </div>

             {user.orders.length === 0 ? (
                <div className="glass-card p-20 flex flex-col items-center justify-center text-center gap-6 border-white/5">
                  <Sparkles size={48} className="text-white/10" />
                  <p className="text-white/40 font-bold tracking-widest uppercase">No orbital deliveries scheduled.</p>
                  <Link href="/collections" className="text-primary font-black uppercase tracking-tighter text-sm flex items-center gap-2 hover:gap-4 transition-all">
                    INITIATE DISCOVERY <ArrowRight size={18} />
                  </Link>
                </div>
             ) : (
                <div className="space-y-6">
                  {user.orders.map(order => (
                    <div key={order.id} className="glass-card p-8 border-white/5 group hover:border-primary/20 transition-all space-y-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Transmission ID</p>
                          <p className="text-white font-black uppercase tracking-tight">#{String(order.id).substring(0, 8)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Status</p>
                          <p className="text-primary font-black uppercase tracking-widest text-[10px]">{order.status}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        {order.items.map((item, i) => (
                           <div key={i} className="w-12 h-12 rounded-lg glass border-white/5 overflow-hidden">
                             <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80" alt="" className="w-full h-full object-cover opacity-60" />
                           </div>
                        ))}
                        <div className="flex-1" />
                        <div className="text-right">
                           <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Total</p>
                           <p className="text-xl font-black text-white italic">${Number(order.totalAmount).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
             )}
          </div>

        </div>
      </div>
    </main>
  );
}
