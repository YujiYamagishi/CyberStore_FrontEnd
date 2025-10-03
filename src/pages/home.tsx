import Hero from '../components/home/hero'
import Browse from '../components/home/browse'
import Suggest from '../components/home/suggest'
import ProductsNavigation from '../components/home/productsnavigation'
import DiscountProducts from '../components/home/discountproducts'
import BigSummer from '../components/home/bigsummer'
import '../styles/home.css'


function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-20">
        <Hero />
        <Browse/>
        <Suggest/>
        <ProductsNavigation/>
        <DiscountProducts/>
        <BigSummer/>      
      </main>
    </div>
  );
}

export default App;
