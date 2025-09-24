import React from 'react';
import CartItem from './CartItem';
// Tipagem Product importada da página principal
import type { Product } from '../../pages/ShoppingCart';  

// Tipagem CORRIGIDA para corresponder ao que a página principal passa
interface CartListProps {
  cartItems: Product[];
  onQuantityChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartList: React.FC<CartListProps> = ({ cartItems, onQuantityChange, onRemove }) => {
  return (
    <div className="cart-list">
      {cartItems.map(item => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          specs={item.specs}
          code={item.code}
          price={item.price}
          quantity={item.quantity}
          imageUrl={item.imageUrl}
          onQuantityChange={onQuantityChange} 
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default CartList;