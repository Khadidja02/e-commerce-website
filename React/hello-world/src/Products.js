import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link , Outlet ,useParams } from 'react-router-dom';
import './Products.css'

function Products() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);




  useEffect(() => {
    axios.get('http://localhost:8000/apy/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);
  const { categoryId } = useParams();

  useEffect(() => {
    const selected = categories.find(category => category.id === categoryId);
    if (selected) {
      setSelectedCategory(selected.name);
    } else {
      setSelectedCategory('');
    }
  }, [categoryId, categories]);
  
    return(
        <div className='products-main'>
        <div className='links-products'>
        <Link to='/' className='links-router'>Home{">"}</Link>
        <Link to='/Products' className='links-router'>Products{selectedCategory && ` > ${selectedCategory}`}</Link>
        
        </div>
        <div >
            <ul className='sous-list-products'>
              <li>
          <Link to= 'AllProducts' className='links-router link-spec items-list-products'>All Products</Link></li>
          {categories.map((category, index) => (
            <li key={index}>
              <Link to={`/Products/${category.id}`} className='links-router link-spec items-list-products'>{category.name} </Link>
            </li>
           ))}
        </ul>
       
       </div>
       <Outlet/>
    
     

       
       </div>
    )
}
export default Products;