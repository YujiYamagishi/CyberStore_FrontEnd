import React from 'react';

// Tipagem das propriedades (para simular o resumo)
interface OrderSummaryProps {
  subtotal: number;
  tax: number;
  shipping: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, tax, shipping }) => {
  const total = subtotal + tax + shipping;

  const formatCurrency = (amount: number): string => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 0 })}`;
  };

  return (
    <div className="order-summary-container">
      <h2>Order Summary</h2>
      
      {/* Input para cupom */}
      <div className="summary-input-group">
        <label>Discount code / Promo code</label>
        <input type="text" placeholder="Code" />
      </div>

      {/* Input para bônus card */}
      <div className="summary-input-group bonus-card-group">
        <label>Your bonus card number</label>
        <div className="input-with-button">
          <input type="text" placeholder="Enter Card Number" />
          <button className="apply-btn">Apply</button>
        </div>
      </div>

      {/* Detalhes do preço */}
      <div className="summary-details">
        <div className="summary-line">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="summary-line">
          <span>Estimated Tax</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="summary-line">
          <span>Estimated Shipping & Handling</span>
          <span>{formatCurrency(shipping)}</span>
        </div>
      </div>
      
      {/* Total */}
      <div className="summary-total">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>

      <button className="checkout-btn">Checkout</button>
    </div>
  );
};

export default OrderSummary;