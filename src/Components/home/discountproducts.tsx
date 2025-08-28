import React from 'react';

import iphone14gold from '../../assets/iphone14gold.png';
import airpods from '../../assets/airpods.png';
import watch from '../../assets/applewatch.png';
import iphone14white from '../../assets/iphone14white.png';
import { Link } from 'react-router-dom';

type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
};

const discountProducts: Product[] = [
  {
    id: 1,
    title: 'Apple iPhone 14 Pro 512GB Gold',
    price: '$900',
    image: iphone14gold,
  },
  {
    id: 2,
    title: 'AirPods Max Silver',
    price: '$2535',
    image: airpods,
  },
  {
    id: 3,
    title: 'Apple Watch Series 9 GPS 41mm',
    price: '$399',
    image: watch,
  },
  {
    id: 4,
    title: 'Apple iPhone 14 Pro 1TB Gold (Midnight)',
    price: '$549',
    image: iphone14white,
  },
];

export default function DiscountProducts() {
  return (
    <section className="discount-section">
      <h2 className="discount-title">Discounts up to -50%</h2>

      <div className="discount-grid">
        {discountProducts.map((product) => (
          <div className="discount-card" key={product.id}>
            <div className="discount-image-container">
              <img src={product.image} alt={product.title} className="discount-img" />
              <span className="heart">♡</span>
            </div>
            <p className="discount-title-text">{product.title}</p>
            <p className="discount-price">{product.price}</p>
            <Link to={`/product/${product.id}`}>
              <button className="buy-button">Buy Now</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
