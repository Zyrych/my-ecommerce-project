// backend/src/index.ts
import express, { Request, Response, NextFunction } from 'express'; // Import types
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';
import categoryRoutes from './routes/categoryRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// CORS Middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// JSON Body Parser Middleware
app.use(express.json());

// --- Routes ---
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/categories', categoryRoutes);

// --- Error Handling Middleware (Must be after routes) ---
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error
  res.status(500).json({ message: 'Internal Server Error', error: String(err) }); // Send error response
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});