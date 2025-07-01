import React, { useEffect, useState } from "react";
import "./OrderHistory.css"; 

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://localhost:5000/orders?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="order-history container mt-5">
      <h4 className="mb-4 fw-bold text-primary">Your Order History</h4>
      {orders.length === 0 ? (
        <p className="text-muted">You haven't made any orders yet.</p>
      ) : (
        <ul className="list-group">
          {orders.map((order) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-center order-item"
              key={order.id}>
              <div>
                <strong>Order #{order.id}</strong>
                <br />
                <span className="text-muted small">
                  Status: {order.payment_status}
                </span>
              </div>
              <span className="badge bg-success rounded-pill">
                ₦{parseInt(order.total_amount).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
