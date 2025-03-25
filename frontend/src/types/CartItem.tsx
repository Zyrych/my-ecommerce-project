export interface CartItem {
    productId: number; // Link to Product
    quantity: number;
    // You *could* include product details here (name, price),
    // but it's generally better to fetch those from the /products endpoint
    // when needed to avoid data duplication and inconsistency.
  }