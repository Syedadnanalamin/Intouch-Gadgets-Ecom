"use client";

import React, { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ShieldCheck, House, ShoppingCart } from '@gravity-ui/icons';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams ? searchParams.get('orderId') : '';

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) {
      setError("No Order ID provided.");
      setLoading(false);
      return;
    }

    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    fetch(`${apiURL}/api/orders/${orderId}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Order not found in database.");
        }
        return res.json();
      })
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch order detail error:", err);
        setError("Unable to retrieve order details from database.");
        setLoading(false);
      });
  }, [orderId]);

  const formatPrice = (amount) => {
    const val = parseFloat(amount);
    return isNaN(val) ? '0' : val.toLocaleString('en-IN');
  };

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-10 shadow-sm text-center max-w-2xl mx-auto">
        <div className="w-12 h-12 border-4 border-[#0e52b2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-sm text-gray-500 font-semibold">Retrieving order details from database...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-10 shadow-sm text-center max-w-2xl mx-auto text-gray-700">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          ✕
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Order Not Found</h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-sm mx-auto mb-6">
          {error || "We could not find any order matching this invoice ID."}
        </p>
        <Link
          href="/"
          className="bg-[#0e52b2] hover:bg-[#0b3d87] text-white text-xs font-bold py-2.5 px-6 rounded transition-colors inline-block"
        >
          Return to Homepage
        </Link>
      </div>
    );
  }

  const deliveryLabel = order.deliveryArea === 'inside' ? 'Inside Dhaka' : order.deliveryArea === 'outside' ? 'Outside Dhaka' : 'Office Pickup';

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-10 shadow-sm text-center max-w-2xl mx-auto text-gray-700">
      
      {/* Dynamic Vector Success Icon */}
      <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <ShieldCheck className="w-10 h-10" />
      </div>

      {/* Main Headers */}
      <h1 className="text-xl sm:text-3xl font-black text-gray-900 mb-2 uppercase tracking-tight">
        Thank You for Your Order!
      </h1>
      <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed mb-6">
        Hello <strong className="text-gray-800">{order.customerInfo.fullName}</strong>, your order has been received and is currently being processed.
      </p>

      {/* Order Items Summary Box */}
      <div className="border border-gray-200 rounded-lg p-4 mb-6 text-left bg-white shadow-inner">
        <h3 className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-3">Items Ordered</h3>
        <div className="divide-y divide-gray-100 max-h-48 overflow-y-auto pr-1">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex gap-3 items-center py-2.5 first:pt-0 last:pb-0 text-xs">
              <div className="w-10 h-10 border border-gray-200 rounded p-1 flex items-center justify-center flex-shrink-0 bg-white">
                <img src={item.image} alt={item.title} className="object-contain max-h-full max-w-full" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-800 truncate">{item.title}</h4>
                <div className="text-[10px] text-gray-400">
                  Qty: {item.quantity} | Price: ৳{formatPrice(item.price)}
                </div>
              </div>
              <span className="font-bold text-gray-900 flex-shrink-0">
                ৳{formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Order Details Receipt Box */}
      <div className="bg-[#f8fafc] border border-gray-200 rounded-lg p-5 mb-6 text-left text-xs sm:text-sm space-y-3">
        <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
          <span className="text-gray-400 font-medium">Order Number:</span>
          <span className="font-extrabold text-[#0e52b2]">{order.orderId}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
          <span className="text-gray-400 font-medium">Subtotal Amount:</span>
          <span className="font-bold text-gray-800">৳{formatPrice(order.pricing.subtotal - (order.pricing.discount || 0))}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
          <span className="text-gray-400 font-medium">Delivery ({deliveryLabel}):</span>
          <span className="font-bold text-gray-800">{order.pricing.deliveryFee > 0 ? `৳${formatPrice(order.pricing.deliveryFee)}` : 'Free'}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
          <span className="text-gray-400 font-medium">Grand Total Amount:</span>
          <span className="font-extrabold text-[#0e52b2] text-sm">৳{formatPrice(order.pricing.finalTotal)}</span>
        </div>
        <div className="flex justify-between items-center border-b border-gray-200/60 pb-2">
          <span className="text-gray-400 font-medium">Payment Selection:</span>
          <span className="font-bold text-gray-800 uppercase text-xs">
            {order.paymentType === 'partial' ? '10% Partial Payment' : 'Full Payment'} ({order.paymentGateway})
          </span>
        </div>
        <div className="flex justify-between items-start">
          <span className="text-gray-400 font-medium">Shipping Address:</span>
          <span className="font-semibold text-gray-700 text-right max-w-xs leading-normal">
            {order.customerInfo.deliveryAddress}
          </span>
        </div>
      </div>

      {/* Processing Notice */}
      <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-8 text-left text-xs text-amber-800 leading-relaxed font-semibold">
        💡 <strong>Order Verification:</strong> One of our customer care representatives will call your mobile number <strong className="text-gray-900">{order.customerInfo.mobileNumber}</strong> within 24 hours to confirm details before dispatching.
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
