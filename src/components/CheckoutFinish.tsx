import React from 'react';
import '../../styles/address.css'; // Mantenho a importação, assumindo que contém estilos de footer.

interface CheckoutFinishProps {
  onBack: () => void;
  onNext: () => void;
  // CORREÇÃO: Adicionando a propriedade 'purchaseSuccess' que estava faltando
  purchaseSuccess: boolean;
}

const CheckoutFinish: React.FC<CheckoutFinishProps> = ({ onBack, onNext, purchaseSuccess }) => {
  // Nota: A lógica de Pay Button ou de exibição de sucesso/erro depende da prop 'purchaseSuccess'.
  // Se 'purchaseSuccess' for true, o botão 'Pay' não deve aparecer.

  return (
    <footer className="footer-back-next">
      <button onClick={onBack} className="backButton">
        Back
      </button>

      {/* Exibir o botão 'Pay' somente se a compra ainda não tiver sido concluída */}
      {!purchaseSuccess && (
        <button onClick={onNext} className="payButton">
          Pay
        </button>
      )}
    </footer>
  );
};

export default CheckoutFinish;
