"use client";

import React, { useState } from 'react';
import { ShoppingCart, StarFill, Star, Thunderbolt } from '@gravity-ui/icons';
import { useCart } from '@/context/CartContext';

export default function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [activeTab, setActiveTab] = useState("description");
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const formatPrice = (amount) => {
    return amount.toLocaleString('en-IN');
  };

  const handleQtyChange = (type) => {
    if (type === 'dec' && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === 'inc') {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="w-full bg-[#f4f7fa] min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumbs */}
        <div className="text-xs text-gray-500 mb-6 flex items-center gap-1">
          <a href="/" className="hover:text-[#0e52b2] transition-colors">Home</a>
          <span>&gt;</span>
          <a href="#" className="hover:text-[#0e52b2] transition-colors">Solar & Green Energy</a>
          <span>&gt;</span>
          <span className="text-gray-700 font-medium truncate max-w-md">{product.title}</span>
        </div>

        {/* Product Details Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Left Column: Images */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Main Preview Box */}
            <div className="w-full aspect-square border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
              <img
                src={selectedImage}
                alt={product.title}
                className="object-contain max-h-full max-w-full p-4 transition-all duration-300"
              />
            </div>

            {/* Thumbnails Row */}
            <div className="flex gap-2.5 overflow-x-auto py-1">
              {product.thumbnails && product.thumbnails.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(thumb)}
                  className={`w-16 h-16 border rounded overflow-hidden flex-shrink-0 flex items-center justify-center p-1 bg-white hover:border-[#0e52b2] transition-all 
                    ${selectedImage === thumb ? 'border-[#0e52b2] ring-1 ring-[#0e52b2]' : 'border-gray-200'}`}
                >
                  <img src={thumb} alt={`thumb-${index}`} className="object-contain max-h-full max-w-full" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Title and Details */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Title */}
            <h1 className="text-gray-900 text-lg sm:text-xl font-bold leading-relaxed mb-3">
              {product.title}
            </h1>

            {/* Ratings & Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-xs border-b border-gray-100 pb-4 mb-4">
              <div className="flex items-center gap-1.5">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    i < Math.floor(product.rating) ? (
                      <StarFill key={i} className="w-4 h-4 fill-current" />
                    ) : (
                      <Star key={i} className="w-4 h-4 text-gray-300" />
                    )
                  ))}
                </div>
                <span className="font-bold text-gray-700">{product.rating}</span>
                <span className="text-gray-400">({product.reviewsCount} reviews)</span>
              </div>
              <span className="text-gray-300">|</span>
              <span>Product ID: <strong className="text-gray-700">{product.productId}</strong></span>
              <span className="text-gray-300">|</span>
              <span>Brand: <strong className="text-[#0e52b2]">{product.brand}</strong></span>
            </div>

            {/* Price Block */}
            <div className="bg-[#f8fafc] rounded-lg p-4 mb-5 border border-gray-100">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-[#0e52b2] text-2xl sm:text-3xl font-black flex items-center">
                  <span className="text-xs mr-0.5">৳</span>
                  {formatPrice(product.price)}
                </span>
                
                {product.originalPrice > product.price && (
                  <span className="text-gray-400 text-sm line-through">
                    ৳{formatPrice(product.originalPrice)}
                  </span>
                )}

                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-md">
                  {product.discount}% OFF
                </span>
              </div>

              {product.originalPrice > product.price && (
                <div className="text-xs text-emerald-600 font-bold">
                  Save ৳{formatPrice(product.originalPrice - product.price)}
                </div>
              )}
            </div>

            {/* Delivery Cost Info */}
            <div className="text-xs text-gray-600 mb-5 flex flex-col gap-1 border-b border-gray-100 pb-4">
              <div>Delivery Charges:</div>
              <div className="font-semibold text-gray-800">
                Inside Dhaka: ৳450 | Outside Dhaka: ৳1,000
              </div>
            </div>

            {/* Action Bar (Qty and Buttons) */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center border-b border-gray-100 pb-5 mb-5">
              
              {/* Qty Selector */}
              <div className="flex items-center border border-gray-300 rounded overflow-hidden h-11 w-32 justify-between">
                <button
                  onClick={() => handleQtyChange('dec')}
                  className="px-3 h-full hover:bg-gray-100 text-lg font-bold text-gray-500 transition-colors"
                >
                  -
                </button>
                <span className="font-bold text-sm text-gray-800">{quantity}</span>
                <button
                  onClick={() => handleQtyChange('inc')}
                  className="px-3 h-full hover:bg-gray-100 text-lg font-bold text-gray-500 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Order Button */}
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-[#0e52b2] hover:bg-[#0b3d87] text-white font-bold rounded-md h-11 px-6 flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Order
              </button>

              {/* Buy Now Button */}
              <button className="flex-1 bg-[#0c1f3c] hover:bg-black text-white font-bold rounded-md h-11 px-6 flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]">
                <Thunderbolt className="w-4 h-4 text-amber-400 fill-current" />
                Buy Now
              </button>
            </div>

            {/* Shipping Detail list */}
            <div className="bg-[#f8fafc] border border-gray-200 rounded-lg p-4">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Shipping & Delivery Options</h3>
              <ul className="text-xs space-y-2 text-gray-600">
                <li className="flex justify-between border-b border-gray-100 pb-1.5">
                  <span>🏢 Office Pickup (Free)</span>
                  <span className="font-semibold text-gray-800">1-2 Business Days</span>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-1.5">
                  <span>🚚 Inside Dhaka (৳1,000)</span>
                  <span className="font-semibold text-gray-800">1-2 Business Days</span>
                </li>
                <li className="flex justify-between">
                  <span>🚛 Outside Dhaka (৳1,400)</span>
                  <span className="font-semibold text-gray-800">3-5 Business Days</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Lower Tabs Section (Description / Specifications) */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
          {/* Tab buttons */}
          <div className="flex border-b border-gray-200 bg-[#f8fafc] text-xs sm:text-sm font-bold text-gray-600">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-6 py-3 border-r border-gray-200 transition-colors 
                ${activeTab === "description" ? 'bg-white text-[#0e52b2] border-b-2 border-b-[#0e52b2]' : 'hover:bg-gray-100'}`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("specifications")}
              className={`px-6 py-3 border-r border-gray-200 transition-colors 
                ${activeTab === "specifications" ? 'bg-white text-[#0e52b2] border-b-2 border-b-[#0e52b2]' : 'hover:bg-gray-100'}`}
            >
              Specifications
            </button>
          </div>

          {/* Tab contents */}
          <div className="p-6">
            {activeTab === "description" ? (
              <div className="flex flex-col gap-6 text-sm text-gray-700 leading-relaxed">
                
                {/* Warning Alert Box */}
                <div className="bg-amber-50 border-l-4 border-amber-500 rounded p-4">
                  <div className="text-amber-800 font-bold mb-1 flex items-center gap-1.5">
                    ⚠️ ইম্পর্ট্যান্ট নোট:
                  </div>
                  <div className="text-amber-700 text-xs sm:text-sm">
                    এই সোলার প্যাকেজটির ক্যাবল এবং ফ্রেমিং সেটআপ সাইটের গঠন অনুযায়ী পরিবর্তিত হতে পারে। অর্ডার সম্পন্ন হওয়ার পর কাস্টমার কেয়ার থেকে বিস্তারিত কনফার্মেশন ও সার্ভিস টাইমিং জানিয়ে দেওয়া হবে।
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Overview: Achieve Energy Independence in Bangladesh</h3>
                  <p className="text-gray-600">
                    {product.description} Step into a future of reliable and sustainable power with the Complete Hybrid Solar Power Package, also known as Solar Setup - 28. Designed specifically for homes and small businesses across Bangladesh, this premium solar solution combines cutting-edge technology from Deye, GearUP, and Lesso.
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <tbody className="divide-y divide-gray-100">
                    {product.specifications && product.specifications.map((spec, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-[#f8fafc]' : 'bg-white'}>
                        <td className="px-6 py-3 font-semibold text-gray-600 w-1/3">{spec.label}</td>
                        <td className="px-6 py-3 text-gray-800">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
