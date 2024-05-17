import React, { useState } from 'react';
import './Productsviews.css'
import { authAxios } from './Utils';
import { useDispatch } from 'react-redux';
import { fetchCart } from './features/cart/cartActions';

import { addToCartUrl } from './Utils';


function AddToCartButton({ productId }) {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  
  const dispatch = useDispatch()
  const addToCart = async () => {
    try {
      setIsAddingToCart(true);

      const response = await authAxios.post(addToCartUrl, {
        slug: productId, // Send productId as 'slug'
        quantity: quantity, // Send quantity
      }).then(response =>{
        console.log(response);
      });
      console.log("Product added to cart:", response);
      dispatch(fetchCart());
      setIsAddingToCart(false);
    } catch (error) {
      setIsAddingToCart(false);
    
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="butnsproduct">
      <div className="bordrbutn">
       
          
          <div className="essentialdiV">
          <p className='qty-prod'> QTY : </p>
            {/* Buttons for quantity */}
            <button
              className="btnprod"
              onClick={() => {
                if (quantity > 1) setQuantity(quantity - 1);
              }}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="btnprod"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        
      </div>

      <div className="addbtn">
        <button
          onClick={addToCart}
          disabled={isAddingToCart} // Disable the button while adding to cart
          className='btnaddprod'
        >
          {isAddingToCart ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default AddToCartButton;
