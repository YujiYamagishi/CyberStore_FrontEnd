import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductsFilter from "../components/productsPage/productsFilter";
import ProductCard from "../components/card";
import useMediaQuery from "../hooks/useMediaQuery";
import "../styles/products.css";

type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
  brand: string;
};

type Filter = {
  minPrice?: number;
  maxPrice?: number;
  brands?: string[];
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [sortOption, setSortOption] = useState("high");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<Filter>({});

  const isDesktop = useMediaQuery("(min-width: 769px)");
  const itemsPerPage = isDesktop ? 9 : 8;

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("search") || "";
  const category = new URLSearchParams(location.search).get("category") || "Phones";

  useEffect(() => {
    fetch("/brands.json")
      .then((res) => res.json())
      .then((data) => setAvailableBrands(data.brands || []))
      .catch(() => setAvailableBrands([]));
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const url = new URL(`http://localhost:8080/api/products/category/${category}`);
      url.searchParams.append("limit", itemsPerPage.toString());
      url.searchParams.append("page", currentPage.toString());
      
      if (sortOption === "high") {
        url.searchParams.append("sort", "price");
        url.searchParams.append("order", "desc");
      } else if (sortOption === "low") {
        url.searchParams.append("sort", "price");
        url.searchParams.append("order", "asc");
      }

      if (currentFilters.minPrice) url.searchParams.append("minPrice", currentFilters.minPrice.toString());
      if (currentFilters.maxPrice) url.searchParams.append("maxPrice", currentFilters.maxPrice.toString());
      if (currentFilters.brands && currentFilters.brands.length > 0) {
        url.searchParams.append("brands", currentFilters.brands.join(","));
      }

      try {
        const response = await fetch(url.toString());
        const data = await response.json();
        setProducts(data.products);
        setTotalItems(data.metadata.total_items);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        setProducts([]);
        setTotalItems(0);
      }
    };

    fetchProducts();
  }, [currentPage, query, sortOption, currentFilters, itemsPerPage, category]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <main className="products-page">
      {!isDesktop ? (
        <>
          <div className="filters-and-sort-bar">
            <button className="filter-button" onClick={() => setIsFilterModalOpen(true)}>
              Filters
            </button>
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="sort-select">
              <option value="high">By price: High to Low</option>
              <option value="low">By price: Low to High</option>
            </select>
          </div>
          <p className="products-count">Products Result: <strong>{totalItems}</strong></p>
          <div className="products-grid">
            {products.length > 0 ? (
              products.map((p) => <ProductCard key={p.id} {...p} />)
            ) : (
              <p>Nenhum produto encontrado.</p>
            )}
          </div>
        </>
      ) : (
        <div className="products-grid-container">
          <aside className="desktop-filters-sidebar">
            <ProductsFilter
              brands={availableBrands}
              onFilter={setCurrentFilters}
            />
          </aside>
          <div className="products-content">
            <div className="desktop-sort-bar">
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="sort-select">
                    <option value="high">By price: High to Low</option>
                    <option value="low">By price: Low to High</option>
                </select>
            </div>
            <p className="products-count">Products Result: <strong>{totalItems}</strong></p>
            <div className="products-grid">
              {products.length > 0 ? (
                products.map((p) => <ProductCard key={p.id} {...p} />)
              ) : (
                <p>Nenhum produto encontrado.</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {totalPages > 1 && (
        <div className="pagination">
        </div>
      )}

      {isFilterModalOpen && (
        <div className="filter-modal">
          <ProductsFilter
            brands={availableBrands}
            onFilter={setCurrentFilters}
            onClose={() => setIsFilterModalOpen(false)}
          />
        </div>
      )}
    </main>
  );
}