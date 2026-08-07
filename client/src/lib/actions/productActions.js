import {
  getData,
  postDataWithToken,
  putDataWithToken,
  deleteDataWithToken,
} from './action.js';

/**
 * Fetch featured categories with nested products
 * API Endpoint: GET /api/products/featured
 */
export async function getFeaturedCategoriesData() {
  try {
    const data = await getData('/api/products/featured');

    // Map MongoDB _id fields to standard id fields
    return (data || []).map(category => ({
      ...category,
      id: category._id,
      products: (category.products || []).map(product => ({
        ...product,
        id: product._id
      }))
    }));
  } catch (error) {
    console.error("Error in getFeaturedCategoriesData:", error);
    return [];
  }
}

/**
 * Fetch details for a single product by ID
 * API Endpoint: GET /api/products/:id
 */
export async function getProductDetailsData(id) {
  try {
    const data = await getData(`/api/products/${id}`);
    if (!data) return null;

    return {
      ...data,
      id: data._id
    };
  } catch (error) {
    console.error(`Error in getProductDetailsData for ID ${id}:`, error);
    return null;
  }
}

/**
 * Fetch all products
 * API Endpoint: GET /api/products
 */
export async function getAllProductsData() {
  try {
    const data = await getData('/api/products');

    return (data || []).map(product => ({
      ...product,
      id: product._id
    }));
  } catch (error) {
    console.error("Error in getAllProductsData:", error);
    return [];
  }
}

/**
 * Create a new product (Requires Auth Token)
 * API Endpoint: POST /api/products
 */
export async function createProductData(productData, token) {
  try {
    return await postDataWithToken('/api/products', productData, token);
  } catch (error) {
    console.error("Error in createProductData:", error);
    throw error;
  }
}

/**
 * Update an existing product (Requires Auth Token)
 * API Endpoint: PUT /api/products/:id
 */
export async function updateProductData(id, productData, token) {
  try {
    return await putDataWithToken(`/api/products/${id}`, productData, token);
  } catch (error) {
    console.error(`Error in updateProductData for ID ${id}:`, error);
    throw error;
  }
}

/**
 * Delete a product by ID (Requires Auth Token)
 * API Endpoint: DELETE /api/products/:id
 */
export async function deleteProductData(id, token) {
  try {
    return await deleteDataWithToken(`/api/products/${id}`, token);
  } catch (error) {
    console.error(`Error in deleteProductData for ID ${id}:`, error);
    throw error;
  }
}
