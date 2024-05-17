import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAxios, orderSummaryURL,orderProductDeleteURL, orderItemUpdateQuantityURL , addToCartUrl} from './Utils';
import { Button, Item } from 'semantic-ui-react';
import './Cartpanel.css'
//import { useSelector } from 'react-redux';
const BASE_URL = 'http://localhost:8000'; 

function CartPanel({ handleCheckout }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  

  const addToCart = async (productId, quantity) => {
    try {

      const response = await authAxios.post(addToCartUrl, {
        slug: productId, // Send productId as 'slug'
        quantity: quantity, // Send quantity
      }).then(response =>{
        console.log(response);
        this.fetchData();
      });
      console.log("Product added to cart:", response);
      setData(response.data);
      
    } catch (err) {
      this.setState({ error: err });
    
      console.error("Error adding to cart:", error);
    }
  };
  const handleRemoveProduct = (productId) => {
    authAxios
      .delete(orderProductDeleteURL(productId))
      .then(res => {
        this.fetchData();
        setData(prevData => ({
          ...prevData,
          order_products: prevData.order_products.filter(item => item.id !== productId),
        }));
      
      })
      .catch(err => {
        this.setState({ error: err });
      });
    };
    const handleRemoveQuantityFromCart = slug => {
      authAxios
        .post(orderItemUpdateQuantityURL, { slug })
        .then(res => {
          this.fetchData();
          setData(res.data);
        })
        .catch(err => {
          this.setState({ error: err });
        });
    }
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await authAxios.get(orderSummaryURL);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("You currently do not have an order");
        } else {
          setError(err);
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : data && data.order_products && data.order_products.length > 0 ? (
        <Item.Group>
          {data.order_products.map((orderProduct) => (
            <Item key={orderProduct.id}>
              
              <div className='parent-cart'>
              
                
               <div className='fisrtdivcart '>
                <img className='imageCartPanel' src={`${BASE_URL}${orderProduct.product_image}`} /></div>
               <div className='seconddiv'>
                <div className='nameandprice'>
                <h4>{orderProduct.product.title}</h4>
                <p className="cinema">${orderProduct.final_price}</p></div>
                </div>
                <div className='bigdivAction'>
                <button type="button" className="btn-close " onClick={() => handleRemoveProduct(orderProduct.id)} aria-label="Close"></button>
                <div className='quantityAndAction'>
                  {/* Buttons for quantity */}
                  <button
                    className="buttonCartPanel"
                    onClick={() =>handleRemoveQuantityFromCart(orderProduct.product.slug)
                    }
                  >
                    -
                  </button>
                  <span>{orderProduct.quantity}</span>
                  <button
                    className="buttonCartPanel"
                    onClick={() =>
                      addToCart(
                        orderProduct.product.slug
                      )}
                  >
                    +
                  </button>

                      </div>
                      </div>
                

                
              </div>
            </Item>
          ))}
          
            <button
              className='botnsCartPanel'
              onClick={handleCheckout}
            >
              Checkout
            </button>
          
        </Item.Group>
      ) : (
        <p>No items in your cart.</p>
      )}
    </div>
  );
}

export default CartPanel;
