import type { Metadata } from "next";
import { Toaster } from "sonner";
import Script from "next/script";
import "./tailwind-input.css";

export const metadata: Metadata = {
  title: "BELLE AME | Minimalist Urban Essentials",
  description: "High-performance e-commerce frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet" />
        
        {/* Load Tailwind CDN properly via next/script to avoid hydration errors */}
        <Script 
          src="https://cdn.tailwindcss.com" 
          strategy="beforeInteractive"
        />
        
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --background: #ffffff;
            --foreground: #111111;
            --secondary: #fce4ec;
            --accent: #f48fb1;
          }
          body {
            background-color: white !important;
            color: #111111 !important;
            font-family: 'Inter', sans-serif;
            background-image: 
              radial-gradient(at 0% 0%, hsla(330, 100%, 93%, 0.4) 0px, transparent 50%),
              radial-gradient(at 100% 100%, hsla(340, 100%, 85%, 0.4) 0px, transparent 50%);
            background-attachment: fixed;
          }
          .glass {
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(0, 0, 0, 0.05);
            box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
          }
          .glass-card {
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(0, 0, 0, 0.05);
            border-radius: 2rem;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          .glass-card:hover {
            border-color: #f48fb1;
            box-shadow: 0 20px 40px hsla(340, 100%, 64%, 0.1);
            transform: translateY(-8px) scale(1.01);
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        ` }} />
        <Script id="tailwind-config" strategy="beforeInteractive">
          {`
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    background: '#ffffff',
                    secondary: '#fce4ec',
                    accent: '#f48fb1',
                    primary: '#f48fb1',
                  }
                }
              }
            }
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Toaster 
          position="bottom-right" 
          toastOptions={{ 
            className: "glass border-pink-500 text-black font-black uppercase text-[10px] tracking-widest",
          }} 
        />
      </body>
    </html>
  );
}
