import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; 
import CheckoutSteps from '../components/CheckoutSteps';
import CheckoutFooter from '../components/CheckoutFooter';
import Shipping from '../components/shipping/Shipping';
import '../styles/address.css';

const ShippingPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('');
  
  const handleBack = () => navigate('/address');
  
const handleNext = () => {
  if (!selectedMethod) {
    console.log("next clicado");
    toast.error("Please select a shipping method to continue.", {
      style: {background: '#dc3545', color: '#fff', fontWeight: 500}, 
      iconTheme: {
        primary: '#ef4444',
        secondary: '#fee2e2',
      },
      position: 'bottom-right',
    });
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
      <CheckoutFooter onBack={handleBack} onNext={handleNext}/>
    </div>
  );
};

export default ShippingPage;
