// CheckoutFooter.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/address.css';

interface CheckoutFooterProps {
  onBack: () => void;
  onNext: () => void;
}

const CheckoutFooter: React.FC<CheckoutFooterProps> = ({ onBack, onNext }) => {
  return (
    <footer className="footer-back-next">
      <button onClick={onBack} className="backButton">
        Back
      </button>
      <button onClick={onNext} className="nextButton">
        Next
      </button>
    </footer>
  );
};

export default CheckoutFooter;