import { useState } from "react";


import "../styles/index.css";
import { Link } from 'react-router-dom';

import { Menu, X, Heart, ShoppingCart, User, Search } from "lucide-react";




type NavbarProps = {
  onSearch: (query: string) => void;
};

export default function Navbar({ onSearch }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearch(value); 
  };

  return (
    <nav className="navbar relative">
      <div className="navbar-container">
        <div className="navbar-logo">cyber</div>

        {}
        <div className="navbar-search hidden md:flex relative w-96">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <button className="absolute right-2 top-2">
            <Search size={20} />
          </button>
        </div>

        {}
        <div className="navbar-links hidden md:flex">
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">Contact Us</a>
          <a href="#">Blog</a>
        </div>

        {}
        <div className="navbar-icons">
          <Heart size={22} />
          <ShoppingCart size={22} />
          <User size={22} />
        </div>

        {}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="navbar-toggle md:hidden"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {}
      {isOpen && (
        <div className="navbar-mobile-menu">
          {}
          <div className="navbar-search flex md:hidden relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
            <button className="absolute right-2 top-2">
              <Search size={20} />
            </button>
          </div>

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
