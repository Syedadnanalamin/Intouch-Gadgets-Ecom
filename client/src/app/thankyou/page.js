"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ShieldCheck, House, ShoppingCart } from '@gravity-ui/icons';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams ? searchParams.get('orderId') : 'IT-XXXXXX';
  const name = searchParams ? searchParams.get('name') : 'Customer';
  const rawAmount = searchParams ? searchParams.get('amount') : '0';
  const time = searchParams ? searchParams.get('time') : 'Same day';

  const formatPrice = (amount) => {
    const val = parseFloat(amount);
    return isNaN(val) ? '0' : val.toLocaleString('en-IN');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-10 shadow-sm text-center max-w-2xl mx-auto">
      
      {/* Dynamic Vector Success Icon */}
      <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <ShieldCheck className="w-10 h-10" />
      </div>

      {/* Main Headers */}
      <h1 className="text-xl sm:text-3xl font-black text-gray-900 mb-2 uppercase tracking-tight">
        Thank You for Your Order!
      </h1>
      <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed mb-8">
        Hello <strong className="text-gray-800">{name}</strong>, your order has been received and is currently being processed. A confirmation email and SMS will be sent shortly.
      </p>

      {/* Order Details Receipt Box */}
      <div className="bg-[#f8fafc] border border-gray-200 rounded-lg p-5 mb-8 text-left text-xs sm:text-sm space-y-3">
        <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
          <span className="text-gray-400 font-medium">Order Number:</span>
          <span className="font-extrabold text-[#0e52b2]">{orderId}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
          <span className="text-gray-400 font-medium">Amount Payable:</span>
          <span className="font-extrabold text-gray-900">৳{formatPrice(rawAmount)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 font-medium">Estimated Delivery:</span>
          <span className="font-extrabold text-gray-900">{time}</span>
        </div>
      </div>

      {/* Processing Notice */}
      <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-8 text-left text-xs text-amber-800 leading-relaxed font-semibold">
        💡 <strong>Order Verification:</strong> One of our customer care representatives will call your mobile number within 24 hours to confirm the shipping address and item details before dispatch.
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center select-none">
        <Link
          href="/products"
          className="bg-[#0e52b2] hover:bg-[#0b3d87] text-white text-xs font-bold py-3.5 px-6 rounded-md shadow-sm transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider"
        >
          <ShoppingCart className="w-4 h-4" /> Continue Shopping
        </Link>
        <Link
          href="/"
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-3.5 px-6 rounded-md transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider border border-gray-200"
        >
          <House className="w-4 h-4" /> Return to Home
        </Link>
      </div>

    </div>
  );
}

export default function ThankYouPage() {
  return (
    <div className="w-full bg-[#f4f7fa] min-h-screen py-16 px-4">
      <Suspense fallback={<div className="text-center py-20 text-gray-500 font-semibold">Loading confirmation details...</div>}>
        <ThankYouContent />
      </Suspense>
    </div>
  );
}
