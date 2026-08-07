"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    cartItems,
    subtotal,
    cartTotal,
    updateQuantity,
    removeFromCart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    selectedItems,
    toggleItemSelection,
    selectAllItems
  } = useCart();

  const formatPrice = (amount) => {
    return amount.toLocaleString('en-IN');
  };

  const allSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;

  return (
    <>
      {/* 1. Backdrop Overlay */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 
          ${isCartDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* 2. Sliding Drawer Body */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[440px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out transform
          ${isCartDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 select-none">
          <h2 className="text-[#0c1f3c] text-lg font-black tracking-tight">Shopping Cart</h2>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="text-gray-400 hover:text-red-500 font-bold transition-colors p-1 text-xl"
            aria-label="Close Cart"
          >
            ✕
          </button>
        </div>

        {cartItems.length === 0 ? (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/50">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-2xl mb-4">
              🛒
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Your cart is empty</h3>
            <p className="text-xs text-gray-400 max-w-[240px] leading-relaxed">
              Looks like you haven't added any products to your cart yet.
            </p>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="mt-6 bg-[#0e52b2] hover:bg-[#0b3d87] text-white font-bold text-xs py-2 px-6 rounded transition-all"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Cart List & Checkout Container */
          <>
            {/* Select All Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#f8fafc] border-b border-gray-100 text-xs text-gray-600 font-bold select-none">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => selectAllItems(e.target.checked)}
                  className="rounded text-[#0e52b2] focus:ring-[#0e52b2] w-4 h-4 cursor-pointer"
                />
                <span>Select all for checkout</span>
              </label>
              <span>{selectedItems.length} selected</span>
            </div>

            {/* Scrollable Items List */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-100 p-2">
              {cartItems.map((item) => {
                const isChecked = selectedItems.includes(item.id);
                return (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-white hover:bg-slate-50/50 transition-colors">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleItemSelection(item.id)}
                      className="rounded text-[#0e52b2] focus:ring-[#0e52b2] w-4 h-4 cursor-pointer flex-shrink-0"
                    />

                    {/* Thumbnail Image */}
                    <div className="w-16 h-16 border border-gray-200 rounded p-1 bg-white flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="object-contain max-h-full max-w-full"
                      />
                    </div>

                    {/* Title & Price Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-gray-800 text-xs font-semibold leading-snug line-clamp-2 mb-1.5 hover:text-[#0e52b2] transition-colors">
                        <a href={`/product/${item.id}`} onClick={() => setIsCartDrawerOpen(false)}>
                          {item.title}
                        </a>
                      </h4>
                      
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-[#0e52b2] text-xs font-black">
                          ৳{formatPrice(item.price)}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-gray-400 text-[10px] line-through">
                            ৳{formatPrice(item.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controller Row */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-gray-300 rounded h-7 overflow-hidden bg-white select-none">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 h-full hover:bg-gray-100 text-gray-500 font-bold text-sm transition-colors"
                          >
                            -
                          </button>
                          <span className="px-2.5 text-xs font-black text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 h-full hover:bg-gray-100 text-gray-500 font-bold text-sm transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Delete Action (Red Trash Can) */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-600 p-2 transition-colors flex items-center justify-center flex-shrink-0"
                      aria-label="Remove Item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Bottom Panel */}
            <div className="border-t border-gray-100 p-4 bg-[#f8fafc] text-sm text-gray-700">
              
              {/* Coupon Row */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-xs focus:outline-none focus:border-[#0e52b2] placeholder-gray-400"
                />
                <button className="bg-[#0e52b2] hover:bg-[#0b3d87] text-white text-xs font-bold px-4 py-2 rounded transition-colors">
                  Apply
                </button>
              </div>

              {/* Pricing Rows */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs text-gray-500 font-medium">
                  <span>Subtotal:</span>
                  <span className="font-bold text-gray-700">৳{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-1.5 border-t border-gray-200/60">
                  <span className="font-black text-gray-900 text-sm">Total:</span>
                  <span className="text-base sm:text-lg font-black text-[#0e52b2]">
                    ৳{formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

              {/* Helper Notice */}
              <p className="text-[10px] text-gray-400 text-center leading-normal mb-4 font-medium">
                Uncheck items to keep them in cart. Only selected items will checkout.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-full bg-[#0c1f3c] hover:bg-black text-white text-xs font-bold py-3 rounded-md shadow-sm transition-all text-center uppercase tracking-wider"
                >
                  View Cart
                </button>
                <button
                  onClick={() => {
                    alert(`Proceeding to checkout with total amount: ৳${formatPrice(cartTotal)}`);
                    setIsCartDrawerOpen(false);
                  }}
                  className="w-full bg-[#0e52b2] hover:bg-[#0b3d87] text-white text-xs font-bold py-3 rounded-md shadow-sm transition-all text-center uppercase tracking-wider"
                >
                  Checkout Selected ({selectedItems.length})
                </button>
              </div>

            </div>
          </>
        )}
      </div>
    </>
  );
}
