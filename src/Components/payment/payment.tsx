// src/components/payment/Payment.tsx

import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import '../../styles/payment.css';

const Payment: React.FC = () => {
  const { cart } = useCart(); // O objeto cart aqui é { id: ..., items: [...] }
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit-card');
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');

  // CORREÇÃO AQUI: Usamos cart.items para acessar o array de produtos
  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const estimatedTax = 50;
  const estimatedShipping = 29;
  const total = subtotal + estimatedTax + estimatedShipping;

  return (
    <div className="payment-page-container">
      <div className="payment-content-wrapper">
        <div className="summarySection">
          <h3 className="section-title">Summary</h3>
          <div className="summaryItems">
            {/* CORREÇÃO AQUI: Usamos cart.items para o map */}
            {cart.items.map(item => (
              <div key={item.id} className="summaryItem">
                <img src={item.image} alt={item.name} />
                <span className="summaryItemName">{item.name}</span>
                <span className="summaryItemPrice">${(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 0 })}</span>
              </div>
            ))}
          </div>
          <div className="summaryDetails">
            <div className="detailRow">
              <span className="detailLabel">Address</span>
              <span className="detailValue">1131 Dusty Townline, Jacksonville, TX 40322</span>
            </div>
            <div className="detailRow">
              <span className="detailLabel">Shipment method</span>
              <span className="detailValue">Free</span>
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
              <div className="card-logo-placeholder"></div>
              <span className="cardNumber-animated">{cardNumber.padEnd(16, '•')}</span>
              <div className="card-details-row">
                <span className="card-exp-cvv"><span className="exp-label">EXP: </span><span className="exp-value-animated">{expDate || 'MM/YY'}</span></span>
                <span className="card-exp-cvv"><span className="cvv-label">CVV: </span><span className="cvv-value-animated">{cvv.padEnd(3, '•')}</span></span>
              </div>
              <span className="cardholderName-animated">{cardholderName.toUpperCase() || 'CARDHOLDER NAME'}</span>
            </div>
            <input type="text" placeholder="Cardholder Name" value={cardholderName} onChange={(e) => setCardholderName(e.target.value)} />
            <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} maxLength={16} />
            <div className="expiryCvv">
              <input type="text" placeholder="Exp Date (MM/YY)" value={expDate} onChange={(e) => setExpDate(e.target.value)} maxLength={5} />
              <input type="text" placeholder="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} maxLength={3} />
            </div>
            <label className="sameBilling"><input type="checkbox" /> Same as billing address</label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;