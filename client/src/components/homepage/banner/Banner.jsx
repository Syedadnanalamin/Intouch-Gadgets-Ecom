import React from 'react';
import Link from 'next/link';

export default function Banner() {
  const banners = [
    { id: 1, image: "/BannerImage/img1.png", link: "/products" },
    { id: 2, image: "/BannerImage/img2.png", link: "/products" },
    { id: 3, image: "/BannerImage/img3.png", link: "/products" },
    { id: 4, image: "/BannerImage/img4.png", link: "/products" },
    { id: 5, image: "/BannerImage/img5.png", link: "/products" },
    { id: 6, image: "/BannerImage/img6.png", link: "/products" }
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6 select-none">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {banners.map((banner, index) => (
          <Link
            key={banner.id}
            href={banner.link}
            className={`group relative h-[185px] sm:h-[280px] md:h-[320px] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 block bg-gray-50 border border-gray-100
              ${index >= 2 ? 'hidden sm:block lg:block' : 'block'}`}
          >
            {/* Banner Graphic Image with softening eye-comfort filters */}
            <img
              src={banner.image}
              alt={`Banner option ${banner.id}`}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.02] brightness-[0.88] contrast-[0.96] saturate-[0.96] group-hover:brightness-95 group-hover:contrast-100"
            />
            
            {/* Subtle soft dark overlay to take off the harsh glare */}
            <div className="absolute inset-0 bg-slate-950/[0.03] group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
          </Link>
        ))}
      </div>
    </section>
  );
}
