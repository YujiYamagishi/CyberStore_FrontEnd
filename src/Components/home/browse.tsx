import React, { useState } from "react";
import {
  FaMobileAlt,
  FaCamera,
  FaHeadphones,
  FaDesktop,
  FaGamepad,
  FaClock,
  FaTabletAlt,
  FaTv,
  FaKeyboard,
} from "react-icons/fa";

const categories = [
  { name: "Phones", icon: <FaMobileAlt /> },
  { name: "Smart Watches", icon: <FaClock /> },
  { name: "Cameras", icon: <FaCamera /> },
  { name: "Headphones", icon: <FaHeadphones /> },
  { name: "Computers", icon: <FaDesktop /> },
  { name: "Gaming", icon: <FaGamepad /> },
  { name: "Tablets", icon: <FaTabletAlt /> },
  { name: "TVs", icon: <FaTv /> },
  { name: "Keyboards", icon: <FaKeyboard /> },
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
