import React from 'react';
import { useCart } from '../context/CartContext';

import CartList from '../Components/shoppingCart/CartList';
import OrderSummary from '../Components/shoppingCart/OrderSummary';

import '../styles/shoppingCart.css';

export interface Product {
  id: string;
  name: string;
  price: number;
  discounted_price?: number;
  quantity: number;
  image: string;
  color?: string;
  storage?: string;
}

const ShoppingCart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart(); // ✅ agora com updateQuantity

  const handleQuantityChange = (id: string, delta: number) => {
    updateQuantity(id, delta); // ✅ funcional!
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const estimatedTax = 50;
  const estimatedShipping = 29;

  return (
    <div className="shopping-cart-page-wrapper">
      <div className="shopping-cart-layout">
        <div className="cart-items-column">
          <h1>Shopping Cart</h1>

          <CartList
            cartItems={cart}
            onQuantityChange={handleQuantityChange}
            onRemove={removeFromCart}
          />
        </div>

        <div className="order-summary-column">
          <OrderSummary
            subtotal={subtotal}
            tax={estimatedTax}
            shipping={estimatedShipping}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
