// ShippingPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../Components/CheckoutSteps';
import CheckoutFooter from '../Components/CheckoutFooter';
import Shipping from '../Components/shipping/Shipping'; // Importe o novo componente

import '../styles/address.css'; // Mantenha a importação do CSS

const ShippingPage: React.FC = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate('/address');
  const handleNext = () => navigate('/payment');

  return (
    <div className="pageContainer">
      <main className="mainContent">
        <CheckoutSteps activeStep="shipping" />
        <Shipping /> {/* Renderize o componente aqui */}
      </main>
      <CheckoutFooter onBack={handleBack} onNext={handleNext} />
    </div>
  );
};

export default ShippingPage;