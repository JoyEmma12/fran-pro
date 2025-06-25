// App.js
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsPage from "./components/ProductsPage/ProductsPage";
import Products from "./components/ProductsPage/Products";
import CartScreen from "./components/ProductsPage/Cartscreen";
import CheckoutScreen from "./components/ProductsPage/CheckoutScreen";
import OrderSuccessScreen from "./components/ProductsPage/OrderSuccessScreen";

function App() {
  const [cartItems, setCartItems] = useState([]); // ✅ shared cart state here
  const [loggedInUserId] = useState(1); // Temporary user ID

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProductsPage cartItems={cartItems} setCartItems={setCartItems} />
          }
        />
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
        <Route path="/order-success" element={<OrderSuccessScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
