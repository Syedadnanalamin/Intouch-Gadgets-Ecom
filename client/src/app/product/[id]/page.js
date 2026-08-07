import React from 'react';
import ProductDetails from '@/components/ProductPage/ProductDetails';
import { getProductDetailsData } from '@/actions/server';

export default async function ProductPage({ params }) {
  // Read parameters dynamically on the server
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // Fetch product detail dynamically from Express API database
  const product = await getProductDetailsData(id);

  if (!product) {
    return (
      <div className="w-full bg-[#f4f7fa] min-h-screen py-16 flex items-center justify-center">
        <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-md w-full text-center shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-sm text-gray-500 mb-6">
            The product with ID "{id}" could not be located in our database.
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center bg-[#0e52b2] hover:bg-[#0b3d87] text-white font-bold px-5 py-2.5 rounded transition-all text-sm"
          >
            Return to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <ProductDetails product={product} />
  );
}
