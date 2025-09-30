import React from 'react';
import AdressImg from '../assets/Location.png';
import ShippingImg from '../assets/Shipping.png';
import PaymentImg from '../assets/Payment.png';
import '../styles/checkoutsteps.css';

interface CheckoutStepsProps {
  activeStep: 'address' | 'shipping' | 'payment';
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ activeStep }) => {
  return (
    <div className="steps">
      <div className={`step ${activeStep === 'address' ? 'step-active' : ''}`}>
        <div className="step-content">
          <img src={AdressImg} alt="Address" className="step-icon" />
          <div>
            Step 1<br /><span>Address</span>
          </div>
        </div>
      </div>

      <div className={`step ${activeStep === 'shipping' ? 'step-active' : ''}`}>
        <div className="step-content">
          <img src={ShippingImg} alt="Shipping" className="step-icon" />
          <div>
            Step 2<br /><span>Shipping</span>
          </div>
        </div>
      </div>

      <div className={`step ${activeStep === 'payment' ? 'step-active' : ''}`}>
        <div className="step-content">
          <img src={PaymentImg} alt="Payment" className="step-icon" />
          <div>
            Step 3<br /><span>Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
