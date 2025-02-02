import { ApiResponse } from '../types/ApiResponse';
import { API_URL } from './config';

export interface Category {
  _id: string;
  name: string;
}

export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  try {
    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch {
    return {
      status: false,
      message: 'Error fetching categories'
    };
  }
};

export const createCategory = async (name: string): Promise<ApiResponse<Category>> => {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name.toLowerCase().trim() }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch {
    return {
      status: false,
      message: 'Error creating category'
    };
  }
};