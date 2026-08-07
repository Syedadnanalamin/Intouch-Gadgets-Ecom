import React from 'react';

export default function Banner() {
  const banners = [
    {
      id: 1,
      bengaliTitle: "সুরক্ষিত ওয়েবসাইট",
      englishTitle: "Electronics Hub",
      subtitle: "Latest gadgets",
      linkText: "Shop Now",
      gradient: "from-blue-600/90 to-indigo-900/90",
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60" // Smartwatch
    },
    {
      id: 2,
      bengaliTitle: "বিশ্বস্ত কাস্টমার সাপোর্ট",
      englishTitle: "Smart Living",
      subtitle: "Smart home solutions",
      linkText: "Explore",
      gradient: "from-[#113a7a]/90 to-[#0e52b2]/90",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&auto=format&fit=crop&q=60" // Smart speaker
    },
    {
      id: 3,
      bengaliTitle: "১০০% অথেন্টিক প্রোডাক্ট",
      englishTitle: "Gaming Zone",
      subtitle: "Gaming gear",
      linkText: "Discover",
      gradient: "from-purple-900/90 to-slate-900/90",
      image: "https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?w=500&auto=format&fit=crop&q=60" // Controller
    },
    {
      id: 4,
      bengaliTitle: "বাংলাদেশের সেরা অফার",
      englishTitle: "Audio Paradise",
      subtitle: "Sound systems",
      linkText: "Listen",
      gradient: "from-emerald-800/90 to-teal-950/90",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60" // Headphone
    },
    {
      id: 5,
      bengaliTitle: "প্রত্যন্ত অঞ্চলে দ্রুত ডেলিভারি",
      englishTitle: "Mobile World",
      subtitle: "Latest smartphones",
      linkText: "Browse",
      gradient: "from-sky-700/90 to-blue-900/90",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60" // Smartphone
    },
    {
      id: 6,
      bengaliTitle: "সেরা ব্র্যান্ডের পণ্য",
      englishTitle: "Computing Power",
      subtitle: "Laptops & desktops",
      linkText: "View All",
      gradient: "from-amber-600/90 to-orange-900/90",
      image: "https://images.unsplash.com/photo-1496181130204-7552cc14ac1a?w=500&auto=format&fit=crop&q=60" // Laptop
    }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="group relative h-[360px] rounded-xl overflow-hidden shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
          >
            {/* Background Image */}
            <img
              src={banner.image}
              alt={banner.englishTitle}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${banner.gradient} opacity-90 transition-opacity duration-300 group-hover:opacity-95`} />

            {/* Content Layer */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between text-white z-10">
              
              {/* Bengali Headline */}
              <div className="pt-4">
                <h3 className="text-lg md:text-xl font-black text-white drop-shadow-md leading-snug tracking-wide">
                  {banner.bengaliTitle}
                </h3>
                <div className="w-8 h-1 bg-amber-400 mt-2 rounded transition-all duration-300 group-hover:w-16"></div>
              </div>

              {/* Bottom English Category & Action */}
              <div className="pb-2">
                <h4 className="text-sm font-black tracking-wide uppercase drop-shadow-sm">
                  {banner.englishTitle}
                </h4>
                <p className="text-[10px] text-gray-300 font-medium mt-0.5">
                  {banner.subtitle}
                </p>
                <div className="mt-3 inline-flex items-center text-xs font-bold text-amber-300 group-hover:text-amber-400 transition-colors duration-200">
                  <span>{banner.linkText}</span>
                  <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </div>
              </div>

            </div>

            {/* Decorative Glow */}
            <div className="absolute inset-0 border border-white/20 rounded-xl pointer-events-none group-hover:border-white/40 transition-colors duration-300"></div>

          </div>
        ))}
      </div>
    </section>
  );
}
