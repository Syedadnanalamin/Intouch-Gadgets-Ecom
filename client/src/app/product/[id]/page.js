import React from 'react';
import ProductDetails from '@/components/ProductPage/ProductDetails';

export default async function ProductPage({ params }) {
  // Read parameters on the server (async context)
  const resolvedParams = await params;
  const id = resolvedParams.id;

  return (
    <ProductDetails productId={id} />
  );
}
