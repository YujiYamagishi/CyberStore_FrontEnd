import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react'; 
import Home from './pages/home';
import ProductDetails from './pages/ProductDetails';
import ProductsPage from './pages/productsPage';
import ShoppingCart from "./pages/ShoppingCart";
import Navbar from './Components/navbar';
import Footer from './Components/footer';
import { CartProvider } from './context/CartContext'; 



function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="pt-24 flex-grow"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
