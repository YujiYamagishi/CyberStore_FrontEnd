import React, { useState } from 'react';
import iphone14promax from '../assets/iphone14promax.webp';



type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
};

const tabs = ['New Arrival', 'Bestseller', 'Featured Product'];

const products: Product[] = [
  {
    id: 1,
    title: 'Apple iPhone 14 Pro Max 128GB',
    price: '$900',
    image:iphone14promax,
  },
  {
    id: 2,
    title: 'Blackmagic Pocket Cinema Camera 6K',
    price: '$2535',
    image: '/images/blackmagic.png',
  },
  {
    id: 3,
    title: 'Apple Watch Series 9 GPS 41mm',
    price: '$399',
    image: '/images/applewatch.png',
  },
  {
    id: 4,
    title: 'AirPods Max Silver',
    price: '$549',
    image: '/images/airpodsmax.png',
  },
  {
    id: 5,
    title: 'Samsung Galaxy Watch6 Classic',
    price: '$369',
    image: '/images/galaxywatch.png',
  },
  {
    id: 6,
    title: 'Galaxy Z Fold5 Unlocked | 256GB',
    price: '$1799',
    image: '/images/fold5.png',
  },
  {
    id: 7,
    title: 'Galaxy Buds FE Graphite',
    price: '$99.99',
    image: '/images/galaxybuds.png',
  },
  {
    id: 8,
    title: 'Apple iPad 9 10.2" 64GB Wi-Fi Silver',
    price: '$398',
    image: '/images/ipad.png',
  },
];

export default function Suggest() {
  const [activeTab, setActiveTab] = useState('New Arrival');

  return (
    <section className="suggest-container">
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} className="product-img" />
            <h4 className="product-title">{product.title}</h4>
            <p className="product-price">{product.price}</p>
            <button className="buy-button">Buy Now</button>
          </div>
        ))}
      </div>
    </section>
  );
}
