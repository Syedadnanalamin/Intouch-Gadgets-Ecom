import React from 'react';
import Banner from '@/components/homepage/banner/Banner';
import ProductSection from '@/components/homepage/product-section/ProductSection';

export default function Home() {
  // Mock Data: Solar & Power Products
  const solarProducts = [
    {
      id: 1,
      title: "Deye 6KW Solar Inverter + GearUP 16KWH Lithium Battery Combo Pack",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&auto=format&fit=crop&q=60", // Solar panel inverter
      price: 350000,
      originalPrice: 450000,
      discount: 22,
      inStock: true,
      stockCount: 2
    },
    {
      id: 2,
      title: "DC Solar Kitchen Combo - 3 | GearUP 24V Inverter & 100W Panel",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&auto=format&fit=crop&q=60",
      price: 75000,
      originalPrice: 85000,
      discount: 11,
      inStock: true,
      stockCount: 4
    },
    {
      id: 3,
      title: "6KW Hybrid Solar Power Package | Deye Inverter & Lesso 595W Panels",
      image: "https://images.unsplash.com/photo-1620000617482-821324eb9a14?w=400&auto=format&fit=crop&q=60",
      price: 482000,
      originalPrice: 500000,
      discount: 3,
      inStock: true
    },
    {
      id: 4,
      title: "TOMZN 3 Phase 4 Pole AC SPD (Surge Protection Device) 380V-420V",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop&q=60",
      price: 1890,
      originalPrice: 2200,
      discount: 14,
      inStock: true
    },
    {
      id: 5,
      title: "TBEA 6mm UV Protected Flexible Solar Cable - Red & Black (100 Meter)",
      image: "https://images.unsplash.com/photo-1557853197-aefb550b6fdc?w=400&auto=format&fit=crop&q=60",
      price: 3500,
      originalPrice: 4500,
      discount: 22,
      inStock: false
    },
    {
      id: 6,
      title: "SRNE Shiner 12V/24V MPPT Solar Charge Controller 30A Auto",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=60",
      price: 8500,
      originalPrice: 9500,
      discount: 10,
      inStock: true
    }
  ];

  // Mock Data: Smart Watches & Wearables
  const smartwatches = [
    {
      id: 7,
      title: "Fastrack Exuberant Quartz Dial Metal Strap Smart Watch",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=60",
      price: 10400,
      originalPrice: 12500,
      discount: 16,
      inStock: true
    },
    {
      id: 8,
      title: "Xiaomi Mibro Lite 2 Bluetooth Calling Smartwatch with Amoled Display",
      image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&auto=format&fit=crop&q=60",
      price: 5200,
      originalPrice: 6500,
      discount: 20,
      inStock: true,
      stockCount: 3
    },
    {
      id: 9,
      title: "Haylou Solar Lite Smartwatch - 1.38 inch High Res Screen",
      image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&auto=format&fit=crop&q=60",
      price: 2900,
      originalPrice: 3500,
      discount: 17,
      inStock: true
    },
    {
      id: 10,
      title: "Colmi P28 Plus Calling Smart Watch - 1.69 inch Full Touch Screen",
      image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400&auto=format&fit=crop&q=60",
      price: 2400,
      originalPrice: 3200,
      discount: 25,
      inStock: true
    },
    {
      id: 11,
      title: "HK8 Pro Max Ultra Smart Watch Gen 2 with ChatGPT & AMOLED Screen",
      image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&auto=format&fit=crop&q=60",
      price: 4500,
      originalPrice: 5500,
      discount: 18,
      inStock: true,
      stockCount: 1
    }
  ];

  // Mock Data: Audio and Accessories
  const audioGear = [
    {
      id: 12,
      title: "Hoco L15 Type-C Wireless Lavalier Microphone for YouTube & Vlogging",
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&auto=format&fit=crop&q=60",
      price: 1550,
      originalPrice: 2000,
      discount: 22,
      inStock: true
    },
    {
      id: 13,
      title: "Lenovo LP40 Pro Wireless Earbuds TWS HiFi Sound Bluetooth 5.1",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&auto=format&fit=crop&q=60",
      price: 950,
      originalPrice: 1500,
      discount: 36,
      inStock: true
    },
    {
      id: 14,
      title: "Anker Soundcore Life P2i True Wireless Earbuds with Dual Mic & Bass",
      image: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=400&auto=format&fit=crop&q=60",
      price: 2990,
      originalPrice: 3500,
      discount: 14,
      inStock: true,
      stockCount: 5
    },
    {
      id: 15,
      title: "OnePlus Buds 3 Dual Driver Active Noise Cancelling Earphones",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&auto=format&fit=crop&q=60",
      price: 8500,
      originalPrice: 9900,
      discount: 14,
      inStock: true
    },
    {
      id: 16,
      title: "Fantech HG11 Captain 7.1 Virtual Surround Gaming Headset",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=60",
      price: 3200,
      originalPrice: 3800,
      discount: 15,
      inStock: false
    }
  ];

  // Mock Data: Essential Daily Gadgets
  const dailyGadgets = [
    {
      id: 17,
      title: "100,000mAh Power House - Portable Power Bank with PD 65W Output",
      image: "https://images.unsplash.com/photo-1609592424085-f6df6158ab40?w=400&auto=format&fit=crop&q=60",
      price: 6500,
      originalPrice: 9500,
      discount: 31,
      inStock: true,
      stockCount: 3
    },
    {
      id: 18,
      title: "10 Inch LCD Writing Tablet Digital Drawing Board for Kids & Adults",
      image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&auto=format&fit=crop&q=60",
      price: 500,
      originalPrice: 800,
      discount: 37,
      inStock: true
    },
    {
      id: 19,
      title: "Value-Top MANIA X6 Mid Tower Gaming Case with 4 RGB Fans",
      image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400&auto=format&fit=crop&q=60",
      price: 5000,
      originalPrice: 5500,
      discount: 9,
      inStock: true
    },
    {
      id: 20,
      title: "10 Inch Heron PP Micron Sediment Water Filter Cartridge (4 Pack)",
      image: "https://images.unsplash.com/photo-1585832770485-e68a5dbfad52?w=400&auto=format&fit=crop&q=60",
      price: 1000,
      originalPrice: 1200,
      discount: 16,
      inStock: true
    },
    {
      id: 21,
      title: "Original Fastrack Brown Leather Strap for Quartz Watch",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&auto=format&fit=crop&q=60",
      price: 2500,
      originalPrice: 3000,
      discount: 16,
      inStock: true
    }
  ];

  return (
    <div className="w-full bg-[#f4f7fa] min-h-screen pb-12">
      
      {/* Top Banner section */}
      <Banner />

      {/* Main Content Area - Sections */}
      <div className="flex flex-col gap-2">
        {/* Section 1: Solar & Green Energy */}
        <ProductSection
          title="Solar & Green Energy"
          subtitle="Products from solar & wind energy and its subcategories"
          products={solarProducts}
        />

        {/* Section 2: Hot Deal Smartwatches */}
        <ProductSection
          title="Featured Smartwatches"
          subtitle="Top selling Bluetooth calling and fitness smartwatches in BD"
          products={smartwatches}
        />

        {/* Section 3: Audio & Sound Accessories */}
        <ProductSection
          title="Audio Paradise"
          subtitle="Wireless earbuds, TWS microphones, and surround headphones"
          products={audioGear}
        />

        {/* Section 4: Daily Essential Gadgets */}
        <ProductSection
          title="Daily Essential Gadgets"
          subtitle="Cool desk setups, filters, power banks, and tablet boards"
          products={dailyGadgets}
        />
      </div>

    </div>
  );
}
