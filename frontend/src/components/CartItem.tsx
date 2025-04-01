// src/components/CartItem/CartItem.tsx
import React from 'react';
import { useAppDispatch } from '../store/store'; // Ensure using typed hook
import { CartItem as CartItemType } from '../types/CartItem';
import * as S from './CartItem.styles';
import { removeItemFromCart, updateCartItemQuantity } from '../store/slices/cartSlice';
import { Product } from '../types/Product';

interface Props {
  item: CartItemType;
  product: Product | undefined;
}

const CartItem: React.FC<Props> = ({ item, product }) => {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    // --- ADD THIS LOG ---
    console.log(`<<< CartItem: handleRemove called for productId: ${item.productId} >>>`);
    dispatch(removeItemFromCart(item.productId));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantityStr = e.target.value;
    // --- ADD THIS LOG ---
    console.log(`<<< CartItem: handleQuantityChange called for productId: ${item.productId}, new value: ${newQuantityStr} >>>`);
    const newQuantity = parseInt(newQuantityStr, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      // --- ADD THIS LOG ---
      console.log(`<<< CartItem: Dispatching updateCartItemQuantity - productId: ${item.productId}, quantity: ${newQuantity} >>>`);
      dispatch(updateCartItemQuantity({ productId: item.productId, quantity: newQuantity }));
    } else {
      // --- ADD THIS LOG (Optional, but good) ---
      console.warn(`<<< CartItem: Invalid quantity input: ${newQuantityStr} >>>`);
    }
  };

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <S.CartItemContainer>
      <S.ItemImage src={product.imageUrl} alt={product.name} />
      <S.ItemDetails>
        <S.ItemName>{product.name}</S.ItemName>
        <S.ItemPrice>${product.price.toFixed(2)}</S.ItemPrice>
        <S.ItemQuantity>
          Quantity:
          <input
            type="number"
            min="1"
            value={item.quantity} // Ensure this reflects Redux state if needed
            onChange={handleQuantityChange} // Make sure this is correctly bound
          />
        </S.ItemQuantity>
        <S.RemoveButton onClick={handleRemove}>Remove</S.RemoveButton> {/* Make sure this is correctly bound */}
      </S.ItemDetails>
    </S.CartItemContainer>
  );
};

export default CartItem;