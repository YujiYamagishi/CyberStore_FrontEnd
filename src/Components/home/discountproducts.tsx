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
        {discountProducts.length > 0 ? (
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
          <p>No discount products found.</p>
        )}
      </div>
    </section>
  );
}
