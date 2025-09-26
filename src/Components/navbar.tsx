import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Heart, ShoppingCart, User, Search } from "lucide-react";
import {
  UserButton,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";



const navLinks = [
  { to: "/", label: "Home", key: "home" },
  { to: "/products", label: "Shop", key: "shop" },
  { to: "/contact", label: "Contact Us", key: "contact" },
  { to: "/blog", label: "Blog", key: "blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("home");

  const navigate = useNavigate();
  const mobileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      mobileInputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    if (trimmed !== "") {
      navigate(`/products?q=${encodeURIComponent(trimmed)}`);
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
        {/* Logo */}
        <Link
          to="/"
          className="navbar-logo"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={() => setActiveLink("home")}
        >
          cyber
        </Link>

        {/* Search bar - desktop */}
        <form
          className="navbar-search hidden md:flex w-96"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className={`searchbar ${isSearchFocused ? "is-focused" : ""}`}>
            <button type="submit" className="searchbar__button" aria-label="Search">
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

        {/* Navigation links - desktop */}
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

        {/* Icons - always visible */}
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

          {/* Clerk Account Button */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <div className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer">
                <User size={22} />
              </div>
            </SignInButton>
          </SignedOut>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => (isOpen ? closeMenu() : setIsOpen(true))}
          className="navbar-toggle md:hidden"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className={`navbar-mobile-menu ${isClosing ? "closing" : ""}`}>
          {/* Search - mobile */}
          <form
            className="navbar-search flex md:hidden w-full mb-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <div className={`searchbar ${isSearchFocused ? "is-focused" : ""}`}>
              <button type="submit" className="searchbar__button" aria-label="Search">
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

          {/* Links - mobile */}
          <ul className="flex flex-col gap-4 px-4">
            {navLinks.map((link) => (
              <li key={link.key}>
                <Link
                  to={link.to}
                  onClick={() => handleLinkClick(link.key)}
                  style={{ textDecoration: "none", color: "#333" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Icons - mobile */}
          <div className="mobile-icons flex gap-6 mt-6 md:hidden justify-center">
            <Link
              to="/favorites"
              aria-label="Favorites"
              onClick={closeMenu}
              className="p-2 rounded-full hover:bg-gray-200 transition"
            >
              <Heart size={22} />
            </Link>

            <Link
              to="/shoppingcart"
              aria-label="Cart"
              onClick={closeMenu}
              className="p-2 rounded-full hover:bg-gray-200 transition"
            >
              <ShoppingCart size={22} />
            </Link>

            {/* Clerk Account Button - mobile */}
            <SignedIn>
              <div onClick={closeMenu}>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <div
                  onClick={closeMenu}
                  className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
                >
                  <User size={22} />
                </div>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  );
}
