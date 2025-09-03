
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Heart, ShoppingCart, User, Search } from "lucide-react";
import "../styles/index.css";

const navLinks = [
  { to: "/", label: "Home", key: "home" },
  { to: "/products", label: "Shop", key: "shop" },
  { to: "/contact", label: "Contact Us", key: "contact" },
  { to: "/blog", label: "Blog", key: "blog" },
];

export default function Navbar() {

  console.log("Componente Navbar renderizou!");

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("home");
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

  const handleLinkClick = (key: string) => {
    setActiveLink(key);
    setIsOpen(false);
  };

  return (
    <nav className="navbar relative">
      <div className="navbar-container">
        <div className="navbar-logo">cyber</div>

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
          {navLinks.map((link) => (
            <Link
              key={link.key} 
              to={link.to}
              onClick={() => handleLinkClick(link.key)}
              style={{ color: activeLink === link.key ? "#000" : "#666" }}
            >
              {link.label}
            </Link>
          ))}
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
         
          <ul>
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link to={link.to} onClick={() => handleLinkClick(link.key)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}