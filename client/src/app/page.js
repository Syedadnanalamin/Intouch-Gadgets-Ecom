import React from 'react';
import Banner from '@/components/homepage/banner/Banner';
import ProductSection from '@/components/homepage/product-section/ProductSection';
import { getFeaturedCategoriesData } from '@/lib/actions/server';

export default async function Home() {
  // Retrieve featured categories and their products from the backend API
  const categories = await getFeaturedCategoriesData();

  return (
    <div className="w-full bg-[#f4f7fa] min-h-screen pb-12">

      {/* Top Banner section */}
      <Banner />

      {/* Main Content Area - Dynamic Sections */}
      <div className="flex flex-col gap-2">
        {categories.slice(0, 4).map((category) => (
          <ProductSection
            key={category.id}
            title={category.name}
            subtitle={category.description || `Explore our premium items under ${category.name}`}
            products={category.products}
          />
        ))}

        {categories.length === 0 && (
          <div className="text-center py-16 bg-white border border-gray-200 rounded-lg max-w-7xl mx-auto px-4 mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-1">No Active Products Found</h3>
            <p className="text-sm text-gray-400">
              Please seed your categories & products collections in the MongoDB 'ecommerce' database.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
