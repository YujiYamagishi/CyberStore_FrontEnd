import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../card"; 

type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
};

const tabs = ["New Arrival", "Bestseller", "Featured Product"];

export default function Suggest() {
  const [activeTab, setActiveTab] = useState("New Arrival");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      

      <section className="suggest-container">
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-button ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
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
                price={product.price}
                image={product.image}
              />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </section>
    </>
  );
}
