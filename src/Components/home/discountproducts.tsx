import React, { useEffect, useState } from "react";
import ProductCard from "../card";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function DiscountProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    (import.meta.env.REACT_APP_API_URL as string) || "http://localhost:8000";

  async function fetchProducts() {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/products/tag/discount_up_to_50`, {
        mode: "cors",
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const payload = await res.json();

      const list = Array.isArray(payload.data) ? payload.data : [];

      
 
      const mapped: Product[] = list.map((p: any) => ({
        id: p.id,
        title: p.name ?? p.title ?? "",
        price: (Number(p.price) || 0) * 0.5, 
        image: p.url_image ?? "",
      }));

      setProducts(mapped);
    } catch (err) {
      console.error("Error loading products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="discount-section">
      <h2 className="discount-title">Discounts up to 50%</h2>

      <div className="discount-grid">
        {loading ? (
          <p>Loading products...</p>
        ) : products.length > 0 ? (
        
          products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              price={`$${product.price.toFixed(2)}`} 
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </section>
  );
}