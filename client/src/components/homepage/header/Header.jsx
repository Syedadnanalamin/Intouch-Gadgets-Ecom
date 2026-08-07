import React from 'react';
import { Magnifier, Person, ShoppingCart, Bars, ArrowChevronDown, Thunderbolt } from '@gravity-ui/icons';

export default function Header() {
  return (
    <header className="w-full bg-white flex flex-col border-b border-gray-200">
      
      {/* Top Banner Notice */}
      <div className="bg-[#0c1f3c] text-white text-[10px] sm:text-xs py-1 px-4 flex justify-between items-center font-medium">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
          <span>Assalamu Alaikum! Welcome to Intouch Gadgets.</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-gray-300">
          <span>Hotline: +880 9678-300400</span>
          <span>Track Order</span>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl w-full mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2 select-none cursor-pointer">
          <div className="font-black text-2xl flex items-center tracking-tight">
            <span className="text-[#f15a24]">Intouch</span>
            <span className="text-[#0e52b2] ml-1">Gadgets</span>
          </div>
          <div className="bg-[#f15a24] text-white text-[9px] font-bold px-1.5 py-0.5 rounded ml-2 uppercase">
            Bangla
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex w-full md:max-w-xl border-2 border-[#0e52b2] rounded overflow-hidden">
          <input
            type="text"
            placeholder="Search for products, brands, or categories..."
            className="w-full px-3 py-2 text-sm text-gray-800 focus:outline-none"
          />
          <button className="bg-[#0e52b2] text-white px-5 flex items-center justify-center transition-colors duration-200 hover:bg-[#0b3d87]">
            <Magnifier className="w-4 h-4" />
          </button>
        </div>


        {/* User Account & Cart Panel */}
        <div className="flex items-center gap-6">
          {/* Cart */}
          <div className="relative flex items-center gap-1.5 cursor-pointer text-gray-700 hover:text-[#0e52b2] transition-colors duration-200">
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1.5 -right-1.5 bg-[#f15a24] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[10px] text-gray-400 leading-none">Your Cart</span>
              <span className="text-xs font-bold leading-none mt-1">৳ 24,500</span>
            </div>
          </div>

          {/* Account */}
          <div className="flex items-center gap-1.5 cursor-pointer text-gray-700 hover:text-[#0e52b2] transition-colors duration-200">
            <Person className="w-5 h-5 text-gray-500" />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[10px] text-gray-400 leading-none">Hello, Sign In</span>
              <span className="text-xs font-bold leading-none mt-1">Account</span>
            </div>
          </div>
        </div>

      </div>

      {/* Navigation bar */}
      <div className="bg-[#0e52b2] text-white w-full">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          
          {/* Category Dropdown Toggle */}
          <div className="bg-[#0b3d87] hover:bg-[#09306b] px-4 py-3 flex items-center gap-2 cursor-pointer font-bold text-xs sm:text-sm tracking-wide uppercase transition-colors duration-200">
            <Bars className="w-4 h-4" />
            <span>Shop by Category</span>
            <ArrowChevronDown className="w-3.5 h-3.5 ml-1" />
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center flex-1 overflow-x-auto whitespace-nowrap scrollbar-none text-xs sm:text-sm font-semibold pl-4 gap-4 md:gap-6 py-3">
            <a href="#" className="hover:text-amber-300 transition-colors duration-200 flex items-center gap-1">
              Home
            </a>
            <a href="#" className="text-amber-300 hover:text-amber-400 transition-colors duration-200 flex items-center gap-1 animate-pulse">
              <Thunderbolt className="w-3.5 h-3.5 fill-current" />
              Hot Deals
            </a>
            <a href="#" className="hover:text-amber-300 transition-colors duration-200">All Products</a>
            <a href="#" className="hover:text-amber-300 transition-colors duration-200">About Us</a>
            <a href="#" className="hover:text-amber-300 transition-colors duration-200">Contact</a>
            <a href="#" className="hover:text-amber-300 transition-colors duration-200">Track Order</a>
          </nav>

          {/* Helpline Callout */}
          <div className="hidden md:flex items-center font-black text-xs px-4 py-3 bg-[#f15a24] text-white gap-1 select-none">
            <span>Call:</span>
            <span>09678-300400</span>
          </div>

        </div>
      </div>

    </header>
  );
}
