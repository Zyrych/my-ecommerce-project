// pages/Cart/Cart.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchCartItems, selectCartItems, selectCartStatus } from '../../store/slices/cartSlice';
import { selectAllProducts } from '../../store/slices/productsSlice'; // Import selectAllProducts!
import * as S from './Cart.styles';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import CartItem from '../../components/CartItem';
import { RootState } from '../../store/store';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const status = useAppSelector(selectCartStatus);
  const products = useAppSelector(selectAllProducts); // Get all products!

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      // Find the product directly from the products array
      const product = products.find((p) => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  if (status === 'loading') {
    return <Loader />;
  }

  return (
    <S.CartContainer>
      <S.CartTitle>Your Shopping Cart</S.CartTitle>
      {cartItems.length === 0 ? (
        <S.EmptyCartMessage>Your cart is empty.</S.EmptyCartMessage>
      ) : (
        <>
          <S.CartItems>
            {cartItems.map((item) => {
              // Find the product directly from the products array
              const product = products.find((p) => p.id === item.productId);
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
};

export default Cart;