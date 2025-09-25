// src/components/finish/FinishWrapper.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Finish from '../../pages/Finish';

const FinishWrapper: React.FC = () => {
  const location = useLocation();
  // Pega o estado enviado na navegação ou assume false como default
  const success = location.state?.success ?? false;

  return <Finish success={success} />;
};

export default FinishWrapper;
