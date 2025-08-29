
import Hero from '../Components/home/hero'
import Browse from '../Components/home/browse'
import Suggest from '../Components/home/suggest'
import ProductsNavigation from '../Components/home/productsnavigation'
import DiscountProducts from '../Components/home/discountproducts'
import BigSummer from '../Components/home/bigsummer'


import Footer from '../Components/footer'

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
