import axios from 'axios';
import { Product } from '../types/Product';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await axios.get<Product[]>(`${API_BASE_URL}/api/products`);
    return response.data;
  },

  async getProductById(id: number): Promise<Product> {
    const response = await axios.get<Product>(`<span class="math-inline">\{API\_BASE\_URL\}/api/products/</span>{id}`);
    return response.data;
  },

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    const response = await axios.get<Product[]>(`<span class="math-inline">\{API\_BASE\_URL\}/api/products?categoryId\=</span>{categoryId}`);
    return response.data;
  },
  // ... add more methods (search, filter, etc.)
};