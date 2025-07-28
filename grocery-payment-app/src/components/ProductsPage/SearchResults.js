import React from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchResults = ({ products, cartItems, setCartItems }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q")?.toLowerCase() || "";

  const filtered = products.filter((p) =>
    (p.productName || p.name || "").toLowerCase().includes(searchQuery)
  );

  const handleAddToCart = (product) => {
    const productId = product.id;
    const name = product.productName || product.name || "Unnamed";
    const image = product.productImage || product.image || "";
    const price = Number(product.productPrice || product.price || 0);

    if (!productId || isNaN(price) || price <= 0) {
      toast.error("Invalid product data");
      return;
    }

    const exists = cartItems.find((item) => item.id === productId);
    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      toast.info("Quantity increased");
    } else {
      setCartItems([
        ...cartItems,
        {
          id: productId,
          productName: name,
          productImage: image,
          price: price,
          quantity: 1,
        },
      ]);
      toast.success("Item added to cart");
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">
        Search Results for: <em>{searchQuery}</em>
      </h4>
      {filtered.length === 0 ? (
        <p>No matching products found.</p>
      ) : (
        <div className="row">
          {filtered.map((product) => {
            const name = product.productName || product.name || "Unnamed";
            const image = product.productImage || product.image;
            const price = Number(product.productPrice || product.price || 0);

            return (
              <div className="col-md-3 mb-4" key={product.id}>
                <div className="card h-100">
                  <img src={image} className="card-img-top" alt={name} />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text text-success">
                      ₦{price.toLocaleString()}
                    </p>
                    <button
                      className="btn btn-outline-success mt-auto"
                      onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
