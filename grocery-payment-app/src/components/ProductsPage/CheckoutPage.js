import React, { useState } from "react";

const CheckoutPage = ({ cartItems, onPlaceOrder }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!userInfo.name || !userInfo.email || !userInfo.phone) {
      alert("Please fill in all user details.");
      return;
    }

    onPlaceOrder(userInfo);
  };

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>
      <div className="row">
        <div className="col-md-6">
          <h5>Customer Information</h5>
          <input
            type="text"
            name="name"
            className="form-control mb-2"
            placeholder="Full Name"
            value={userInfo.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            className="form-control mb-2"
            placeholder="Email"
            value={userInfo.email}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            className="form-control mb-2"
            placeholder="Phone Number"
            value={userInfo.phone}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <h5>Order Summary</h5>
          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <strong>₦{item.price * item.quantity}</strong>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <strong>Total:</strong>
              <strong>₦{totalAmount}</strong>
            </li>
          </ul>
          <button className="btn btn-success w-100" onClick={handleSubmit}>
            Pay with Flutterwave
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
