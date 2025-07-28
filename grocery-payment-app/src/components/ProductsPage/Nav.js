import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // <-- add useNavigate
import "bootstrap/dist/css/bootstrap.min.css";
import "./Nav.css";

const Nav = () => {
  const [query, setQuery] = useState(""); // state for input
  const navigate = useNavigate(); // hook for navigation

  const handleSearch = (e) => {
    e.preventDefault();

    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg px-3">
      <Link className="navbar-brand fw-bold logo" to="/">
        🛒 GroceryPay
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent">
        <span className="navbar-toggler-icon" />
      </button>

      <div
        className="collapse navbar-collapse justify-content-between"
        id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/products">Our Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cart">Cart</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/orders">Orders</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/checkout">Checkout</Link>
          </li>
        </ul>

        <form className="d-flex" role="search" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            aria-label="Search"
          />
          <button className="btn" type="submit">
            <FaSearch />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Nav;
