"use client";
import { motion } from "framer-motion";
import { Mail, MessageSquare, MapPin, Phone, ArrowRight, Sparkles, Ghost } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully.", {
      className: "glass border-pink-500 text-black font-black uppercase text-[10px] tracking-widest",
      icon: <Sparkles className="text-pink-500" size={16} />
    });
  };

  return (
    <main className="min-h-screen bg-background pb-32 pt-24 px-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[hsla(330,70%,90%,0.3)] blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[hsla(330,70%,95%,0.3)] blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        
        <div className="flex flex-col md:flex-row items-end justify-between gap-12 border-b border-black/5 pb-20">
          <div className="space-y-6 max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-pink-500 font-black tracking-[0.4em] uppercase text-[10px]"
            >
              <Sparkles size={14} />
              Customer Support
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none italic text-black"
            >
              Contact <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-200">Belle Ame</span>
            </motion.h1>
          </div>
          <div className="md:w-1/3 text-right">
             <p className="text-xl text-black/40 font-medium leading-relaxed lowercase tracking-tight italic">
               Get in touch with our team for any inquiries or support.
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          <div className="space-y-12">
            {[
              { icon: <Mail size={24} />, title: "Email Us", detail: "support@belle-ame.com" },
              { icon: <Phone size={24} />, title: "Call Us", detail: "+1 (800) BELLE-AME" },
              { icon: <MapPin size={24} />, title: "Visit Us", detail: "123 Belle Ame St, New York" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-8 group"
              >
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-pink-500 group-hover:bg-black group-hover:text-white transition-all duration-500 border-black/5 shadow-lg bg-white">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-xs font-black text-black uppercase tracking-widest">{item.title}</h3>
                  <p className="text-xl font-bold text-black/40 uppercase tracking-tighter italic">{item.detail}</p>
                </div>
              </motion.div>
            ))}

            <div className="glass-card p-10 border-black/5 space-y-6 bg-pink-50/50">
               <Ghost className="text-pink-100" size={64} />
               <p className="text-sm font-black text-black/10 uppercase tracking-[0.3em]">Premium Concierge Service Active</p>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-10 md:p-16 border-black/5 bg-white shadow-3xl space-y-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100/20 blur-[40px] rounded-full" />
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/20 ml-2">Name</label>
                  <input required placeholder="YOUR NAME" className="w-full glass border-black/5 px-6 py-4 text-xs font-black tracking-widest text-black focus:outline-none focus:ring-2 focus:ring-pink-500/10 transition-all bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-black/20 ml-2">Email Address</label>
                  <input required type="email" placeholder="EMAIL@EXAMPLE.COM" className="w-full glass border-black/5 px-6 py-4 text-xs font-black tracking-widest text-black focus:outline-none focus:ring-2 focus:ring-pink-500/10 transition-all bg-white" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-black/20 ml-2">Message</label>
                <textarea rows={4} required placeholder="HOW CAN WE HELP YOU?" className="w-full glass border-black/5 px-6 py-4 text-xs font-black tracking-widest text-black focus:outline-none focus:ring-2 focus:ring-pink-500/10 transition-all bg-white resize-none" />
              </div>
              <button className="w-full bg-black text-white font-black py-6 rounded-2xl hover:bg-pink-500 transition-all uppercase tracking-widest text-xs shadow-xl flex items-center justify-center gap-4 group">
                SEND MESSAGE
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
