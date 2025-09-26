// src/components/CheckoutFinish.tsx

import React from 'react';
import '../styles/address.css';

// Interface de props atualizada para aceitar onNext
interface CheckoutFinishProps {
  onBack: () => void;
  onNext: () => void;
}

const CheckoutFinish: React.FC<CheckoutFinishProps> = ({ onBack, onNext }) => {
  // A lógica interna de navegação (useNavigate, handlePayClick) foi removida.

  return (
    <footer className="footer-back-next">
      <button onClick={onBack} className="backButton">
        Back
      </button>
      {/* O botão "Pay" agora executa a função onNext recebida do componente pai */}
      <button onClick={onNext} className="payButton">
        Pay
      </button>
    </footer>
  );
};

export default CheckoutFinish;