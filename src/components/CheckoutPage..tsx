import React from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutFinish from './CheckoutFinish';
import Payment from '../pages/PaymentPage';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <>
      <Payment />

      <CheckoutFinish onBack={handleBack} purchaseSuccess={true} onNext={() => {}} />

    </>
  );
};

export default CheckoutPage;
