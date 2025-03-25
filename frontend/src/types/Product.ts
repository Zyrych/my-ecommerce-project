export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    categoryId: number; // Or string, depending on your backend
    // Add any other fields: stockQuantity, rating, reviews, etc.
  }