import React, { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://localhost:5000/orders?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="container mt-5">
      <h4>Your Order History</h4>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="list-group">
          {orders.map((order) => (
            <li className="list-group-item" key={order.id}>
              Order #{order.id} | ₦{order.total_amount} | Status:{" "}
              {order.payment_status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
