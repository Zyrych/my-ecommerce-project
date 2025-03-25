// components/ProductCard/ProductCard.styles.ts
import styled from 'styled-components';

export const Card = styled.div`
  border: 1px solid #ddd;
  padding: 1rem;
  width: 250px;
  margin: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column; // Stack elements vertically
  align-items: center;     // Center items horizontally
`;

export const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 0.5rem;
  border-radius: 4px; // Optional: Rounded corners for the image
`;

export const Title = styled.h3`
  margin-bottom: 0.5rem;
  text-align: center; // Center the title
  font-size: 1.1rem; // Slightly larger font size
`;

export const Price = styled.p`
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #28a745; // A green color for price, often used in e-commerce
  font-size: 1rem;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%; // Make the button fill the width
  margin-top: auto; // Push the button to the bottom

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc; // Gray out when disabled
    cursor: not-allowed;
  }
`;