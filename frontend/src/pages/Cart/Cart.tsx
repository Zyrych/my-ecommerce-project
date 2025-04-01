// pages/Cart/Cart.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchCartItems, selectCartItems, selectCartStatus } from '../../store/slices/cartSlice';
// --- Import product actions and selectors ---
import { fetchProducts, selectAllProducts, selectProductStatus } from '../../store/slices/productsSlice';
import * as S from './Cart.styles';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader'; // Ensure correct path
import CartItem from '../../components/CartItem'; // Ensure correct path
import { RootState } from '../../store/store'; // Keep RootState if needed elsewhere, though useAppSelector handles it

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartStatus = useAppSelector(selectCartStatus); // Use a more descriptive name
  const products = useAppSelector(selectAllProducts);
  const productStatus = useAppSelector(selectProductStatus); // Get product loading status

  // --- Effect to fetch cart items ---
  useEffect(() => {
    // Optionally check cartStatus if you don't want to refetch constantly
    // if (cartStatus === 'idle') {
         dispatch(fetchCartItems());
    // }
  }, [dispatch]); // Removed cartStatus dependency unless you want conditional fetching

  // --- ADDED: Effect to fetch products if needed ---
  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  const calculateTotal = () => {
    // Ensure products are loaded before calculating
    if (productStatus !== 'succeeded') {
      return 0; // Or handle appropriately
    }
    return cartItems.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  // --- UPDATED: Check loading status for BOTH cart and products ---
  if (cartStatus === 'loading' || productStatus === 'loading') {
    return <Loader />;
  }

  // Optional: Add error handling
  if (cartStatus === 'failed') {
      return <div>Error loading cart items.</div>
  }
   if (productStatus === 'failed') {
      return <div>Error loading product details for cart.</div>
  }


  // Only proceed to render if both cart and products have succeeded
  if (cartStatus === 'succeeded' && productStatus === 'succeeded') {
      return (
        <S.CartContainer>
          <S.CartTitle>Your Shopping Cart</S.CartTitle>
          {cartItems.length === 0 ? (
            <S.EmptyCartMessage>Your cart is empty.</S.EmptyCartMessage>
          ) : (
            <>
              <S.CartItems>
                {cartItems.map((item) => {
                  // Lookup should now work as products are loaded
                  const product = products.find((p) => p.id === item.productId);
                  // It's still good practice to handle the case where product might somehow not be found
                  if (!product) {
                     // Optionally render a placeholder or log an error for this specific item
                     console.error(`Product details not found for cart item productId: ${item.productId}`);
                     return null; // Or render a specific error state for this item
                  }
                  return (
                    <CartItem key={item.productId} item={item} product={product} />
                  );
                })}
              </S.CartItems>
              <S.CartSummary>
                <S.Total>Total: ${calculateTotal().toFixed(2)}</S.Total>
                <Link to="/checkout">
                  <S.CheckoutButton>Proceed to Checkout</S.CheckoutButton>
                </Link>
              </S.CartSummary>
            </>
          )}
        </S.CartContainer>
      );
  }

  // Fallback return if statuses are not loading or succeeded (e.g., initial idle before effects run)
  // Or handle 'failed' states more explicitly above
  return <Loader />; // Or null, or a more specific message
};

export default Cart;