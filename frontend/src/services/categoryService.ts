import axios from 'axios';
import { Category } from '../types/Category';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const categoryService = {
  async getAllCategories(): Promise<Category[]> {
    const response = await axios.get<Category[]>(`${API_BASE_URL}/api/categories`);
    return response.data;
  },
  // ... other category-related methods
};