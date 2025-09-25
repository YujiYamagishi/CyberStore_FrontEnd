import React, { useState } from 'react';
import '../../styles/address.css';
import '../../styles/shipping.css';

const Shipping: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState('');

  return (
    <div className="pageContainer">
      <h2>Shipment Method</h2>

      <div className="shippingMethods">
        {/* Opção 1: Frete normal */}
        <div
          className={`shippingCard ${selectedMethod === 'regular' ? 'selected' : ''}`}
          onClick={() => setSelectedMethod('regular')}
        >
          <input
            type="radio"
            checked={selectedMethod === 'regular'}
            onChange={() => setSelectedMethod('regular')}
          />
          <div>
            <div className="methodTitle">
              Free <span className="methodType">Regular shipment</span>
            </div>
            <div className="methodDate">17 Oct, 2023</div>
          </div>
        </div>

        {/* Opção 2: Frete rápido */}
        <div
          className={`shippingCard ${selectedMethod === 'express' ? 'selected' : ''}`}
          onClick={() => setSelectedMethod('express')}
        >
          <input
            type="radio"
            checked={selectedMethod === 'express'}
            onChange={() => setSelectedMethod('express')}
          />
          <div>
            <div className="methodTitle">
              $29 <span className="methodDescription">Get your delivery as soon as possible</span>
            </div>
            <div className="methodDate">1 Oct, 2023</div>
          </div>
        </div>

        {/* Opção 3: Agendado */}
        <div
          className={`shippingCard ${selectedMethod === 'schedule' ? 'selected' : ''}`}
          onClick={() => setSelectedMethod('schedule')}
        >
          <input
            type="radio"
            checked={selectedMethod === 'schedule'}
            onChange={() => setSelectedMethod('schedule')}
          />
          <div>
            <div className="methodTitle">
              Schedule <span className="methodDescription">Pick a date when you want to get your delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
