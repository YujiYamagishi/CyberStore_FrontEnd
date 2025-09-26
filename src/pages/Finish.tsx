// src/pages/Finish.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/finish.css'; 

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
          <h1 className="success">🎉 Everything is fine with the purchase!</h1>
          <p>Thank you for shopping with us. Your order has been successfully completed.</p>
        </>
      ) : (
        <>
          <h1 className="error">⚠️ An error occurred while completing the purchase</h1>
          <p>Please try again later or contact support.</p>
        </>
      )}

      <button onClick={handleGoHome} className="finish-button">
        Return to Home
      </button>
    </div>
  );
};

export default Finish;
