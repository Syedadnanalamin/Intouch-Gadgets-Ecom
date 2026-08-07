"use client";

import React from 'react';
import { ShoppingCart, Star, StarFill } from '@gravity-ui/icons';

export default function ProductCard({ product }) {
  const {
    title,
    image,
    price,
    originalPrice,
    discount,
    inStock,
    stockCount,
    rating = 4.5,
    reviewsCount = 12
  } = product;

  const [hasError, setHasError] = React.useState(false);

  // Calculate savings
  const savings = originalPrice - price;

  // Format price helper (adds commas)
  const formatPrice = (amount) => {
    return amount.toLocaleString('en-IN');
  };

  return (
    <div className="group relative flex flex-col bg-white border border-gray-200 rounded-lg p-3 transition-all duration-300 hover:shadow-lg hover:border-blue-400 h-full justify-between min-w-0">
      
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-md flex items-center shadow-sm">
          <span>{discount}% OFF</span>
        </div>
      )}

      {/* Product Image Area */}
      <div className="relative w-full aspect-square flex items-center justify-center mb-3 overflow-hidden rounded bg-gray-50">
        {!hasError ? (
          <img
            src={image}
            alt={title}
            className="object-contain w-full h-full p-2 transition-transform duration-300 group-hover:scale-105 overflow-hidden"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 p-4">
            <svg
              className="w-10 h-10 mb-1 opacity-50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375 0 11-.75 0 .375 0 01.75 0z"
              />
            </svg>
            <span className="text-[10px] text-center font-bold uppercase tracking-wider text-gray-400">
              No Image
            </span>
          </div>
        )}
      </div>

      {/* Stock Status */}
      <div className="mb-2 flex items-center gap-1.5">
        {inStock ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            In Stock
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            Out of Stock
          </span>
        )}

        {stockCount && stockCount > 0 && stockCount <= 5 && (
          <span className="text-[10px] text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-100 animate-pulse">
            {stockCount} left
          </span>
        )}
      </div>

      {/* Rating (optional detail for premium look) */}
      <div className="flex items-center gap-1 mb-1.5">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            i < Math.floor(rating) ? (
              <StarFill key={i} className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Star key={i} className="w-3.5 h-3.5 text-gray-300" />
            )
          ))}
        </div>
        <span className="text-[10px] text-gray-500">({reviewsCount})</span>
      </div>

      {/* Title */}
      <h3 className="text-gray-800 text-xs font-medium line-clamp-2 min-h-[2rem] hover:text-[#0e52b2] transition-colors duration-200 mb-2 leading-relaxed">
        {title}
      </h3>

      {/* Pricing Info */}
      <div className="mt-auto mb-3">
        <div className="flex items-baseline gap-2">
          {/* Current Price */}
          <span className="text-[#0e52b2] text-sm md:text-base font-extrabold flex items-center">
            <span className="text-xs mr-0.5">৳</span>
            {formatPrice(price)}
          </span>

          {/* Original Price */}
          {originalPrice > price && (
            <span className="text-gray-400 text-xs line-through flex items-center">
              ৳{formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* Savings Info */}
        {savings > 0 && (
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5 flex items-center">
            Save ৳{formatPrice(savings)}
          </div>
        )}
      </div>

      {/* Add to Order Button */}
      <button 
        disabled={!inStock}
        className={`w-full py-2 px-3 rounded text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-300 
          ${inStock 
            ? 'bg-[#0e52b2] hover:bg-[#0b3d87] text-white hover:shadow-md active:scale-[0.98]' 
            : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'}`}
      >
        <ShoppingCart className="w-3.5 h-3.5" />
        Add to Order
      </button>

    </div>
  );
}
