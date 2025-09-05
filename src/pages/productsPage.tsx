import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductsFilter from "../components/productsPage/productsFilter";
import ProductCard from "../components/card";
import useMediaQuery from "../hooks/useMediaQuery";
import "../styles/products.css";

const API_BASE_URL = "http://localhost:8000";

type Product = {
  id: number;
  name: string;
  price: number;
  url_image: string;
};

type Filter = {
  minPrice?: number;
  maxPrice?: number;
  brands?: string[];
};

type BrandData = {
  name: string;
  total: number;
};

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
  const query = new URLSearchParams(location.search).get("search") || "";
  const category = new URLSearchParams(location.search).get("category") || "";

  useEffect(() => {
    const fetchProductsAndBrands = async () => {
      const categoryToFetch = category || "all";
      const productsUrl = new URL(
        `${API_BASE_URL}/api/products/category/${categoryToFetch}`
      );
      const brandsUrl = `${API_BASE_URL}/api/products/brands`;

      productsUrl.searchParams.append("limit", itemsPerPage.toString());
      productsUrl.searchParams.append("page", currentPage.toString());

      if (sortOption === "high") {
        productsUrl.searchParams.append("sort", "price");
        productsUrl.searchParams.append("order", "desc");
      } else if (sortOption === "low") {
        productsUrl.searchParams.append("sort", "price");
        productsUrl.searchParams.append("order", "asc");
      }

      if (query) productsUrl.searchParams.append("q", query);

      if (currentFilters.minPrice)
        productsUrl.searchParams.append("minPrice", currentFilters.minPrice.toString());
      if (currentFilters.maxPrice)
        productsUrl.searchParams.append("maxPrice", currentFilters.maxPrice.toString());
      if (currentFilters.brands && currentFilters.brands.length > 0) {
        productsUrl.searchParams.append("brands", currentFilters.brands.join(","));
      }

      try {
        const [productsResponse, brandsResponse] = await Promise.all([
          fetch(productsUrl.toString()),
          fetch(brandsUrl)
        ]);

        if (!productsResponse.ok) {
          throw new Error("Erro na resposta da API de produtos: " + productsResponse.statusText);
        }
        if (!brandsResponse.ok) {
          throw new Error("Erro na resposta da API de marcas: " + brandsResponse.statusText);
        }

        const productsData = await productsResponse.json();
        const brandsData = await brandsResponse.json();

        const productsArray = productsData.data || [];

        const brandsArray = brandsData.data || [];
        const fetchedBrands = Array.isArray(brandsArray) ? brandsArray.map((item: any) => ({
            name: item.brand,
            total: item.total
        })) : [];

        const total = productsData.metadata?.total_items || productsArray.length;

        setProducts(productsArray);
        setAvailableBrands(fetchedBrands);
        setTotalItems(total);

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setProducts([]);
        setAvailableBrands([]);
        setTotalItems(0);
      }
    };

    fetchProductsAndBrands();
  }, [currentPage, query, sortOption, currentFilters, itemsPerPage, category]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
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
    return buttons;
  };

  return (
    <main className="products-page">
      {!isDesktop && (
        <>
          <div className="filters-and-sort-bar">
            <button
              className="filter-button"
              onClick={() => setIsFilterModalOpen(true)}
            >
              Filters
            </button>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="sort-select"
            >
              <option value="high">By price: High to Low</option>
              <option value="low">By price: Low to High</option>
            </select>
          </div>
          <p className="products-count">
            Products Result: <strong>{totalItems}</strong>
          </p>
          <div className="products-grid">
            {products.length > 0 ? (
              products.map((p) => <ProductCard key={p.id} {...p} />)
            ) : (
              <p>Nenhum produto encontrado.</p>
            )}
          </div>
        </>
      )}

      {isDesktop && (
        <div className="desktop-only">
          <aside className="desktop-filters-sidebar">
            <ProductsFilter
              brands={availableBrands}
              onFilter={setCurrentFilters}
            />
          </aside>
          <div className="products-content">
            <div className="products-header">
              <p className="products-count">
                Products Result: <strong>{totalItems}</strong>
              </p>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="sort-select"
              >
                <option value="high">By price: High to Low</option>
                <option value="low">By price: Low to High</option>
              </select>
            </div>
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
        <div className="pagination">{renderPaginationButtons()}</div>
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