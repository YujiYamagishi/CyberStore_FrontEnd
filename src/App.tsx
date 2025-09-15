import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react'; 
import Home from './pages/home';
import ProductDetails from './pages/ProductDetails';
import ProductsPage from './pages/productsPage';
import Navbar from './Components/navbar';
import Footer from './Components/footer';


function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="pt-20 flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;