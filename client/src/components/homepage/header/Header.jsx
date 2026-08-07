"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Magnifier, Person, ShoppingCart, Bars, ArrowChevronDown, Thunderbolt } from '@gravity-ui/icons';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { cartCount, cartTotal, setIsCartDrawerOpen } = useCart();

  const categories = [
    "Solar & Green Energy",
    "Solar Inverters",
    "Solar Batteries",
    "Featured Smartwatches",
    "Audio Paradise",
    "Daily Essential Gadgets",
    "Computing Power",
    "Mobile World",
    "Electronics Hub"
  ];

  return (
    <header className="w-full bg-white flex flex-col border-b border-gray-200">
      
      {/* 1. DESKTOP VIEW HEADERS (hidden on mobile) */}
      
      {/* Top Banner Notice (Desktop only) */}
      <div className="bg-[#0c1f3c] text-white text-[10px] sm:text-xs py-1 px-4 hidden md:flex justify-between items-center font-medium">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
          <span>Assalamu Alaikum! Welcome to Intouch Gadgets.</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-gray-300">
          <span>Hotline: +880 9678-300400</span>
          <span>Track Order</span>
        </div>
      </div>

      {/* Main Header Row (Desktop only) */}
      <div className="max-w-7xl w-full mx-auto px-4 py-3 hidden md:flex items-center justify-between gap-4">
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
          <div 
            onClick={() => setIsCartDrawerOpen(true)}
            className="relative flex items-center gap-1.5 cursor-pointer text-gray-700 hover:text-[#0e52b2] transition-colors duration-200"
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1.5 -right-1.5 bg-[#f15a24] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[10px] text-gray-400 leading-none">Your Cart</span>
              <span className="text-xs font-bold leading-none mt-1">৳ {cartTotal.toLocaleString('en-IN')}</span>
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

      {/* Navigation bar (Desktop only) */}
      <div className="bg-[#0e52b2] text-white w-full relative z-40 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between relative">
          
          {/* Category Dropdown Toggle */}
          <div 
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="bg-[#0b3d87] hover:bg-[#09306b] px-4 py-3 flex items-center gap-2 cursor-pointer font-bold text-xs sm:text-sm tracking-wide uppercase transition-colors duration-200 select-none"
          >
            <Bars className="w-4 h-4" />
            <span>Shop by Category</span>
            <ArrowChevronDown className="w-3.5 h-3.5 ml-1" />
          </div>

          {/* Absolute Categories Dropdown Menu (Desktop) */}
          {isCategoryOpen && (
            <div className="absolute top-full left-4 w-60 bg-white border border-gray-200 shadow-xl rounded-b-lg z-50 py-1 divide-y divide-gray-100 animate-in fade-in slide-in-from-top-2 duration-150">
              {categories.map((cat, index) => (
                <a
                  key={index}
                  href="#"
                  onClick={() => setIsCategoryOpen(false)}
                  className="block px-4 py-2.5 hover:bg-gray-50 text-gray-700 hover:text-[#0e52b2] font-semibold text-xs transition-colors duration-150 flex justify-between items-center"
                >
                  <span>{cat}</span>
                  <span className="text-gray-300 text-[10px]">&raquo;</span>
                </a>
              ))}
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex items-center flex-1 overflow-x-auto whitespace-nowrap scrollbar-none text-xs sm:text-sm font-semibold pl-4 gap-4 md:gap-6 py-3">
            <Link href="/" className="hover:text-amber-300 transition-colors duration-200 flex items-center gap-1">
              Home
            </Link>
            <a href="#" className="text-amber-300 hover:text-amber-400 transition-colors duration-200 flex items-center gap-1 animate-pulse">
              <Thunderbolt className="w-3.5 h-3.5 fill-current" />
              Hot Deals
            </a>
            <Link href="/products" className="hover:text-amber-300 transition-colors duration-200">All Products</Link>
            <Link href="/about" className="hover:text-amber-300 transition-colors duration-200">About Us</Link>
            <Link href="/contact" className="hover:text-amber-300 transition-colors duration-200">Contact</Link>
            <a href="#" className="hover:text-amber-300 transition-colors duration-200">Track Order</a>
          </nav>

          {/* Helpline Callout */}
          <div className="hidden md:flex items-center font-black text-xs px-4 py-3 bg-[#f15a24] text-white gap-1 select-none">
            <span>Call:</span>
            <span>09678-300400</span>
          </div>
        </div>
      </div>


      {/* 2. RESPONSIVE MOBILE VIEW HEADERS (visible on mobile only) */}
      
      <div className="relative w-full md:hidden flex flex-col bg-white">
        
        {/* Row 1: Hamburguer menu, Centered Logo, Account & Cart */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
          
          {/* Hamburger Category Toggle */}
          <button 
            onClick={() => setIsCategoryOpen(!isCategoryOpen)} 
            className="text-gray-700 hover:text-[#0e52b2] p-1 flex items-center justify-center transition-colors"
          >
            <Bars className="w-6 h-6" />
          </button>

          {/* Centered Brand Name Logo */}
          <div className="flex items-center gap-1 font-black text-lg select-none">
            <span className="text-[#f15a24]">Intouch</span>
            <span className="text-[#0e52b2]">Gadgets</span>
          </div>

          {/* Action Icons Panel */}
          <div className="flex items-center gap-4">
            
            {/* Account link */}
            <a href="#" className="text-gray-700 hover:text-[#0e52b2] p-1 flex items-center justify-center">
              <Person className="w-5 h-5 text-gray-600" />
            </a>

            {/* Shopping Cart button */}
            <div 
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative text-gray-700 hover:text-[#0e52b2] p-1 flex items-center justify-center cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-[#f15a24] text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                {cartCount}
              </span>
            </div>

          </div>

        </div>

        {/* Row 2: Rounded gray Search Box */}
        <div className="p-3 bg-white border-b border-gray-100">
          <div className="relative flex items-center w-full">
            <Magnifier className="absolute left-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-[#f1f3f6] text-sm text-gray-800 rounded-lg pl-9 pr-4 py-2 focus:outline-none placeholder-gray-400 font-semibold"
            />
          </div>
        </div>

        {/* Mobile Dropdown Category List */}
        {isCategoryOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl z-50 py-1 divide-y divide-gray-100 animate-in fade-in slide-in-from-top-2 duration-150">
            {categories.map((cat, index) => (
              <a
                key={index}
                href="#"
                onClick={() => setIsCategoryOpen(false)}
                className="block px-6 py-3 hover:bg-gray-50 text-gray-700 hover:text-[#0e52b2] font-bold text-xs transition-colors flex justify-between items-center"
              >
                <span>{cat}</span>
                <span className="text-gray-400 text-[10px]">&raquo;</span>
              </a>
            ))}
          </div>
        )}

      </div>

    </header>
  );
}
