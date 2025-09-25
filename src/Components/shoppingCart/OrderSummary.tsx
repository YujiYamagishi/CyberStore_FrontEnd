import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, SignInButton } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { useCart } from '../../context/CartContext'; // IMPORT CORRETO

interface OrderSummaryProps {
  subtotal: number;
  tax: number;
  shipping: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, tax, shipping }) => {
  const total = subtotal + tax + shipping;
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const { cart } = useCart(); // AQUI USAMOS cart (do contexto)

  const formatCurrency = (amount: number): string => {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 0 })}`;
  };

  const handleCheckout = () => {
    if (!isSignedIn) {
      const modal = document.getElementById("clerk-signin-modal");
      if (modal) modal.click();
      return;
    }

    if (cart.length === 0) {
      toast.success("Your cart is empty. Add items to proceed.", {
        style: {
          background: '#065f46',
          color: '#ffffffff',
          border: '1px solid #10b981',
          fontWeight: 500,
        },
        iconTheme: {
          primary: '#10b981',
          secondary: '#ecfdf5',
        },
        position: 'bottom-right',
      });
      return;
    }

    navigate('/address');
  };

  return (
    <div className="order-summary-container">
      <h2>Order Summary</h2>

      <div className="summary-input-group">
        <label>Discount code / Promo code</label>
        <input type="text" placeholder="Code" />
      </div>

      <div className="summary-input-group bonus-card-group">
        <label>Your bonus card number</label>
        <div className="input-with-button">
          <input type="text" placeholder="Enter Card Number" />
          <button className="apply-btn">Apply</button>
        </div>
      </div>

      <div className="summary-details">
        <div className="summary-line1">
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

      <div className="summary-total">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>

      <button className="checkout-btn" onClick={handleCheckout}>
        Checkout
      </button>

      <SignInButton mode="modal">
        <button id="clerk-signin-modal" style={{ display: "none" }} />
      </SignInButton>
    </div>
  );
};

export default OrderSummary;
