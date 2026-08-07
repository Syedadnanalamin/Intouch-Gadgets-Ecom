/**
 * Fetch helper functions for server components
 */

export async function getFeaturedCategoriesData() {
  try {
    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    
    const res = await fetch(apiURL, {
      cache: 'no-store' // Do not cache, ensure dynamic data retrieval
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch homepage data: ${res.statusText}`);
    }

    const data = await res.json();

    // Map MongoDB _id fields to standard id fields so they integrate cleanly with existing components
    return data.map(category => ({
      ...category,
      id: category._id,
      products: (category.products || []).map(product => ({
        ...product,
        id: product._id
      }))
    }));

  } catch (error) {
    console.error("Error in getFeaturedCategoriesData Server Action:", error);
    return [];
  }
}

export async function getProductDetailsData(id) {
  try {
    const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    
    const res = await fetch(`${apiURL}/api/products/${id}`, {
      cache: 'no-store' // Do not cache, ensure fresh data
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product details for ID ${id}: ${res.statusText}`);
    }

    const data = await res.json();

    // Map MongoDB _id to standard id field
    return {
      ...data,
      id: data._id
    };

  } catch (error) {
    console.error(`Error in getProductDetailsData Server Action for ID ${id}:`, error);
    return null;
  }
}
