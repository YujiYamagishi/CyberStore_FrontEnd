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


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSort(value);
    onSort(value); 

  };

  const filteredBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(brandSearchTerm.toLowerCase())
  );

  return (
    <div className="filters-container">

      {}
      <button className="filter-button">
        Filters <FaSlidersH />
      </button>

      {}
      <select value={sort} onChange={handleChange} className="sort-select">
        <option value="high">By price: High to Low</option>
        <option value="low">By price: Low to High</option>
        <option value="name">By name (A-Z)</option>
      </select>

    </div>
  );
};

export default ProductsFilter;