import React, { useState } from "react";
import "./OtherProducts.css";
import { productsdata } from "./productsdata";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const OtherProducts = () => {
  const [visibleCount, setVisibleCount] = useState(8); // show 8 initially
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleLoadMore = () => {
    if (visibleCount + 4 >= productsdata.length) {
      setVisibleCount(productsdata.length);
    } else {
      setVisibleCount((prev) => prev + 4);
    }
  };

  const handleSeeLess = () => {
    setVisibleCount(8);
  };

  const visibleProducts = productsdata.slice(0, visibleCount);

  return (
    <div className="otherproducts-container container my-5">
      <div className="otherproducts-heading mb-4">
        <h3 className="fw-bold">Recommended For You</h3>
      </div>

      <div className="row g-4">
        {visibleProducts.map((product) => (
          <div
            className="col-6 col-sm-1 col-md-4 col-lg-3 d-flex align-items-stretch"
            key={product.id}>
            <div className="card product-card position-relative w-100 shadow-sm">
              <img
                src={product.productImage}
                className="card-img-top product-img"
                alt={product.productName}
              />
              <div
                className="wishlist-icon position-absolute top-0 end-0 p-2"
                onClick={() => toggleWishlist(product.id)}>
                {wishlist.includes(product.id) ? (
                  <AiFillHeart color="red" size={24} />
                ) : (
                  <AiOutlineHeart color="gray" size={24} />
                )}
              </div>
              <div className="card-body d-flex flex-column justify-content-between">
                <h6 className="card-title fw-semibold">
                  {product.productName}
                </h6>
                <p className="card-text small text-muted">
                  {product.productDescription}
                </p>
                <p className="card-price fw-bold text-success">
                  ₦{product.productPrice}
                </p>
                {product.producttag && (
                  <span className="badge bg-success mb-2">
                    {product.producttag}
                  </span>
                )}
                <button className="btn btn-outline-success w-100 mt-auto">
                  Quick Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        {visibleCount < productsdata.length ? (
          <button className="btn btn-success" onClick={handleLoadMore}>
            Load More
          </button>
        ) : (
          <button className="btn btn-outline-secondary" onClick={handleSeeLess}>
            See Less
          </button>
        )}
      </div>
    </div>
  );
};

export default OtherProducts;
