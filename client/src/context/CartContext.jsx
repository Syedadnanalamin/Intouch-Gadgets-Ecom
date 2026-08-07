"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Load cart from localStorage on mount (client-side only)
  useEffect(() => {
    const savedCart = localStorage.getItem('intouch_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart items:", e);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  const saveCart = (items) => {
    setCartItems(items);
    localStorage.setItem('intouch_cart', JSON.stringify(items));
  };

  // Add a toast notification helper
  const triggerToast = (title, message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, message }]);
    
    // Auto-remove toast after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Add item to cart
  const addToCart = (product, qty = 1) => {
    const existingIndex = cartItems.findIndex(item => item.id === product.id);
    let updatedCart = [...cartItems];

    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += qty;
    } else {
      updatedCart.push({ ...product, quantity: qty });
    }

    saveCart(updatedCart);
    triggerToast(
      "Added to Cart", 
      `${product.title.slice(0, 30)}... added to your order.`
    );
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    saveCart(updatedCart);
  };

  // Clear cart
  const clearCart = () => {
    saveCart([]);
  };

  // Helper values
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      clearCart,
      triggerToast
    }}>
      {children}

      {/* Floating Toast Notification Portal Overlay */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#0c1f3c] text-white border border-slate-700/50 rounded-lg p-3.5 shadow-xl flex items-start gap-3 animate-in slide-in-from-bottom-5 fade-in duration-200"
          >
            {/* Green Success Icon */}
            <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold mt-0.5 flex-shrink-0">
              ✓
            </div>
            
            <div className="flex-1">
              <h4 className="text-xs font-bold text-amber-400 leading-none mb-1">{toast.title}</h4>
              <p className="text-[11px] text-slate-300 leading-normal font-medium">{toast.message}</p>
            </div>
            
            {/* Close Button */}
            <button
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              className="text-slate-400 hover:text-white transition-colors text-xs font-semibold px-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
