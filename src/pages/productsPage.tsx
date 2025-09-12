import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductsFilter from "../components/productsPage/productsFilter";
import ProductCard from "../components/card";
import useMediaQuery from "../hooks/useMediaQuery";
import Breadcrumb from "../components/Breadcrumb";
import "../styles/products.css";

const API_BASE_URL = "http://localhost:8000";

type Product = {
  id: number;
  name: string;
  price: number;
  url_image: string;
  brand: string;
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

  const params = new URLSearchParams(location.search);
  const query = params.get("search") || params.get("q") || "";
  const categoryParam = params.get("category");
  const categoryToFetch = categoryParam || "Phones";

  const crumbs = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: categoryToFetch, path: `/products?category=${categoryToFetch}` },
  ];

  useEffect(() => {
    setCurrentPage(1);
  }, [query, currentFilters, categoryToFetch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsUrl = new URL(
          `${API_BASE_URL}/api/products/category/${categoryToFetch}`
        );
        productsUrl.searchParams.append("limit", itemsPerPage.toString());
        productsUrl.searchParams.append("page", currentPage.toString());

        if (sortOption === "high") {
          productsUrl.searchParams.append("sort", "price");
          productsUrl.searchParams.append("order", "desc");
        } else if (sortOption === "low") {
          productsUrl.searchParams.append("sort", "price");
          productsUrl.searchParams.append("order", "asc");
        }

        if (currentFilters.minPrice !== undefined)
          productsUrl.searchParams.append(
            "minPrice",
            currentFilters.minPrice.toString()
          );
        if (currentFilters.maxPrice !== undefined)
          productsUrl.searchParams.append(
            "maxPrice",
            currentFilters.maxPrice.toString()
          );

        if (currentFilters.brands && currentFilters.brands.length > 0) {
          productsUrl.searchParams.append(
            "brands",
            currentFilters.brands.join(",")
          );
        }

        if (query) {
          const matchingBrand = availableBrands.find(
            (b) => b.name.toLowerCase() === query.toLowerCase()
          );
          if (matchingBrand) {
            productsUrl.searchParams.append("brands", matchingBrand.name);
          } else {
            productsUrl.searchParams.append("search", query);
          }
        }

        const productsResponse = await fetch(productsUrl.toString());
        if (!productsResponse.ok) throw new Error("Erro na resposta da API");
        const productsData = await productsResponse.json();
        const productsArray: Product[] = productsData.data || [];

        setProducts(productsArray);
        setTotalItems(productsData.metadata?.total_items || 0);
        const allProductsUrl = new URL(
          `${API_BASE_URL}/api/products/category/${categoryToFetch}`
        );
        allProductsUrl.searchParams.append("limit", "9999");

        if (currentFilters.minPrice !== undefined)
          allProductsUrl.searchParams.append(
            "minPrice",
            currentFilters.minPrice.toString()
          );
        if (currentFilters.maxPrice !== undefined)
          allProductsUrl.searchParams.append(
            "maxPrice",
            currentFilters.maxPrice.toString()
          );

        if (query) allProductsUrl.searchParams.append("search", query);

        const allProductsResponse = await fetch(allProductsUrl.toString());
        const allProductsData = await allProductsResponse.json();
        const allProductsArray: Product[] = allProductsData.data || [];

        const uniqueBrandsMap = new Map<string, number>();
        allProductsArray.forEach((product) => {
          uniqueBrandsMap.set(
            product.brand,
            (uniqueBrandsMap.get(product.brand) || 0) + 1
          );
        });

        const fetchedBrands: BrandData[] = Array.from(
          uniqueBrandsMap,
          ([name, total]) => ({ name, total })
        );

        setAvailableBrands(fetchedBrands);
      } catch (error) {
        setProducts([]);
        setAvailableBrands([]);
        setTotalItems(0);
      }
    };

    fetchProducts();
  }, [
    currentPage,
    sortOption,
    currentFilters,
    itemsPerPage,
    query,
    categoryToFetch,
    availableBrands,
  ]);

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

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => setCurrentPage(1)}
          className="pagination-button"
        >
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
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className="pagination-button"
        >
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
              products.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  title={p.name}
                  image={p.url_image}
                  price={`$${p.price}`}
                />
              ))
            ) : (
              <p>No products found.</p>
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
              showPriceFilter={false}
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
                products.map((p) => (
                  <ProductCard
                    key={p.id}
                    id={p.id}
                    title={p.name}
                    image={p.url_image}
                    price={`$${p.price}`}
                  />
                ))
              ) : (
                <p>No products found.</p>
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
            onFilter={(filters) => setCurrentFilters(filters)}
            onClose={() => setIsFilterModalOpen(false)}
            showPriceFilter={true}
          />
        </div>
      )}
    </main>
  );
}
