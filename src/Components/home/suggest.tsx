import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar";

type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
};

const tabs = ["New Arrival", "Bestseller", "Featured Product"];

export default function Suggest() {
  const [activeTab, setActiveTab] = useState("New Arrival");
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar onSearch={(query) => setSearchQuery(query)} />

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
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-img"
                />
                <h4 className="product-title">{product.title}</h4>
                <p className="product-price">{product.price}</p>
                <Link to={`/product/${product.id}`}>
                  <button className="buy-button">Buy Now</button>
                </Link>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </section>
    </>
  );
}
