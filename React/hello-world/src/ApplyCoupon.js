import React, { useState } from 'react';
import { Button, Input } from 'semantic-ui-react';
import { authAxios, orderSummaryURL, applyCouponUrl } from './Utils';

function ApplyCoupon({ updateTotal }) {
  const [couponCode, setCouponCode] = useState('');
  const [message, setMessage] = useState('');
  const [data, setData] = useState('');

  const applyCoupon = async () => {
    try {
      const response = await authAxios.post(applyCouponUrl, {
        code: couponCode,
      });

      if (response.status === 200) {
        // Coupon applied successfully, update the order details
        const updatedTotal = response.data.total; // Make sure you're using the correct key from the response
        updateTotal(updatedTotal); // Call the callback function to update the total
        setMessage('Coupon applied successfully');
      } else {
        setMessage('Invalid coupon code');
      }
    } catch (err) {
      setMessage('Error applying the coupon');
      console.error(err);
    }
  };

  return (
    <div className='apply-coupon-div'>
      <p className='titles-confirm-order'>Enter Coupon Code</p>
      <Input
        placeholder="Enter coupon code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        className='input-coupon'
      />
      <button className='btn-coupon'  onClick={applyCoupon}>
        Apply Coupon
      </button>
      <p>{message}</p>
    </div>
  );
}

export default ApplyCoupon;
