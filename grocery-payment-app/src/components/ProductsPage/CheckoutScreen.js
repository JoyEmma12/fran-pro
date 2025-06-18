import React from "react";
import CheckoutPage from "./CheckoutPage";
// import { useNavigate } from "react-router-dom";

const CheckoutScreen = ({ cartItems, userId }) => {
//   const navigate = useNavigate();

  const onPlaceOrder = async (userInfo) => {
    const totalAmount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    try {
      // Step 1: Create the order
      const orderRes = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, total_amount: totalAmount }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || "Order failed");

      const orderId = orderData.order_id || 1; // adapt as needed

      // Step 2: Start the payment
      const paymentRes = await fetch("http://localhost:5000/start-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_id: orderId, ...userInfo }),
      });

      const paymentData = await paymentRes.json();
      if (!paymentRes.ok) throw new Error(paymentData.error);

      // Step 3: Redirect to Flutterwave
      window.location.href = paymentData.payment_link;
    } catch (err) {
      alert(err.message);
    }
  };

  return <CheckoutPage cartItems={cartItems} onPlaceOrder={onPlaceOrder} />;
};

export default CheckoutScreen;
