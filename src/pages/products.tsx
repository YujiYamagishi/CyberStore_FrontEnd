import React, { useState } from "react";
import ProductsFilter from "../Components/productsPage/productsFilter";
import ProductCard from "../Components/card";
import "../styles/products.css";

import iphone14gold from "../assets/iphone14gold.png";

const productsData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Produto Demo ${i + 1}`,
  price: `$${(i + 1) * 50}`,
  image: iphone14gold,
}));

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = productsData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(productsData.length / itemsPerPage);

  return (
    <main className="products-page">
      <ProductsFilter onSort={() => {}} />

      <p className="products-count">
        Products Result: <strong>{productsData.length}</strong>
      </p>

      <div className="products-grid">
        {paginatedProducts.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>

      {/* Paginação */}
      <div className="pagination">
        {/* Botão Anterior */}
        <button
          className="page-btn prev"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          &lt;
        </button>

        {/* Números da paginação */}
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((page) => {
            // mostra sempre primeira e última
            if (page === 1 || page === totalPages) return true;
            // mostra as 2 próximas e anteriores da página atual
            if (page >= currentPage - 1 && page <= currentPage + 1) return true;
            return false;
          })
          .map((page, idx, arr) => (
            <React.Fragment key={page}>
              {/* Adiciona reticências quando há "pulo" */}
              {idx > 0 && arr[idx - 1] !== page - 1 && (
                <span className="dots">...</span>
              )}
              <button
                className={`page-btn ${currentPage === page ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </React.Fragment>
          ))}

        {/* Botão Próximo */}
        <button
          className="page-btn next"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          &gt;
        </button>
      </div>
    </main>
  );
}
