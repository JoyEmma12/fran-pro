// ProductsPage.js
import React from "react";
import Nav from "./Nav";
import Carousel from "./Carousel";
import VeggiesProducts from "./VeggiesProducts";
import Subsection from "./Subsection";
import OtherProducts from "./OtherProducts";
import Footer from "./Footer";
// import { AnimationOnScroll } from "react-animation-on-scroll";
// import "animate.css/animate.min.css";

const ProductsPage = ({ cartItems, setCartItems }) => {
  return (
    <div>
      <Nav />
      <Carousel />

      <div className="container">
          <VeggiesProducts cartItems={cartItems} setCartItems={setCartItems} />



          <Subsection />



          <OtherProducts cartItems={cartItems} setCartItems={setCartItems} />
        
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
