import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

export type CartItem = {
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
  const { userId, getToken, isSignedIn } = useAuth();

  const formatItemsFromAPI = (apiItems: any[]): CartItem[] =>
    (apiItems || []).map(item => ({
      id: item.product.id,
      name: item.product.name,
      price: parseFloat(item.product.price),
      quantity: item.quantity,
      image: item.product.url_image,
      specs: item.product.specs ?? '',
      code: item.product.code ?? '',
    }));

  const fetchCartFromServer = async (currentUserId: string) => {
    setIsLoading(true);
    try {
      const token = await getToken();
      const response = await fetch(`http://localhost:8000/shopping-cart/${currentUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        return { id: data.id, items: formatItemsFromAPI(data.items) };
      }
    } catch (err) {
      console.error('Erro ao buscar carrinho do servidor:', err);
    }
    return { id: null, items: [] };
  };

  const updateCartOnServer = async (productsPayload: { product_id: number; quantity: number }[]) => {
    if (!cart.id) throw new Error("ID do carrinho não encontrado para atualização.");
    const token = await getToken();
    const response = await fetch(`http://localhost:8000/api/shopping_carts/${cart.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ products: productsPayload }),
    });
    if (!response.ok) throw new Error('Falha ao atualizar o carrinho no servidor (PUT)');
    const data = await response.json();
    setCart({ id: data.id, items: formatItemsFromAPI(data.items) });
  };

  
  const mergeLocalCartWithServer = async (serverCart: CartState) => {
    const localCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    if (localCart.length === 0) return serverCart;

   
    const existingIds = serverCart.items.map(item => item.id);
    const itemsToAdd = localCart.filter(item => !existingIds.includes(item.id));

    if (itemsToAdd.length === 0) return serverCart;

    const payload = [
      ...serverCart.items.map(item => ({ product_id: item.id, quantity: item.quantity })),
      ...itemsToAdd.map(item => ({ product_id: item.id, quantity: item.quantity })),
    ];

    
    const token = await getToken();
    const response = await fetch(`http://localhost:8000/api/shopping_carts/${serverCart.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ products: payload }),
    });
    if (!response.ok) throw new Error('Erro ao atualizar carrinho no servidor');

    const data = await response.json();
    localStorage.removeItem('cart');
    return { id: data.id, items: formatItemsFromAPI(data.items) };
  };

  useEffect(() => {
    const initializeCart = async () => {
      if (!isSignedIn) {
        const localCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart({ id: null, items: localCart });
        setIsLoading(false);
      } else {
        const serverCart = await fetchCartFromServer(userId!);
        const merged = await mergeLocalCartWithServer(serverCart);
        setCart(merged);
        setIsLoading(false);
        window.dispatchEvent(new Event('cartUpdated'));
      }
    };
    initializeCart();
  }, [isSignedIn]);

  
  const addToCart = async (newItem: Omit<CartItem, 'quantity'>, quantity: number) => {
    if (!isSignedIn) {
      const localCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
      const index = localCart.findIndex(i => i.id === newItem.id);
      let updatedCart;
      if (index > -1) {
        updatedCart = [...localCart];
        updatedCart[index].quantity += quantity;
      } else {
        updatedCart = [...localCart, { ...newItem, quantity }];
      }
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart({ id: null, items: updatedCart });
      window.dispatchEvent(new Event('cartUpdated'));
      return;
    }

    const existingItems = cart.items.map(item => ({ product_id: item.id, quantity: item.quantity }));
    const itemIndex = existingItems.findIndex(item => item.product_id === newItem.id);
    const productsForBackend =
      itemIndex > -1
        ? existingItems.map((item, idx) => (idx === itemIndex ? { ...item, quantity: item.quantity + quantity } : item))
        : [...existingItems, { product_id: newItem.id, quantity }];

    if (cart.id) await updateCartOnServer(productsForBackend);
  };

  const removeFromCart = async (productId: number) => {
    if (!isSignedIn) {
      const updated = cart.items.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updated));
      setCart({ id: null, items: updated });
      window.dispatchEvent(new Event('cartUpdated'));
      return;
    }

    const productsForBackend = cart.items
      .filter(item => item.id !== productId)
      .map(item => ({ product_id: item.id, quantity: item.quantity }));
    await updateCartOnServer(productsForBackend);
  };

  const updateQuantity = async (productId: number, newQuantity: number) => {
    if (!isSignedIn) {
      if (newQuantity < 1) return removeFromCart(productId);
      const updated = cart.items.map(item => (item.id === productId ? { ...item, quantity: newQuantity } : item));
      localStorage.setItem('cart', JSON.stringify(updated));
      setCart({ id: null, items: updated });
      window.dispatchEvent(new Event('cartUpdated'));
      return;
    }

    if (newQuantity < 1) return removeFromCart(productId);
    const productsForBackend = cart.items.map(item =>
      item.id === productId ? { product_id: item.id, quantity: newQuantity } : { product_id: item.id, quantity: item.quantity }
    );
    await updateCartOnServer(productsForBackend);
  };

  const clearCart = async () => {
    if (!isSignedIn) {
      localStorage.removeItem('cart');
      setCart({ id: null, items: [] });
      window.dispatchEvent(new Event('cartUpdated'));
      return;
    }
    if (!cart.id) return;
    await updateCartOnServer([]);
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
