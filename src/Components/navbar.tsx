import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Heart,ShoppingCart, User, Search } from "lucide-react";
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
  const [isClosing, setIsClosing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("home");
  const navigate = useNavigate();
  const mobileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) mobileInputRef.current?.focus();
  }, [isOpen]);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/products?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/products");
    }
    setActiveLink("shop");
    closeMenu();
  };

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const handleLinkClick = (key: string) => {
    setActiveLink(key);
    setIsOpen(false);
  };

  return (
    <nav className="navbar relative">
      <div className="navbar-container">
        <Link
          to="/"
          className="navbar-logo"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={() => setActiveLink("home")}
        >
          cyber
        </Link>

        <form
          className="navbar-search hidden md:flex w-96"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className={`searchbar ${isSearchFocused ? "is-focused" : ""}`}>
            <button
              type="submit"
              className="searchbar__button"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="searchbar__input"
            />
          </div>
        </form>

        <div className="navbar-links hidden md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              to={link.to}
              onClick={() => handleLinkClick(link.key)}
              style={{
                color: activeLink === link.key ? "#000" : "#666",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="navbar-icons flex gap-3">
          <Link
            to="/favorites"
            aria-label="Favorites"
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <Heart size={22} />
          </Link>

          <Link
            to="/shoppingcart"
            aria-label="Cart"
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <ShoppingCart size={22} />
          </Link>

          <Link
            to="/account"
            aria-label="Account"
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <User size={22} />
          </Link>
        </div>


        <button
          onClick={() => (isOpen ? closeMenu() : setIsOpen(true))}
          className="navbar-toggle md:hidden"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className={`navbar-mobile-menu ${isClosing ? "closing" : ""}`}>
          <form
            className="navbar-search flex md:hidden w-full mb-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <div className={`searchbar ${isSearchFocused ? "is-focused" : ""}`}>
              <button
                type="submit"
                className="searchbar__button"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <input
                ref={mobileInputRef}
                type="text"
                placeholder="Search by brand or product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="searchbar__input"
              />
            </div>
          </form>

          <ul>
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link
                  to={link.to}
                  onClick={closeMenu}
                  style={{ textDecoration: "none" }}
                >
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
