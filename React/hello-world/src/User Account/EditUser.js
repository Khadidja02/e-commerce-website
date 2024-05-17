import React, { useState, useEffect } from 'react';
import { authAxios, userUpdateUrl } from '../Utils'
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserDetail.css';
import { useNavigate } from 'react-router-dom';


function EditUser() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const navigate = useNavigate(); // Initialize useHistory hook
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await authAxios.get(userUpdateUrl);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await authAxios.put(userUpdateUrl, userData);
      navigate('/profile/user-details')

      // Handle success, e.g., show a success message
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className='edit-form'>
      <div className="col-xl-8 ">
        <div className="card mb-4">
          <div className="card-header"> <p className='title-edit'>Edit Profile</p></div>
          <div className="card-body">
            <form>
              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className=" mb-1 label-title" htmlFor="inputFirstName">
                    First name
                  </label>
            
                  <input
                    className=" shadow-edit"
                    id="inputFirstName"
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className=" mb-1 label-title" htmlFor="inputEmailAddress">
                  Email address
                </label>
                <input
                  className=" shadow-edit"
                  id="inputEmailAddress"
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className=" mb-1 label-title " htmlFor="inputPhone">
                    Phone number
                  </label>
                  <input
                    className=" shadow-edit"
                    id="inputPhone"
                    type="tel"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                className="buton-edit"
                type="button"
                onClick={handleSubmit}
              >
                Save changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
