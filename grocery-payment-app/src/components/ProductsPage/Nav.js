import React from "react";
import { FaSearch } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./Nav.css"

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg  px-3">
      {/* Logo */}
      <Link className="navbar-brand fw-bold logo" to="/">
        🛒 GroceryPay
      </Link>

      {/* Mobile toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent">
        <span className="navbar-toggler-icon" />
      </button>

      {/* Collapsible content */}
      <div
        className="collapse navbar-collapse justify-content-between"
        id="navbarSupportedContent">
        {/* Left links */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/products">
              Our Products
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/orders">
              Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/checkout">
              Checkout
            </Link>
          </li>
        </ul>

        {/* Right: Search */}
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
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
