"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Lock, ArrowRight, CheckCircle2, Loader2, KeyRound } from "lucide-react";
import Link from "next/link";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!token) {
    return (
      <div className="text-center space-y-6 max-w-md mx-auto p-12 bg-secondary rounded-[2.5rem] border border-slate-700/50 shadow-2xl relative">
        <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <KeyRound size={40} />
        </div>
        <h2 className="text-3xl font-black uppercase text-foreground">Invalid Reset Link</h2>
        <p className="text-slate-400 font-medium">This password reset link is missing its secure token. It may be broken or malformed.</p>
        <Link href="/login" className="inline-block bg-accent text-primary px-8 py-4 mt-4 rounded-xl font-bold uppercase transition-transform hover:scale-105 shadow-xl">
          Return to Login
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to reset password");
      }

      setIsSuccess(true);
      toast.success("Password secured! Your account is safe.");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-6 max-w-md mx-auto p-12 bg-secondary rounded-[2.5rem] border border-slate-700/50 shadow-2xl relative">
         <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mx-auto mb-8 animate-bounce">
           <CheckCircle2 size={48} />
         </div>
         <h1 className="text-4xl font-black text-foreground uppercase tracking-tighter">Password Reset Complete</h1>
         <p className="text-slate-400 text-lg">Your new credentials have been securely registered to the network.</p>
         <Link href="/login" className="inline-flex items-center gap-2 bg-accent text-primary font-black uppercase px-12 py-5 rounded-2xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(204,255,0,0.2)] mt-8">
           Access Your Account <ArrowRight size={20} />
         </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto space-y-8 p-8 md:p-12 bg-secondary rounded-[2.5rem] border border-slate-700/50 shadow-2xl relative">
      <div className="space-y-3 text-center">
        <h2 className="text-4xl font-black uppercase text-foreground tracking-tighter">
          Configure New Password
        </h2>
        <p className="text-slate-400 font-medium tracking-wide">
          Securely encrypt a new password for your account below.
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 pt-4">
        <div className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password (8+ characters)" 
              disabled={isLoading}
              className="w-full bg-primary border border-slate-700/50 text-foreground px-12 py-4 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-medium disabled:opacity-50" 
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password" 
              disabled={isLoading}
              className="w-full bg-primary border border-slate-700/50 text-foreground px-12 py-4 rounded-xl focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all font-medium disabled:opacity-50" 
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-accent text-primary py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(204,255,0,0.15)] disabled:opacity-70 disabled:hover:scale-100"
        >
          {isLoading ? (
            <><Loader2 size={24} className="animate-spin" /> Encrypting...</>
          ) : (
            <>Reset Password <ArrowRight size={20} /></>
          )}
        </button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-primary flex flex-col justify-center items-center py-24 px-6 relative">
      <Link href="/" className="absolute top-8 left-8 text-2xl font-black text-foreground tracking-widest hover:text-accent transition-colors">
        AURALIS<span className="text-accent">.</span>
      </Link>
      <Suspense fallback={<div className="text-accent flex flex-col items-center justify-center gap-4 animate-pulse pt-24"><Loader2 size={40} className="animate-spin" /><span className="text-slate-500 font-bold uppercase tracking-widest">Verifying Secure Token...</span></div>}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
