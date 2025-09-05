import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function RelatedProducts({ products }: { products: any[] }) {
  return (
    <section className="related-products-section">
      <h2 className="section-title">Related Products</h2>
      <div className="related-products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="related-product-header">
              <Heart size={32} className="heart-icon"/>
            </div>
            <img src={product.url_image} alt={product.name} className="product-img" />
            <h4 className="product-title" title={product.name}>
              {product.name}
            </h4>
            <p className="product-price">${product.price}</p>
            <Link to={`/product/${product.id}`}>
              <button className="buy-button">Buy Now</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}