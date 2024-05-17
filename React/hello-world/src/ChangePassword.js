import React, { useState } from 'react';
import { ChangePasswordUrl } from './Utils';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from './features/auth/authSlice';
import './User Account/UserDetail.css'

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'oldPassword') {
      setOldPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("token_access");
    // Send a request to change the password
    fetch(ChangePasswordUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // Use the user's access token
      },
      body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Password changed successfully");
          dispatch(reset()); // Clear any error messages or loading state
          // You can handle this as needed (e.g., show a success message)
        } else {
          // Handle password change error (e.g., display an error message)
          console.log("Error");
        }
      });
  };

  return (
    <div className='edit-form'>
      <div className="col-xl-6 ">
        <div className="card mb-4">
          <div className="card-header"> <p className='title-edit'>Edit Password</p></div>
          <div className="card-body">
              <form onSubmit={handleSubmit}>
              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className=" mb-1 label-title" htmlFor="inputFirstName">
                    Old Password
                  </label>
                <input
                  className=" shadow-edit"
                  type="password"
                  name="oldPassword"
                  
                  value={oldPassword}
                  onChange={handleChange}
                />
                </div>
                </div>
                <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className=" mb-1 label-title" htmlFor="inputFirstName">
                    New Password
                  </label>
                <input
                  className=" shadow-edit"
                  type="password"
                  name="newPassword"
                  
                  value={newPassword}
                  onChange={handleChange}
                /></div>
                </div>
                <button className="buton-edit-password" type="submit">Change Password</button>
              </form>
              </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
