import React, { createContext, useState, useContext, ReactNode } from 'react';

// Reutilizamos a tipagem Product que você já tem
export interface Product {
  id: string;
  name: string;
  specs: string;
  code: string;
  price: number;
  imageUrl: string;
  quantity: number; // A quantidade é importante para o carrinho
}

// O que o nosso contexto vai expor
interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Omit<Product, 'quantity'>, quantity: number) => void;
  // Funções de gerenciamento que você já tem
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
}

// Criação do contexto com valores iniciais
const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // ----------------------------------------------------
  // LÓGICA DE ADICIONAR AO CARRINHO
  // ----------------------------------------------------
  const addToCart = (productToAdd: Omit<Product, 'quantity'>, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productToAdd.id);

      if (existingItem) {
        // Se o item já existe, apenas aumenta a quantidade
        return prevItems.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Se o item é novo, adiciona-o com a quantidade inicial
        return [...prevItems, { ...productToAdd, quantity }];
      }
    });
  };

  // ----------------------------------------------------
  // LÓGICA DE ATUALIZAR QUANTIDADE (para uso posterior)
  // ----------------------------------------------------
  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };
    
  // ----------------------------------------------------
  // LÓGICA DE REMOVER ITEM (para uso posterior)
  // ----------------------------------------------------
  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook customizado para facilitar o uso
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};