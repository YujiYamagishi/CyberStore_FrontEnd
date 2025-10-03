import React from 'react';
import { useLocation } from 'react-router-dom';
import Finish from '../../pages/Finish';

const FinishWrapper: React.FC = () => {
  const location = useLocation();
  
  const success = location.state?.success ?? false;

  return <Finish success={success} />;
};

export default FinishWrapper;
