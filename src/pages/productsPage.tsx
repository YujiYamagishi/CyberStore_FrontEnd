import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import ProductsFilter from "../Components/productsPage/productsFilter";
import ProductCard from "../Components/card";
import "../styles/products.css";



type Product = {
  id: number;
  title: string;
  price: string;
  image: string;

};


const priceToNumber = (value: string): number => {
  const clean = value.replace(/[^\d.,-]/g, "").replace(/,/g, "");
  const n = parseFloat(clean);
  return isNaN(n) ? 0 : n;
};


export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState("high");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("search") || "";

  
  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        
        const normalized = (data.products || []).map((p: any) => ({
          ...p,
          price: String(p.price),
        }));
        setProducts(normalized);
      })
      .catch(() => setProducts([])); 
  }, []);

  
  useEffect(() => {
    let result = query
      ? products.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : products;

    if (sortOption === "high") {
      result = [...result].sort(
        (a, b) => priceToNumber(b.price) - priceToNumber(a.price)
      );
    } else if (sortOption === "low") {
      result = [...result].sort(
        (a, b) => priceToNumber(a.price) - priceToNumber(b.price)
      );
    } else if (sortOption === "name") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredProducts(result);
    setCurrentPage(1); 
  }, [products, query, sortOption]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <main className="products-page">
      <ProductsFilter onSort={setSortOption} />

      <p className="products-count">
        Products Result: <strong>{filteredProducts.length}</strong>
      </p>

      <div className="products-grid">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((p) => <ProductCard key={p.id} {...p} />)
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn prev"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`page-btn ${currentPage === page ? "active" : ""}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="page-btn next"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            &gt;
          </button>

        </div>
      )}
    </main>
  );
}