"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Box, Car, Tag, FileText, Lock, ShieldCheck, TrashBin } from '@gravity-ui/icons';

export default function CartPage() {
  const {
    cartItems,
    subtotal,
    cartTotal,
    updateQuantity,
    removeFromCart,
    selectedItems,
    toggleItemSelection,
    selectAllItems
  } = useCart();

  // Delivery options: matching the screenshot fees
  const [deliveryMethod, setDeliveryMethod] = useState('inside'); // 'inside' or 'outside'
  const deliveryFee = deliveryMethod === 'inside' ? 60 : 120;

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const formatPrice = (amount) => {
    return amount.toLocaleString('en-IN');
  };

  const allSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;

  // Calculate final total
  const finalTotal = cartTotal > 0 ? cartTotal + deliveryFee : 0;



  return (
    <div className="w-full bg-[#f4f7fa] min-h-screen py-10 text-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2 select-none">
            <ShoppingCart className="w-6 h-6 text-[#0e52b2]" /> Shopping Cart
          </h1>
          
          <Link href="/products" className="text-xs sm:text-sm font-semibold text-[#0e52b2] hover:text-[#0b3d87] flex items-center gap-1.5 transition-colors">
            ← Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart state */
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-3xl mx-auto mb-6">
              🛒
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Your Shopping Cart is Empty</h2>
            <p className="text-sm text-gray-400 max-w-sm mx-auto mb-8 leading-relaxed">
              Explore our best solar packages and latest gadgets to find something you need.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-[#0e52b2] hover:bg-[#0b3d87] text-white font-bold text-sm px-8 py-3 rounded-md transition-all shadow-sm"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Active Cart columns */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Side: Items & Checkout Configurations */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Cart Items Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
                
                {/* Items Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-4 select-none">
                  <div className="flex items-center gap-3">
                    <h2 className="text-gray-800 text-base font-bold flex items-center gap-2">
                      <Box className="w-5 h-5 text-gray-500" /> Cart Items
                    </h2>
                    <span className="bg-blue-50 text-[#0e52b2] text-[11px] font-bold px-2 py-0.5 rounded">
                      {cartItems.length} items
                    </span>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-500">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={(e) => selectAllItems(e.target.checked)}
                      className="rounded text-[#0e52b2] focus:ring-[#0e52b2] w-4 h-4 cursor-pointer"
                    />
                    <span>Select all</span>
                  </label>
                </div>

                <p className="text-xs text-gray-400 mb-6 font-medium">
                  Select items to checkout now. Unselected items stay in your cart.
                </p>

                {/* Items List */}
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => {
                    const isChecked = selectedItems.includes(item.id);
                    return (
                      <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-5 first:pt-0 last:pb-0">
                        
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                          {/* Selection Checkbox */}
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleItemSelection(item.id)}
                            className="rounded text-[#0e52b2] focus:ring-[#0e52b2] w-4 h-4 cursor-pointer flex-shrink-0"
                          />

                          {/* Image Thumbnail */}
                          <div className="w-20 h-20 border border-gray-200 rounded p-1.5 bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
                            <img src={item.image} alt={item.title} className="object-contain max-h-full max-w-full" />
                          </div>
                        </div>

                        {/* Title & Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-gray-800 text-xs sm:text-sm font-semibold leading-relaxed mb-1 hover:text-[#0e52b2] transition-colors">
                            <Link href={`/product/${item.id}`}>{item.title}</Link>
                          </h3>
                          <div className="text-[10px] text-gray-400 font-bold mb-3 uppercase tracking-wider">
                            SKU: N/A
                          </div>

                          {/* Quantity selector */}
                          <div className="flex items-center border border-gray-300 rounded h-8 overflow-hidden w-24 bg-white select-none">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-2.5 h-full hover:bg-gray-100 text-gray-500 font-bold text-sm transition-colors"
                            >
                              -
                            </button>
                            <span className="flex-1 text-center text-xs font-black text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2.5 h-full hover:bg-gray-100 text-gray-500 font-bold text-sm transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Price Details & Remove Action */}
                        <div className="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end w-full sm:w-auto border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0 gap-3">
                          <div className="flex sm:flex-col items-baseline sm:items-end gap-1.5 sm:gap-0.5">
                            <span className="text-[#0e52b2] text-sm sm:text-base font-black">
                              ৳{formatPrice(item.price * item.quantity)}
                            </span>
                            {item.originalPrice > item.price && (
                              <span className="text-gray-400 text-[10px] line-through">
                                ৳{formatPrice(item.originalPrice * item.quantity)}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-600 p-1.5 transition-colors flex items-center justify-center"
                            aria-label="Remove Item"
                          >
                            <TrashBin className="w-4.5 h-4.5" />
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Delivery Method Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
                
                <h2 className="text-gray-800 text-base font-bold flex items-center gap-2 border-b border-gray-100 pb-4 mb-5 select-none">
                  <Car className="w-5 h-5 text-gray-500" /> Delivery Method
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Inside Dhaka */}
                  <div
                    onClick={() => setDeliveryMethod('inside')}
                    className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all select-none
                      ${deliveryMethod === 'inside' ? 'border-[#0e52b2] bg-blue-50/20 ring-1 ring-[#0e52b2]' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0 bg-white">
                        {deliveryMethod === 'inside' && <div className="w-2.5 h-2.5 rounded-full bg-[#0e52b2]" />}
                      </div>
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-gray-800">Inside Dhaka</div>
                        <div className="text-[10px] text-gray-400 font-medium">1-2 days</div>
                      </div>
                    </div>
                    <span className="font-black text-xs sm:text-sm text-gray-900">৳60</span>
                  </div>

                  {/* Outside Dhaka */}
                  <div
                    onClick={() => setDeliveryMethod('outside')}
                    className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all select-none
                      ${deliveryMethod === 'outside' ? 'border-[#0e52b2] bg-blue-50/20 ring-1 ring-[#0e52b2]' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0 bg-white">
                        {deliveryMethod === 'outside' && <div className="w-2.5 h-2.5 rounded-full bg-[#0e52b2]" />}
                      </div>
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-gray-800">Outside Dhaka</div>
                        <div className="text-[10px] text-gray-400 font-medium">3-5 days</div>
                      </div>
                    </div>
                    <span className="font-black text-xs sm:text-sm text-gray-900">৳120</span>
                  </div>

                </div>

              </div>

              {/* Coupon Code Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
                
                <h2 className="text-gray-800 text-base font-bold flex items-center gap-2 border-b border-gray-100 pb-4 mb-4 select-none">
                  <Tag className="w-5 h-5 text-gray-500" /> Apply Coupon
                </h2>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (couponCode.toUpperCase() === 'INTOUCH') {
                      setCouponApplied(true);
                    } else {
                      alert('Invalid Coupon Code! Try using "INTOUCH"');
                    }
                  }}
                  className="flex gap-2.5 max-w-md"
                >
                  <input
                    type="text"
                    required
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="ENTER COUPON CODE"
                    disabled={couponApplied}
                    className="flex-1 px-4 py-2.5 bg-[#f8fafc] border border-gray-200 rounded focus:outline-none focus:border-[#0e52b2] focus:bg-white transition-all text-xs font-bold uppercase"
                  />
                  <button
                    type="submit"
                    disabled={couponApplied}
                    className={`text-white text-xs font-bold px-6 py-2.5 rounded transition-colors flex items-center gap-1.5
                      ${couponApplied ? 'bg-emerald-600 cursor-not-allowed' : 'bg-[#0c1f3c] hover:bg-black'}`}
                  >
                    {couponApplied ? '✓ Applied' : 'Apply'}
                  </button>
                </form>
                {couponApplied && (
                  <p className="text-xs text-emerald-600 font-bold mt-2">
                    Success! coupon code applied. You saved 10% on checkout!
                  </p>
                )}
              </div>

            </div>

            {/* Right Side: Order Summary */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                
                <h2 className="text-gray-800 text-base font-bold flex items-center gap-2 border-b border-gray-100 pb-4 mb-5 select-none">
                  <FileText className="w-5 h-5 text-gray-500" /> Order Summary
                </h2>

                {/* Subtotal & Delivery details */}
                <div className="space-y-3 text-xs sm:text-sm font-medium pb-4 border-b border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal:</span>
                    <span className="text-gray-800 font-bold">
                      ৳{formatPrice(couponApplied ? subtotal * 0.9 : subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Delivery:</span>
                    <span className="text-gray-800 font-bold">৳{formatPrice(deliveryFee)}</span>
                  </div>
                </div>

                {/* Total price */}
                <div className="flex justify-between items-baseline py-4 mb-5">
                  <span className="text-gray-900 font-black text-sm">Total</span>
                  <span className="text-lg sm:text-xl font-black text-[#0e52b2]">
                    ৳{formatPrice(couponApplied ? finalTotal * 0.9 : finalTotal)}
                  </span>
                </div>

                {/* Checkout button */}
                <div className="space-y-4">
                  <Link
                    href="/checkout"
                    className={`w-full bg-[#0e52b2] hover:bg-[#0b3d87] text-white font-bold py-3.5 px-4 rounded-md shadow-sm transition-all text-xs sm:text-sm flex items-center justify-center gap-2 uppercase tracking-wide text-center block
                      ${selectedItems.length === 0 ? 'opacity-50 pointer-events-none cursor-not-allowed' : 'active:scale-[0.98]'}`}
                  >
                    <Lock className="w-3.5 h-3.5" /> Checkout Selected ({selectedItems.length})
                  </Link>

                  <div className="text-[10px] text-gray-400 text-center font-medium flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Secure Checkout
                  </div>
                </div>



              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
