import React from 'react';

export default function AboutPage() {
  return (
    <div className="w-full bg-[#f4f7fa] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Breadcrumbs */}
        <div className="text-xs text-gray-500 mb-6 flex items-center gap-1 select-none">
          <a href="/" className="hover:text-[#0e52b2] transition-colors">Home</a>
          <span>&gt;</span>
          <span className="text-gray-700 font-medium">About Us</span>
        </div>

        {/* Card Container */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-10 shadow-sm">
          
          {/* Main Title */}
          <div className="border-b border-gray-100 pb-5 mb-8">
            <h1 className="text-[#0c1f3c] text-2xl sm:text-3xl font-black uppercase tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-7 bg-[#0e52b2] rounded-full inline-block"></span>
              About Intouch Gadgets
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm mt-1.5 font-medium">
              Your most trusted tech & solar companion in Bangladesh.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 text-sm text-gray-600 leading-relaxed">
            
            {/* Story */}
            <section>
              <h2 className="text-[#0c1f3c] text-lg font-bold mb-3 flex items-center gap-1.5">
                Our Story
              </h2>
              <p>
                Founded with a vision to revolutionize the availability of premium gadgets and sustainable solar energy solutions across Bangladesh, <strong>Intouch Gadgets</strong> has quickly emerged as a trusted destination for modern technophiles. We bridge the gap between quality international technology and local tech enthusiasts, ensuring reliability and post-purchase service.
              </p>
            </section>

            {/* Mission & Vision */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#f8fafc] p-6 rounded-lg border border-gray-100">
              <div>
                <h3 className="text-[#0e52b2] font-bold text-base mb-2">Our Mission</h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  To provide the highest quality tech gadgets and solar setup packages with complete consumer reliability, affordable pricing, and dedicated service warranties.
                </p>
              </div>
              <div>
                <h3 className="text-[#f15a24] font-bold text-base mb-2">Our Vision</h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  To build Bangladesh's most customer-centric e-commerce brand for electronics and solar packages, enabling clean energy and smart lifestyle choices in every home.
                </p>
              </div>
            </section>

            {/* Core Values */}
            <section>
              <h2 className="text-[#0c1f3c] text-lg font-bold mb-4">Why Shop With Us?</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                
                {/* Value 1 */}
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-50 text-[#0e52b2] rounded-full flex items-center justify-center font-bold text-lg mb-3">
                    ✓
                  </div>
                  <h4 className="text-gray-800 font-bold text-sm mb-1">100% Authentic</h4>
                  <p className="text-xs text-gray-400">All products are sourced directly from authorized manufacturers.</p>
                </div>

                {/* Value 2 */}
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-bold text-lg mb-3">
                    ★
                  </div>
                  <h4 className="text-gray-800 font-bold text-sm mb-1">Service Warranty</h4>
                  <p className="text-xs text-gray-400">Enjoy comprehensive warranty support and dedicated engineers.</p>
                </div>

                {/* Value 3 */}
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col items-center">
                  <div className="w-12 h-12 bg-orange-50 text-[#f15a24] rounded-full flex items-center justify-center font-bold text-lg mb-3">
                    ⚡
                  </div>
                  <h4 className="text-gray-800 font-bold text-sm mb-1">Fast Delivery</h4>
                  <p className="text-xs text-gray-400">Quick delivery networks spanning inside and outside Dhaka.</p>
                </div>

              </div>
            </section>

          </div>

        </div>

      </div>
    </div>
  );
}
