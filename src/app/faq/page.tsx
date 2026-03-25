export default function FAQPage() {
  const faqs = [
    { q: "Do you ship internationally?", a: "Yes, we ship globally using premium carrier networks for rapid physical delivery." },
    { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days. Expedited overnight options are available at checkout." },
    { q: "What is your return policy?", a: "We offer a 30-day seamless, no-questions-asked return window for all un-worn items with tags attached." },
    { q: "How can I track my order?", a: "Once dispatched, you will receive a tracking link via email allowing you to monitor your package in real-time." },
    { q: "Are my payment details secure?", a: "Absolutely. Our checkout environment is encrypted end-to-end utilizing zero-trust serverless technology." }
  ];
  
  return (
    <main className="min-h-screen bg-primary py-24 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-6">
          <h1 className="text-6xl font-black uppercase text-foreground tracking-tighter">FAQ</h1>
          <div className="w-24 h-2 bg-accent rounded-full"></div>
        </div>
        
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-secondary p-8 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer group">
              <h3 className="font-black text-foreground text-xl md:text-2xl mb-4 group-hover:text-accent transition-colors">{faq.q}</h3>
              <p className="text-slate-400 text-lg leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
