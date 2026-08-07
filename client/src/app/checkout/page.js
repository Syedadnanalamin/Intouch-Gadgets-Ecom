"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Person, Lock, House, GeoPin, Car, Clock, CreditCard, FileText, ShieldCheck, Tag } from '@gravity-ui/icons';

export default function CheckoutPage() {
  const {
    cartItems,
    selectedItems
  } = useCart();

  // Get only checked items for checkout
  const checkoutItems = cartItems.filter(item => selectedItems.includes(item.id));

  // Form states
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryArea, setDeliveryArea] = useState('office'); // 'office', 'inside', 'outside'
  const [paymentType, setPaymentType] = useState('full'); // 'full' or 'partial'
  const [paymentGateway, setPaymentGateway] = useState('pay_30'); // 'pay_30', 'bkash', 'online', 'credit'

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
    deliveryFee = 14400;
    deliveryText = "৳14,400";
    deliveryTime = "1-2 days";
  } else if (deliveryArea === 'outside') {
    deliveryFee = 15900;
    deliveryText = "৳15,900";
    deliveryTime = "3-5 days";
  }

  const finalTotal = subtotal > 0 ? subtotal + deliveryFee : 0;

  // Partial payment amount (10%)
  const partialPaymentAmount = finalTotal * 0.1;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!fullName || !mobileNumber || !deliveryAddress) {
      alert("Please fill in all required customer information fields.");
      return;
    }
    alert(`Order Placed Successfully!\n\nName: ${fullName}\nTotal: ৳${formatPrice(finalTotal)}\nPayment: ${paymentType === 'full' ? 'Full Payment' : '10% Partial Payment'}\nGateway: ${paymentGateway}`);
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
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    {/* Office Pickup */}
                    <div
                      onClick={() => setDeliveryArea('office')}
                      className={`border rounded-lg p-3 flex items-center justify-between cursor-pointer transition-all select-none
                        ${deliveryArea === 'office' ? 'border-[#0e52b2] bg-blue-50/20 ring-1 ring-[#0e52b2]' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={deliveryArea === 'office'}
                          onChange={() => setDeliveryArea('office')}
                          className="text-[#0e52b2] focus:ring-[#0e52b2] w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <div className="font-bold text-[11px] sm:text-xs text-gray-800">Office Pickup</div>
                          <div className="text-[9px] text-gray-400">Free</div>
                        </div>
                      </div>
                      <House className="w-4 h-4 text-gray-500" />
                    </div>

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
                          <div className="text-[9px] text-gray-400">৳14,400</div>
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
                          <div className="text-[9px] text-gray-400">৳15,900</div>
                        </div>
                      </div>
                      <Car className="w-4 h-4 text-gray-500" />
                    </div>

                  </div>

                  {/* Delivery Status Alert Line */}
                  <div className="mt-4 bg-blue-50 border border-blue-100 rounded-md p-2.5 text-[10px] sm:text-xs text-blue-800 flex flex-wrap gap-y-4 items-center">
                    <span><strong>Selected:</strong> {deliveryArea === 'office' ? 'Office Pickup' : deliveryArea === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'}</span>
                    <span className="text-blue-300">|</span>
                    <span><strong>Charge:</strong> {deliveryFee > 0 ? `৳${formatPrice(deliveryFee)}` : 'Free'}</span>
                    <span className="text-blue-300">|</span>
                    <span><strong>Time:</strong> {deliveryTime}</span>
                    <span className="text-blue-300">|</span>
                    <span className="text-emerald-700 flex items-center gap-1"><Tag className="w-3.5 h-3.5 text-emerald-600" /> Free delivery above ৳100,000,000.00</span>
                  </div>

                </div>

                {/* Payment Method Block */}
                <div className="mt-8">
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Payment Method</h3>
                  
                  {/* Select Payment Type */}
                  <div className="flex gap-6 mb-4 text-xs sm:text-sm font-semibold text-gray-700 select-none">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="payment_type"
                        checked={paymentType === 'full'}
                        onChange={() => setPaymentType('full')}
                        className="text-[#0e52b2] focus:ring-[#0e52b2] w-4 h-4"
                      />
                      <span>Full Payment</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="payment_type"
                        checked={paymentType === 'partial'}
                        onChange={() => setPaymentType('partial')}
                        className="text-[#0e52b2] focus:ring-[#0e52b2] w-4 h-4"
                      />
                      <span>Partial Payment (10%)</span>
                    </label>
                  </div>

                  {/* Gateway Options grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    {/* Pay in 30 Min */}
                    <div
                      onClick={() => setPaymentGateway('pay_30')}
                      className={`border rounded-lg p-3 flex flex-col justify-center gap-1 cursor-pointer transition-all select-none
                        ${paymentGateway === 'pay_30' ? 'border-[#0e52b2] bg-blue-50/20 ring-1 ring-[#0e52b2]' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={paymentGateway === 'pay_30'}
                          onChange={() => setPaymentGateway('pay_30')}
                          className="text-[#0e52b2] focus:ring-[#0e52b2] w-4 h-4"
                        />
                        <span className="font-bold text-[11px] sm:text-xs text-gray-800 flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-500" /> Pay in 30 min</span>
                      </div>
                      <span className="text-[9px] text-red-500 font-bold ml-6">
                        Order will be cancelled if not paid
                      </span>
                    </div>

                    {/* bKash */}
                    <div
                      onClick={() => setPaymentGateway('bkash')}
                      className={`border rounded-lg p-3 flex items-center gap-2 cursor-pointer transition-all select-none
                        ${paymentGateway === 'bkash' ? 'border-[#0e52b2] bg-blue-50/20 ring-1 ring-[#0e52b2]' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <input
                        type="radio"
                        checked={paymentGateway === 'bkash'}
                        onChange={() => setPaymentGateway('bkash')}
                        className="text-[#0e52b2] focus:ring-[#0e52b2] w-4 h-4"
                      />
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 bg-pink-500 text-white font-black text-[10px] rounded flex items-center justify-center">b</span>
                        <span className="font-bold text-[11px] sm:text-xs text-gray-800">bKash</span>
                      </div>
                    </div>

                    {/* Pay Online */}
                    <div
                      onClick={() => setPaymentGateway('online')}
                      className={`border rounded-lg p-3 flex items-center gap-2 cursor-pointer transition-all select-none
                        ${paymentGateway === 'online' ? 'border-[#0e52b2] bg-blue-50/20 ring-1 ring-[#0e52b2]' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <input
                        type="radio"
                        checked={paymentGateway === 'online'}
                        onChange={() => setPaymentGateway('online')}
                        className="text-[#0e52b2] focus:ring-[#0e52b2] w-4 h-4"
                      />
                      <span className="font-bold text-[11px] sm:text-xs text-gray-800 flex items-center gap-1"><CreditCard className="w-3.5 h-3.5 text-emerald-600" /> Pay Online</span>
                    </div>

                  </div>

                  {/* Credit row (additional card) */}
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3">
                    <div
                      onClick={() => setPaymentGateway('credit')}
                      className={`border rounded-lg p-3 flex flex-col justify-center gap-1 cursor-pointer transition-all select-none
                        ${paymentGateway === 'credit' ? 'border-[#0e52b2] bg-blue-50/20 ring-1 ring-[#0e52b2]' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          checked={paymentGateway === 'credit'}
                          onChange={() => setPaymentGateway('credit')}
                          className="text-[#0e52b2] focus:ring-[#0e52b2] w-4 h-4"
                        />
                        <span className="font-bold text-[11px] sm:text-xs text-gray-800 flex items-center gap-1"><CreditCard className="w-3.5 h-3.5 text-gray-500" /> Use Credit</span>
                      </div>
                      <span className="text-[9px] text-gray-400 font-medium ml-6">
                        Check by phone
                      </span>
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
                    <span className="text-gray-400">Delivery ({deliveryArea === 'office' ? 'Office Pickup' : deliveryArea === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'}):</span>
                    <span className="text-gray-800 font-bold">{deliveryFee > 0 ? `৳${formatPrice(deliveryFee)}` : 'Free'}</span>
                  </div>
                </div>

                {/* Total amount */}
                <div className="flex justify-between items-baseline pt-4">
                  <span className="text-gray-900 font-black text-sm">Total</span>
                  <span className="text-lg sm:text-xl font-black text-[#0e52b2]">
                    ৳{formatPrice(paymentType === 'partial' ? partialPaymentAmount : finalTotal)}
                  </span>
                </div>

                {paymentType === 'partial' && (
                  <div className="text-[10px] text-amber-600 font-bold text-right mt-1 leading-normal">
                    * Showing 10% partial payment amount.<br />
                    Remaining ৳{formatPrice(finalTotal - partialPaymentAmount)} payable on delivery.
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
