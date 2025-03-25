// pages/Home/Home.tsx
import React, { useEffect } from 'react';
//import { useDispatch, useSelector } from 'react-redux';  NO
import { useAppDispatch, useAppSelector } from '../../store/store'; //YES
import { fetchProducts, selectAllProducts, selectProductStatus } from '../../store/slices/productsSlice';
import ProductCard from '../../components/ProductCard';
import Loader from '../../components/Loader';
import * as S from './Home.styles'; // Import styled components

const Home: React.FC = () => {
  //const dispatch = useDispatch();  NO
  //const products = useSelector(selectAllProducts);  NO
  //const productStatus = useSelector(selectProductStatus) NO

  const dispatch = useAppDispatch(); //YES
  const products = useAppSelector(selectAllProducts); //YES
  const productStatus = useAppSelector(selectProductStatus); //YES

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