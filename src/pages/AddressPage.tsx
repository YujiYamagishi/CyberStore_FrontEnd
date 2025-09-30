import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutFooter from '../components/CheckoutFooter';
import CheckoutSteps from '../components/CheckoutSteps';
import Address from '../components/address/Address';
import { toast } from 'react-hot-toast';
import { useAddress } from '../context/AdressContext';
import '../styles/address.css';

const AddressPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { addresses, setSelectedAddress } = useAddress();

  const handleBack = () => navigate('/shoppingCart');

  const handleNext = () => {
    if (selectedId) {
      const addr = addresses.find(a => a.id === selectedId) || null;
      setSelectedAddress(addr);
      navigate('/shipping');
    } else {
      toast('Please select an address before continuing!', {
        icon: '⚠️',
        style: { background: '#28a745', color: '#fff' },
        position: 'bottom-right',
        duration: 3000,
      });
    }
  };

  return (
    <div className="pageContainer flex flex-col min-h-screen">
      <main className="mainContent flex flex-col flex-grow justify-between">
        <div>
          <CheckoutSteps activeStep="address" />
          <Address selectedId={selectedId} onSelect={setSelectedId} />
        </div>
      </main>
      <CheckoutFooter onBack={handleBack} onNext={handleNext} />
    </div>
  );
};

export default AddressPage;
