import Navbar from "@/components/Navbar";
import { CartProvider } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
