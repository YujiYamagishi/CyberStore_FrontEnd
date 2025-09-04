import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Heart, ShoppingCart, User, Search } from "lucide-react";
import "../styles/index.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
    setIsOpen(false);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="navbar relative">
      <div className="navbar-container">
        <div className="navbar-logo">cyber</div>

        <div className="navbar-search hidden md:flex relative w-96">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleSearchKeyPress}
            className="w-full p-2 border rounded-md"
          />
          <button onClick={handleSearch} className="absolute right-2 top-2">
            <Search size={20} />
          </button>
        </div>

        <div className="navbar-links hidden md:flex">
          <Link to="/">Home</Link>
          <Link to="/products">Shop</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/blog">Blog</Link>
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
            <li>
              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/products" onClick={() => setIsOpen(false)}>Shop</Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
            </li>
            <li>
              <Link to="/blog" onClick={() => setIsOpen(false)}>Blog</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}