// components/Navbar/Navbar.styles.ts
import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  background-color: #333;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;

  a {
    color: white;
    text-decoration: none;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;