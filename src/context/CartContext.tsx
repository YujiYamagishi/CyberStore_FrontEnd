import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

// --- Types ---
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  specs: string;
  code: string;
};

type CartState = {
  id: number | null;
  items: CartItem[];
};

type CartContextType = {
  cart: CartState;
  isLoading: boolean;
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, newQuantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartState>({ id: null, items: [] });
  const [isLoading, setIsLoading] = useState(true);
  const { userId, getToken } = useAuth();

  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    } else {
      setIsLoading(false);
      setCart({ id: null, items: [] });
    }
  }, [userId]);

  const formatItemsFromAPI = (apiItems: any[]): CartItem[] => {
    return (apiItems || []).map((item: any) => ({
      id: item.product.id,
      name: item.product.name,
      price: parseFloat(item.product.price),
      quantity: item.quantity,
      image: item.product.url_image,
      specs: item.product.specs ?? '',
      code: item.product.code ?? '',
    }));
  };

  const fetchCart = async (currentUserId: string) => {
    setIsLoading(true);
    try {
      const token = await getToken();
      const response = await fetch(`http://localhost:8000/shopping-cart/${currentUserId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setCart({ id: data.id, items: formatItemsFromAPI(data.items) });
      } else {
        setCart({ id: null, items: [] });
      }
    } catch (error) {
      console.error("Falha ao buscar o carrinho:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartOnServer = async (productsPayload: { product_id: number; quantity: number }[]) => {
    if (!cart.id) throw new Error("ID do carrinho não encontrado para atualização.");
    const token = await getToken();
    const response = await fetch(`http://localhost:8000/api/shopping_carts/${cart.id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ products: productsPayload }),
    });
    if (!response.ok) throw new Error('Falha ao atualizar o carrinho no servidor (PUT)');
    const data = await response.json();
    setCart({ id: data.id, items: formatItemsFromAPI(data.items) });
  };

  const addToCart = async (newItem: Omit<CartItem, 'quantity'>, quantity: number) => {
    if (!userId) throw new Error("Usuário não está logado.");
    const existingItems = cart.items.map(item => ({ product_id: item.id, quantity: item.quantity }));
    const itemIndex = existingItems.findIndex(item => item.product_id === newItem.id);
    let productsForBackend;
    if (itemIndex > -1) {
      productsForBackend = existingItems.map((item, index) => index === itemIndex ? { ...item, quantity: item.quantity + quantity } : item);
    } else {
      productsForBackend = [...existingItems, { product_id: newItem.id, quantity }];
    }
    try {
      if (cart.id) {
        await updateCartOnServer(productsForBackend);
      } else {
        const token = await getToken();
        const response = await fetch(`http://localhost:8000/api/shopping_carts`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ products: productsForBackend }),
        });
        if (!response.ok) throw new Error('Falha ao criar o carrinho no servidor (POST)');
        const data = await response.json();
        setCart({ id: data.id, items: formatItemsFromAPI(data.items) });
      }
    } catch (error) {
      console.error("[addToCart] Erro:", error);
      throw error;
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
        const productsForBackend = cart.items
            .filter(item => item.id !== productId)
            .map(item => ({ product_id: item.id, quantity: item.quantity }));
        await updateCartOnServer(productsForBackend);
    } catch(error) {
        console.error("[removeFromCart] Erro:", error);
        throw error;
    }
  };

  const updateQuantity = async (productId: number, newQuantity: number) => {
    try {
        if (newQuantity < 1) return await removeFromCart(productId);
        
        const productsForBackend = cart.items.map(item => 
            item.id === productId 
                ? { product_id: item.id, quantity: newQuantity } 
                : { product_id: item.id, quantity: item.quantity }
        );
        await updateCartOnServer(productsForBackend);
    } catch(error) {
        console.error("[updateQuantity] Erro:", error);
        throw error;
    }
  };

  const clearCart = async () => {
    if (!cart.id) return;
    try {
        await updateCartOnServer([]);
    } catch (error) {
        console.error("Falha ao esvaziar o carrinho:", error);
        throw error;
    }
  };

  return (
    <CartContext.Provider value={{ cart, isLoading, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};