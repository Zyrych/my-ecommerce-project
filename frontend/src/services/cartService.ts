// src/services/cartService.ts
import axios from 'axios';
import { CartItem } from '../types/CartItem'; // Assuming you have this type

// Ensure this is correct and accessible (usually from .env)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const cartService = {
  async addItemToCart(productId: number, quantity: number): Promise<CartItem> {
    console.log(`cartService.addItemToCart called: productId=${productId}, quantity=${quantity}`); // Keep logs for now
    const response = await axios.post<CartItem>(`${API_BASE_URL}/api/cart`, { productId, quantity });
    return response.data;
  },

  async getCartItems(): Promise<CartItem[]> { // <<< FIX: Return array promise
    console.log('cartService.getCartItems called');
    try {
      const response = await axios.get<CartItem[]>(`${API_BASE_URL}/api/cart`); // <<< FIX: Expect array
      console.log('Received cart items:', response.data); // Optional log
      // Add runtime check just in case backend ever changes unexpectedly
      if (!Array.isArray(response.data)) {
        console.error("Data received from GET /api/cart is not an array:", response.data);
        // Depending on requirements, either throw or return empty
        throw new Error("Invalid data format received from server (expected array)");
        // return [];
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching cart items:', error);
      throw error; // Re-throw error to be caught by the thunk
      // return []; // Or return empty array if preferred error handling
    }
  },

  async updateCartItemQuantity(productId: number, quantity: number): Promise<CartItem> {
    console.log(`cartService.updateCartItemQuantity called: productId=${productId}, quantity=${quantity}`); // Keep logs for now
    // --- CORRECT THIS LINE ---
    const response = await axios.put<CartItem>(`${API_BASE_URL}/api/cart/${productId}`, { quantity });
    // --- Ensure it uses backticks ` ` and ${productId} ---
    return response.data;
  },

  async removeItemFromCart(productId: number): Promise<void> {
    console.log(`cartService.removeItemFromCart called: productId=${productId}`); // Keep logs for now
    // --- CORRECT THIS LINE ---
    await axios.delete(`${API_BASE_URL}/api/cart/${productId}`);
    // --- Ensure it uses backticks ` ` and ${productId} ---
  }
};