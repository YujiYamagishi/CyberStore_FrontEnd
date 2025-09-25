import { createContext, useContext, useState, ReactNode } from 'react';

type CartItem = {
  id: string;
  name: string;
  price: number;
  discounted_price?: number;
  quantity: number;
  image: string;
  color?: string;
  storage?: string;
  specs: string; 
  code: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void; 
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (i) =>
          i.id === item.id &&
          i.color === item.color &&
          i.storage === item.storage
      );
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id && i.color === item.color && i.storage === item.storage
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...prevCart, item];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
