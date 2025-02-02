import { useState, useEffect } from 'react';
import { getCategories, createCategory, Category } from '../services/categoryService';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await getCategories();
    if (response.status && response.data) {
      setCategories(response.data);
    } else {
      setError(response.message || 'Error loading categories');
    }
    setLoading(false);
  };

  const addCategory = async (name: string): Promise<boolean> => {
    const response = await createCategory(name);
    if (response.status && response.data) {
      setCategories([...categories, response.data]);
      return true;
    }
    return false;
  };

  return { categories, loading, error, addCategory };
};