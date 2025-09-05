import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Heart, ShoppingCart, User, Search } from "lucide-react";
import "../styles/index.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate("/products");
    }
    setActiveLink("shop");
    setIsOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <nav className="navbar relative">
      <div className="navbar-container">
        {/* Logo clicável sem underline */}
        <Link
          to="/"
          className="navbar-logo"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={() => setActiveLink("home")}
        >
          cyber
        </Link>

        <div className="navbar-search hidden md:flex w-96">
          <div className={`searchbar ${isSearchFocused ? "is-focused" : ""}`}>
            <button
              type="button"
              className="searchbar__button"
              aria-label="Search"
              onClick={handleSearch}
            >
              <Search size={18} />
            </button>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onKeyDown={handleKeyPress}
              className="searchbar__input"
            />
          </div>
        </div>

        <div className="navbar-links hidden md:flex">
          <Link
            to="/"
            onClick={() => setActiveLink("home")}
            style={{ color: activeLink === "home" ? "#000" : "#666", textDecoration: "none" }}
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setActiveLink("shop")}
            style={{ color: activeLink === "shop" ? "#000" : "#666", textDecoration: "none" }}
          >
            Shop
          </Link>
          <Link
            to="/contact"
            onClick={() => setActiveLink("contact")}
            style={{ color: activeLink === "contact" ? "#000" : "#666", textDecoration: "none" }}
          >
            Contact Us
          </Link>
          <Link
            to="/blog"
            onClick={() => setActiveLink("blog")}
            style={{ color: activeLink === "blog" ? "#000" : "#666", textDecoration: "none" }}
          >
            Blog
          </Link>
        </div>

        <div className="navbar-icons">
          <Heart size={22} />
          <ShoppingCart size={22} />
          <User size={22} />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="navbar-toggle md:hidden"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="navbar-mobile-menu">
          <div className="navbar-search flex md:hidden w-full mb-4">
            <div className={`searchbar ${isSearchFocused ? "is-focused" : ""}`}>
              <button
                type="button"
                className="searchbar__button"
                aria-label="Search"
                onClick={handleSearch}
              >
                <Search size={18} />
              </button>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                onKeyDown={handleKeyPress}
                className="searchbar__input"
              />
            </div>
          </div>

          <ul>
            <li>
              <Link to="/" onClick={() => setIsOpen(false)} style={{ textDecoration: "none" }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" onClick={() => setIsOpen(false)} style={{ textDecoration: "none" }}>
                Shop
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setIsOpen(false)} style={{ textDecoration: "none" }}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={() => setIsOpen(false)} style={{ textDecoration: "none" }}>
                Blog
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
