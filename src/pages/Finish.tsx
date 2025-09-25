// src/pages/Finish.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/finish.css'; // Importa o CSS

interface FinishProps {
  success: boolean;
}

const Finish: React.FC<FinishProps> = ({ success }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="finish-container">
      {success ? (
        <>
          <h1 className="success">🎉 Tudo certo com a compra!</h1>
          <p>Obrigado por comprar conosco. Seu pedido foi finalizado com sucesso.</p>
        </>
      ) : (
        <>
          <h1 className="error">⚠️ Ocorreu um erro ao finalizar a compra</h1>
          <p>Por favor, tente novamente mais tarde ou entre em contato com o suporte.</p>
        </>
      )}

      <button onClick={handleGoHome} className="finish-button">
        Voltar para Home
      </button>
    </div>
  );
};

export default Finish;
