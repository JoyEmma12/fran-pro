import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./VeggiesProducts.css";

import veggieimg1 from "../../assets/product17.jpeg";
import veggieimg2 from "../../assets/product15.jpeg";
import veggieimg3 from "../../assets/product13.jpeg";
import veggiesimg4 from "../../assets/pineapple.jpeg";
import veggiesimg5 from "../../assets/green beans.jpeg";
import veggiesimg6 from "../../assets/tomatoes.jpeg";
import veggiesimg7 from "../../assets/ginger.jpeg";
import veggiesimg8 from "../../assets/potatoes.jpeg";

const veggieData = [
  {
    id: 1,
    productName: "Fresh Green Cucumber",
    price: 2500,
    productImage: veggieimg1,
    badge: "Newest Stock",
  },
  {
    id: 2,
    productName: "Organic Carrots",
    price: 1500,
    productImage: veggieimg2,
    badge: "In Season",
  },
  {
    id: 3,
    productName: "Sweet Corn",
    price: 2000,
    productImage: veggieimg3,
    badge: "Special Offer",
  },
  {
    id: 4,
    productName: "Fresh Pineapple",
    price: 3000,
    productImage: veggiesimg4,
    badge: "New Arrival",
  },
  {
    id: 5,
    productName: "Green Beans",
    price: 1800,
    productImage: veggiesimg5,
    badge: "New Arrival",
  },
  {
    id: 6,
    productName: "Fresh Tomatoes",
    price: 1200,
    productImage: veggiesimg6,
    badge: "Premium",
  },
  {
    id: 7,
    productName: "Potatoes",
    price: 1000,
    productImage: veggiesimg8,
    badge: "Best Seller",
  },
  {
    id: 8,
    productName: "Fresh Ginger",
    price: 800,
    productImage: veggiesimg7,
    badge: "New Arrival",
  },
];

const VeggiesProducts = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleAddToCart = (veg) => {
    const exists = cartItems.find((item) => item.id === veg.id);

    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === veg.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...veg, quantity: 1 }]);
    }

    navigate("/cart");
  };

  return (
    <div className="container my-5 veggies-section">
      <div className="text-center mb-4">
        <h2 className="text-success fw-bold">
          Farm-Fresh Vegetables, Just a Click Away
        </h2>
        <p className="text-muted fs-5">
          Discover a colorful variety of hand-picked, nutrient-rich vegetables
          delivered fresh from local farms to your doorstep.
        </p>
        <p className="text-secondary">
          From leafy greens to root vegetables, our selection is sourced daily
          to ensure the best in flavor and nutrition.
        </p>
      </div>

      <div className="row g-4">
        {veggieData.map((product, index) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3"
            key={product.id}
            data-aos="fade-up"
            data-aos-delay={index * 100}>
            <div className="card veggie-card h-100 shadow-sm position-relative">
              <img
                src={product.productImage}
                className="card-img-top veggie-img"
                alt={product.productName}
              />
              <span className="veggies-badge bg-success position-absolute top-0 end-0 m-2">
                {product.badge}
              </span>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text text-success fw-semibold">
                  ₦{product.price.toLocaleString()}
                </p>
                <button
                  className="btn veggies-btn mt-auto"
                  onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VeggiesProducts;
