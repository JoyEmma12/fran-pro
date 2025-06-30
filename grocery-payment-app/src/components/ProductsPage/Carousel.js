import React from "react";
import { useNavigate } from "react-router-dom";
import carouselimg1 from "../../assets/carouselimg1.png";
import carouselimg2 from "../../assets/carouselimg2-removebg-preview.png";
import carouselimg3 from "../../assets/drinks.png";
import "./Carousel.css";

const carouselData = [
  {
    id: 1,
    img: carouselimg1,
    title: "Fresh Groceries Delivered to Your Door",
    description:
      "Enjoy affordable, high-quality food items without leaving your home.",
  },
  {
    id: 2,
    img: carouselimg2,
    title: "Everything Your Home Needs, One Tap Away",
    description: "From kitchen staples to toiletries — we’ve got you covered.",
  },
  {
    id: 3,
    img: carouselimg3,
    title: "Go Digital, Shop Smarter",
    description:
      "Experience seamless shopping and payment in one easy platform.",
  },
];

const Carousel = () => {
  const navigate = useNavigate();

  return (
    <div
      id="carouselExampleRide"
      className="carousel slide"
      data-bs-ride="carousel">
      <div className="carousel-inner">
        {carouselData.map((item, index) => (
          <div
            key={item.id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <div className="container py-5">
              <div className="row align-items-center">
                <div className="col-md-6 text-center text-md-start carousel-texts">
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <button
                    className="btn btn-primary mt-3 cta-btn"
                    onClick={() => navigate("/products")}>
                    Shop Now
                  </button>
                </div>
                <div className="col-md-6 text-center mt-4 mt-md-0">
                  <img
                    src={item.img}
                    className="carousel-img"
                    alt={item.title}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev carousel-btn"
        type="button"
        data-bs-target="#carouselExampleRide"
        data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next carousel-btn"
        type="button"
        data-bs-target="#carouselExampleRide"
        data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
