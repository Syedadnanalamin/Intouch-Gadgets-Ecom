import React from 'react';
import ProductDetails from '@/components/ProductPage/ProductDetails';

// Hardcoded Single Product Object defined on the Server Parent Component
const mockProduct = {
  id: "6kw-hybrid-solar-power-package-setup-28",
  title: "6KW Hybrid Solar Power Package | Deye 6KW Inverter with GearUP 16KWH Battery & Lesso 595W 7 pcs Panels (Solar Setup - 28)",
  productId: "22177",
  brand: "GearUp",
  rating: 4.8,
  reviewsCount: 24,
  price: 434500,
  originalPrice: 460000,
  discount: 6,
  inStock: true,
  image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=60",
  thumbnails: [
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=200&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=200&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1620000617482-821324eb9a14?w=200&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&auto=format&fit=crop&q=60"
  ],
  description: "Achieve energy independence in Bangladesh with this premium solar package setup. Ideal for powering home appliances during loadshedding.",
  specifications: [
    { label: "Inverter", value: "Deye 6KW Hybrid Inverter" },
    { label: "Battery", value: "GearUP 16KWH LiFePO4 Lithium Battery" },
    { label: "Solar Panels", value: "Lesso 595W Monocrystalline (7 Pcs)" },
    { label: "Structure", value: "Premium Aluminum Roof Mounting Bracket" },
    { label: "AC/DC Protection Box", value: "TOMZN SPDs & Circuit Breakers Included" },
    { label: "Warranty", value: "5 Years Service Warranty" }
  ]
};

export default async function ProductPage({ params }) {
  // We do not need dynamic route id logic for now as requested
  return (
    <ProductDetails product={mockProduct} />
  );
}
