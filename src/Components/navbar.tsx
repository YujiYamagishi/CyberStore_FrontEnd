import { useState } from "react";
import { Menu, X } from "lucide-react";
import "../styles/index.css";
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">cyber</div>

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
            <li><Link to="/products">Shop</Link></li>
            <li>Contact Us</li>
            <li>Blog</li>
          </ul>
        </div>
      )}
    </nav>
  );
}
