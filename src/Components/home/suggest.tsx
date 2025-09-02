import React, { useEffect, useState } from "react";
import ProductCard from "../card"; 
type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
};

export default function DiscountProducts() {
  const [discountProducts, setDiscountProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/discountProducts.json")
      .then((res) => res.json())
      .then((data) => {
        setDiscountProducts(data.products); 
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="discount-section">
      <h2 className="discount-title">Discounts up to -50%</h2>

      <div className="discount-grid">
        {loading ? (
          <p>Loading products...</p>
        ) : discountProducts.length > 0 ? (
          discountProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          ))
        ) : (
          <p>No discounted products found.</p>
        )}
      </div>
    </section>
  );
}
