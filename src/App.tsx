import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/home';
import ProductDetails from './pages/ProductDetails';
import ProductsPage from './pages/productsPage';
import ShoppingCart from "./pages/ShoppingCart";
import AddressPage from './pages/AddressPage';
import EditAddress from './pages/EditAddress'; // Importe a página de edição
import Shipping from './pages/ShippingPage';
import Payment from './pages/PaymentPage';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { CartProvider } from './context/CartContext';
import { AddressProvider } from './context/AdressContext';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AddressProvider>
    <CartProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="pt-24 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
            <Route path="/address" element={<AddressPage />} />
            <Route path="/edit-address/:id" element={<EditAddress />} /> {/* Rota para edição */}
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
    </AddressProvider>
  );
}

export default App;