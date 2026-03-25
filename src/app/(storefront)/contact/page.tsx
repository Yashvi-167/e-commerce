export default function ContactPage() {
  return (
    <main className="min-h-screen bg-primary py-24 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-6">
          <h1 className="text-6xl font-black uppercase text-foreground tracking-tighter">Contact Us</h1>
          <div className="w-24 h-2 bg-accent rounded-full"></div>
          <p className="text-slate-400 text-xl font-medium">Have a question? We're here to help around the clock.</p>
        </div>
        
        <div className="bg-secondary p-10 md:p-16 rounded-[2rem] border border-slate-800 shadow-2xl">
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-primary border border-slate-700 px-6 py-5 rounded-xl text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full bg-primary border border-slate-700 px-6 py-5 rounded-xl text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Message</label>
              <textarea placeholder="How can we help you today?" rows={6} className="w-full bg-primary border border-slate-700 px-6 py-5 rounded-xl text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all" />
            </div>
            <button type="button" className="w-full md:w-auto bg-accent text-primary px-12 py-5 font-black text-lg rounded-xl hover:opacity-90 hover:-translate-y-1 transition-all shadow-[0_0_20px_rgba(204,255,0,0.15)]">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
