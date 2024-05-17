import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { authAxios, userUpdateUrl } from '../Utils';
import { useSelector } from 'react-redux';
import './UserDetail.css'

function UserDetails() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    // Make an API request to fetch user data
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Replace 'yourApiEndpoint' with your actual API endpoint to fetch user data
      const response = await authAxios.get(userUpdateUrl);
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  const { user } = useSelector((state) => state.auth);
  const navigate= useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    
    <div class="col-xl-11 edit-form">

      <div className="col-xl-8 ">
        <div className="card mb-4">
          <div className="card-header"> <p className='title-edit'>Profile Information</p> </div>
          <div className="card-body">
            <form>
              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className="small mb-1 label-title" htmlFor="inputFirstName">
                    First name
                  </label>
                  <p className='edit-data'>{users ? users.name : ''}</p>
                </div>
              </div>
              <div className="mb-3">
                <label className="small mb-1 label-title" htmlFor="inputEmailAddress">
                  Email address
                </label>
                <p className='edit-data'>{users ? users.email : ''}</p>
              </div>
              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className="small mb-1 label-title" htmlFor="inputPhone">
                    Phone number
                  </label>
                  <p className='edit-data'>0{users ? users.phone : ''}</p>
                </div>
              </div>
              
              <Link to='/profile/edit-user'>
              <button className="buton-edit" type="button">
              Edit Profile
              </button></Link>
            </form>
          </div>
        </div>
      </div>
      <Outlet/>
    </div>
    
  );
}

export default UserDetails;
