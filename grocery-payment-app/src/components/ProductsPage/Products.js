import React, { useState } from "react";
import { allProductsData } from "./allProductsData";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Products.css";

const Products = () => {
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const [filterTag, setFilterTag] = useState("All");

  const productsPerPage = 8;

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSort = (products) => {
    if (sortOption === "lowToHigh") {
      return [...products].sort(
        (a, b) =>
          parseInt(a.productPrice.replace(",", "")) -
          parseInt(b.productPrice.replace(",", ""))
      );
    }
    if (sortOption === "highToLow") {
      return [...products].sort(
        (a, b) =>
          parseInt(b.productPrice.replace(",", "")) -
          parseInt(a.productPrice.replace(",", ""))
      );
    }
    return products;
  };

  const handleFilter = (products) => {
    if (filterTag === "All") return products;
    return products.filter((product) => product.producttag === filterTag);
  };

  const filteredProducts = handleFilter(allProductsData);
  const sortedProducts = handleSort(filteredProducts);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold">All Products</h2>

      <div className="d-flex justify-content-between mb-3">
        <select
          onChange={(e) => setSortOption(e.target.value)}
          className="form-select w-auto">
          <option value="default">Sort By</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>

        <select
          onChange={(e) => setFilterTag(e.target.value)}
          className="form-select w-auto">
          <option value="All">All Tags</option>
          <option value="New">New</option>
          <option value="Popular">Popular</option>
          <option value="Organic">Organic</option>
          <option value="Best Seller">Best Seller</option>
        </select>
      </div>

      <div className="row g-4">
        {currentProducts.map((product) => (
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

      <div className="pagination-buttons text-center mt-4">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`btn mx-1 ${
              currentPage === index + 1 ? "btn-success" : "btn-outline-success"
            }`}
            onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
