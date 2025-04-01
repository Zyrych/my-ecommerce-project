import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Add an item to the cart
export const addItemToCart = async (req: Request<{}, {}, { productId: string; quantity: string }>, res: Response, next: NextFunction): Promise<void> => {
  console.log('--- ADD ITEM TO CART REQUEST ---');
  try {
    const { productId, quantity } = req.body;
    console.log(`Received addItem request: productId=${productId}, quantity=${quantity}`);

    if (!productId || quantity == null || parseInt(quantity) <= 0) {
      console.error('addItemToCart validation failed: Invalid request body');
      res.status(400).json({ message: 'Invalid request body' });
      return; // Stop execution after sending response
    }

    const productIdNum = parseInt(productId);
    const quantityNum = parseInt(quantity);

    if (isNaN(productIdNum)) {
      console.error('addItemToCart validation failed: Invalid productId format');
      res.status(400).json({ message: 'Invalid product ID format' }); // Removed 'return'
      return; // Stop execution after sending response
    }

    const product = await prisma.product.findUnique({
      where: { id: productIdNum },
    });

    if (!product) {
      console.error(`addItemToCart failed: Product not found for ID ${productIdNum}`);
      res.status(404).json({ message: 'Product not found' }); // Removed 'return'
      return; // Stop execution after sending response
    }
    console.log(`Found product: ${product.name}`);

    const existingCartItem = await prisma.cartItem.findFirst({
      where: { productId: productIdNum },
    });

    if (existingCartItem) {
      console.log(`Existing CartItem found (ID: ${existingCartItem.id}). Updating quantity.`);
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantityNum },
      });
      console.log('addItemToCart update successful:', updatedItem);
      res.json(updatedItem);
    } else {
      console.log(`No existing CartItem found for productId ${productIdNum}. Creating new item.`);
      const newCartItem = await prisma.cartItem.create({
        data: {
          productId: productIdNum,
          quantity: quantityNum,
        },
      });
      console.log('addItemToCart creation successful:', newCartItem);
      res.status(201).json(newCartItem);
    }
  } catch (error) {
    console.error("addItemToCart error:", error);
    next(error);
  }
};

// Get all items in the cart
export const getCartItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log('--- GET CART ITEMS REQUEST ---');
  try {
    const cartItems = await prisma.cartItem.findMany({
      include: { product: true },
    });
    console.log(`Workspaceed ${cartItems.length} cart items.`); // Corrected typo here
    res.json(cartItems);
  } catch (error) {
    console.error("getCartItems error:", error);
    next(error);
  }
};

// Update the quantity of a cart item
export const updateCartItemQuantity = async (req: Request<{ productId: string }, {}, { quantity: string }>, res: Response, next: NextFunction): Promise<void> => {
  console.log('--- UPDATE CART ITEM QUANTITY REQUEST ---');
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    console.log(`Received update request: productId=${productId}, quantity=${quantity}`);

    if (!quantity || !Number.isInteger(parseInt(quantity)) || parseInt(quantity) <= 0) {
      console.error('updateCartItemQuantity validation failed: Invalid quantity.');
      res.status(400).json({ message: 'Invalid quantity' });
      return; // Stop execution after sending response
    }

    const productIdNum = parseInt(productId);
    const quantityNum = parseInt(quantity);

    if (isNaN(productIdNum)) {
      console.error('updateCartItemQuantity validation failed: Invalid productId format.');
      res.status(400).json({ message: 'Invalid product ID format' }); // Removed 'return'
      return; // Stop execution after sending response
    }

    const existingCartItem = await prisma.cartItem.findFirst({
      where: { productId: productIdNum },
    });

    if (!existingCartItem) {
      console.error(`updateCartItemQuantity failed: Cart item not found for productId ${productIdNum}`);
      res.status(404).json({ message: 'Cart item not found' }); // Removed 'return'
      return; // Stop execution after sending response
    }
    console.log(`Found CartItem (ID: ${existingCartItem.id}) for productId ${productIdNum}. Attempting update.`);

    const updatedCartItem = await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: quantityNum },
    });

    console.log('updateCartItemQuantity successful:', updatedCartItem);
    res.json(updatedCartItem);
  } catch (error) {
    console.error("updateCartItemQuantity error:", error);
    next(error);
  }
};

// Remove an item from the cart
export const removeItemFromCart = async (req: Request<{ productId: string }, {}, {}>, res: Response, next: NextFunction): Promise<void> => {
  console.log('--- REMOVE CART ITEM REQUEST ---');
  try {
    const { productId } = req.params;
    console.log(`Received remove request: productId=${productId}`);

    const productIdNum = parseInt(productId);

    if (isNaN(productIdNum)) {
      console.error('removeItemFromCart validation failed: Invalid productId format.');
      res.status(400).json({ message: 'Invalid product ID format' }); // Removed 'return'
      return; // Stop execution after sending response
    }

    const existingCartItem = await prisma.cartItem.findFirst({
      where: { productId: productIdNum },
    });

    if (!existingCartItem) {
      console.error(`removeItemFromCart failed: Cart item not found for productId ${productIdNum}`);
      res.status(404).json({ message: 'Cart item not found' }); // Removed 'return'
      return; // Stop execution after sending response
    }
    console.log(`Found CartItem (ID: ${existingCartItem.id}) for productId ${productIdNum}. Attempting delete.`);

    await prisma.cartItem.delete({
      where: { id: existingCartItem.id },
    });

    console.log(`removeItemFromCart successful for CartItem ID: ${existingCartItem.id}`);
    res.json({ message: 'Cart item removed successfully' });
  } catch (error) {
    console.error("removeItemFromCart error:", error);
    next(error);
  }
};