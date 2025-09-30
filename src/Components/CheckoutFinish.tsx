import React from 'react';
import '../styles/address.css';


interface CheckoutFinishProps {
  onBack: () => void;
  onNext: () => void;
}

const CheckoutFinish: React.FC<CheckoutFinishProps> = ({ onBack, onNext }) => {
  

  return (
    <footer className="footer-back-next">
      <button onClick={onBack} className="backButton">
        Back
      </button>
     
      <button onClick={onNext} className="payButton">
        Pay
      </button>
    </footer>
  );
};

export default CheckoutFinish;