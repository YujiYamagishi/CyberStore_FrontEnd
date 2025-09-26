import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CheckoutFinish from '../Components/CheckoutFinish';
import CheckoutSteps from '../Components/CheckoutSteps';
import Payment from '../Components/payment/Payment';
import '../styles/payment.css';

interface LocationState {
  shippingMethod?: string;
}

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  // Protege caso não tenha vindo do ShippingPage
  const shippingMethod = state?.shippingMethod;
  if (!shippingMethod) {
    // Redireciona de volta para shipping se acessar direto
    navigate('/shipping', { replace: true });
    return null;
  }

  const handleBack = () => navigate('/shipping');

  const handleNext = () => {
    alert(`Payment processed! Shipping method: ${shippingMethod}`);
    navigate('/finish', { state: { success: true } });
  };

  return (
    <div className="pageContainer">
      <main className="mainContent">
        <CheckoutSteps activeStep="payment" />
        <Payment />
      </main>
      <CheckoutFinish onBack={handleBack} onNext={handleNext} />
    </div>
  );
};

export default PaymentPage;
