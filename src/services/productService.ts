import { Product } from '../types/Product';
import { ApiResponse } from '../types/ApiResponse';
import { API_URL } from './config';

export const getProducts = async (): Promise<ApiResponse<Product[]>> => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiResponse<Product[]> = await response.json();
    return data;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error fetching products';
    return {
      status: false,
      message: errorMessage
    };
  }
};

export const createProduct = async (product: Omit<Product, '_id'>): Promise<ApiResponse<Product>> => {
  const productData = {
    ...product,
    image: product.image || undefined  // Send undefined if empty string
  };

  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiResponse<Product> = await response.json();
    return data;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error creating product';
    return {
      status: false,
      message: errorMessage
    };
  }
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<ApiResponse<Product>> => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiResponse<Product> = await response.json();
    return data;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error updating product';
    return {
      status: false,
      message: errorMessage
    };
  }
};

export const deleteProduct = async (id: string): Promise<ApiResponse<boolean>> => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch {
    return {
      status: false,
      message: 'Error deleting product'
    };
  }
};

export const updateProductPrice = async (id: string, price: number): Promise<ApiResponse<Product>> => {
  try {
    const response = await fetch(`${API_URL}/products/${id}/price`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiResponse<Product> = await response.json();
    return data;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error updating price';
    return {
      status: false,
      message: errorMessage
    };
  }
};