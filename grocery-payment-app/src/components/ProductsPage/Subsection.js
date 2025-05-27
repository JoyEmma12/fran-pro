import React from "react";
import "./Subsection.css";
import image1 from "../../assets/sectionassets/asset1.png";
import image2 from "../../assets/sectionassets/asset2.png";
import image3 from "../../assets/sectionassets/asset3.png";
import image4 from "../../assets/sectionassets/asset4.png";
import { RiArrowRightSLine } from "react-icons/ri";

const Subsection = () => {
  return (
    <div className="container my-5">
      <div className="row g-4">
        {/* Left Column */}
        <div className="col-lg-7">
          <div className="section-card h-100 d-flex flex-column flex-lg-row align-items-center justify-content-around p-4 gap-3">
            <div className="w-100 w-lg-50">
              <img
                src={image4}
                alt="Section"
                className="img-fluid rounded first-img"
              />
            </div>
            <div className="text-section d-flex flex-column align-items-center align-items-lg-end text-center text-lg-end justify-content-center">
              <span className="badge bg-primary mb-2">New Arrival</span>
              <h3>Your Everyday Essentials, All in One Place</h3>
              <p>
                Shop smarter with our curated range of quality groceries, fresh
                produce, and home must-haves.
              </p>
              <button className="btn btn-success">Shop Now</button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-lg-5">
          <div className="row g-3">
            {/* Top Left */}
            <div className="col-12 col-md-6">
              <div className="subsection-box p-3 bg-light h-100 rounded text-center">
                <img
                  src={image1}
                  alt="Handbag"
                  className="img-fluid mb-2 rounded"
                />
                <h4>Stock Up with Ease</h4>
                <p className="small text-muted">
                  Find your daily food, snacks, and essentials in one smooth,
                  simple shopping experience.
                </p>
                <button className="btn btn-outline-success">
                  Shop now <RiArrowRightSLine />
                </button>
              </div>
            </div>

            {/* Top Right */}
            <div className="col-12 col-md-6">
              <div className="subsection-box p-3 bg-light h-100 rounded text-center">
                <img
                  src={image2}
                  alt="Watch"
                  className="img-fluid mb-2 rounded"
                />
                <h4>Quality Products. Everyday Prices.</h4>
                <p className="small text-muted">
                  Affordable groceries, fresh items, and household needs
                  delivered with care.
                </p>
                <button className="btn btn-outline-success">Quick Buy</button>
              </div>
            </div>

            {/* Bottom Full Width */}
            <div className="col-12">
              <div className="subsection-box p-3 bg-light h-100 rounded text-center">
                <img
                  src={image3}
                  alt="Backpack"
                  className="img-fluid mb-2 rounded"
                />
                <h4>Fresh Pick of the Week</h4>
                <p className="small text-muted">
                  Locally sourced. Bursting with flavor. Handpicked just for
                  you.
                </p>
                <button className="btn btn-outline-success">
                  Get This Fresh
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subsection;
