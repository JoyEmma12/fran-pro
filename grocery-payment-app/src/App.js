import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProdutcsPage from "./components/ProductsPage/ProdutcsPage";
import Products from "./components/ProductsPage/Products";
import CartScreen from "./components/ProductsPage/Cartscreen";
import CheckoutScreen from "./components/ProductsPage/CheckoutScreen";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(1); // Replace 1 with real ID after login is built

  return (
    <Router>
      {/* <ProdutcsPage /> */}
      <Routes>
        <Route path="/" element={<ProdutcsPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<CartScreen />} />
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
