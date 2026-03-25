"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Lock, UserPlus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill out all fields.");
      return;
    }
    
    setIsLoading(true);
    const mockNetworkRequest = new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.promise(mockNetworkRequest, {
      loading: isLogin ? 'Authenticating credentials...' : 'Provisioning new account...',
      success: () => {
        setIsLoading(false);
        router.push("/");
        return isLogin ? `Welcome back, ${email.split('@')[0]}!` : `Account created for ${email}!`;
      },
      error: 'Network Error',
    });
  };

  return (
    <main className="min-h-screen bg-primary flex flex-col md:flex-row font-sans">
      {/* 60% Aesthetic Billboard */}
      <div className="flex-1 hidden md:flex bg-secondary items-center justify-center p-12 relative overflow-hidden group">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity mix-blend-overlay"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
         <div className="relative z-10 space-y-6">
           <h1 className="text-6xl lg:text-8xl font-black uppercase text-foreground leading-none">
             Make Your<br/><span className="text-accent">Mark.</span>
           </h1>
           <p className="text-xl text-slate-400 max-w-md font-medium">Create an account to access highly exclusive drops, manage active orders, and enter the secure checkout environment.</p>
         </div>
      </div>
      
      {/* 30% Functional Pane */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-primary relative">
        <Link href="/" className="absolute top-8 right-8 text-2xl font-black text-foreground tracking-widest hover:text-accent transition-colors">
          AURALIS<span className="text-accent">.</span>
        </Link>
        
        <div className="max-w-md w-full mx-auto space-y-8 mt-12">
          <div className="space-y-3">
            <h2 className="text-4xl md:text-5xl font-black uppercase text-foreground tracking-tighter">
              {isLogin ? "Sign In" : "Sign Up"}
            </h2>
            <p className="text-slate-400 font-medium">
              {isLogin ? "Log in to manage your orders and preferences." : "Create your AURALIS account profile today."}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address" 
                  disabled={isLoading}
                  className="w-full bg-secondary border border-slate-700/50 text-foreground px-12 py-4 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-medium disabled:opacity-50" 
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password" 
                  disabled={isLoading}
                  className="w-full bg-secondary border border-slate-700/50 text-foreground px-12 py-4 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-medium disabled:opacity-50" 
                />
              </div>
            </div>
            
            {isLogin && (
              <div className="flex items-center justify-between text-sm font-medium">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer hover:text-foreground transition-colors group">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-secondary text-accent focus:ring-accent focus:ring-offset-primary cursor-pointer" />
                  Remember me
                </label>
                <button type="button" className="text-accent hover:underline font-bold transition-all">Forgot Password?</button>
              </div>
            )}
            
            {/* CTA */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-accent text-primary py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(204,255,0,0.15)] disabled:opacity-70 disabled:hover:scale-100"
            >
              {isLoading ? (
                <><Loader2 size={24} className="animate-spin" /> Processing</>
              ) : isLogin ? (
                <><ArrowRight size={24} /> Access Dashboard</>
              ) : (
                <><UserPlus size={24} /> Create Account</>
              )}
            </button>
          </form>
          
          <div className="text-center font-medium">
            {isLogin ? (
              <p className="text-slate-400">
                Don't have an account? <button onClick={() => setIsLogin(false)} className="text-foreground hover:text-accent font-bold transition-colors ml-1 uppercase tracking-wider text-sm">Create one</button>
              </p>
            ) : (
              <p className="text-slate-400">
                Already registered? <button onClick={() => setIsLogin(true)} className="text-foreground hover:text-accent font-bold transition-colors ml-1 uppercase tracking-wider text-sm">Sign In</button>
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
