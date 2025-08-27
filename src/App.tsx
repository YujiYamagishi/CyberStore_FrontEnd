import Navbar from './Components/navbar';
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cabeçalho fixo */}
      <Navbar />

      <main className="pt-20 px-4">
        {/* Hero iPhone */}
        <section className="hero flex flex-col md:flex-row items-center my-12">
          <div className="hero-text md:w-1/2 text-center md:text-left">
            <p className="subtitle text-lg text-gray-500">Pro. Beyond.</p>
            <h2 className="text-4xl font-bold my-2">
              IPhone 14 <span className="text-indigo-600">Pro</span>
            </h2>
            <p className="desc text-gray-700 mb-4">
              Created to change everything for the better. For everyone.
            </p>
            <button className="btn bg-indigo-600 text-white px-6 py-2 rounded">
              Shop Now
            </button>
          </div>
          <img
            src="/Iphone Image.png"
            alt="iPhone 14 Pro"
            className="md:w-1/2 mt-6 md:mt-0"
          />
        </section>

        {/* Product AirPods */}
        <section className="product flex flex-col items-center my-12 text-center">
          <img src="/air pods image.png" alt="AirPods Max" className="mb-4" />
          <h3 className="text-2xl font-semibold">
            Apple <span className="text-indigo-600">AirPods Max</span>
          </h3>
          <p className="text-gray-700">Computational audio. Listen, it’s powerful</p>
        </section>

        {/* Product Vision Pro */}
        <section className="product dark flex flex-col items-center my-12 text-center bg-gray-800 text-white p-6 rounded">
          <img src="/apple vision pro.png" alt="Apple Vision Pro" className="mb-4" />
          <h3 className="text-2xl font-semibold">
            Apple Vision <span className="text-indigo-400">Pro</span>
          </h3>
          <p>An immersive way to experience entertainment</p>
        </section>

        {/* Product Playstation */}
        <section className="product flex flex-col items-center my-12 text-center">
          <img src="/PlayStation.png" alt="Playstation 5" className="mb-4" />
          <h3 className="text-2xl font-semibold">Playstation 5</h3>
          <p className="text-gray-700">
            Incredibly powerful CPU, GPU, and an SSD with integrated I/O will
            redefine your PlayStation experience.
          </p>
        </section>

        {/* Product Macbook */}
        <section className="product flex flex-col items-center my-12 text-center">
          <img src="/macbook air.png" alt="Macbook Air" className="mb-4" />
          <h3 className="text-2xl font-semibold">Macbook Air</h3>
          <p className="text-gray-700 mb-4">
            The new 15-inch MacBook Air makes room for more of what you love with
            a spacious Liquid Retina display.
          </p>
          <button className="btn bg-indigo-600 text-white px-6 py-2 rounded">
            Shop Now
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;
