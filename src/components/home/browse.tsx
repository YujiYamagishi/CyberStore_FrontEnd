import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";

// 1. Definição da URL da API dinâmica
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const iconMap: Record<string, React.ReactNode> = {
    Phones: <FaMobileAlt />,
    Notebooks: <FaLaptop />,
    Tablets: <FaTabletAlt />,
    Headphones: <FaHeadphones />,
    Gaming: <FaGamepad />,
    TVs: <FaTv />,
    Audio: <FaVolumeUp />,
    "Smart Watches": <FaClock />,
};

export default function Browse() {
    const [categories, setCategories] = useState<string[]>([]);
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 6;
    const navigate = useNavigate();

    useEffect(() => {
        // CORREÇÃO: Usando API_URL para buscar categorias
        fetch(`${API_URL}/api/categories`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => setCategories(data.categories || []))
            .catch((err) => console.error("Erro ao carregar categorias:", err));
    }, []); // Array de dependências vazio para rodar apenas no mount

    const handleScroll = (direction: "left" | "right") => {
        if (direction === "left") {
            setStartIndex((prev) =>
                prev - itemsPerPage < 0 ? categories.length - (categories.length % itemsPerPage || itemsPerPage) : prev - itemsPerPage
            );
        } else {
            setStartIndex((prev) =>
                prev + itemsPerPage >= categories.length ? 0 : prev + itemsPerPage
            );
        }
    };

    const visibleCategories = categories.slice(startIndex, startIndex + itemsPerPage);

    const handleCategoryClick = (category: string) => {
        navigate(`/products?category=${encodeURIComponent(category)}`);
    };

    return (
        <section className="browse-container">
            <div className="browse-header">
                <h2>Browse By Category</h2>
                <div className="browse-arrows">
                    {/* Botões de navegação */}
                    <span onClick={() => handleScroll("left")}>{"<"}</span>
                    <span onClick={() => handleScroll("right")}>{">"}</span>
                </div>
            </div>

            <div className="category-grid">
                {visibleCategories.map((category) => (
                    <div
                        key={category}
                        className="category-card"
                        onClick={() => handleCategoryClick(category)}
                    >
                        <div className="icon">{iconMap[category] || <FaMobileAlt />}</div>
                        <p>{category}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}