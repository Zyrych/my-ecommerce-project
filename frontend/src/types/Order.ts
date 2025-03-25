export interface Order {
    id: number;
    userId: number;
    orderDate: Date;
    totalAmount: number;
    status: string //e.g., 'pending', 'shipped', 'delivered'
    items: OrderItem[];
  }

  export interface OrderItem {
    productId: number;
    quantity: number;
    price: number; //Price at the time of the order
  }