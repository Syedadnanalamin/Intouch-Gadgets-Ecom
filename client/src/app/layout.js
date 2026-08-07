import "./globals.css";
import Header from "@/components/homepage/header/Header";
import Footer from "@/components/homepage/footer/Footer";
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "Intouch Gadgets - Online Shopping in Bangladesh for Gadgets & Electronics",
  description: "Intouch Gadgets is a premium online shop in Bangladesh containing responsive categories and authentic gadget items.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#f4f7fa] antialiased text-gray-800">
        <CartProvider>
          <Header />
          <main className="flex-1 w-full flex flex-col">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
