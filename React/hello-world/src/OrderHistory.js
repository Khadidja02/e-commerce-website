import React, { useEffect, useState } from 'react';
import {  Card} from 'semantic-ui-react';
import { authAxios, historyOrderUrl } from './Utils';
import './Shipping.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";



const BASE_URL = 'http://localhost:8000';


function OrderHistory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await authAxios.get(historyOrderUrl);
        console.log(response.data.results)
        setData(response.data.results); // Assuming that the data contains order information
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
      setLoading(false);
    };

    fetchOrderHistory();
  }, []);

  return (
    <div className='big-div-add'>
      <div className='title-address'>
      <h1>My Orders</h1>
      </div>
      <div className='div-parent-big-ordHist'>
      {loading ? (
        <p>Loading...</p>
      ) : data.length > 0 ? (
        
          <Carousel  responsive={responsive} >
        
          {/**/}
          {data.map((order) => (
            
              <Card.Content className='content-first content-order' key={order.id}>
              <p className='id-order'>Order ID: {order.id}</p>
              <p className='date-order'>Order Date: {new Date(order.ordered_date).toLocaleString('en-DZ', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                
                {order.order_products.map((orderProduct) => (
                  <div className='div-ordeHist-two' key={orderProduct.id}>
                    <div className='div-orderHist-one'>
                      <div className='div-order-img'>
                        <img className='img-order' src={`${BASE_URL}${orderProduct.product_image}`} />
                      </div>
                      <div className='div-order-info'>
                        <p className='date-order title-order-prod'> {orderProduct.product.title}</p>
                        <p className='date-order price-odrer'>${orderProduct.product.price}</p>
                        <p className='date-order price-odrer'>Qty: {orderProduct.quantity}</p> </div>
                    </div>
                  </div>
                ))}
                
              </Card.Content>
              
          ))}
          
          </Carousel>
          
        
      ) : (
        <p>No orders found.</p>
      )}
      </div>
    </div>
  );
}

export default OrderHistory;
