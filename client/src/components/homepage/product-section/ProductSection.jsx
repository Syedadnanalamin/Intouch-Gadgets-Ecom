import React from 'react';
import ProductCard from '../../shared/product-card/ProductCard';

export default function ProductSection({ title, subtitle, products = [] }) {
  // Slice to only show up to 5 products
  const visibleProducts = products.slice(0, 5);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6">
      
      {/* Section Header */}
      <div className="flex justify-between items-end border-b border-gray-200 pb-3 mb-6">
        <div>
          <h2 className="text-[#0c1f3c] text-lg sm:text-xl font-black uppercase tracking-tight flex items-center gap-2">
            <span className="w-1 h-5 bg-[#0e52b2] rounded-full inline-block"></span>
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-400 text-[10px] sm:text-xs mt-1 font-medium">
              {subtitle}
            </p>
          )}
        </div>
        <a href="#" className="text-[#0e52b2] hover:text-amber-500 text-xs font-bold uppercase transition-colors duration-200">
          See More &raquo;
        </a>
      </div>

      {/* Grid Container (no scrollbars, wraps on smaller screens, 5 columns on desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {visibleProducts.map((product) => (
          <div key={product.id} className="w-full min-w-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

    </section>
  );
}
