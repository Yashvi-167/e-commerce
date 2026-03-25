"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { toast } from "sonner";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      if (typeof window !== "undefined") {
        document.cookie = "adminAuth=true; path=/";
        toast.success("Authentication successful");
        router.push("/admin/dashboard");
      }
    } else {
      toast.error("Unauthorized. Invalid credentials.");
    }
  };

  return (
    <main className="min-h-screen bg-primary flex items-center justify-center font-sans px-6">
      <div className="w-full max-w-md bg-secondary p-8 rounded-[2rem] border border-slate-700/50 shadow-2xl relative overflow-hidden">
        
        <div className="flex flex-col items-center justify-center space-y-4 mb-8 relative z-10">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-accent ring-1 ring-slate-700">
            <Lock size={24} />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-black text-foreground uppercase tracking-tight">Admin Gateway</h1>
            <p className="text-slate-400 text-sm font-medium mt-1">Authorized Store Personnel Only</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div>
            <label className="block text-slate-400 text-sm font-bold mb-2 uppercase tracking-wider">Master Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent/50 transition-colors placeholder:text-slate-600"
              placeholder="Enter master key..."
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-foreground text-primary font-bold py-3 rounded-xl hover:bg-accent transition-colors"
          >
            Access Backoffice
          </button>
        </form>

        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      </div>
    </main>
  );
}
