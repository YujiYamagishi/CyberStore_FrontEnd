import React, { useState, useEffect } from "react";
import ProductCard from "../Card";


type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
};

const tabs = [
  { label: "New Arrival", value: "new_arrival" },
  { label: "Bestseller", value: "bestseller" },
  { label: "Featured Product", value: "featured_product" },
];

export default function Suggest() {

  const [activeTab, setActiveTab] = useState(tabs[0].value);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    (import.meta.env.REACT_APP_API_URL as string) || "http://localhost:8000";


  async function fetchProducts(tag: string) {
    try {
      setLoading(true);

      const url = `${API_URL}/api/products/tag/${encodeURIComponent(tag)}`;
      const res = await fetch(url, { mode: "cors" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const payload = await res.json();
      const list = Array.isArray(payload) ? payload : payload?.data || [];
      const shuffledList = [...list].sort(() => Math.random() - 0.5);
      const mapped: Product[] = shuffledList .map((p: any) => ({
        id: p.id,
        title: p.name ?? p.title ?? "",
        price: String(p.price ?? ""),
        image: p.url_image ?? "",
      }));


      setProducts(mapped);
    } catch (e) {
      console.error("Suggest fetch error:", e);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts(activeTab);
  }, [activeTab]);

  return (
    <section className="suggest-container">
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`tab-button ${activeTab === tab.value ? "active" : ""}`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>


      <div className="product-grid">
        {loading ? (
          <p>Loading products...</p>
        ) : products.length > 0 ? (
          products.slice(0, 8).map((product) => (
<ProductCard
  key={product.id}
  id={product.id}
  title={product.title}
  price={`$${product.price}`}   
  image={product.image}
/>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </section>

  );
}
