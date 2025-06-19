import React from "react";
import Nav from "./Nav";
import Carousel from "./Carousel";
import VeggiesProducts from "./VeggiesProducts";
import Subsection from "./Subsection";
import OtherProducts from "./OtherProducts";
import Footer from "./Footer";
import { AnimationOnScroll } from "react-animation-on-scroll";
import "animate.css/animate.min.css";

const ProductsPage = ({ cartItems, setCartItems }) => {
  return (
    <div>
      <Nav />
      <Carousel />

      <div className="container">
        <AnimationOnScroll
          animateIn="animate__fadeInUp"
          offset={0}
          delay={0}
          duration={0.6}
          animateOnce={true}>
          <VeggiesProducts cartItems={cartItems} setCartItems={setCartItems} />
        </AnimationOnScroll>

        <AnimationOnScroll
          animateIn="animate__fadeInUp"
          offset={100}
          delay={200}
          duration={1}
          animateOnce={true}>
          <Subsection />
        </AnimationOnScroll>

        <AnimationOnScroll
          animateIn="animate__fadeInUp"
          offset={100}
          delay={300}
          duration={1}
          animateOnce={true}>
          <OtherProducts cartItems={cartItems} setCartItems={setCartItems} />
        </AnimationOnScroll>
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
