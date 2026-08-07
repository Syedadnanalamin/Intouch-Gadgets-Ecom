/**
 * Generic HTTP Request Helpers for Client & Server Actions
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 * Format URL: Prepends BASE_URL if relative path is provided
 */
const getFullUrl = (endpoint) => {
  if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
    return endpoint;
  }
  return `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
};

/**
 * GET Request
 */
export async function getData(endpoint, options = {}) {
  try {
    const url = getFullUrl(endpoint);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      cache: options.cache || 'no-store',
      ...options,
    });

    if (!res.ok) {
      throw new Error(`GET ${endpoint} failed: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error in getData (${endpoint}):`, error);
    throw error;
  }
}

/**
 * POST Request
 */
export async function postData(endpoint, body = {}, options = {}) {
  try {
    const url = getFullUrl(endpoint);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(body),
      cache: options.cache || 'no-store',
      ...options,
    });

    if (!res.ok) {
      throw new Error(`POST ${endpoint} failed: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error in postData (${endpoint}):`, error);
    throw error;
  }
}

/**
 * PUT Request
 */
export async function putData(endpoint, body = {}, options = {}) {
  try {
    const url = getFullUrl(endpoint);
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: JSON.stringify(body),
      cache: options.cache || 'no-store',
      ...options,
    });

    if (!res.ok) {
      throw new Error(`PUT ${endpoint} failed: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error in putData (${endpoint}):`, error);
    throw error;
  }
}

/**
 * DELETE Request
 */
export async function deleteData(endpoint, options = {}) {
  try {
    const url = getFullUrl(endpoint);
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      cache: options.cache || 'no-store',
      ...options,
    });

    if (!res.ok) {
      throw new Error(`DELETE ${endpoint} failed: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error in deleteData (${endpoint}):`, error);
    throw error;
  }
}

/**
 * GET Request with Authorization Token
 */
export async function getDataWithToken(endpoint, token, options = {}) {
  try {
    const url = getFullUrl(endpoint);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
      cache: options.cache || 'no-store',
      ...options,
    });

    if (!res.ok) {
      throw new Error(`GET ${endpoint} (Auth) failed: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error in getDataWithToken (${endpoint}):`, error);
    throw error;
  }
}

/**
 * POST Request with Authorization Token
 */
export async function postDataWithToken(endpoint, body = {}, token, options = {}) {
  try {
    const url = getFullUrl(endpoint);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
      body: JSON.stringify(body),
      cache: options.cache || 'no-store',
      ...options,
    });

    if (!res.ok) {
      throw new Error(`POST ${endpoint} (Auth) failed: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error in postDataWithToken (${endpoint}):`, error);
    throw error;
  }
}

/**
 * PUT Request with Authorization Token
 */
export async function putDataWithToken(endpoint, body = {}, token, options = {}) {
  try {
    const url = getFullUrl(endpoint);
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
      body: JSON.stringify(body),
      cache: options.cache || 'no-store',
      ...options,
    });

    if (!res.ok) {
      throw new Error(`PUT ${endpoint} (Auth) failed: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error in putDataWithToken (${endpoint}):`, error);
    throw error;
  }
}

/**
 * DELETE Request with Authorization Token
 */
export async function deleteDataWithToken(endpoint, token, options = {}) {
  try {
    const url = getFullUrl(endpoint);
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
      cache: options.cache || 'no-store',
      ...options,
    });

    if (!res.ok) {
      throw new Error(`DELETE ${endpoint} (Auth) failed: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Error in deleteDataWithToken (${endpoint}):`, error);
    throw error;
  }
}
