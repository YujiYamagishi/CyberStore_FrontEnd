import React from 'react';
import { useCart } from '../context/CartContext';

import CartList from '../Components/shoppingCart/CartList';
import OrderSummary from '../Components/shoppingCart/OrderSummary';

import '../styles/shoppingCart.css';

const ShoppingCart: React.FC = () => {
  
  const { cart, removeFromCart, updateQuantity, isLoading } = useCart();

  
  if (isLoading) {
    return (
      <div className="shopping-cart-page-wrapper">
        <h1>Loading...</h1>
      </div>
    );
  }

  
  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const estimatedTax = 50;
  const estimatedShipping = 29;

  return (
    <div className="shopping-cart-page-wrapper">
      <div className="shopping-cart-layout">
        <div className="cart-items-column">
          <h1>Shopping Cart</h1>

          
          {cart.items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <CartList
             
              cartItems={cart.items}
              onQuantityChange={updateQuantity}
              onRemove={removeFromCart}
            />
          )}
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