// components/CartItem/CartItem.tsx
import React from 'react';
//import { useDispatch } from 'react-redux'; // NO!
import { useAppDispatch } from '../store/store'; // YES!
import { CartItem as CartItemType } from '../types/CartItem';
import * as S from './CartItem.styles';
import { removeItemFromCart, updateCartItemQuantity } from '../store/slices/cartSlice';
import { Product } from '../types/Product';


interface Props {
  item: CartItemType;
  product: Product | undefined;
}

const CartItem: React.FC<Props> = ({ item, product }) => {
  //const dispatch = useDispatch(); // NO!
  const dispatch = useAppDispatch(); // YES!

  const handleRemove = () => {
    dispatch(removeItemFromCart(item.productId));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      dispatch(updateCartItemQuantity({ productId: item.productId, quantity: newQuantity }));
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
            value={item.quantity}
            onChange={handleQuantityChange}
          />
        </S.ItemQuantity>
        <S.RemoveButton onClick={handleRemove}>Remove</S.RemoveButton>
      </S.ItemDetails>
    </S.CartItemContainer>
  );
};

export default CartItem;