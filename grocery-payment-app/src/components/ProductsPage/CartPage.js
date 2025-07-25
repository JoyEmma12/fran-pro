import React from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css"; // <-- import the styles here

const CartPage = ({ cartItems, onQuantityChange, onRemove, onCheckout }) => {
  const navigate = useNavigate();

  const getTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h3 className="cart-heading mb-2 mb-md-0" onClick={() => navigate("/productspage")}>🛒 Your Shopping Basket</h3>
        <button
          className="btn shopping-btn"
          onClick={() => navigate("/products")}>
          Continue Shopping
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-center empty-cart">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="card cart-item mb-3 shadow-sm">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-4 col-md-2">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="col-8 col-md-4">
                    <h6 className="fw-bold">{item.productName}</h6>
                    <p className="mb-1 text-success">
                      ₦{item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="col-12 col-md-3 d-flex align-items-center mt-2 mt-md-0">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        onQuantityChange(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}>
                      −
                    </button>
                    <span className="mx-3 fw-semibold">{item.quantity}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        onQuantityChange(item.id, item.quantity + 1)
                      }>
                      +
                    </button>
                  </div>
                  <div className="col-md-2 text-center mt-2 mt-md-0">
                    <strong className="text-success">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </strong>
                  </div>
                  <div className="col-md-1 text-end mt-2 mt-md-0">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onRemove(item.id)}>
                      ❌
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="text-end mt-4">
            <h5 className="fw-bold mb-3">
              Total:{" "}
              <span className="text-success">
                ₦{getTotal().toLocaleString()}
              </span>
            </h5>
            <button className="btn btn-success px-4" onClick={onCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
