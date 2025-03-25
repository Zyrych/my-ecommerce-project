// pages/Cart/Cart.styles.ts
import styled from 'styled-components';

export const CartContainer = styled.div`
  padding: 20px;
`;

export const CartTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const EmptyCartMessage = styled.p`
  font-size: 16px;
`;

export const CartItems = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CartItem = styled.div`
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
`

export const ItemQuantity = styled.p`
  font-size: 16px;
  margin-bottom: 5px;
  input {
    width: 40px;
    text-align: center;
    margin-left: 5px;
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

export const CartSummary = styled.div`
  margin-top: 20px;
  text-align: right;
`;

export const Total = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const CheckoutButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;