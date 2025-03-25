import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';
import { productService } from '../../services/productService';
import { RootState } from '../store';

interface ProductsState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: null,
};

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const products = await productService.getAllProducts();
    return products;
  }
);
 // Async thunk for fetching products by ID
 export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id: number, {rejectWithValue}) => {
        try {
            const product = await productService.getProductById(id);
            return product;
        } catch (error) {
            return rejectWithValue("Failed to fetch product")
        }
    }
 )

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.status = 'succeeded';
        const index = state.products.findIndex(product => product.id === action.payload.id)
        if(index !== -1) {
            state.products[index] = action.payload;
        } else {
            state.products.push(action.payload)
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product';

      })
  },
});

export const selectAllProducts = (state:RootState) => state.products.products;
export const selectProductById = (state: RootState, productId: number) => state.products.products.find((p) => p.id === productId);
export const selectProductStatus = (state: RootState) => state.products.status;
export default productsSlice.reducer;