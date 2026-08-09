import "./globals.css";
import Header from "@/components/homepage/header/Header";
import Footer from "@/components/homepage/footer/Footer";
import { CartProvider } from "@/context/CartContext";
import Script from "next/script";

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "28506982922219919";


export const metadata = {
  title: "Intouch Gadgets - Online Shopping in Bangladesh for Gadgets & Electronics",
  description: "Intouch Gadgets is a premium online shop in Bangladesh containing responsive categories and authentic gadget items.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </head>
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

