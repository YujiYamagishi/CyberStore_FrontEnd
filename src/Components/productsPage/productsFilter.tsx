import React, { useState } from "react";
import { FaSlidersH } from "react-icons/fa"; // ícone do filtro

const ProductsFilter: React.FC<{ onSort: (value: string) => void }> = ({ onSort }) => {
  const [sort, setSort] = useState("high");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSort(value);
    onSort(value); 
  };

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
