import React, { useState } from 'react';

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
    background: '#f0f0f0',
    color: '#000',
  },
  {
    id: 3,
    title: 'Samsung Galaxy',
    description: 'iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.',
    images: [galaxy],
    background: '#fff',
    color: '#000',
  },
  {
    id: 4,
    title: 'Macbook Pro',
    description: 'iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.',
    images: [macbook],
    background: '#ffffffff',
    color: '#000000ff',
  },
];

export default function ProductsNavigation() {
  const [currentIndex, setCurrentIndex] = useState(0);

  function goToIndex(index) {
    if (index < 0) index = products.length - 1;
    else if (index >= products.length) index = 0;
    setCurrentIndex(index);
  }

  const product = products[currentIndex];

  return (
    <section 
      className="product-nav-container" 
      style={{ backgroundColor: product.background, color: product.color, padding: '1rem', textAlign: 'center' }}
    >
      <div 
        className="product-nav-images" 
        style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}
      >
        {product.images.map((imgSrc, i) => (
          <img
            key={i}
            src={imgSrc}
            alt={`${product.title} image ${i + 1}`}
            style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'contain' }}
          />
        ))}
      </div>

      <h2 className="product-nav-title">{product.title}</h2>
      <p className="product-nav-description">{product.description}</p>
      <button className="product-nav-button" style={{ marginTop: '1rem', padding: '0.5rem 1rem', borderRadius: '5px', border: '1px solid', background: 'transparent', color: product.color, cursor: 'pointer' }}>
        Shop Now
      </button>

      <div className="product-nav-dots" style={{ marginTop: '1rem' }}>
        {products.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => goToIndex(idx)}
            style={{
              height: '10px',
              width: '10px',
              margin: '0 5px',
              display: 'inline-block',
              borderRadius: '50%',
              backgroundColor: idx === currentIndex ? product.color : '#ccc',
              cursor: 'pointer',
            }}
          ></span>
        ))}
      </div>
    </section>
  );
}
