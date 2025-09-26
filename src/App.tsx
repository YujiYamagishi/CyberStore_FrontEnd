import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

// Clerk
import { SignIn, SignUp, UserProfile, SignedIn, SignedOut } from "@clerk/clerk-react";

// Páginas
import Home from './pages/home';
import ProductDetails from './pages/ProductDetails';
import ProductsPage from './pages/productsPage';
import ShoppingCart from "./pages/ShoppingCart";
import AddressPage from './pages/AddressPage';
import EditAddress from './pages/EditAddress';
import Shipping from './pages/ShippingPage';
import Payment from './pages/PaymentPage';
import FinishWrapper from './components/finish/FinishWrapper';

// Componentes
import Navbar from './components/navbar';
import Footer from './components/footer';

// Contextos
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { AddressProvider } from './context/AdressContext';

interface ProtectedRouteProps { children: ReactNode; }

const ProtectedRoute = ({ children }: ProtectedRouteProps) => (
  <>
    <SignedIn>{children}</SignedIn>
    <SignedOut><SignIn /></SignedOut>
  </>
);

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const hideLayout = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up") || pathname.startsWith("/user-profile");

  return (
    <AddressProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />

          <div className="min-h-screen flex flex-col bg-gray-50">
            {!hideLayout && <Navbar />}

            <main className={`${!hideLayout ? "pt-24" : ""} flex-grow`}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:productId" element={<ProductDetails />} />
                <Route path="/shoppingcart" element={<ShoppingCart />} />

                <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
                <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
                <Route path="/user-profile/*" element={<UserProfile routing="path" path="/user-profile" />} />

                <Route path="/address" element={<ProtectedRoute><AddressPage /></ProtectedRoute>} />
                <Route path="/edit-address/:id" element={<ProtectedRoute><EditAddress /></ProtectedRoute>} />
                <Route path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
                <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
                <Route path="/finish" element={<ProtectedRoute><FinishWrapper /></ProtectedRoute>} />
              </Routes>
            </main>

            {!hideLayout && <Footer />}
          </div>
        </CartProvider>
      </AuthProvider>
    </AddressProvider>
  );
}

export default App;
