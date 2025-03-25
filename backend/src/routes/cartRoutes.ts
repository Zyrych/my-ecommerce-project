// backend/src/routes/cartRoutes.ts
import express from 'express';
import {
  addItemToCart,
  getCartItems,
  updateCartItemQuantity,
  removeItemFromCart,
} from '../controllers/cartController';

const router = express.Router();

// Route to add an item to the cart
router.post('/', addItemToCart);

// Route to get all cart items
router.get('/', getCartItems);

// Route to update the quantity of a cart item (Corrected: Added type annotation)
router.put<{ productId: string }>('/:productId', updateCartItemQuantity);

// Route to remove an item from the cart (Corrected: Added type annotation)
router.delete<{ productId: string }>('/:productId', removeItemFromCart);

export default router;
