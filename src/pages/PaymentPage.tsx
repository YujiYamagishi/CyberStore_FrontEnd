// PaymentPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutFinish from '../Components/CheckoutFinish';
import CheckoutSteps from '../Components/CheckoutSteps';
import Payment from '../Components/payment/Payment'; // Importe o componente de conte\u00FAdo
import '../styles/payment.css'; // Mantenha a importação do CSS

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => navigate('/shipping');
  const handleNext = () => {
    alert("Pagamento processado!");
    // Lógica para finalizar a compra
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