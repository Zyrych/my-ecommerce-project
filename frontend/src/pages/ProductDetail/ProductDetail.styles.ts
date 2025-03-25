// pages/ProductDetail/ProductDetail.styles.ts
import styled from 'styled-components';

export const ProductContainer = styled.div`
  display: flex;
  padding: 20px;
`;

export const Image = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  margin-right: 20px;
`;

export const Details = styled.div`
  flex: 1;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const Price = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  margin-bottom: 20px;
`;

 export const QuantityInput = styled.input`
    width: 60px;
    padding: 8px;
    margin-right: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
 `

export const AddToCartButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;