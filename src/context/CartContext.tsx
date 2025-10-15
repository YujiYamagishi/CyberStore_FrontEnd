import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';

const API_URL = (import.meta.env.VITE_API_URL as string) || 'http://localhost:8000';

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

    const formatItemsFromAPI = useCallback((apiItems: any[]): CartItem[] =>
        (apiItems || []).map(item => ({
            id: item.product.id,
            name: item.product.name,
            price: parseFloat(item.product.price),
            quantity: item.quantity,
            image: item.product.url_image,
            specs: item.product.specs ?? '',
            code: item.product.code ?? '',
        })), []);

    const fetchCartFromServer = useCallback(async (currentUserId: string) => {
        try {
            const token = await getToken();
            const response = await fetch(`${API_URL}/api/shopping_carts/${currentUserId}`, { 
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const data = await response.json();
                return { id: data.id, items: formatItemsFromAPI(data.items) };
            }
        } catch (err) {
            console.error('Error fetching cart from server:', err);
        }
        return { id: null, items: [] };
    }, [getToken, formatItemsFromAPI]);

    const createCartOnServer = useCallback(async (productsPayload: { product_id: number; quantity: number }[]) => {
        if (!userId) throw new Error("User ID not found for cart creation.");
    
        try {
            const token = await getToken();
            const response = await fetch(`${API_URL}/api/shopping_carts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ products: productsPayload }),
            });
    
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'No detailed error body.' }));
                throw new Error(`Failed to create cart on server (POST): ${response.status} - ${errorData.message}`);
            }
    
            const data = await response.json();
            return { id: data.id, items: formatItemsFromAPI(data.items) };
        } catch (error) {
            console.error("Error creating cart on server:", error);
            throw error;
        }
    }, [userId, getToken, formatItemsFromAPI]);

    const updateCartOnServer = useCallback(async (cartId: number, productsPayload: { product_id: number; quantity: number }[]) => {
        try {
            const token = await getToken();
            const response = await fetch(`${API_URL}/api/shopping_carts/${cartId}`, { 
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ products: productsPayload }),
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'No detailed error body.' }));
                throw new Error(`Failed to update cart on server (PUT): ${response.status} - ${errorData.message}`);
            }
            
            const data = await response.json();
            return { id: data.id, items: formatItemsFromAPI(data.items) };
        } catch (error) {
            console.error("Error updating cart on server:", error);
            throw error;
        }
    }, [getToken, formatItemsFromAPI]);

    
    const mergeAndSyncCarts = useCallback(async (localItems: CartItem[], serverCart: CartState) => {
        
        const mergedItems = new Map<number, { product_id: number; quantity: number }>();

       
        serverCart.items.forEach(item => {
            mergedItems.set(item.id, { product_id: item.id, quantity: item.quantity });
        });

        
        localItems.forEach(localItem => {
            if (mergedItems.has(localItem.id)) {
                const existing = mergedItems.get(localItem.id)!;
                existing.quantity += localItem.quantity;
            } else {
                mergedItems.set(localItem.id, { product_id: localItem.id, quantity: localItem.quantity });
            }
        });
        
        const finalPayload = Array.from(mergedItems.values());
        let finalCart: CartState;

        try {
            
            if (serverCart.id) {
                finalCart = await updateCartOnServer(serverCart.id, finalPayload);
            } else { 
                finalCart = await createCartOnServer(finalPayload);
            }
            
            localStorage.removeItem('cart'); 
            return finalCart;

        } catch (error) {
            console.error("Failed to merge carts on server:", error);
            return serverCart; 
        }
    }, [updateCartOnServer, createCartOnServer]);


    useEffect(() => {
        const initializeCart = async () => {
            setIsLoading(true);
            if (typeof isSignedIn !== 'boolean') {
                setIsLoading(false); return;
            }

            if (!isSignedIn || !userId) {
                const localCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
                setCart({ id: null, items: localCart });
            } else {
                
                const localItems: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
                const serverCart = await fetchCartFromServer(userId);

               
                if (localItems.length > 0) {
                    const finalCartState = await mergeAndSyncCarts(localItems, serverCart);
                    setCart(finalCartState);
                } else {
                   
                    setCart(serverCart);
                }
                window.dispatchEvent(new Event('cartUpdated'));
            }
            setIsLoading(false);
        };
        initializeCart();
    }, [isSignedIn, userId, fetchCartFromServer, mergeAndSyncCarts]);

    const addToCart = async (newItem: Omit<CartItem, 'quantity'>, quantity: number) => {
        if (!isSignedIn) {
            const localCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
            const index = localCart.findIndex(i => i.id === newItem.id);
            let updatedCart = [...localCart];
            if (index > -1) {
                updatedCart[index].quantity += quantity;
            } else {
                updatedCart.push({ ...newItem, quantity });
            }
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setCart({ id: null, items: updatedCart });
            window.dispatchEvent(new Event('cartUpdated'));
            return;
        }

        if (cart.id) {
            const existingItems = cart.items.map(item => ({ product_id: item.id, quantity: item.quantity }));
            const itemIndex = existingItems.findIndex(item => item.product_id === newItem.id);
            const productsForBackend =
                itemIndex > -1
                    ? existingItems.map((item, idx) => (idx === itemIndex ? { ...item, quantity: item.quantity + quantity } : item))
                    : [...existingItems, { product_id: newItem.id, quantity }];
            
            const updatedCartState = await updateCartOnServer(cart.id, productsForBackend);
            setCart(updatedCartState);

        } else {
            const productsForBackend = [{ product_id: newItem.id, quantity }];
            const newCartState = await createCartOnServer(productsForBackend);
            setCart(newCartState);
        }
    };
    
    
    const removeFromCart = async (productId: number) => {
        if (!isSignedIn) {
            const updated = cart.items.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(updated));
            setCart({ id: null, items: updated });
            window.dispatchEvent(new Event('cartUpdated'));
            return;
        }
        if (!cart.id) return;
        const productsForBackend = cart.items
            .filter(item => item.id !== productId)
            .map(item => ({ product_id: item.id, quantity: item.quantity }));
        const updatedCartState = await updateCartOnServer(cart.id, productsForBackend);
        setCart(updatedCartState);
        window.dispatchEvent(new Event('cartUpdated'));
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
        if (!cart.id) return;
        if (newQuantity < 1) return removeFromCart(productId);
        const productsForBackend = cart.items.map(item =>
            item.id === productId ? { product_id: item.id, quantity: newQuantity } : { product_id: item.id, quantity: item.quantity }
        );
        const updatedCartState = await updateCartOnServer(cart.id, productsForBackend);
        setCart(updatedCartState);
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const clearCart = async () => {
        if (!isSignedIn) {
            localStorage.removeItem('cart');
            setCart({ id: null, items: [] });
            window.dispatchEvent(new Event('cartUpdated'));
            return;
        }
        if (!cart.id) return;
        const updatedCartState = await updateCartOnServer(cart.id, []);
        setCart(updatedCartState);
        window.dispatchEvent(new Event('cartUpdated'));
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