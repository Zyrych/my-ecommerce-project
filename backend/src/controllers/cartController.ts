import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Add an item to the cart
export const addItemToCart = async (req: Request<{}, {}, { productId: string; quantity: string }>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity == null || parseInt(quantity) <= 0) {
      res.status(400).json({ message: 'Invalid request body' });
      return;
    }

    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    // Check for existing cart item
    const existingCartItem = await prisma.cartItem.findFirst({
      where: { productId: parseInt(productId) },
    });

    if (existingCartItem) {
      // Update existing item
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + parseInt(quantity) },
      });
      res.json(updatedItem);
    } else {
      // Create new cart item
      const newCartItem = await prisma.cartItem.create({
        data: {
          productId: parseInt(productId),
          quantity: parseInt(quantity),
        },
      });
      res.status(201).json(newCartItem);
    }
  } catch (error) {
    next(error);
  }
};

// Get all items in the cart
export const getCartItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      include: { product: true },
    });
    res.json(cartItems);
  } catch (error) {
    next(error);
  }
};

// Update the quantity of a cart item
export const updateCartItemQuantity = async (req: Request<{ productId: string }, {}, { quantity: string }>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || parseInt(quantity) <= 0) {
      res.status(400).json({ message: 'Invalid quantity' });
      return;
    }

    // Check if the item is already in the cart
    const existingCartItem = await prisma.cartItem.findFirst({
      where: { productId: parseInt(productId) },
    });

    if (!existingCartItem) {
      res.status(404).json({ message: 'Cart item not found' });
      return;
    }

    const updatedCartItem = await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: parseInt(quantity) },
    });

    res.json(updatedCartItem);
  } catch (error) {
    next(error);
  }
};

// Remove an item from the cart
export const removeItemFromCart = async (req: Request<{ productId: string }, {}, {}>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { productId } = req.params;

    // Check if the item is already in the cart
    const existingCartItem = await prisma.cartItem.findFirst({
      where: { productId: parseInt(productId) },
    });

    if (!existingCartItem) {
      res.status(404).json({ message: 'Cart item not found' });
      return;
    }

    await prisma.cartItem.delete({
      where: { id: existingCartItem.id },
    });

    res.json({ message: 'Cart item removed successfully' });
  } catch (error) {
    next(error);
  }
};
