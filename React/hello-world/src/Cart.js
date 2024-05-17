import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAxios, orderSummaryURL, orderProductDeleteURL,
           orderItemUpdateQuantityURL, addToCartUrl } from './Utils';
import { Button, Checkbox, Header, Icon, Table } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import './Bagpage.css'




const BASE_URL = 'http://localhost:8000'; 





const Cart = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshCart, setRefreshCart] = useState(false); // Flag to indicate whether the cart should be refreshed
  const isLargeScreen = useMediaQuery({ minWidth: 768 }); // Define your screen size threshold



  const navigate = useNavigate();
  const addToCart = async (productId, quantity) => {
    try {

      const response = await authAxios.post(addToCartUrl, {
        slug: productId, // Send productId as 'slug'
        quantity: quantity, // Send quantity
      }).then(response =>{
        console.log(response);
        this.fetchData();
        setRefreshCart(true);
        
      });
      console.log("Product added to cart:", response);
      this.fetchData();
      setData(response.data);
      
    } catch (err) {
      this.setState({ error: err });
    
      console.error("Error adding to cart:", error);
    }
  };
  const handleRemoveProduct = (productId) => {
    try {
      // Delete the product from the backend
       authAxios.delete(orderProductDeleteURL(productId));
  
      // Update local data immediately after successful deletion
      setData(prevData => ({
        ...prevData,
        order_products: prevData.order_products.filter(item => item.id !== productId),
      }));
  
      // Fetch updated cart data from the backend
      this.fetchData();
  
      // Optionally, you can set refreshCart to true if needed
      setRefreshCart(true);
    } catch (err) {
      setError(err);
      console.error("Error removing product from cart:", err);
    }
    };
    const handleRemoveQuantityFromCart = slug => {
      try {
        // Update local data immediately
        const updatedData = {
          ...data,
          order_products: data.order_products.map(item =>
            item.product.slug === slug ? { ...item, quantity: item.quantity - 1 } : item
          )
        };
        setData(updatedData);
    
        // Send updated quantity to the backend
        const response =  authAxios.post(orderItemUpdateQuantityURL, { slug });
    
        // Fetch updated cart data from the backend
        this.fetchData();
      } catch (err) {
        setError(err);
      }
    }
    const handleAddQuantityToCart = async (slug) => {
      try {
        // Update local data immediately
        const updatedData = {
          ...data,
          order_products: data.order_products.map(item =>
            item.product.slug === slug ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
        setData(updatedData);
    
        // Send updated quantity to the backend
        const response = await authAxios.post(addToCartUrl, {
          slug: slug,
          quantity: updatedData.order_products.find(item => item.product.slug === slug).quantity,
        });
    
        // Fetch updated cart data from the backend
        this.fetchData();
      } catch (err) {
        setError(err);
      }
    }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await authAxios.get(orderSummaryURL);
        setData(response.data);
        console.log('the data :',data);
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

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate,refreshCart]);
  useEffect(() => {
    // Check if the cart needs to be refreshed
    const shouldRefreshCart = localStorage.getItem('refreshCart');
    if (shouldRefreshCart) {
      localStorage.removeItem('refreshCart'); // Clear the flag
      setRefreshCart(true); // Trigger cart refresh
    }
  }, []);

  
    
    
  return (
    
    <div className='cart-bag-container'>
      <header className='Cart-header'> Your Cart</header>

      {data ? window.innerWidth >= 768 ? (
        <LargeScreenCart
        data={data}
        BASE_URL={BASE_URL}
        handleRemoveQuantityFromCart={handleRemoveQuantityFromCart}
        addToCart={handleAddQuantityToCart}
        handleRemoveProduct={handleRemoveProduct}
      />
      ) : (
        <SmallScreenCart data={data}
        BASE_URL={BASE_URL}
        handleRemoveQuantityFromCart={handleRemoveQuantityFromCart}
        addToCart={handleAddQuantityToCart}
        handleRemoveProduct={handleRemoveProduct} />
      ) : (
        <p>Loading...</p>
      )}
      </div>
  );
};
  const LargeScreenCart = ({ data, handleRemoveQuantityFromCart, handleAddQuantityToCart, handleRemoveProduct }) => {
    console.log("Rendering LargeScreenCart with data:", data);
  
  if (!data || !data.order_products) {
    return <p>No products in the cart.</p>;
  }
  return(
    
    <div className='cart-content'>
    {data && data.order_products && data.order_products.length > 0 ? (
      <Table celled compact definition className='table-cart'>
        {/* Rest of your table JSX */}
        <Table.Header fullWidth className='theaders'>
            <Table.Row className='trs'>
              <Table.HeaderCell className='hedaer-cell' />
              <Table.HeaderCell className='first-cell'>Product </Table.HeaderCell>
              <Table.HeaderCell className='hedaer-cell icon-shop' >Quantity </Table.HeaderCell>
              <Table.HeaderCell className='hedaer-cell' >Price </Table.HeaderCell>
              <Table.HeaderCell className='hedaer-cell' >Total</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.order_products.map((orderProduct, i) => {
              return (
                <Table.Row key={orderProduct.id}>
                  <Table.Cell className='number-cells'>
                    <p className='id-cells' >{i + 1}</p></Table.Cell>
                  <Table.Cell className='info-cels-child product-cells-img'>
                    <div className='div-cells'>
                      <div className='div-img-cells'>
                        <img className='img-cells' src={`${BASE_URL}${orderProduct.product_image}`} />
                       </div>
                      <div className='info-cells'>
                        <p className='text-cells'>{orderProduct.product.title}</p>
                      </div>
                    
                    </div>
                    </Table.Cell>
                      <Table.Cell className='info-cels-child icon-shop'>
                          <div className='icon-cart-shop'>
                            <Icon
                              name="minus"
                              style={{ float: "left", cursor: "pointer" ,color:'rgb(71 162 117)' }}
                              onClick={() =>handleRemoveQuantityFromCart(orderProduct.product.slug)
                              }
                            />  
                            <p className='qty-cart'>{orderProduct.quantity}</p>
                            <Icon
                              name="plus"
                              style={{ float: "right", cursor: "pointer", color:'rgb(71 162 117)' }}
                              onClick={() => handleAddQuantityToCart(orderProduct.product.slug)}
                            />
                          </div>
                      </Table.Cell>
                  <Table.Cell className='info-cels-child ' > <p className='price-cells'>${orderProduct.price}</p></Table.Cell>
                  {/*<Table.Cell><img src={`${BASE_URL}${orderProduct.product_image}`} /></Table.Cell>*/}
                  <Table.Cell className='info-cels-child '>
                    <div className='total-cart-shop'>
                    <p className='last-cells'>${orderProduct.final_price}</p>
                    <Icon
                        name="close"
                        className='icon-close-shop'
                        style={{ color:'rgb(71 162 117)'}}
                        
                        onClick={() => handleRemoveProduct(orderProduct.id)}
                      />

                 </div></Table.Cell>
                </Table.Row>
              );
            })}

            
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row className='info-cels-child '>
            
              <Table.HeaderCell colSpan='4' textAlign='left'  className='info-cels-child footer-cells' >
              Order Total: ${data.total}
              <Link to = "/Products"><Button
                floated='right'
                className='button-cart-green back-green'
                
                
              >
                
                Back To Shop</Button></Link>
              
              
                <Link to = "/confirm-order"><Button
                floated='right'
                className='button-cart-green check-white'
              >
                Checkout
              </Button></Link>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
      </Table>
    ) : (
      <div>
        <h4> Your Cart Is Empty</h4>
        <Button floated='right' className='button-cart-green'>
          <Link to="/Products">Back To Shop</Link>
        </Button>
      </div>
    )}
  </div>
  )
  };

  const SmallScreenCart = ({ data, BASE_URL, handleRemoveQuantityFromCart, handleAddQuantityToCart, handleRemoveProduct}) => (
    <div className='cart-content'>
      {data && data.order_products && data.order_products.length > 0 ? (
            <div className="cart-container">
            {data.order_products.map((orderProduct, i) => (
              <div key={orderProduct.id} className="cart-item">
                <div className="cart-item-header">
                  <img
                    className="cart-item-image"
                    src={`${BASE_URL}${orderProduct.product_image}`}
                    alt={orderProduct.product.title}
                  />
                </div>
                <div className="cart-item-details">
                  <p className="cart-item-title">{orderProduct.product.title}</p>
                  <p className="cart-item-size">Size {orderProduct.size}</p>
                </div>
                <div className="cart-item-quantity">
                  <Icon
                    name="minus"
                    style={{ cursor: "pointer", color: 'rgb(71 162 117)' }}
                    onClick={() => handleRemoveQuantityFromCart(orderProduct.product.slug)}
                  />
                  <span className="quantity">{orderProduct.quantity}</span>
                  <Icon
                    name="plus"
                    style={{ cursor: "pointer", color: 'rgb(71 162 117)' }}
                    onClick={() => handleAddQuantityToCart(orderProduct.product.slug)}
                  />
                </div>
                <div className="cart-item-price">${orderProduct.price}</div>
                <div className="cart-item-total">
                  <span className="total">${orderProduct.final_price}</span>
                  <Icon
                    name="close"
                    className="icon-close"
                    style={{ color: 'rgb(71 162 117)' }}
                    onClick={() => handleRemoveProduct(orderProduct.id)}
                  />
                </div>
              </div>
            ))}
            <div className="cart-footer">
              <p>Order Total: ${data.total}</p>
              <Link to="/Products">
                <Button className="button-back">
                  Back To Shop
                </Button>
              </Link>
              <Link to="/confirm-order">
                <Button className="button-checkout">
                  Checkout
                </Button>
              </Link>
            </div>
          </div>
      
      ) : (
        <div>
          <h4> Your Cart Is Empty</h4>
          <Button floated='right' className='button-cart-green'>
            <Link to="/Products">Back To Shop</Link>
          </Button>
        </div>
      )}
    </div>
  );



export default Cart;
