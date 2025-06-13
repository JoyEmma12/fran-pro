// Updated CartPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const CartPage = ({ cartItems, onQuantityChange, onRemove, onCheckout }) => {
  const navigate = useNavigate();
  const getTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Your Shopping Basket</h3>
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/products")}>
          Continue Shopping
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="card mb-3">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-3 col-md-2">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="col-9 col-md-4">
                    <h6>{item.productName}</h6>
                    <p className="mb-1">₦{item.price.toLocaleString()}</p>
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
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        onQuantityChange(item.id, item.quantity + 1)
                      }>
                      +
                    </button>
                  </div>
                  <div className="col-md-2 text-center">
                    <strong>
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </strong>
                  </div>
                  <div className="col-md-1 text-end">
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
            <h5>Total: ₦{getTotal().toLocaleString()}</h5>
            <button className="btn btn-success" onClick={onCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
