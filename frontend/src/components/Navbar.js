import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">VibeCommerce</h2>
      <div className="links">
        <Link to="/">Products</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </nav>
  );
}
