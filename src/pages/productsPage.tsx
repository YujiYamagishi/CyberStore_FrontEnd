import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductsFilter from "../components/productsPage/productsFilter";
import ProductCard from "../components/card";
import useMediaQuery from "../hooks/useMediaQuery";
import Breadcrumb from "../components/Breadcrumb";
import "../styles/products.css";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

type Product = {
  id: number;
  name: string;
  price: number;
  url_image: string;
  brand: string;
};

type Filter = { minPrice?: number; maxPrice?: number; brands?: string[] };
type BrandData = { name: string; total: number };

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [availableBrands, setAvailableBrands] = useState<BrandData[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [sortOption, setSortOption] = useState("high");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<Filter>({});

  const isDesktop = useMediaQuery("(min-width: 769px)");
  const itemsPerPage = isDesktop ? 9 : 8;

  const location = useLocation();
  const categoryParam = new URLSearchParams(location.search).get("category");
  const categoryToFetch = categoryParam || "Phones";

  const crumbs = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: categoryToFetch, path: `/products?category=${categoryToFetch}` },
  ];

  const applyFilters = (filters: Filter) => {
    setCurrentPage(1);
    setCurrentFilters(filters);
  };

  // Fetch produtos via POST
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const payload = {
          page: currentPage,
          limit: itemsPerPage,
          sort: "price",
          order: sortOption === "high" ? "desc" : "asc",
          ...currentFilters,
        };

        console.log("[ProductsPage] POST payload:", payload);

        const res = await axios.post(
          `${API_BASE_URL}/api/products/category/${categoryToFetch}`,
          payload
        );

        console.log("[ProductsPage] JSON response:", res.data);

        setProducts(res.data.data || []);
        setTotalItems(res.data.metadata?.total_items || 0);

        // Atualiza marcas disponíveis
        const brandsMap: Record<string, number> = {};
        res.data.data?.forEach((p: Product) => {
          brandsMap[p.brand] = (brandsMap[p.brand] || 0) + 1;
        });
        setAvailableBrands(
          Object.entries(brandsMap).map(([name, total]) => ({ name, total }))
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [currentPage, sortOption, itemsPerPage, categoryToFetch, currentFilters]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisible = 5;

    buttons.push(
      <button
        key="prev"
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className="pagination-button prev"
      >
        &lt;
      </button>
    );

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);
    if (currentPage <= 3) end = Math.min(totalPages, maxVisible);
    if (currentPage >= totalPages - 2) start = Math.max(1, totalPages - (maxVisible - 1));

    if (start > 1) {
      buttons.push(
        <button key={1} onClick={() => setCurrentPage(1)} className="pagination-button">
          1
        </button>
      );
      if (start > 2) buttons.push(<span key="start-ellipsis" className="ellipsis">...</span>);
    }

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`pagination-button ${i === currentPage ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }

    if (end < totalPages) {
      if (end < totalPages - 1) buttons.push(<span key="end-ellipsis" className="ellipsis">...</span>);
      buttons.push(
        <button key={totalPages} onClick={() => setCurrentPage(totalPages)} className="pagination-button">
          {totalPages}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className="pagination-button next"
      >
        &gt;
      </button>
    );

    return buttons;
  };

  return (
    <main className="products-page">
      <div className="breadcrumb-container">
        <Breadcrumb crumbs={crumbs} />
      </div>

      {!isDesktop && (
        <>
          <div className="filters-and-sort-bar">
            <button className="filter-button" onClick={() => setIsFilterModalOpen(true)}>Filters</button>
            <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="sort-select">
              <option value="high">By price: High to Low</option>
              <option value="low">By price: Low to High</option>
            </select>
          </div>
          <p className="products-count">Products Result: <strong>{totalItems}</strong></p>
          <div className="products-grid">
            {products.length > 0 ? products.map((p) => <ProductCard key={p.id} id={p.id} title={p.name} image={p.url_image} price={`$${p.price}`} />) : <p>Nenhum produto encontrado.</p>}
          </div>
        </>
      )}

      {isDesktop && (
        <div className="desktop-only">
          <aside className="desktop-filters-sidebar">
            <ProductsFilter
              brands={availableBrands}
              selectedBrands={currentFilters.brands || []}
              onFilter={applyFilters}
              showPriceFilter={false}
            />
          </aside>
          <div className="products-content">
            <div className="products-header">
              <p className="products-count">Products Result: <strong>{totalItems}</strong></p>
              <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="sort-select">
                <option value="high">By price: High to Low</option>
                <option value="low">By price: Low to High</option>
              </select>
            </div>
            <div className="products-grid">
              {products.length > 0 ? products.map((p) => <ProductCard key={p.id} id={p.id} title={p.name} image={p.url_image} price={`$${p.price}`} />) : <p>Nenhum produto encontrado.</p>}
            </div>
          </div>
        </div>
      )}

      {totalPages > 1 && <div className="pagination">{renderPaginationButtons()}</div>}

      {isFilterModalOpen && (
        <div className="filter-modal">
          <ProductsFilter
            brands={availableBrands}
            selectedBrands={currentFilters.brands || []}
            minPrice={currentFilters.minPrice}
            maxPrice={currentFilters.maxPrice}
            onFilter={applyFilters}
            onClose={() => setIsFilterModalOpen(false)}
            showPriceFilter={true}
          />
        </div>
      )}
    </main>
  );
}
