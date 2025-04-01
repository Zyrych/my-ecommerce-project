// store/slices/cartSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../types/CartItem';
import { cartService } from '../../services/cartService';
import { RootState, AppThunk } from '../store';

interface CartState {
  items: CartItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CartState = {
  items: [],
  status: 'idle',
  error: null
}

//Async thunk for adding item to cart
// Corrected:  `export` the action creator
export const addItemToCart = createAsyncThunk<
  CartItem, // Return type of the fulfilled action
  { productId: number, quantity: number }, // Argument type
  { rejectValue: string } // Optional: Type for the rejected value
>('cart/addItemToCart',
  async ({ productId, quantity }, { rejectWithValue }) => { // Notice thunkAPI
    try {
      const newItem = await cartService.addItemToCart(productId, quantity);
      return newItem;

    } catch (error: any) { // Best practice: Type the error
      return rejectWithValue(error.message || 'Failed to add item to the cart'); // Use rejectWithValue
    }
  }
);

//Async thunk to fetch cart items
// Corrected:  `export` the action creator
export const fetchCartItems = createAsyncThunk<
    CartItem[],
    void,
    {rejectValue: string}
> (
  'cart/fetchCartItems',
  async (_, {rejectWithValue}) => {
    try {
      // Call the service (keep previous explicit typing attempt for now, or remove it - focus on logging)
      const items = await cartService.getCartItems();

      // --- ADD THIS LOGGING ---
      console.log(">>> Data received in fetchCartItems thunk:", items);
      console.log(">>> Is data an array?", Array.isArray(items));
      // --- END LOGGING ---

      // Add a runtime check to be safe and provide a better error if it's not an array
      if (!Array.isArray(items)) {
         console.error(">>> fetchCartItems Error: Received data is NOT an array!", items);
         // You might want to inspect 'items' here to see its structure if it's not an array
         return rejectWithValue("Received invalid data format from server. Expected an array.");
      }

      // If the check passes, it's safe to return (TypeScript should be okay if the check is in place)
      return items as CartItem[]; // We can use 'as' here because we've checked it's an array

    } catch (error: any) {
      // Improved error message extraction
      let errorMessage = "Failed to fetch cart items";
      if (error instanceof Error) {
          errorMessage = error.message;
      } else if (error?.response?.data?.message) { // Check for Axios error structure
          errorMessage = error.response.data.message;
      } else if (typeof error === 'string') {
          errorMessage = error;
      }
      console.error("fetchCartItems Error:", error); // Log the original error too
      return rejectWithValue(errorMessage);
    }
  }
);

//Async thunk to update cart item quantity
// Corrected:  `export` the action creator
export const updateCartItemQuantity = createAsyncThunk<
  CartItem,
  {productId: number, quantity: number},
  {rejectValue: string}
> (
  'cart/updateCartItemQuantity',
  async({productId, quantity}, {rejectWithValue}) => {
    try {
      const updatedItem = await cartService.updateCartItemQuantity(productId, quantity);
      return updatedItem;
    } catch(error: any) {
      return rejectWithValue(error.message || 'Failed to update item quantity')
    }
  }
);

//Async thunk to remove item from cart
// Corrected:  `export` the action creator
export const removeItemFromCart = createAsyncThunk<
    number,
    number,
    {rejectValue: string}
> (
  'cart/removeItemFromCart',
  async(productId, {rejectWithValue}) => {
    try {
      await cartService.removeItemFromCart(productId);
      return productId;

    } catch (error:any) {
      return rejectWithValue(error.message || 'Failed to remove item from cart')
    }
  }
)


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(addItemToCart.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(addItemToCart.fulfilled, (state, action: PayloadAction<CartItem>) => { //Use PayloadAction
        state.status = 'succeeded';
        const existingItem = state.items.find(item => item.productId === action.payload.productId)
        if(existingItem){
            existingItem.quantity += action.payload.quantity;
        } else {
            state.items.push(action.payload)
        }
    })
    .addCase(addItemToCart.rejected, (state, action) => { //Use rejectedWithValue
        state.status = 'failed';
        state.error = action.payload || 'Failed to add item to cart';
    })
    .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading'
    })
    .addCase(fetchCartItems.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.status = 'succeeded';
        state.items = action.payload
    })
    .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'Failed to fetch cart items'
    })
    .addCase(updateCartItemQuantity.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(updateCartItemQuantity.fulfilled, (state, action: PayloadAction<CartItem>) => {
        state.status = 'succeeded';
        const index = state.items.findIndex((item) => item.productId === action.payload.productId);
        if(index !== -1){
          state.items[index] = action.payload
        }
    })
    .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to update cart item quantity'
    })
    .addCase(removeItemFromCart.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(removeItemFromCart.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = 'succeeded';
        state.items = state.items.filter(item => item.productId !== action.payload)
    })
    .addCase(removeItemFromCart.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Failed to remove item from cart';
    })
  }
});

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartStatus = (state: RootState) => state.cart.status;
export default cartSlice.reducer;