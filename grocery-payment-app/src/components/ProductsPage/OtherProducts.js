import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import "./OtherProducts.css";
import { productsdata } from "./productsdata";

const OtherProducts = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(8);
  const [wishlist, setWishlist] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const categories = [
    "All",
    ...new Set(productsdata.map((p) => p.category).filter(Boolean)),
  ];

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleLoadMore = () => {
    if (visibleCount + 4 >= filteredProducts.length) {
      setVisibleCount(filteredProducts.length);
    } else {
      setVisibleCount((prev) => prev + 4);
    }
  };

  const handleSeeLess = () => {
    setVisibleCount(8);
  };

  const handleAddToCart = (product) => {
    const exists = cartItems.find((item) => item.id === product.id);

    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const formattedProduct = {
        ...product,
        price: parseInt(
          typeof product.productPrice === "string"
            ? product.productPrice.replace(/,/g, "")
            : product.productPrice
        ),
        quantity: 1,
      };
      setCartItems([...cartItems, formattedProduct]);
    }

    toast.success(`${product.productName} added to cart!`);
    navigate("/cart");
  };

  const filteredProducts =
    selectedCategory === "All"
      ? productsdata
      : productsdata.filter((p) => p.category === selectedCategory);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="otherproducts-container container my-5">
      <div className="otherproducts-heading mb-4">
        <h3 className="fw-bold">Recommended For You</h3>
      </div>

      <div className="mb-4 d-flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn btn-sm ${
              selectedCategory === cat ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => setSelectedCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <div className="row g-4">
        {visibleProducts.map((product) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch"
            key={product.id}
            data-aos="fade-up">
            <div className="card product-card position-relative w-100 shadow-sm">
              <img
                src={product.productImage}
                className="card-img-top product-img"
                alt={product.productName}
              />
              <div
                className="wishlist-icon position-absolute top-0 end-0 p-2"
                onClick={() => toggleWishlist(product.id)}
                data-aos="zoom-in">
                {wishlist.includes(product.id) ? (
                  <AiFillHeart color="red" size={24} />
                ) : (
                  <AiOutlineHeart color="gray" size={24} />
                )}
              </div>
              <div className="card-body d-flex flex-column justify-content-between">
                <h6 className="card-title fw-bold">
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
                <button
                  className="btn btn-outline-success w-100 mt-auto"
                  onClick={() => handleAddToCart(product)}>
                  Quick Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        {visibleCount < filteredProducts.length ? (
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
