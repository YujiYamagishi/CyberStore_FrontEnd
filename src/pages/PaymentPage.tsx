// src/pages/PaymentPage.tsx

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CheckoutFinish from '../Components/CheckoutFinish';
import CheckoutSteps from '../Components/CheckoutSteps';
import Payment from '../Components/payment/Payment';
import { useCart } from '../context/CartContext';
import '../styles/payment.css';

interface LocationState {
  shippingMethod?: string;
}

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();

  const state = location.state as LocationState;
  const shippingMethod = state?.shippingMethod;
  
  // Garante que a página não seja acessada sem um método de envio
  if (!shippingMethod) {
    navigate('/shipping', { replace: true });
    return null;
  }

  const handleBack = () => navigate('/shipping');

  // Lógica centralizada para finalizar a compra
  const handleNext = async () => {
    try {
      console.log("Processando pagamento...");
      // 1. Limpa o carrinho
      await clearCart();
      // 2. Navega para a página de sucesso
      navigate('/finish', { state: { success: true } });
    } catch (error) {
      console.error("Falha no processo de pagamento ou limpeza do carrinho:", error);
      alert("Houve um erro ao processar sua compra. Por favor, tente novamente.");
    }
  };

  return (
    <div className="page-wrapper-for-centering">
        <div className="pageContainer">
            <main className="mainContent">
                <CheckoutSteps activeStep="payment" />
                <div className="payment-page-container">
                    <Payment />
                </div>
            </main>
            <div className="footer-back-next">
                {/* Passa as funções de controle para o componente filho */}
                <CheckoutFinish onBack={handleBack} onNext={handleNext} />
            </div>
        </div>
    </div>
  );
};

export default PaymentPage;