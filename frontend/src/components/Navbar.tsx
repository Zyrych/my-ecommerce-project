// components/Navbar/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './Navbar.styles';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../store/slices/cartSlice'; // Import cart selector

const Navbar: React.FC = () => {
  const cartItems = useSelector(selectCartItems)
  const cartItemCount = cartItems.length;
  return (
    <S.NavbarContainer>
      <S.Logo>
        <Link to="/">My Store</Link>
      </S.Logo>
      <S.NavLinks>
        <Link to="/">Home</Link>
        {/* <Link to="/categories">Categories</Link>  You could add a categories page */}
        <Link to="/cart">
            Cart ({cartItemCount})
        </Link>
        {/* Add links for login/register/profile if you have user accounts */}
      </S.NavLinks>
    </S.NavbarContainer>
  );
};

export default Navbar;
