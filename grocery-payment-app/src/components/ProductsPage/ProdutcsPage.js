import React from "react";
import Nav from "./Nav";
import Carousel from "./Carousel";
import VeggiesProducts from "./VeggiesProducts";
import Subsection from "./Subsection";

const ProdutcsPage = () => {
  return (
    <div>
      <Nav />
      <Carousel />
      {/* products section */}
      <div className="container">
        <VeggiesProducts />
        <Subsection />
      </div>
    </div>
  );
};

export default ProdutcsPage;
