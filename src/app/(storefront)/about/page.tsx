export default function AboutPage() {
  return (
    <main className="min-h-screen bg-primary py-24 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-6">
          <h1 className="text-6xl font-black uppercase text-foreground tracking-tighter">About Us</h1>
          <div className="w-24 h-2 bg-accent rounded-full"></div>
        </div>
        
        <div className="bg-secondary p-12 rounded-[2rem] border border-slate-800">
          <div className="prose prose-invert prose-xl text-slate-300 space-y-8 leading-relaxed">
            <p className="text-2xl text-foreground font-medium">We are an independent brand dedicated to providing the highest quality products.</p>
            <p>Our mission is to create exceptional essentials that combine modern aesthetics with everyday functionality. Every item in our collection is carefully curated and crafted to meet the absolute highest market standards.</p>
            <p>Welcome to our store, where quality and customer satisfaction are our top priorities.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
