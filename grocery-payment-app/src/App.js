// App.js
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsPage from "./components/ProductsPage/ProductsPage";
import Products from "./components/ProductsPage/Products";
import CartScreen from "./components/ProductsPage/Cartscreen";
import CheckoutScreen from "./components/ProductsPage/CheckoutScreen";
import OrderSuccessScreen from "./components/ProductsPage/OrderSuccessScreen";
import SignupForm from "./components/ProductsPage/SignupForm";
import LoginForm from "./components/ProductsPage/LoginForm";
import OrderHistory from "./components/ProductsPage/OrderHistory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const [cartItems, setCartItems] = useState([]); // ✅ shared cart state here
  const [loggedInUserId] = useState(1); // Temporary user ID

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/productspage"
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
        <Route path="/orders" element={<OrderHistory />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
