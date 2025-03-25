import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all products (with optional category filtering)
export const getAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category } = req.query;
    const products = await prisma.product.findMany({
      where: category ? { category: { name: String(category) } } : undefined,
      include: { category: true },
    });
    res.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    next(error); // Propagate the error
  }
};

// Get a single product by ID
export const getProductById = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { category: true },
    });

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    next(error);
  }
};

// Create a new product
export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, description, price, imageUrl, categoryId, stockQuantity } = req.body;

    if (!name || !description || price == null || !imageUrl || categoryId == null || stockQuantity == null) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const categoryExists = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) }
    });

    if (!categoryExists) {
      res.status(400).json({ message: 'Invalid categoryId' });
      return;
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        categoryId: parseInt(categoryId),
        stockQuantity: parseInt(stockQuantity),
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Failed to create product:", error);
    next(error);
  }
};

// Update a product
export const updateProduct = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, price, imageUrl, categoryId, stockQuantity } = req.body;

    if (!name || !description || price == null || !imageUrl || categoryId == null) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const categoryExists = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) }
    });

    if (!categoryExists) {
      res.status(400).json({ message: 'Invalid categoryId' });
      return;
    }

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        categoryId: parseInt(categoryId),
        stockQuantity: parseInt(stockQuantity),
      },
    });

    res.json(updatedProduct);
  } catch (error) {
    console.error("Failed to update product:", error);
    next(error);
  }
};

// Delete a product
export const deleteProduct = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error("Failed to delete product:", error);
    next(error);
  }
};
