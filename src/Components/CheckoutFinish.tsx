// src/components/CheckoutFinish.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/address.css';

interface CheckoutFinishProps {
  onBack: () => void;
  purchaseSuccess?: boolean; // opcional, pode definir sucesso ou erro
}

const CheckoutFinish: React.FC<CheckoutFinishProps> = ({ onBack, purchaseSuccess = true }) => {
  const navigate = useNavigate();

  const handlePayClick = () => {
    // Navega para finish passando o estado com sucesso ou erro
    navigate('/finish', { state: { success: purchaseSuccess } });
  };

  return (
    <footer className="footer-back-next">
      <button onClick={onBack} className="backButton">
        Back
      </button>
      <button onClick={handlePayClick} className="payButton">
        Pay
      </button>
    </footer>
  );
};

export default CheckoutFinish;
