import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LeatesPro.css";
import { RiEyeLine } from "react-icons/ri";



function Leatest() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isShown, setIsShown] = useState(-1)

  const handleMouseEnter = (index) => {
    setIsShown(index)
  }

  const handleMouseLeave = () => {
    setIsShown(-1)
  }




  useEffect(() => {
    // Fetch data from the Django backend when the component mounts
    axios
      .get("http://localhost:8000/apy/production/")  // Updated endpoint
      .then((response) => {
        // Update the products state with the fetched data
        setProducts(response.data.results); // Use response.data.results
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message || "An error occurred while fetching data.");
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="parent-pro">
      <p className="popular">Our Latest Products</p>
      <div className="line-titles"></div>
      <div className="parent2-pro">
        {Array.isArray(products)?
        products.map((product, index) => (
          <div className="parent3-pro " key={index}>
            <div className="child1-pro " 
            onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave} >
              
                <img src={product.image} alt={product.title}
                 className="image-child"
                 
                  />
              {isShown  === index && (
              
                      
                        <Link className="link-product" to={`/Productviews/${product.slug}`}>
                          <button className="buuutn"><RiEyeLine className="view-icon" />View Details</button></Link>
                )}
            </div>
            
            <h4 className="produits">{product.title}</h4>
            <span className="stext mb-4">${product.price}</span>
          </div>
          
        )):console.log(error)}
      </div>
      
        <Link to="/Products" ><button className="buutn">See More</button></Link>
      
      
    </div>
  );
}

export default Leatest;
