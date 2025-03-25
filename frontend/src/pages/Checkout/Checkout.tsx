// pages/Checkout/Checkout.tsx
import React, { useState } from 'react';
import * as S from './Checkout.styles';

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  paymentMethod: 'creditCard' | 'paypal'; // Example payment methods
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}

const Checkout: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    paymentMethod: 'creditCard', // Default payment method
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would:
    // 1. Validate the form data.
    // 2. Send the order data to your backend (using a service, like orderService.ts).
    // 3. The backend would handle:
    //    - Creating an order in the database.
    //    - Processing the payment (integrating with Stripe, PayPal, etc.).
    //    - Decrementing product stock.
    //    - Sending confirmation emails.
    // 4. Redirect the user to a confirmation page or show a success message.

    console.log('Form Data:', formData); // Replace with actual submission logic
    alert('Order placed successfully! (Placeholder)'); // Replace with a real confirmation
  };

  return (
    <S.CheckoutContainer>
      <S.CheckoutTitle>Checkout</S.CheckoutTitle>
      <S.CheckoutForm onSubmit={handleSubmit}>
        <S.FormGroup>
          <S.Label htmlFor="firstName">First Name:</S.Label>
          <S.Input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label htmlFor="lastName">Last Name:</S.Label>
          <S.Input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label htmlFor="address">Address:</S.Label>
          <S.Input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label htmlFor="city">City:</S.Label>
          <S.Input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label htmlFor="state">State:</S.Label>
          <S.Input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </S.FormGroup>

        <S.FormGroup>
          <S.Label htmlFor="zip">ZIP Code:</S.Label>
          <S.Input
            type="text"
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            required
          />
        </S.FormGroup>
        <S.FormGroup>
          <S.Label htmlFor="email">Email:</S.Label>
          <S.Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </S.FormGroup>

        <S.FormGroup>
            <S.Label htmlFor='paymentMethod'>Payment Method</S.Label>
            <S.Select
                id='paymentMethod'
                name='paymentMethod'
                value={formData.paymentMethod}
                onChange={handleChange}
                required
            >
               <option value='creditCard'>Credit Card</option>
               <option value='paypal'>PayPal</option>
            </S.Select>
        </S.FormGroup>

        {formData.paymentMethod === 'creditCard' && (
            <>
            <S.FormGroup>
                <S.Label htmlFor='cardNumber'>Card Number</S.Label>
                <S.Input
                 type='text'
                 id='cardNumber'
                 name='cardNumber'
                 value={formData.cardNumber}
                 onChange={handleChange}
                 required
                />
            </S.FormGroup>
            <S.FormGroup>
              <S.Label htmlFor="expiryDate">Expiry Date:</S.Label>
              <S.Input
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
                required
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label htmlFor="cvv">CVV:</S.Label>
              <S.Input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                required
              />
            </S.FormGroup>
            </>
        )}

        <S.SubmitButton type="submit">Place Order</S.SubmitButton>
      </S.CheckoutForm>
    </S.CheckoutContainer>
  );
};

export default Checkout;