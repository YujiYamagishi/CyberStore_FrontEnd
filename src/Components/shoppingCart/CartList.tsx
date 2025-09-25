import React from 'react';
import CartItem from './CartItem';
import type { CartItem as CartItemType } from '../context/CartContext';

interface CartListProps {
  cartItems: CartItemType[];
  onQuantityChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartList: React.FC<CartListProps> = ({ cartItems, onQuantityChange, onRemove }) => {
  return (
    <div className="cart-list">
      {cartItems.map(item => (
        <CartItem
          key={`${item.id}-${item.color ?? ''}-${item.storage ?? ''}`} // garantir chave única
          id={item.id}
          name={item.name}
          specs={item.specs}
          code={item.code}
          price={item.discounted_price ?? item.price}
          quantity={item.quantity}
          image={item.image}
          onQuantityChange={onQuantityChange}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default CartList;
