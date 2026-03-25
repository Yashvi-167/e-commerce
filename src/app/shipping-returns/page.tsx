export default function ShippingReturnsPage() {
  return (
    <main className="min-h-screen bg-primary py-24 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-6">
          <h1 className="text-6xl font-black uppercase text-foreground tracking-tighter">Shipping & Returns</h1>
          <div className="w-24 h-2 bg-accent rounded-full"></div>
        </div>
        
        <div className="bg-secondary p-10 md:p-16 rounded-[2rem] border border-slate-800 space-y-12 text-slate-400 text-lg leading-relaxed">
          
          <div className="space-y-6">
            <h3 className="text-foreground font-black text-3xl uppercase tracking-wider">Shipping Policy</h3>
            <p>All orders are dynamically processed within 1-2 business days. We partner exclusively with the fastest local and international delivery providers to ensure your gear arrives securely and on time.</p>
            <ul className="list-disc list-inside space-y-2 text-slate-300 ml-4">
               <li>Standard Shipping (3-5 days): Free on orders over $100</li>
               <li>Express Shipping (1-2 days): $15 flat rate</li>
               <li>International Economy: Rates calculated at checkout</li>
            </ul>
          </div>

          <div className="w-full h-[1px] bg-slate-800"></div>
          
          <div className="space-y-6">
            <h3 className="text-foreground font-black text-3xl uppercase tracking-wider">Returns Framework</h3>
            <p>We accept returns within 30 days. For an item to be eligible for a full refund, it must be in its original, un-worn condition, with all tags and packaging intact.</p>
            <p>To initiate a return, navigate to your Dashboard or contact our support grid. Return shipping costs are covered for all domestic exchanges, but may apply to refunds and international returns.</p>
          </div>
          
        </div>
      </div>
    </main>
  );
}
