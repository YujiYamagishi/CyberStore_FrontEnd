import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAddress } from '../../context/AdressContext';
import '../../../styles/payment.css';

interface PaymentProps {
  cardholderName: string;
  setCardholderName: (val: string) => void;
  cardNumber: string;
  setCardNumber: (val: string) => void;
  expDate: string;
  setExpDate: (val: string) => void;
  cvv: string;
  setCvv: (val: string) => void;
  shippingMethod: string;
}

const Payment: React.FC<PaymentProps> = ({
  cardholderName, setCardholderName,
  cardNumber, setCardNumber,
  expDate, setExpDate,
  cvv, setCvv,
  shippingMethod
}) => {
  const { cart } = useCart();
  const { selectedAddress } = useAddress();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit-card');

  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const estimatedTax = 50;


  const estimatedShipping = shippingMethod === 'express' ? 29 : 0;
  const total = subtotal + estimatedTax + estimatedShipping;

  return (
    <div className="payment-content-wrapper">
      <div className="summarySection">
        <h3 className="section-title">Summary</h3>
        <div className="summaryItems">
          {cart.items.map(item => (
            <div key={item.id} className="summaryItem">
              {/* Ajuste o caminho da imagem se necessário. */}
              <img src={item.image} alt={item.name} /> 
              <span className="summaryItemName">{item.name}</span>
              <span className="summaryItemPrice">
                ${(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 0 })}
              </span>
            </div>
          ))}
        </div>

        <div className="summaryDetails">
          <div className="detailRow">
            <span className="detailLabel">Address</span>
            <span className="detailValue">
              {selectedAddress
                ? `${selectedAddress.title} - ${selectedAddress.address} (${selectedAddress.phone})`
                : 'No address selected'}
            </span>
          </div>
          <div className="detailRow">
            <span className="detailLabel">Shipment method</span>
            <span className="detailValue">
              {shippingMethod === 'regular' ? 'Free (Regular shipment)'
               : shippingMethod === 'express' ? '$29 (Express shipment)'
               : shippingMethod === 'schedule' ? 'Schedule shipment'
               : 'Unknown'}
            </span>
          </div>
        </div>

        <div className="summaryTotals">
          <div className="totalRow">
            <span className="totalLabel">Subtotal</span>
            <span className="totalValue">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 0 })}</span>
          </div>
          <div className="totalRow">
            <span className="totalLabel">Estimated Tax</span>
            <span className="totalValue">${estimatedTax}</span>
          </div>
          <div className="totalRow">
            <span className="totalLabel">Estimated Shipping & Handling</span>
            <span className="totalValue">${estimatedShipping}</span>
          </div>
          <div className="totalRow total-final">
            <h3 className="totalLabel">Total</h3>
            <h3 className="totalValue">${total.toLocaleString('en-US', { minimumFractionDigits: 0 })}</h3>
          </div>
        </div>
      </div>

      <div className="paymentSection">
        <h3 className="section-title">Payment</h3>
        <div className="paymentMethodsTabs">
          <button className={selectedPaymentMethod === 'credit-card' ? 'active' : ''} onClick={() => setSelectedPaymentMethod('credit-card')}>Credit Card</button>
          <button className={selectedPaymentMethod === 'paypal' ? 'active' : ''} onClick={() => setSelectedPaymentMethod('paypal')}>PayPal</button>
          <button className={selectedPaymentMethod === 'paypal-credit' ? 'active' : ''} onClick={() => setSelectedPaymentMethod('paypal-credit')}>PayPal Credit</button>
        </div>

        {selectedPaymentMethod === 'credit-card' && (
          <div className="creditCardForm">
            <div className="creditCardDisplay">
              <div className="card-diagonal-line-1"></div>
              <div className="card-diagonal-line-2"></div>
              <div className="card-logo-bottom-right"></div>
              <div></div>
              <div>
                <div className="cardNumber-animated">{cardNumber.padEnd(16, '•')}</div>
                <div className="cardholderName-animated">{cardholderName.toUpperCase() || 'CARDHOLDER NAME'}</div>
              </div>
            </div>

            <input
              type="text"
              placeholder="Cardholder Name"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
            />
            <input
              type="text"
              inputMode="numeric"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
              maxLength={16}
            />
            <div className="expiryCvv">
              <input
                type="text"
                inputMode="numeric"
                placeholder="Exp Date (MM/YY)"
                value={expDate}
                onChange={(e) => {
                  let onlyNums = e.target.value.replace(/\D/g, '');
                  if (onlyNums.length > 4) onlyNums = onlyNums.slice(0, 4);
                  if (onlyNums.length >= 3) onlyNums = onlyNums.slice(0, 2) + '/' + onlyNums.slice(2);
                  setExpDate(onlyNums);
                }}
                maxLength={5}
              />
              <input
                type="text"
                inputMode="numeric"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                maxLength={3}
              />
            </div>
            <label className="sameBilling"><input type="checkbox" /> Same as billing address</label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
