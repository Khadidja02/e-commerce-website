import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAxios, orderSummaryURL, ConfirmOrderUrl, addressListURL} from './Utils';
import { Button, Header, Table, Select } from 'semantic-ui-react';
import ApplyCoupon from './ApplyCoupon';
import './Confirm.css';
import './Bagpage.css';
import { useMediaQuery } from 'react-responsive';


const BASE_URL = 'http://localhost:8000'; 
const SelectShippingAddress = ({ addresses, selectedAddress, handleSelectChange }) => (
  <div className=' select-div'>
    <p  className='titles-confirm-order'>Enter Your Address</p>
    {addresses.length > 0 ? (
      
      <Select
      className='select-address'
      placeholder="Select a shipping address"
      value={selectedAddress ? selectedAddress.id : null}
        options={addresses.map((address) => ({
          key: address.id,
          text: `${address.street_address}, ${address.house_address}, ${address.country}`,
          value: address.id,
        }))}
        onChange={handleSelectChange}
      />
    ) : (
      <p>
        You need to <Link to="/profile">add a shipping address</Link>
      </p>
    )}
  </div>
);

const OrderConfirmation = () => {
  const [data, setData] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updatedTotal, setUpdatedTotal] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const isLargeScreen = useMediaQuery({ minWidth: 768 }); // Define your screen size threshold


  const navigate = useNavigate();

  const handleTheclick = () =>{
    navigate("/profile/order-history")
  };

  useEffect(() => {
    console.log('Fetching address data...');

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
    const fetchAddressList = () => {
      authAxios
        .get(addressListURL("S"))
        .then((res) => {
          console.log('API Response:', res.data.results); // Check the structure of the response
          setAddresses(res.data.results);
        })
        .catch((err) => {
          setError(err);
        });
    };
    

    fetchAddressList();
    fetchData();
  }, []);

  const handleSelectChange = (event, { value }) => {
    const selected = addresses.find((address) => address.id === value);
    setSelectedAddress(selected);
  };

  const handleConfirmOrder = async () => {
    try {
      setLoading(true);
      const requestPayload = {
        shipping_address: selectedAddress,
        products: data.order_products,
      };
      const response = await authAxios.post(ConfirmOrderUrl, requestPayload);
      
      navigate('/thank-you');
      setData(null);
      localStorage.setItem('refreshCart', 'true');

      // Handle a successful order confirmation, e.g., redirect to a thank you page
      // ...
    } catch (err) {
      console.log(err);
      setError('Error confirming the order');
      setLoading(false);
    }
  };
  const LargeScreenCart = ({ data }) => (
    <Table celled compact definition className='table-cart'>
      <Table.Body>
        {data.order_products.map((orderProduct, i) => (
          <Table.Row key={orderProduct.id}>
            <Table.Cell className='info-cels-child product-cells-img'>
              <div className='div-cells'>
                <div className='div-img-cells'>
                  <img className='img-cells' src={`${BASE_URL}${orderProduct.product_image}`} alt={orderProduct.product.title} />
                </div>
                <div className='info-cells'>
                  <p className='text-cells'>{orderProduct.product.title}</p>
                </div>
              </div>
            </Table.Cell>
            <Table.Cell className='info-cels-child'>
              <div className='icon-cart-shop icon-shop-confirm'>
                <p className='qty-cart'>Qty: {orderProduct.quantity}</p>
              </div>
            </Table.Cell>
            <Table.Cell className='info-cels-child'>
              <p className='price-cells'>${orderProduct.price}</p>
            </Table.Cell>
            <Table.Cell className='info-cels-child'>
              <p className='last-cells'>${orderProduct.final_price}</p>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row className='info-cels-child'>
          <Table.HeaderCell colSpan='4' textAlign='left' className='info-cels-child footer-cells'>
            <div className='last-cells-orders'>
              <p>Order Total: ${data.total}</p>
              <Link to='/Products'>
                <p className='link-confirm'>Back to shop</p>
              </Link>
            </div>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );

  const SmallScreenCart = ({ data }) => (
    
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
                <div className="cart-item-detail">
                  <p className="cart-item-title">{orderProduct.product.title}</p>
                </div>
                <div className="cart-item-quantity">
                  <p></p>
                  <span className="quantity ">QTY :{orderProduct.quantity}</span>
                  
                </div>
                <div className="cart-item-price">${orderProduct.price}</div>

                <div className="cart-item-total">
                  <span className="total">${orderProduct.final_price}</span>
                  
                </div>
              </div>
      ))}
      <div className='order-total'>
        <p>Order Total: ${data.total}</p>
      
      <Link to='/Products'>
        <Button primary>Back to Shop</Button>
      </Link></div>
    </div>
  );

  return (
    <div className='the-big-contain-confirm'>
    <div className='container-Order-confirm cart-bag-containers'>
      <h3 className='Cart-header'>Order Summary</h3>

      {data && (isLargeScreen ? <LargeScreenCart data={data} /> : <SmallScreenCart data={data} />)}
      </div>
      {error && <p>{error}</p>}
      <div className='ship-confirm '>
      <h3 className='Cart-header-select'>Confirm Order</h3>
      <SelectShippingAddress
        addresses={addresses}
        selectedAddress={selectedAddress}
        handleSelectChange={handleSelectChange}
      />

      <ApplyCoupon updateTotal={setUpdatedTotal} />

      <button className='btn-confirm-order' loading={loading} onClick={handleConfirmOrder}>
        Confirm Order
      </button>
      
         
          <button className='btn-confirm-order' onClick={handleTheclick} >
          View My Orders
      </button>
      </div>
    
    </div>
  );
};

export default OrderConfirmation;
