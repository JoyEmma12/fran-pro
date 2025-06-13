// App.js
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProdutcsPage from "./components/ProductsPage/ProdutcsPage";
import Products from "./components/ProductsPage/Products";
import CartScreen from "./components/ProductsPage/Cartscreen";
import CheckoutScreen from "./components/ProductsPage/CheckoutScreen";

function App() {
  const [cartItems, setCartItems] = useState([]); // ✅ shared cart state here
  const [loggedInUserId, setLoggedInUserId] = useState(1); // Temporary user ID

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProdutcsPage />} />
        <Route
          path="/products"
          element={
            <Products cartItems={cartItems} setCartItems={setCartItems} />
          }
        />

        <Route
          path="/cart"
          element={
            <CartScreen cartItems={cartItems} setCartItems={setCartItems} />
          }
        />
        <Route
          path="/checkout"
          element={
            <CheckoutScreen cartItems={cartItems} userId={loggedInUserId} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
