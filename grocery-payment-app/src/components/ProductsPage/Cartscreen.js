import React from "react";
import { useNavigate } from "react-router-dom";
import CartPage from "./CartPage";

const CartScreen = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();

  const onQuantityChange = (id, newQty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQty) } : item
      )
    );
  };

  const onRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onCheckout = () => {
    navigate("/checkout"); // ✅ now this works
  };

  return (
    <CartPage
      cartItems={cartItems}
      onQuantityChange={onQuantityChange}
      onRemove={onRemove}
      onCheckout={onCheckout}
    />
  );
};

export default CartScreen;
