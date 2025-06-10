import React, { useState } from "react";
import CartPage from "./CartPage";

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Tomato",
      price: 500,
      quantity: 2,
      image: "/images/tomato.jpg",
    },
    {
      id: 2,
      name: "Yam",
      price: 1200,
      quantity: 1,
      image: "/images/yam.jpg",
    },
  ]);

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
    // You would typically send cartItems to the backend here
    alert("Proceeding to checkout...");
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
