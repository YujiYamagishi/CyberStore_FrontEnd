import { Link } from 'react-router-dom';
import iphone14gold from '../../assets/iphone14gold.png';
import airpods from '../../assets/airpods.png';
import watch from '../../assets/applewatch.png';
import iphone14white from '../../assets/iphone14white.png';
import { Heart } from 'lucide-react';

const relatedProductsData = [
  {
    id: 1,
    title: 'Apple iPhone 14 Pro 512GB Gold',
    price: '$900',
    image: iphone14gold,
  },
  {
    id: 4,
    title: 'AirPods Max Silver',
    price: '$549',
    image: airpods,
  },
  {
    id: 3,
    title: 'Apple Watch Series 9 GPS 41mm',
    price: '$399',
    image: watch,
  },
  {
    id: 8,
    title: 'Apple iPhone 14 Pro 1TB Gold',
    price: '$1499',
    image: iphone14white,
  },
];

export default function RelatedProducts() {
  return (
    <section className="related-products-section">
      <h2 className="section-title">Related Products</h2>
      <div className="related-products-grid">
        {relatedProductsData.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="related-product-header">
              <Heart size={20} className="heart-icon"/>
            </div>
            <img src={product.image} alt={product.title} className="product-img" />
            <h4 className="product-title">{product.title}</h4>
            <p className="product-price">{product.price}</p>
            <Link to={`/product/${product.id}`}>
              <button className="buy-button">Buy Now</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}