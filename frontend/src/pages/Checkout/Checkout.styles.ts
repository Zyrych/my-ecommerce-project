// pages/Checkout/Checkout.styles.ts
import styled from 'styled-components';

export const CheckoutContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

export const CheckoutTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const CheckoutForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box; // Include padding and border in the element's total width and height

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Select = styled.select`
     width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    appearance: none; //Removes default OS styling

    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

export const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;