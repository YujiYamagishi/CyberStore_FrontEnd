import React from 'react';
import '../styles/address.css';

interface CheckoutFooterProps {
  onBack: () => void;
  onNext: () => void;
  disabledNext?: boolean;
}

const CheckoutFooter: React.FC<CheckoutFooterProps> = ({ onBack, onNext, disabledNext }) => {
  return (
    <footer className="footer-back-next">
      <button onClick={onBack} className="backButton">
        Back
      </button>
      <button 
        onClick={onNext} 
        className="nextButton" 
        disabled={disabledNext}
      >
        Next
      </button>
    </footer>
  );
};

export default CheckoutFooter;
