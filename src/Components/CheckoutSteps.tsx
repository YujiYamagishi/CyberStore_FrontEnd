// CheckoutSteps.tsx
import React from 'react';
import '../styles/address.css';

interface CheckoutStepsProps {
  activeStep: 'address' | 'shipping' | 'payment';
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ activeStep }) => {
  return (
    <div className="steps">
      <div className={`step ${activeStep === 'address' ? 'step-active' : ''}`}>
        Step 1<br /><span>Address</span>
      </div>
      <div className={`step ${activeStep === 'shipping' ? 'step-active' : ''}`}>
        Step 2<br /><span>Shipping</span>
      </div>
      <div className={`step ${activeStep === 'payment' ? 'step-active' : ''}`}>
        Step 3<br /><span>Payment</span>
      </div>
    </div>
  );
};

export default CheckoutSteps;