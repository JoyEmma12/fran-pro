import React from "react";

const CartPage = ({ cartItems, onQuantityChange, onRemove, onCheckout }) => {
  const getTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container py-4">
      <h3 className="text-center mb-4">Your Cart</h3>

      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="card mb-3">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-4 col-md-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="col-8 col-md-4">
                    <h5>{item.name}</h5>
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
                  <div className="col-6 col-md-2 mt-2 mt-md-0 text-center">
                    <strong>
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </strong>
                  </div>
                  <div className="col-6 col-md-1 text-end mt-2 mt-md-0">
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
