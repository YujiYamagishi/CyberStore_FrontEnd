import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Search, ChevronLeft } from "lucide-react";
import "../../styles/products.css";

type BrandData = { name: string; total: number };

type ProductsFilterProps = {
  onFilter: (filters: { minPrice?: number; maxPrice?: number; brands?: string[] }) => void;
  brands: BrandData[];
  selectedBrands?: string[];
  minPrice?: number;
  maxPrice?: number;
  onClose?: () => void;
  showPriceFilter?: boolean;
};

const ProductsFilter: React.FC<ProductsFilterProps> = ({
  onFilter,
  brands,
  selectedBrands = [],
  minPrice,
  maxPrice,
  onClose,
  showPriceFilter = true,
}) => {
  const [localMinPrice, setLocalMinPrice] = useState<number | undefined>(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState<number | undefined>(maxPrice);
  const [localSelectedBrands, setLocalSelectedBrands] = useState<string[]>(selectedBrands);
  const [brandSearchTerm, setBrandSearchTerm] = useState("");

  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(true);

  useEffect(() => {
    setLocalSelectedBrands(selectedBrands || []);
    setLocalMinPrice(minPrice);
    setLocalMaxPrice(maxPrice);
  }, [selectedBrands, minPrice, maxPrice]);

  const handleBrandChange = (brand: string) => {
    setLocalSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleClearFilters = () => {
    setLocalMinPrice(undefined);
    setLocalMaxPrice(undefined);
    setLocalSelectedBrands([]);
    setBrandSearchTerm("");
    onFilter({});
    if (onClose) onClose();
  };

  const handleApplyFilters = () => {
    const filtersToSend: any = {};
    if (localSelectedBrands.length > 0) filtersToSend.brands = localSelectedBrands;
    if (localMinPrice !== undefined) filtersToSend.minPrice = localMinPrice;
    if (localMaxPrice !== undefined) filtersToSend.maxPrice = localMaxPrice;

    onFilter(filtersToSend);
    if (onClose) onClose();
  };

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(brandSearchTerm.toLowerCase())
  );

  return (
    <div className="filters-container">
      {onClose && (
        <div className="filters-header-mobile">
          <button onClick={onClose} className="back-button">
            <ChevronLeft size={24} />
          </button>
          <h2 className="filters-title">Filters</h2>
        </div>
      )}

      {showPriceFilter && (
        <div className="filter-section">
          <div
            className="filter-section-header"
            onClick={() => setIsPriceOpen(!isPriceOpen)}
          >
            <h4>Price</h4>
            {isPriceOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
          {isPriceOpen && (
            <div className="filter-section-body price-filter">
              <input
                type="number"
                placeholder="From"
                value={localMinPrice ?? ""}
                onChange={(e) => setLocalMinPrice(Number(e.target.value))}
                className="price-input"
              />
              <span className="price-separator">-</span>
              <input
                type="number"
                placeholder="To"
                value={localMaxPrice ?? ""}
                onChange={(e) => setLocalMaxPrice(Number(e.target.value))}
                className="price-input"
              />
            </div>
          )}
        </div>
      )}

      <div className="filter-section">
        <div
          className="filter-section-header"
          onClick={() => setIsBrandOpen(!isBrandOpen)}
        >
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
                className="search-input"
              />
            </div>
            <ul className="brand-list">
              {filteredBrands.map((brand) => (
                <li key={brand.name}>
                  <input
                    type="checkbox"
                    id={`brand-${brand.name}`}
                    checked={localSelectedBrands.includes(brand.name)}
                    onChange={() => handleBrandChange(brand.name)}
                  />
                  <label htmlFor={`brand-${brand.name}`}>
                    {brand.name} <span>({brand.total})</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={onClose ? "filter-actions-mobile" : "filter-actions-desktop"}>
        <button onClick={handleClearFilters} className="clear-button">
          {onClose ? "Clear" : "Clear Filters"}
        </button>
        <button onClick={handleApplyFilters} className="apply-button">
          Apply
        </button>
      </div>
    </div>
  );
};

export default ProductsFilter;
