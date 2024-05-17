import React , { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './user.css'
import { Link,Outlet } from 'react-router-dom';


function User() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <div>
      <div class="container-xl px-4 mt-4">
    
    <nav class="nav nav-borders titlesf">
        <Link to= 'user-details' className='links-router link-spec nav-link active ms-0 '>Profile</Link>
       <Link class="nav-link" to="adresses" >Adresses</Link>
        <Link class="nav-link" to="security" >Security</Link>
  <Link class="nav-link" to="order-history" >Order History</Link>
    </nav>
    <hr class="mt-0 mb-4"/>
    
</div>
<Outlet/>
    </div>
  )
}

export default User
