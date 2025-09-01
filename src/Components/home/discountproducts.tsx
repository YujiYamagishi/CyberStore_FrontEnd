import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
};

export default function DiscountProducts() {
  const [discountProducts, setDiscountProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/discountProducts.json")
      .then((res) => res.json())
      .then((data) => setDiscountProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  return (
    <section className="discount-section">
      <h2 className="discount-title">Discounts up to -50%</h2>

      <div className="discount-grid">
        {discountProducts.map((product) => (
          <div className="discount-card" key={product.id}>
            <div className="discount-image-container">
              <img
                src={product.image}
                alt={product.title}
                className="discount-img"
              />
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
