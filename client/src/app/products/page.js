import React from 'react';
import ProductCard from '@/components/shared/product-card/ProductCard';
import { getAllProductsData } from '@/lib/actions/server';

export default async function AllProductsPage() {
  // Retrieve all products from the database on the server
  const products = await getAllProductsData();

  return (
    <div className="w-full bg-[#f4f7fa] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumbs */}
        <div className="text-xs text-gray-500 mb-6 flex items-center gap-1 select-none">
          <a href="/" className="hover:text-[#0e52b2] transition-colors">Home</a>
          <span>&gt;</span>
          <span className="text-gray-700 font-medium">All Products</span>
        </div>

        {/* Section Header */}
        <div className="border-b border-gray-200 pb-3 mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-[#0c1f3c] text-lg sm:text-2xl font-black uppercase tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-6 bg-[#0e52b2] rounded-full inline-block"></span>
              All Products
            </h1>
            <p className="text-gray-400 text-xs mt-1 font-medium">
              Explore our full collection of premium gadgets and electronics
            </p>
          </div>
          <span className="text-xs font-bold text-gray-500 bg-white border border-gray-200 rounded px-2.5 py-1">
            Total: {products.length} Items
          </span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <div key={product.id} className="w-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16 bg-white border border-gray-200 rounded-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-1">No Products Found</h3>
            <p className="text-sm text-gray-400">
              There are currently no products available in the database.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
