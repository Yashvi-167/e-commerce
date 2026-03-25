import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import Navbar from "@/components/Navbar";
import { CartProvider } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "AURALIS | Minimalist Urban Essentials",
  description: "High-performance e-commerce frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <CartDrawer />
          <Toaster position="bottom-right" toastOptions={{ className: 'font-sans' }} />
        </CartProvider>
      </body>
    </html>
  );
}
