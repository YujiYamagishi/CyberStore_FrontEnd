import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';

// 1. URL da API dinâmica injetada pelo bundler (Vite/CRA)
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

    // Função auxiliar para mapear dados da API para o formato de estado
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

    // Função para buscar o carrinho no servidor
    const fetchCartFromServer = useCallback(async (currentUserId: string) => {
        try {
            const token = await getToken();
            // CORREÇÃO: Usando API_URL
            const response = await fetch(`${API_URL}/shopping-cart/${currentUserId}`, { 
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

    // Função para atualizar o carrinho no servidor (PUT)
    const updateCartOnServer = useCallback(async (productsPayload: { product_id: number; quantity: number }[]) => {
        if (!cart.id) throw new Error("Cart ID not found for update.");
        
        try {
            const token = await getToken();
            // CORREÇÃO: Usando API_URL
            const response = await fetch(`${API_URL}/api/shopping_carts/${cart.id}`, { 
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ products: productsPayload }),
            });
            
            if (!response.ok) {
                 const errorData = await response.json().catch(() => ({ message: 'No detailed error body.' }));
                 throw new Error(`Failed to update cart on server (PUT): ${response.status} - ${errorData.message}`);
            }
            
            const data = await response.json();
            setCart({ id: data.id, items: formatItemsFromAPI(data.items) });
        } catch (error) {
            console.error("Error updating cart on server:", error);
            throw error;
        }

    }, [cart.id, getToken, formatItemsFromAPI]);

    // Função para mesclar o estado local com o do servidor
    const mergeLocalCartWithServer = useCallback(async (serverCart: CartState) => {
        const localCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
        if (localCart.length === 0) return serverCart;

        const existingIds = new Set(serverCart.items.map(item => item.id));
        const itemsToAdd = localCart.filter(item => !existingIds.has(item.id));

        if (itemsToAdd.length === 0) return serverCart;

        const payload = [
            ...serverCart.items.map(item => ({ product_id: item.id, quantity: item.quantity })),
            ...itemsToAdd.map(item => ({ product_id: item.id, quantity: item.quantity })),
        ];

        try {
            const token = await getToken();
            // CORREÇÃO: Usando API_URL
            const response = await fetch(`${API_URL}/api/shopping_carts/${serverCart.id}`, { 
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ products: payload }),
            });
            
             if (!response.ok) {
                 const errorData = await response.json().catch(() => ({ message: 'No detailed error body.' }));
                 throw new Error(`Error updating cart on server: ${response.status} - ${errorData.message}`);
            }

            const data = await response.json();
            localStorage.removeItem('cart');
            return { id: data.id, items: formatItemsFromAPI(data.items) };

        } catch (error) {
            console.error("Error during cart merge:", error);
            // Em caso de falha, retorna o carrinho do servidor e mantém o local
            return serverCart; 
        }

    }, [getToken, formatItemsFromAPI]);

    // Efeito para inicializar/sincronizar o carrinho no login/logout
    useEffect(() => {
        const initializeCart = async () => {
            setIsLoading(true);
            
            // Garante que o Clerk já resolveu o estado de autenticação
            if (typeof isSignedIn !== 'boolean') return;

            if (!isSignedIn || !userId) {
                const localCart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
                setCart({ id: null, items: localCart });
            } else {
                const serverCart = await fetchCartFromServer(userId);
                const merged = await mergeLocalCartWithServer(serverCart);
                setCart(merged);
                window.dispatchEvent(new Event('cartUpdated'));
            }
            setIsLoading(false);
        };
        initializeCart();
    }, [isSignedIn, userId, fetchCartFromServer, mergeLocalCartWithServer]);


    const addToCart = async (newItem: Omit<CartItem, 'quantity'>, quantity: number) => {
        // --- Lógica Local ---
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

        // --- Lógica Servidor ---
        const existingItems = cart.items.map(item => ({ product_id: item.id, quantity: item.quantity }));
        const itemIndex = existingItems.findIndex(item => item.product_id === newItem.id);
        const productsForBackend =
            itemIndex > -1
                ? existingItems.map((item, idx) => (idx === itemIndex ? { ...item, quantity: item.quantity + quantity } : item))
                : [...existingItems, { product_id: newItem.id, quantity }];

        if (cart.id) {
            await updateCartOnServer(productsForBackend);
            window.dispatchEvent(new Event('cartUpdated'));
        } else {
             console.error("No Cart ID found. Cannot add item to server.");
        }
    };

    const removeFromCart = async (productId: number) => {
        // --- Lógica Local ---
        if (!isSignedIn) {
            const updated = cart.items.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(updated));
            setCart({ id: null, items: updated });
            window.dispatchEvent(new Event('cartUpdated'));
            return;
        }

        // --- Lógica Servidor ---
        if (!cart.id) return;
        const productsForBackend = cart.items
            .filter(item => item.id !== productId)
            .map(item => ({ product_id: item.id, quantity: item.quantity }));
        
        await updateCartOnServer(productsForBackend);
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const updateQuantity = async (productId: number, newQuantity: number) => {
        // --- Lógica Local ---
        if (!isSignedIn) {
            if (newQuantity < 1) return removeFromCart(productId);
            const updated = cart.items.map(item => (item.id === productId ? { ...item, quantity: newQuantity } : item));
            localStorage.setItem('cart', JSON.stringify(updated));
            setCart({ id: null, items: updated });
            window.dispatchEvent(new Event('cartUpdated'));
            return;
        }

        // --- Lógica Servidor ---
        if (!cart.id) return;

        if (newQuantity < 1) return removeFromCart(productId);
        const productsForBackend = cart.items.map(item =>
            item.id === productId ? { product_id: item.id, quantity: newQuantity } : { product_id: item.id, quantity: item.quantity }
        );
        await updateCartOnServer(productsForBackend);
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const clearCart = async () => {
        // --- Lógica Local ---
        if (!isSignedIn) {
            localStorage.removeItem('cart');
            setCart({ id: null, items: [] });
            window.dispatchEvent(new Event('cartUpdated'));
            return;
        }
        
        // --- Lógica Servidor ---
        if (!cart.id) return;
        await updateCartOnServer([]);
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