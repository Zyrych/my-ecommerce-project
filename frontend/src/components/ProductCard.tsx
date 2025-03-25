// ProductCard.tsx
// components/ProductCard/ProductCard.tsx
import React from 'react';
import { Product } from '../types/Product';
import * as S from './ProductCard.styles';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux'; // NO! Don't import from here
import { useAppDispatch } from '../store/store'; // Import the typed hook!
import { addItemToCart } from '../store/slices/cartSlice';

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  // const dispatch = useDispatch(); // NO!
  const dispatch = useAppDispatch(); // YES! Use the typed hook

  const handleAddToCart = () => {
    dispatch(addItemToCart({ productId: product.id, quantity: 1 }));
  };

  return (
    <S.Card>
      <Link to={`/product/${product.id}`}>
        <S.Image src={product.imageUrl} alt={product.name} />
        <S.Title>{product.name}</S.Title>
      </Link>
      <S.Price>${product.price.toFixed(2)}</S.Price>
      <S.Button onClick={handleAddToCart}>Add to Cart</S.Button> {/* Add click handler */}
    </S.Card>
  );
};

export default ProductCard;