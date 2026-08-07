import React from 'react';
import { getAllProductsData, getFeaturedCategoriesData } from '@/lib/actions/server';
import ProductListContainer from '@/components/product-list/ProductListContainer';

export default async function AllProductsPage() {
  // Retrieve all products and categories from the database on the server
  const products = await getAllProductsData();
  const categories = await getFeaturedCategoriesData();

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
        </div>

        {/* Interactive Container with filters and layouts */}
        <ProductListContainer initialProducts={products} categories={categories} />

      </div>
    </div>
  );
}
