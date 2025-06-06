import React, { useState } from "react";
import { allProductsData } from "./allProductsData";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Products.css"; 

const Products = () => {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold">All Products</h2>
      <div className="row g-4">
        {allProductsData.map((product) => (
          <div
            key={product.id}
            className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch">
            <div className="card product-card shadow-sm w-100 position-relative">
              <img
                src={product.productImage}
                className="card-img-top product-img"
                alt={product.productName}
              />
              <div
                className="wishlist-icon position-absolute top-0 end-0 p-2"
                onClick={() => toggleWishlist(product.id)}>
                {wishlist.includes(product.id) ? (
                  <AiFillHeart color="red" size={22} />
                ) : (
                  <AiOutlineHeart color="gray" size={22} />
                )}
              </div>
              <div className="card-body d-flex flex-column">
                <h6 className="fw-bold">{product.productName}</h6>
                <p className="small text-muted">{product.productDescription}</p>
                <p className="fw-semibold text-success">
                  ₦{product.productPrice}
                </p>
                {product.producttag && (
                  <span className="badge bg-success mb-2">
                    {product.producttag}
                  </span>
                )}
                <button className="btn btn-outline-success mt-auto">
                  Quick Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
