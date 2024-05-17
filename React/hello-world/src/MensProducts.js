import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; // Import useParams from React Router
import './compo/LeatesPro.css';
import { RiEyeLine } from "react-icons/ri";
import Pagination from "./Pagination";

function MensProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isShown, setIsShown] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleMouseEnter = (index) => {
    setIsShown(index)
  }

  const handleMouseLeave = () => {
    setIsShown(-1)
  }

  // Use useParams to get the category_id from the route
  const { category_id } = useParams();

  useEffect(() => {
    // Fetch products based on the selected category (category_id)
    axios
      .get(`http://localhost:8000/apy/category-products/${category_id}/?page=${currentPage}`)
      .then((response) => {
        setProducts(response.data);
        
        const pageSize = products.length; // Assuming each page has the same number of products
        const totalPages = Math.ceil(products.length / pageSize);
        console.log('TOTALPAGES', totalPages)
        setTotalPages(totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setError(
          error.message || 'An error occurred while fetching data.'
        );
        setLoading(false);
      });
  }, [category_id,currentPage]); // Execute this effect whenever 'category_id' changes

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
        <div className="parent3-pro" key={index}>
          <div className="child1-pro " 
            onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave} >
          
            <img src={product.image} alt={product.title} className="image-child" />
            {isShown  === index && (
              
                      
              <Link className="link-product" to={`/Productviews/${product.slug}`}>
                <button className="buuutn"><RiEyeLine className="view-icon" />Voir Details</button></Link>
      )}
          </div>
          <h5 className="produits">{product.title}</h5>
            <span className="stext">${product.price}</span>
        </div>
      ))}
    </div>
    <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );

}

export default MensProducts;
