import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search, X, ChevronLeft } from "lucide-react"; // Importe ChevronLeft
import "../../styles/products.css";

type ProductsFilterProps = {
  onFilter: (filters: { minPrice?: number; maxPrice?: number; brands?: string[] }) => void;
  brands: string[];
  onClose?: () => void;
};

const ProductsFilter: React.FC<ProductsFilterProps> = ({ onFilter, brands, onClose }) => {
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [brandSearchTerm, setBrandSearchTerm] = useState("");

  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleApplyFilters = () => {
    onFilter({ minPrice, maxPrice, brands: selectedBrands });
    if (onClose) {
      onClose();
    }
  };

  const filteredBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(brandSearchTerm.toLowerCase())
  );

  return (
    <div className="filters-container">
      {/* Cabeçalho do filtro com botão de voltar */}
      <div className="filters-header-mobile">
        {onClose && (
          <button onClick={onClose} className="back-button">
            <ChevronLeft size={24} />
          </button>
        )}
        <h2 className="filters-title">Filters</h2>
      </div>

      {/* Seção do Filtro de Preço */}
      <div className="filter-section">
        <div className="filter-section-header" onClick={() => setIsPriceOpen(!isPriceOpen)}>
          <h4>Price</h4>
          {isPriceOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        {isPriceOpen && (
          <div className="filter-section-body price-filter">
            <input
              type="number"
              placeholder="From"
              value={minPrice || ""}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="price-input"
            />
            {/* Adicionando o separador visual */}
            <span className="price-separator">-</span> 
            <input
              type="number"
              placeholder="To"
              value={maxPrice || ""}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-input"
            />
          </div>
        )}
        {isPriceOpen && ( // Adiciona o range slider aqui
            <div className="price-range-slider">
              {/* Você pode integrar uma biblioteca de range slider aqui, como react-slider */}
              {/* Por enquanto, é um placeholder */}
              <div className="slider-track">
                <div className="slider-thumb left"></div>
                <div className="slider-thumb right"></div>
              </div>
            </div>
        )}
      </div>

      {/* Seção do Filtro de Marca */}
      <div className="filter-section">
        <div className="filter-section-header" onClick={() => setIsBrandOpen(!isBrandOpen)}>
          <h4>Brand</h4>
          {isBrandOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
        {isBrandOpen && (
          <div className="filter-section-body brand-filter">
            <div className="brand-search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search"
                value={brandSearchTerm}
                onChange={(e) => setBrandSearchTerm(e.target.value)}
              />
            </div>
            <ul className="brand-list">
              {filteredBrands.map((brand) => (
                <li key={brand}>
                  <input
                    type="checkbox"
                    id={`brand-${brand}`} // Use um ID único
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                  <label htmlFor={`brand-${brand}`}>{brand}</label>
                  {/* Contagem de itens, se disponível */}
                  {/* <span className="brand-count"> (XX) </span> */} 
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button onClick={handleApplyFilters} className="apply-button">Apply</button>
    </div>
  );
};

export default ProductsFilter;