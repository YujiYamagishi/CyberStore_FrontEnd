// src/pages/ShippingPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../Components/CheckoutSteps';
import CheckoutFooter from '../Components/CheckoutFooter';
import Shipping from '../Components/shipping/Shipping';
import '../styles/address.css';

const ShippingPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('');
  const handleBack = () => navigate('/address');
  const handleNext = () => {
    if (!selectedMethod) {
      alert("Please select a shipping method");
      return;
    }
    navigate('/payment', { state: { shippingMethod: selectedMethod } });
  };

  return (
    <div className="pageContainer">
      <main className="mainContent">
        <CheckoutSteps activeStep="shipping" />
        <Shipping selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} />
      </main>
      <CheckoutFooter onBack={handleBack} onNext={handleNext} disabledNext={!selectedMethod} />
    </div>
  );
};

export default ShippingPage;