import React from 'react';
import '../../styles/address.css';
import '../../styles/shipping.css';

interface ShippingProps {
  selectedMethod: string;
  setSelectedMethod: (method: string) => void;
}

const Shipping: React.FC<ShippingProps> = ({ selectedMethod, setSelectedMethod }) => {
  return (
    <div className="pageContainer">


      <div className="shippingMethods">
        <h2>Shipment Method</h2>
        <div
          className={`shippingCard ${selectedMethod === 'regular' ? 'selected' : ''}`}
          onClick={() => setSelectedMethod('regular')}
        >
          <input type="radio" checked={selectedMethod === 'regular'} readOnly />
          <div>
            <div className="methodTitle">
              Free <span className="methodType">Regular shipment</span>
            </div>
            <div className="methodDate">17 Oct, 2023</div>
          </div>
        </div>

        <div
          className={`shippingCard ${selectedMethod === 'express' ? 'selected' : ''}`}
          onClick={() => setSelectedMethod('express')}
        >
          <input type="radio" checked={selectedMethod === 'express'} readOnly />
          <div>
            <div className="methodTitle">
              $29 <span className="methodDescription">Get your delivery as soon as possible</span>
            </div>
            <div className="methodDate">1 Oct, 2023</div>
          </div>
        </div>

        <div
          className={`shippingCard ${selectedMethod === 'schedule' ? 'selected' : ''}`}
          onClick={() => setSelectedMethod('schedule')}
        >
          <input type="radio" checked={selectedMethod === 'schedule'} readOnly />
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
