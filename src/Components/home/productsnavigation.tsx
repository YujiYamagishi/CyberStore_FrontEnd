import React, { useState, useEffect } from 'react';


import popular from '../../assets/blue buds.png';
import watch from '../../assets/applewatch.png';
import ipad from '../../assets/ipadpro.png';
import galaxy from '../../assets/galaxy-samsung.png';
import macbook from '../../assets/macbook.png';

const products = [
  {
    id: 1,
    title: 'Popular Products',
    description: 'iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.',
    images: [popular, watch],
    background: '#fff',
    color: '#000',
  },
  {
    id: 2,
    title: 'Ipad Pro',
    description: 'iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.',
    images: [ipad],
    background: '#fff',
    color: '#000',
  },
  {
    id: 3,
    title: 'Samsung Galaxy',
    description: 'iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.',
    images: [galaxy],
    background: '#f0f0f0',
    color: '#000',
  },
  {
    id: 4,
    title: 'Macbook Pro',
    description: 'iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.',
    images: [macbook],
    background: '#424040ff',
    color: '#2C2C2C',
  },
];

export default function ProductsNavigation() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isDesktop) {
    return (
      <section className="product-grid-wrapper">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-grid-card"
            style={{ backgroundColor: product.background, color: product.color }}
          >
            <div className="product-grid-images">
              {product.images.map((img, i) => (
                <img key={i} src={img} alt={product.title} />
              ))}
            </div>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <button className="product-grid-button">Shop Now</button>
          </div>
        ))}
      </section>
    );
  }

  const product = products[currentIndex];

  return (
    <section
      className="product-mobile-container"
      style={{ backgroundColor: product.background, color: product.color }}
    >
      <div className="product-nav-images">
        {product.images.map((imgSrc, i) => (
          <img
            key={i}
            src={imgSrc}
            alt={`${product.title} image ${i + 1}`}
            className="product-image"
          />
        ))}
      </div>

      <h2>{product.title}</h2>
      <p>{product.description}</p>

      <button className="button-product-nav">Shop Now</button>

      <div className="product-nav-dots">
        {products.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
          ></span>
        ))}
      </div>
    </section>
  );
}
