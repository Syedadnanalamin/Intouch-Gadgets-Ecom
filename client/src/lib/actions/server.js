/**
 * Server Actions re-exporting product and generic API actions
 */

export * from './action.js';
export * from './productActions.js';

import { postData, getData } from './action.js';

export async function createOrderData(orderPayload) {
  try {
    return await postData('/api/orders', orderPayload);
  } catch (error) {
    console.error("Error in createOrderData Server Action:", error);
    return { success: false, error: error.message };
  }
}

export async function getOrderDetailsData(orderId) {
  try {
    return await getData(`/api/orders/${orderId}`);
  } catch (error) {
    console.error(`Error in getOrderDetailsData Server Action for ID ${orderId}:`, error);
    return null;
  }
}
