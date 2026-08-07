import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#0c1f3c] text-gray-300 w-full mt-auto border-t-4 border-[#f15a24]">
      
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Info Column */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase mb-4 tracking-wider border-b border-gray-700 pb-2">
            Company Info
          </h4>
          <p className="text-xs leading-relaxed text-gray-400">
            Intouch Gadgets is a leading gadgets and electronics online retail shop in Bangladesh. We provide 100% authentic products, fast home delivery, and reliable customer support.
          </p>
        </div>

        {/* Links Column */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase mb-4 tracking-wider border-b border-gray-700 pb-2">
            Customer Service
          </h4>
          <ul className="text-xs space-y-2.5">
            <li><a href="#" className="hover:text-amber-300 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-amber-300 transition-colors">Refund and Return Policy</a></li>
            <li><a href="#" className="hover:text-amber-300 transition-colors">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-amber-300 transition-colors">EMI Policy</a></li>
            <li><a href="#" className="hover:text-amber-300 transition-colors">Shipping & Delivery Info</a></li>
          </ul>
        </div>

        {/* Account Column */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase mb-4 tracking-wider border-b border-gray-700 pb-2">
            My Account
          </h4>
          <ul className="text-xs space-y-2.5">
            <li><a href="#" className="hover:text-amber-300 transition-colors">Sign In</a></li>
            <li><a href="#" className="hover:text-amber-300 transition-colors">View Cart</a></li>
            <li><a href="#" className="hover:text-amber-300 transition-colors">My Wishlist</a></li>
            <li><a href="#" className="hover:text-amber-300 transition-colors">Track My Order</a></li>
            <li><a href="#" className="hover:text-amber-300 transition-colors">Order History</a></li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div>
          <h4 className="text-white font-bold text-sm uppercase mb-4 tracking-wider border-b border-gray-700 pb-2">
            Contact Us
          </h4>
          <p className="text-xs leading-relaxed text-gray-400">
            <strong>Office:</strong> House 12, Road 5, Dhanmondi, Dhaka - 1205, Bangladesh.
          </p>
          <p className="text-xs mt-2 text-gray-400">
            <strong>Email:</strong> support@intouch-gadgets.com
          </p>
          <p className="text-xs mt-2 text-gray-400">
            <strong>Helpline:</strong> 09678-300400 (9 AM - 9 PM)
          </p>
        </div>

      </div>

      {/* Payment Partner Badges Section */}
      <div className="bg-[#09182f] border-t border-gray-800 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
            We Accept Secure Payments
          </div>
          
          <div className="flex flex-wrap gap-2 items-center justify-center">
            {/* bkash */}
            <span className="bg-[#e2136e] text-white text-[10px] font-black px-2.5 py-1 rounded select-none">
              bKash
            </span>
            {/* nagad */}
            <span className="bg-[#f04f23] text-white text-[10px] font-black px-2.5 py-1 rounded select-none">
              Nagad
            </span>
            {/* rocket */}
            <span className="bg-[#8c2e8c] text-white text-[10px] font-black px-2.5 py-1 rounded select-none">
              Rocket
            </span>
            {/* visa */}
            <span className="bg-[#1a1f71] text-white text-[10px] font-black px-2.5 py-1 rounded select-none">
              VISA
            </span>
            {/* mastercard */}
            <span className="bg-[#eb001b] text-white text-[10px] font-black px-2.5 py-1 rounded select-none">
              Mastercard
            </span>
            {/* cod */}
            <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 rounded select-none">
              Cash On Delivery
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-[#061122] py-4 px-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Intouch Gadgets. Developed for Bangladeshi Audience. All rights reserved.
      </div>

    </footer>
  );
}
