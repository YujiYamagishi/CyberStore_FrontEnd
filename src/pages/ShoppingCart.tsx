import React, { useState } from 'react';
// Importa os componentes do carrinho
import CartList from '../Components/shoppingCart/CartList';
import OrderSummary from '../Components/shoppingCart/OrderSummary'; 
// Importa o CSS
import '../styles/shoppingCart.css';

// Definição do tipo para um item do carrinho (Exportamos para usar no ProductsCart)
export interface Product {
  id: string;
  name: string;
  specs: string;
  code: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

// Dados simulados (Mock Data)
const initialCart: Product[] = [
  { id: 'p1', name: 'Apple iPhone 14 Pro Max', specs: '128GB Deep Purple', code: '25139526913984', price: 1399, quantity: 1, imageUrl: 'https://via.placeholder.com/80/7F00FF/FFFFFF?text=iPhone' },
  { id: 'p2', name: 'AirPods Max Silver', specs: '', code: '53459358345', price: 549, quantity: 1, imageUrl: 'https://via.placeholder.com/80/CCCCCC/FFFFFF?text=AirPods' },
  { id: 'p3', name: 'Apple Watch Series 9', specs: 'GPS 41mm Starlight Aluminium', code: '63632324', price: 399, quantity: 1, imageUrl: 'https://via.placeholder.com/80/AAAAAA/FFFFFF?text=Watch' },
];

const ShoppingCartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>(initialCart);

  // Lógica para calcular o subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Dados do resumo simulados
  const estimatedTax = 50;
  const estimatedShipping = 29;

  // Função para mudar a quantidade
  const handleQuantityChange = (id: string, delta: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  // Função para remover item
  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div className="shopping-cart-page-wrapper">
      <div className="shopping-cart-layout">
        <div className="cart-items-column">
          <h1>Shopping Cart</h1>
          
          
         <CartList 
            cartItems={cartItems} 
            onQuantityChange={handleQuantityChange} 
            onRemove={handleRemoveItem}
        />

        </div>
        
        <div className="order-summary-column">
          {/* Componente de Resumo do Pedido */}
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

export default ShoppingCartPage;