import React from 'react';
import { FaMobileAlt, FaCamera, FaHeadphones, FaDesktop, FaGamepad, FaClock } from 'react-icons/fa';

const categories = [
  { name: 'Phones', icon: <FaMobileAlt /> },
  { name: 'Smart Watches', icon: <FaClock /> },
  { name: 'Cameras', icon: <FaCamera /> },
  { name: 'Headphones', icon: <FaHeadphones /> },
  { name: 'Computers', icon: <FaDesktop /> },
  { name: 'Gaming', icon: <FaGamepad /> },
];

export default function Browse() {
  return (
    <section className="browse-container">
      <div className="browse-header">
        <h2>Browse By Category</h2>
        <div className="browse-arrows">
          <span>{'<'}</span>
          <span>{'>'}</span>
        </div>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
          <div key={category.name} className="category-card">
            <div className="icon">{category.icon}</div>
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
