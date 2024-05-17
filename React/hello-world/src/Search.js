import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './Search.css'
import { Link } from 'react-router-dom';
const Search = ({ isOpen, onRequestClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/apy/production/?search=${query}`);
      setResults(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    if (!inputValue) {
      // Reset the results when the input field is empty
      setResults([]);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Search Products"
    >
      <div className='model-search'>
        <div className="modal-header">
          <h5 className="modal-title"  >Search Products</h5>
          <button type="button" className="btn-close" onClick={onRequestClose} aria-label="Close"></button>
        </div>
        <div className="modal-body">
          
           <div class="form-outline" data-mdb-input-init>
          <input type="search" id="form1" class="form-control"
            aria-label="Search" 
            placeholder="Enter your search query"
            value={query}
            onChange={handleInputChange}
          />
          </div>
          <ul>
            {results.map((product, index) => (
              <li key={index}>
                <div className='parent-searchFirstDiv'>
                  <div className='child-searchSecondDiv'>
                    <img src={product.image} alt={product.title} className='searchImage'/>
                  </div>
                  <div className='child-searchThirdDiv'>
                    <Link to= {`/Productviews/${product.slug}`} className='linkText'>
                    <p>{product.title}</p></Link>
                    <p> Price: {product.price}$</p>
                    </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='search-btn'>
          <button type="button" className="btn btn-secondary" onClick={onRequestClose}>Close</button>
          <button type="button" className="btn btn-primary" onClick={handleSearch}>Search</button>
          
        </div>
      </div>
    </Modal>
  );
};

export default Search;
