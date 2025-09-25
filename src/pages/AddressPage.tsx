import React from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutFooter from '../components/CheckoutFooter';
import CheckoutSteps from '../components/CheckoutSteps';
import Address from '../components/address/address';
import '../styles/address.css';

const AddressPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/shoppingCart');
  };

  const handleNext = () => {
    navigate('/shipping');
  };

  return (
    <div className="pageContainer">
      <main className="mainContent">
        <CheckoutSteps activeStep="address" />
        <Address />
      </main>
      <CheckoutFooter onBack={handleBack} onNext={handleNext} />
    </div>
  );
};

export default AddressPage;