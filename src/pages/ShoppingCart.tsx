import React from 'react';
import { useCart } from '../context/CartContext';

import CartList from '../Components/shoppingCart/CartList';
import OrderSummary from '../Components/shoppingCart/OrderSummary';

import '../styles/shoppingCart.css';

const ShoppingCart: React.FC = () => {
  // Pega o objeto `cart` completo e o estado `isLoading`
  const { cart, removeFromCart, updateQuantity, isLoading } = useCart();

  // Exibe uma mensagem de "Carregando..." enquanto os dados são buscados
  if (isLoading) {
    return (
      <div className="shopping-cart-page-wrapper">
        <h1>Carregando seu carrinho...</h1>
      </div>
    );
  }

  // Calcula o subtotal a partir da lista `cart.items`
  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const estimatedTax = 50;
  const estimatedShipping = 29;

  return (
    <div className="shopping-cart-page-wrapper">
      <div className="shopping-cart-layout">
        <div className="cart-items-column">
          <h1>Shopping Cart</h1>

          {/* Verifica se a lista `cart.items` está vazia */}
          {cart.items.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            <CartList
              // Passa a lista `cart.items` para o componente filho
              cartItems={cart.items}
              onQuantityChange={updateQuantity}
              onRemove={removeFromCart}
            />
          )}
        </div>
        
        {/* Mostra o resumo do pedido apenas se houver itens no carrinho */}
        
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