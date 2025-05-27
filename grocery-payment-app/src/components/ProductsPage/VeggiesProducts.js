import React from 'react'
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
        id:1,
        name: "Fresh Green Cucumber",
        price: 2500,
        image: veggieimg1,
        badge: "Newest Stock",
    },
    {
        id:2,
        name: "Organic Carrots",
        price: 1500,
        image: veggieimg2,
        badge: "In Season",

    },
    {
        id:3,
        name: "Sweet Corn",
        price: 2000,
        image: veggieimg3,
        badge: "Special Offer",
    },
    {
      id:4,
      name: "Fresh Pineapple",
      price: 3000,
      image: veggiesimg4,
      badge: "New Arrival",
    },
    {
      id:5,
      name: "Green Beans",
      price: 1800,
      image: veggiesimg5,
      badge: "New Arrival",
    },
    {
      id:6,
      name: "Fresh Tomatoes",
      price: 1200,
      image: veggiesimg6,
      badge: "Premium ",
    },
    {
      id:7,
      name: "Potatoes",
      price: 1000,
      image: veggiesimg8,
      badge: "Best Seller",
    },
    {
      id:8,
      name: "Fresh Ginger",
      price: 800,
      image: veggiesimg7,
      badge: "New Arrival",
    }

]
const VeggiesProducts = () => {
  return (
    <div className="container my-5">
      <h2 className="text-success fw-bold">
        Farm-Fresh Vegetables, Just a Click Away
      </h2>
      <p className="text-muted fs-5">
        Discover a colorful variety of hand-picked, nutrient-rich vegetables
        delivered fresh from local farms to your doorstep.
      </p>
      <p className="text-secondary mb-4">
        From leafy greens to root vegetables, our selection is sourced daily to
        ensure the best in flavor and nutrition. Eat clean, eat fresh, and make
        every meal healthier.
      </p>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mb-5">
        {veggieData.map((veg) => (
          <div className="col" key={veg.id}>
            <div className="card veggie-card h-100 shadow-sm position-relative">
              <img
                src={veg.image}
                className="card-img-top veggie-img"
                alt={veg.name}
              />
              <div className="card-body p-3">
                <h5 className="card-title">{veg.name}</h5>
                <p className="card-text text-success fw-semibold">
                  ₦{veg.price}
                </p>
                <span className="badge bg-success mb-2 position-absolute top-0 end-0">{veg.badge}</span>
                {/* needs api call */}
                <button className="btn btn-outline-success w-100">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VeggiesProducts