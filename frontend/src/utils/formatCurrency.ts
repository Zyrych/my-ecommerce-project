// utils/formatCurrency.ts
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD', // Or your desired currency
    }).format(amount);
  };