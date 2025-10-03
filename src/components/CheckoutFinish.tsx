import React from 'react';
import '../styles/address.css'; 

interface CheckoutFinishProps {
  onBack: () => void;
  onNext: () => void;
  
  purchaseSuccess: boolean;
}

const CheckoutFinish: React.FC<CheckoutFinishProps> = ({ onBack, onNext, purchaseSuccess }) => {
  

  return (
    <footer className="footer-back-next">
      <button onClick={onBack} className="backButton">
        Back
      </button>

      
      {!purchaseSuccess && (
        <button onClick={onNext} className="payButton">
          Pay
        </button>
      )}
    </footer>
  );
};

export default CheckoutFinish;
