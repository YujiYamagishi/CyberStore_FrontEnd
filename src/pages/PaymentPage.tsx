import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
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


  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');

  if (!shippingMethod) {
    navigate('/shipping', { replace: true });
    return null;
  }

  const handleBack = () => navigate('/shipping');

  const handleNext = async () => {
    
    if (!cardholderName || !cardNumber || !expDate || !cvv) {
      toast.error("Please fill in all credit card details before proceeding.", {
        style: { background: '#28a745', color: '#fff'},
        iconTheme: {
          primary: '#ef4444',
          secondary: '#fee2e2',
        },
        position: 'bottom-right',
      });
      return;
    }

    
    if (cardNumber.length < 16) {
      toast.error("Card number must be 16 digits.");
      return;
    }
    if (cvv.length < 3) {
      toast.error("CVV must be 3 digits.");
      return;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expDate)) {
      toast.error("Expiration date must be in MM/YY format.");
      return;
    }

    try {
      console.log("Processando pagamento...");

      await clearCart();

      navigate('/finish', { state: { success: true } });
    } catch (error) {
      console.error("Falha no processo de pagamento:", error);
      toast.error("Houve um erro ao processar sua compra. Tente novamente.");
    }
  };

  return (
    <div className="page-wrapper-for-centering">
      <div className="pageContainer">
        <main className="mainContent">
          <CheckoutSteps activeStep="payment" />
          <div className="payment-page-container">
            <Payment
              cardholderName={cardholderName}
              setCardholderName={setCardholderName}
              cardNumber={cardNumber}
              setCardNumber={setCardNumber}
              expDate={expDate}
              setExpDate={setExpDate}
              cvv={cvv}
              setCvv={setCvv}
              shippingMethod={shippingMethod}
            />
          </div>
        </main>
        <div className="footer-back-next">
          <CheckoutFinish onBack={handleBack} onNext={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
