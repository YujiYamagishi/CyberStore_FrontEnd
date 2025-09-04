import React, { useState } from "react";
import {
  FaMobileAlt,
  FaLaptop,
  FaTabletAlt,
  FaHeadphones,
  FaGamepad,
  FaTv,
  FaVolumeUp,
  FaClock,
} from "react-icons/fa";

const categories = [
  { name: "Phones", icon: <FaMobileAlt /> },
  { name: "Notebooks", icon: <FaLaptop /> },
  { name: "Tablets", icon: <FaTabletAlt /> },
  { name: "Headphones", icon: <FaHeadphones /> },
  { name: "Gaming", icon: <FaGamepad /> },
  { name: "TVs", icon: <FaTv /> },
  { name: "Audio", icon: <FaVolumeUp /> },
  { name: "Smart Watches", icon: <FaClock /> },
];

export default function Browse() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 6;

  const handleScroll = (direction: "left" | "right") => {
    if (direction === "left") {
      setStartIndex((prev) =>
        prev - itemsPerPage < 0 ? categories.length - itemsPerPage : prev - itemsPerPage
      );
    } else {
      setStartIndex((prev) =>
        prev + itemsPerPage >= categories.length ? 0 : prev + itemsPerPage
      );
    }
  };

  const visibleCategories = categories.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="browse-container">
      <div className="browse-header">
        <h2>Browse By Category</h2>
        <div className="browse-arrows">
          <span onClick={() => handleScroll("left")}>{"<"}</span>
          <span onClick={() => handleScroll("right")}>{">"}</span>
        </div>
      </div>

      <div className="category-grid">
        {visibleCategories.map((category) => (
          <div key={category.name} className="category-card">
            <div className="icon">{category.icon}</div>
            <p>{category.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}