"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { createOrderData } from '@/lib/actions/server';
import { ShoppingCart, Person, Lock, House, GeoPin, Car, Clock, CreditCard, FileText, ShieldCheck, Tag } from '@gravity-ui/icons';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cartItems,
    selectedItems,
    clearCart
  } = useCart();

  // Get only checked items for checkout
  const checkoutItems = cartItems.filter(item => selectedItems.includes(item.id));

  // Form states
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryArea, setDeliveryArea] = useState('inside'); // 'inside', 'outside'
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod', 'bkash', 'nagad', 'rocket'

  // Coupon states
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const formatPrice = (amount) => {
    return amount.toLocaleString('en-IN');
  };

  // Calculate pricing
  const rawSubtotal = checkoutItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = couponApplied ? rawSubtotal * 0.1 : 0;
  const subtotal = rawSubtotal - discount;

  // Delivery fee based on selected area
  let deliveryFee = 0;
  let deliveryText = "Free";
  let deliveryTime = "Same day";
  if (deliveryArea === 'inside') {
    deliveryFee = 60;
    deliveryText = "৳60";
    deliveryTime = "1-2 days";
  } else if (deliveryArea === 'outside') {
    deliveryFee = 120;
    deliveryText = "৳120";
    deliveryTime = "3-5 days";
  }

  const finalTotal = subtotal > 0 ? subtotal + deliveryFee : 0;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!fullName || !mobileNumber || !deliveryAddress) {
      alert("Please fill in all required customer information fields.");
      return;
    }

    try {
      const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      const orderPayload = {
        customerInfo: {
          fullName,
          mobileNumber,
          deliveryAddress
        },
        deliveryArea,
        paymentMethod,
        items: checkoutItems.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        couponApplied
      };

      const data = await createOrderData(orderPayload);

      if (data.success) {
        // Reset shopping cart state
        clearCart();
        // Redirect to dynamic professional thankyou page
        router.push(`/thankyou?orderId=${data.orderId}`);
      } else {
        alert(data.error || "Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Place order error:", error);
      alert("An error occurred while processing your order. Please try again later.");
    }
  };

  return (
    <div className="w-full bg-[#f4f7fa] min-h-screen py-10 text-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumbs */}
        <div className="text-xs text-gray-500 mb-6 flex items-center gap-1 select-none">
          <Link href="/" className="hover:text-[#0e52b2] transition-colors">Home</Link>
          <span>&gt;</span>
          <span className="text-gray-700 font-medium">Checkout</span>
        </div>

        {checkoutItems.length === 0 ? (
          /* Empty Checkout State */
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center shadow-sm max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-3xl mx-auto mb-6">
              🛒
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">No Items Selected for Checkout</h2>
            <p className="text-sm text-gray-400 max-w-sm mx-auto mb-8 leading-relaxed">
              Please go back to your shopping cart and select the products you wish to purchase.
            </p>
            <Link
              href="/cart"
              className="inline-flex items-center justify-center bg-[#0e52b2] hover:bg-[#0b3d87] text-white font-bold text-sm px-8 py-3 rounded-md transition-all shadow-sm"
            >
              Go to Shopping Cart
            </Link>
          </div>
        ) : (
          /* Active Checkout Forms */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Customer and Payment details */}
            <form onSubmit={handlePlaceOrder} className="lg:col-span-8 space-y-6">
              
              {/* Checkout Form Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
                
                {/* Title */}
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 border-b border-gray-100 pb-4 mb-6 flex items-center gap-2 select-none">
                  <CreditCard className="w-6 h-6 text-[#0e52b2]" /> Checkout
                </h1>

                {/* Customer Information Block */}
                <div className="space-y-4">
                  
                  <div className="flex justify-between items-center">
                    <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Customer Information</h2>
                    <a href="#" className="text-xs font-bold text-[#0e52b2] hover:underline flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Login to auto-fill
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#0e52b2] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1.5">Mobile Number *</label>
                      <input
                        type="text"
                        required
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#0e52b2] transition-all font-semibold"
                      />
                      <span className="text-[10px] text-gray-400 mt-1 block">Enter 11-digit mobile number</span>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1.5 text-xs sm:text-sm">Delivery Address *</label>
                    <textarea
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Enter your complete delivery address with house number, street, area, and district"
                      rows="3"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#0e52b2] transition-all text-xs sm:text-sm"
                    />
                  </div>

                  <p className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                    <Lock className="w-3 h-3 text-[#0e52b2]" /> <a href="#" className="text-[#0e52b2] hover:underline">Login</a> or <a href="#" className="text-[#0e52b2] hover:underline">register</a> to save addresses for faster checkout next time.
                  </p>

                </div>

                {/* Select Delivery Area */}
                <div className="mt-8">
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Select Delivery Area</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                    {/* Inside Dhaka */}
                    <div
                      onClick={() => setDeliveryArea('inside')}
                      className={`border rounded-lg p-3 flex items-center justify-between cursor-pointer transition-all select-none
                        ${deliveryArea === 'inside' ? 'border-[#0e52b2] bg-blue-50/20 ring-1 ring-[#0e52b2]' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={deliveryArea === 'inside'}
                          onChange={() => setDeliveryArea('inside')}
                          className="text-[#0e52b2] focus:ring-[#0e52b2] w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <div className="font-bold text-[11px] sm:text-xs text-gray-800">Inside Dhaka</div>
                          <div className="text-[9px] text-gray-400">৳60</div>
                        </div>
                      </div>
                      <GeoPin className="w-4 h-4 text-gray-500" />
                    </div>

                    {/* Outside Dhaka */}
                    <div
                      onClick={() => setDeliveryArea('outside')}
                      className={`border rounded-lg p-3 flex items-center justify-between cursor-pointer transition-all select-none
                        ${deliveryArea === 'outside' ? 'border-[#0e52b2] bg-blue-50/20 ring-1 ring-[#0e52b2]' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={deliveryArea === 'outside'}
                          onChange={() => setDeliveryArea('outside')}
                          className="text-[#0e52b2] focus:ring-[#0e52b2] w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <div className="font-bold text-[11px] sm:text-xs text-gray-800">Outside Dhaka</div>
                          <div className="text-[9px] text-gray-400">৳120</div>
                        </div>
                      </div>
                      <Car className="w-4 h-4 text-gray-500" />
                    </div>

                  </div>

                  {/* Delivery Status Alert Line */}
                  <div className="mt-4 bg-blue-50 border border-blue-100 rounded-md p-2.5 text-[10px] sm:text-xs text-blue-800 flex flex-wrap gap-y-4 items-center">
                    <span><strong>Selected:</strong> {deliveryArea === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'}</span>
                    <span className="text-blue-300">|</span>
                    <span><strong>Charge:</strong> ৳{formatPrice(deliveryFee)}</span>
                    <span className="text-blue-300">|</span>
                    <span><strong>Time:</strong> {deliveryTime}</span>
                    <span className="text-blue-300">|</span>
                    <span className="text-emerald-700 flex items-center gap-1"><Tag className="w-3.5 h-3.5 text-emerald-600" /> Free delivery above ৳100,000,000.00</span>
                  </div>

                </div>

                {/* Payment Method Block */}
                <div className="mt-8">
                  <h3 className="text-base font-extrabold text-[#0c1f3c] tracking-tight mb-5 border-l-4 border-orange-500 pl-3 select-none">
                    Payment method
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Cash on Delivery */}
                    <div
                      onClick={() => setPaymentMethod('cod')}
                      className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all select-none
                        ${paymentMethod === 'cod' 
                          ? 'border-orange-500 bg-orange-50/10 ring-1 ring-orange-500/30' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Custom cash & box hand vector */}
                        <div className="w-12 h-10 relative flex-shrink-0 bg-gray-50 border border-gray-100 rounded flex items-center justify-center overflow-hidden">
                          <svg viewBox="0 0 64 48" className="w-10 h-8">
                            <rect x="22" y="18" width="20" height="16" rx="2" fill="#f59e0b" />
                            <path d="M22,22 L32,26 L42,22" stroke="#d97706" strokeWidth="1.5" fill="none" />
                            <rect x="10" y="8" width="18" height="10" rx="1.5" fill="#10b981" transform="rotate(-15 10 8)" />
                            <circle cx="18" cy="11" r="2" fill="#047857" />
                            <path d="M2,34 Q8,32 14,35 L18,38 L14,42 Q6,42 2,38 Z" fill="#fed7aa" />
                            <path d="M58,34 Q52,32 46,35 L42,38 L46,42 Q54,42 58,38 Z" fill="#fed7aa" />
                          </svg>
                        </div>
                        <span className="font-bold text-sm text-gray-800">Cash On Delivery</span>
                      </div>
                      
                      {paymentMethod === 'cod' ? (
                        <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white">
                          <svg className="w-3 h-3 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-gray-300 bg-white" />
                      )}
                    </div>

                    {/* bKash */}
                    <div
                      onClick={() => setPaymentMethod('bkash')}
                      className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all select-none
                        ${paymentMethod === 'bkash' 
                          ? 'border-orange-500 bg-orange-50/10 ring-1 ring-orange-500/30' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 bg-[#e2136e] rounded flex items-center justify-center flex-shrink-0">
                          <svg viewBox="0 0 100 100" className="w-8 h-8 fill-white">
                            <path d="M 20 40 L 45 20 L 50 60 L 20 40 M 50 60 L 80 30 L 60 70 L 50 60 M 60 70 L 55 85 L 45 75 L 60 70" />
                          </svg>
                        </div>
                        <span className="font-bold text-sm text-gray-800">Bkash</span>
                      </div>
                      
                      {paymentMethod === 'bkash' ? (
                        <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white">
                          <svg className="w-3 h-3 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-gray-300 bg-white" />
                      )}
                    </div>

                    {/* Nagad */}
                    <div
                      onClick={() => setPaymentMethod('nagad')}
                      className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all select-none
                        ${paymentMethod === 'nagad' 
                          ? 'border-orange-500 bg-orange-50/10 ring-1 ring-orange-500/30' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 bg-gradient-to-br from-[#f53c00] to-[#ff6a00] rounded flex items-center justify-center flex-shrink-0">
                          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
                            <path d="M12,2 C12,2 6,7 6,12 C6,16 9,19 12,22 C15,19 18,16 18,12 C18,7 12,2 12,2 Z M12,17 C10,17 9,15.5 9,14 C9,12 11.5,10 12,8.5 C12.5,10 15,12 15,14 C15,15.5 14,17 12,17 Z" />
                          </svg>
                        </div>
                        <span className="font-bold text-sm text-gray-800">Nagad</span>
                      </div>
                      
                      {paymentMethod === 'nagad' ? (
                        <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white">
                          <svg className="w-3 h-3 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-gray-300 bg-white" />
                      )}
                    </div>

                    {/* Rocket */}
                    <div
                      onClick={() => setPaymentMethod('rocket')}
                      className={`border rounded-lg p-4 flex items-center justify-between cursor-pointer transition-all select-none
                        ${paymentMethod === 'rocket' 
                          ? 'border-orange-500 bg-orange-50/10 ring-1 ring-orange-500/30' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 bg-[#8c3494] rounded flex items-center justify-center flex-shrink-0">
                          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4.5,16.5 L12,9 L19.5,16.5 M12,9 L12,21" />
                            <path d="M12,3 L12,9" />
                          </svg>
                        </div>
                        <span className="font-bold text-sm text-gray-800">Rocket</span>
                      </div>
                      
                      {paymentMethod === 'rocket' ? (
                        <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-white">
                          <svg className="w-3 h-3 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-gray-300 bg-white" />
                      )}
                    </div>

                  </div>

                </div>

              </div>

              {/* Order Submission Panel */}
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full bg-[#0c1f3c] hover:bg-black text-white font-bold py-3.5 px-6 rounded-md shadow-sm transition-all text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <FileText className="w-4 h-4" /> Place Order
                </button>
                <p className="text-[10px] text-gray-400 mt-2 font-medium">
                  By placing your order, you agree to our terms and conditions.
                </p>
              </div>

            </form>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col">
                
                <h2 className="text-gray-800 text-base font-bold flex items-center gap-2 border-b border-gray-100 pb-4 mb-5 select-none">
                  <FileText className="w-5 h-5 text-gray-500" /> Order Summary
                </h2>

                {/* Items in Cart list */}
                <div className="space-y-4 max-h-64 overflow-y-auto mb-6 pr-1">
                  <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Items in Cart</div>
                  
                  {checkoutItems.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center text-xs">
                      <div className="w-12 h-12 border border-gray-200 rounded p-1 flex items-center justify-center overflow-hidden flex-shrink-0 bg-white">
                        <img src={item.image} alt={item.title} className="object-contain max-h-full max-w-full" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-gray-800 font-semibold truncate">{item.title}</h4>
                        <div className="text-[10px] text-gray-400">
                          Qty: {item.quantity} | ৳{formatPrice(item.price)}
                        </div>
                      </div>
                      <span className="font-bold text-gray-900 flex-shrink-0">
                        ৳{formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Section */}
                <div className="bg-[#f8fafc] border border-gray-200 rounded-lg p-4 mb-6">
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Coupon Code</div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="ENTER COUPON CODE"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={couponApplied}
                      className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded text-[10px] font-bold focus:outline-none focus:border-[#0e52b2] placeholder-gray-400 uppercase"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (couponCode.toUpperCase() === 'INTOUCH') {
                          setCouponApplied(true);
                        } else {
                          alert('Invalid Coupon Code! Try using "INTOUCH"');
                        }
                      }}
                      disabled={couponApplied}
                      className="bg-[#0e52b2] hover:bg-[#0b3d87] text-white text-[10px] font-bold px-4 py-2 rounded transition-colors"
                    >
                      {couponApplied ? '✓ Applied' : 'Apply'}
                    </button>
                  </div>
                </div>

                {/* Price Breakdown lines */}
                <div className="space-y-3 text-xs sm:text-sm font-medium pb-4 border-b border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal:</span>
                    <span className="text-gray-800 font-bold">৳{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Delivery ({deliveryArea === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'}):</span>
                    <span className="text-gray-800 font-bold">৳{formatPrice(deliveryFee)}</span>
                  </div>
                </div>

                {/* Total amount */}
                <div className="flex justify-between items-baseline pt-4">
                  <span className="text-gray-900 font-black text-sm">Total</span>
                  <span className="text-lg sm:text-xl font-black text-[#0e52b2]">
                    ৳{formatPrice(finalTotal)}
                  </span>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
