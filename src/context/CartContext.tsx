import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

// --- Types ---
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
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
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartState>({ id: null, items: [] });
  const [isLoading, setIsLoading] = useState(true);
  const { userId, getToken } = useAuth();

  // Função de log para vermos TODAS as mudanças de estado
  const setAndLogCart = (newState: CartState, fromFunction: string) => {
    console.log(`[${fromFunction}] ATUALIZANDO ESTADO DO CARRINHO PARA:`, JSON.stringify(newState, null, 2));
    setCart(newState);
  };

  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    } else {
      setIsLoading(false);
      setAndLogCart({ id: null, items: [] }, "useEffect - Logout/Usuário Deslogado");
    }
  }, [userId]);

  const formatItemsFromAPI = (apiItems: any[]): CartItem[] => {
    return (apiItems || []).map((item: any) => ({
      id: item.product.id,
      name: item.product.name,
      price: parseFloat(item.product.price),
      quantity: item.quantity,
      image: item.product.url_image,
    }));
  };

  const fetchCart = async (currentUserId: string) => {
    console.log(`[fetchCart] Buscando carrinho para o usuário: ${currentUserId}`);
    setIsLoading(true);
    try {
      const token = await getToken();
      const response = await fetch(`http://localhost:8000/shopping-cart/${currentUserId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('[fetchCart] Dados recebidos do backend:', data);
        setAndLogCart({ id: data.id, items: formatItemsFromAPI(data.items) }, "fetchCart - SUCESSO");
      } else {
        setAndLogCart({ id: null, items: [] }, "fetchCart - FALHA ou SEM CARRINHO");
      }
    } catch (error) {
      console.error("[fetchCart] Erro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartOnServer = async (productsPayload: { product_id: number; quantity: number }[]) => {
    if (!cart.id) throw new Error("ID do carrinho não encontrado para atualização.");
    console.log('[updateCartOnServer] Enviando para o backend:', productsPayload);
    
    const token = await getToken();
    const response = await fetch(`http://localhost:8000/api/shopping_carts/${cart.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ products: productsPayload }),
    });

    if (!response.ok) throw new Error('Falha ao atualizar o carrinho no servidor (PUT)');
    
    const data = await response.json();
    console.log('[updateCartOnServer] Resposta do backend após PUT:', data);
    setAndLogCart({ id: data.id, items: formatItemsFromAPI(data.items) }, "updateCartOnServer");
  };

  const addToCart = async (newItem: Omit<CartItem, 'quantity'>, quantity: number) => {
    if (!userId) throw new Error("Usuário não está logado.");
    console.log('[addToCart] Adicionando item:', newItem);

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
        console.log('[addToCart] Carrinho não existe, criando um novo (POST)...');
        const token = await getToken();
        const response = await fetch(`http://localhost:8000/api/shopping_carts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ products: productsForBackend }),
        });

        if (!response.ok) throw new Error('Falha ao criar o carrinho no servidor (POST)');
        const data = await response.json();
        console.log('[addToCart] Resposta do backend após POST:', data);
        setAndLogCart({ id: data.id, items: formatItemsFromAPI(data.items) }, "addToCart - SUCESSO (POST)");
      }
    } catch (error) {
      console.error("[addToCart] Erro:", error);
      throw error;
    }
  };

  const removeFromCart = async (productId: number) => {
    console.log(`[removeFromCart] Removendo produto ID: ${productId}`);
    const productsForBackend = cart.items
      .filter(item => item.id !== productId)
      .map(item => ({ product_id: item.id, quantity: item.quantity }));
    
    await updateCartOnServer(productsForBackend);
  };

  const updateQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return removeFromCart(productId);
    console.log(`[updateQuantity] Atualizando produto ID: ${productId} para quantidade: ${newQuantity}`);
    
    const productsForBackend = cart.items.map(item => 
      item.id === productId 
        ? { product_id: item.id, quantity: newQuantity } 
        : { product_id: item.id, quantity: item.quantity }
    );
      
    await updateCartOnServer(productsForBackend);
  };

  return (
    <CartContext.Provider value={{ cart, isLoading, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};