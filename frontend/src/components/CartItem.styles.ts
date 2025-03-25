// components/CartItem/CartItem.styles.ts
import styled from 'styled-components';

export const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
`;

export const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 20px;
`;

export const ItemDetails = styled.div`
  flex: 1;
`;

export const ItemName = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
`;

export const ItemPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
    margin-bottom: 5px;
`;

export const ItemQuantity = styled.p`
    font-size: 16px;
    margin-bottom: 5px;
    input {
      width: 40px;
      text-align: center;
      margin-left: 5px
    }
`;

export const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;