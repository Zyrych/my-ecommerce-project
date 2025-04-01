// pages/Home/Home.tsx
import React, { useEffect } from 'react';
//import { useDispatch, useSelector } 
import { useAppDispatch, useAppSelector } from '../../store/store'; 
import { fetchProducts, selectAllProducts, selectProductStatus } from '../../store/slices/productsSlice';
import ProductCard from '../../components/ProductCard';
import Loader from '../../components/Loader';
import * as S from './Home.styles'; 

const Home: React.FC = () => {

  const dispatch = useAppDispatch(); 
  const products = useAppSelector(selectAllProducts);
  const productStatus = useAppSelector(selectProductStatus);

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, productStatus]);

  if (productStatus === 'loading') {
    return <Loader />;
  }

  if (productStatus === 'failed') {
    return <div>Error loading products.</div>;
  }

  return (
    <S.HomeContainer>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </S.HomeContainer>
  );
};

export default Home;