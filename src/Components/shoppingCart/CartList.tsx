import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import type { CartItem as CartItemType } from '../../context/CartContext';
import { useAuth } from '@clerk/clerk-react';

interface CartListProps {
  cartItems?: CartItemType[];
  onQuantityChange?: (id: number, newQuantity: number) => void;
  onRemove?: (id: number) => void;
}

const CartList: React.FC<CartListProps> = ({ cartItems = [], onQuantityChange, onRemove }) => {
  const { isSignedIn } = useAuth();
  const [localCart, setLocalCart] = useState<CartItemType[]>([]);

  useEffect(() => {
    const initializeLocalCart = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setLocalCart(storedCart);
    };

    if (!isSignedIn) {
      initializeLocalCart();
      window.addEventListener('cartUpdated', initializeLocalCart);
      return () => window.removeEventListener('cartUpdated', initializeLocalCart);
    }
  }, [isSignedIn]);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (!isSignedIn) {
      const updated = localCart.map(item => item.id === id ? { ...item, quantity: newQuantity } : item);
      setLocalCart(updated);
      localStorage.setItem('cart', JSON.stringify(updated));
      window.dispatchEvent(new Event('cartUpdated'));
    } else if (onQuantityChange) onQuantityChange(id, newQuantity);
  };

  const handleRemove = (id: number) => {
    if (!isSignedIn) {
      const updated = localCart.filter(item => item.id !== id);
      setLocalCart(updated);
      localStorage.setItem('cart', JSON.stringify(updated));
      window.dispatchEvent(new Event('cartUpdated'));
    } else if (onRemove) onRemove(id);
  };

  const itemsToRender = isSignedIn ? cartItems : localCart;

  return (
    <div className="cart-list">
      {itemsToRender.map(item => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          specs={item.specs ?? ''}
          code={item.code ?? String(item.id)}
          price={item.price}
          quantity={item.quantity}
          image={item.image}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
};

export default CartList;
