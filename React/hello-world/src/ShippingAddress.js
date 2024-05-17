import React, { useState, useEffect } from 'react';
import { Form, Message, Button, Card, Divider, Select } from 'semantic-ui-react';
import { authAxios, addressListURL, addressCreateURL, addressUpdateURL, addressDeleteURL, userIDURL } from './Utils';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Shipping.css';
import AddressForm from './AdressForm';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


function AddressList(props) {
  const navigate = useNavigate();
  const { activeItem, callback } = props;
  const [showAddressForm, setShowAddressForm] = useState(false); // State variable to manage visibility


  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [formData, setFormData] = useState({
    street_address: '',
    country: '',
    house_address: '',
    zip: '',
    default: false,
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [userID, setUserID] = useState(null);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
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

  const handleFetchUserID = () => {
    authAxios
      .get(userIDURL)
      .then((res) => {
        setUserID(res.data.userID);
      })
      .catch((err) => {
        setError(err);
      });
  };

  const handleFetchAddresses = () => {
    authAxios
      .get(addressListURL(activeItem === "billingAddress" ? "B" : "S"))
      .then((res) => {
        console.log('API Response:', res.data); // Check the structure of the response
        setAddresses(res.data.results);
      })
      .catch((err) => {
        setError(err);
      });
  };
  const handleUpdateClick = (address) => {
    setSelectedAddress(address);
  };
  


  

  const handleDeleteAddress = (addressID) => {
    authAxios
      .delete(addressDeleteURL(addressID))
      .then((res) => {
        setAddresses(addresses.filter((address) => address.id !== addressID));
        setSelectedAddress(null);
        callback();
      })
      .catch((err) => {
        setError(err);
      });
  };

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      handleFetchUserID();
      handleFetchAddresses();
    }
  }, [user, navigate]);

  return (
    <div className='big-div-add'>
      <div className='title-address'>
        <h3>Addresses</h3>
      </div>
      <div className='div-parent-big-ordHist'>
      <Carousel  responsive={responsive} >
      
        {addresses.map((address) => (
          
            <Card.Content className='content-first content-order' key={address.id}>
          
                <p className='label-cart'> 
                Street Address:
                </p>
                <p className='data-cart'>
                  {address.street_address}
                   </p>
                <p className='label-cart'>
                   House Address:
                   </p>
                <p className='data-cart'>
                  {address.house_address}
                  </p>
                <p className='label-cart'>
                   Country: 
                   </p>
                  <p className='data-cart'>
                    {address.country}</p>
                
              <p className='label-cart'>
                 Postal Code:</p>
              <p className='data-cart'>{address.zip}</p>
              
              {address.default ? (
                <Message 
                  positive
                  content="Default Address"
                  style={{ marginBottom: '5px' }}
                />
              ): null}
              
            
              
              <Button className='button-action-green' onClick={() => handleUpdateClick(address)}
                
>
                Update
              </Button>
              <Button
                 className='button-action-red'
                color="red"
                onClick={() => handleDeleteAddress(address.id)}
              >
                Delete
              </Button>
            </Card.Content>
          
        ))}
        
      
      </Carousel>
      <div className='btn-add mt-5'>
      <Link to="/profile/add" >
           <button className='button-action-green pt-2 pb-2 pl-3 pr-3' onClick={console.log('hello')} >Add Address</button> 
          </Link></div>

      {addresses.length > 0 && (
        <Divider style={{ marginTop: '20px', marginBottom: '20px' }} />
      )} 
      {/* Render AddressForm component with selectedAddress prop */}
      {selectedAddress && <AddressForm address={selectedAddress} />}
      
      ;
      </div>
      </div>
  )
};

export default AddressList;
