import { useState } from "react";
import { Menu, X, Heart, ShoppingCart, User } from "lucide-react";
import "../styles/index.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">cyber</div>

        <div className="navbar-search">
          <input type="text" placeholder="Search" />
        </div>

        <div className="navbar-links">
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">Contact Us</a>
          <a href="#">Blog</a>
        </div>

        <div className="navbar-icons">
          <Heart size={22} />
          <ShoppingCart size={22} />
          <User size={22} />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="navbar-toggle"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="navbar-mobile-menu">
          <ul>
            <li>Home</li>
            <li>Shop</li>
            <li>Contact Us</li>
            <li>Blog</li>
          </ul>
        </div>
      )}
    </nav>
  );
}
