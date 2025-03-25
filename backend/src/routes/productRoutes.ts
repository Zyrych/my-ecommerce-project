// backend/src/routes/productRoutes.ts
import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';

const router = express.Router();

router.get('/', getAllProducts);
// Corrected: Add type for route parameters
router.get<{ id: string }>('/:id', getProductById);
router.post('/', createProduct);
// Corrected: Add type for route parameters
router.put<{ id: string }>('/:id', updateProduct);
// Corrected: Add type for route parameters
router.delete<{ id: string }>('/:id', deleteProduct);

export default router;