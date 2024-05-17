import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiEyeLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isShown, setIsShown] = useState(-1); // New state for tracking mouse hover

  useEffect(() => {
    // Fetch data from the backend when the component mounts or currentPage changes
    axios
      .get(`http://localhost:8000/apy/production/?page=${currentPage}`)
      .then((response) => {
        // Update the products state with the fetched data
        setProducts(response.data.results);
        setTotalPages(response.data.total_pages);
        setLoading(false);
        console.log("Total Pages:", response.data);
      })
      .catch((error) => {
        setError(error.message || "An error occurred while fetching data.");
        setLoading(false);
      });
  }, [currentPage]); // Add currentPage as a dependency

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleMouseEnter = (index) => {
    setIsShown(index);
  };

  const handleMouseLeave = () => {
    setIsShown(-1);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className="parent2-pro">
        {products.map((product, index) => (
          <div
            className="parent3-pro"
            key={product.id}
            onMouseEnter={() => handleMouseEnter(index)} // Handle mouse enter
            onMouseLeave={handleMouseLeave} // Handle mouse leave
          >
            <div className="child1-pro">
              <img src={product.image} alt={product.title} className="image-child" />
              {isShown === index && ( // Show button if index matches isShown
                <Link className="link-product" to={`/Productviews/${product.slug}`}>
                  <button className="buuutn">
                    <RiEyeLine className="view-icon" /> Voir Details
                  </button>
                </Link>
              )}
            </div>
            <h5 className="produits">{product.title}</h5>
            <span className="stext">${product.price}</span>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      
    </>
  );
}

export default AllProducts;
