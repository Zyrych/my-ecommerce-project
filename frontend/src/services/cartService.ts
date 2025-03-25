import axios from 'axios';
 import { CartItem } from '../types/CartItem'

 const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

 export const cartService = {
    async addItemToCart(productId: number, quantity: number): Promise<CartItem> {
        const response = await axios.post<CartItem>(`${API_BASE_URL}/api/cart`, {productId, quantity});
        return response.data
    },

    async getCartItems(): Promise<CartItem[]> {
      const response = await axios.get<CartItem[]>(`${API_BASE_URL}/api/cart`);
      return response.data
    },

    async updateCartItemQuantity(productId: number, quantity: number): Promise<CartItem> {
      const response = await axios.put<CartItem>(`<span class="math-inline">\{API\_BASE\_URL\}/api/cart/</span>{productId}`, {quantity});
      return response.data;
    },

    async removeItemFromCart(productId: number) : Promise<void> {
      await axios.delete(`<span class="math-inline">\{API\_BASE\_URL\}/api/cart/</span>{productId}`)
    }
 }