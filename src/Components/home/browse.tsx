import React, { useRef } from 'react';
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="browse-container">
      <div className="browse-header">
        <h2>Browse By Category</h2>
        <div className="browse-arrows">
          <span onClick={() => scroll('left')}>{'<'}</span>
          <span onClick={() => scroll('right')}>{'>'}</span>
        </div>
      </div>

      <div className="category-grid" ref={scrollRef}>
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
