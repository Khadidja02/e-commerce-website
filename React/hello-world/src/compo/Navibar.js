import React , {useState, useEffect}from 'react'
import { GoSearch } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi";
import {FiMenu} from "react-icons/fi";
import { Link,Outlet, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import axios from 'axios';
import Search from '../Search';
import CartPanel from '../CartPanel';
import { Icon } from 'semantic-ui-react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Modal, Button } from 'react-bootstrap';
import { checkAuth } from '../Utils';



function Navibar(props) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [style, setStyle]= useState("hide-menu");
    const [mystyle, setMyStyle]= useState("drop-hide");

    const [categori, setCategori] = useState([]);
    const [showModal, setShowModal] = useState(false);


    

  const handleCheckout = () => {
    // Close the cart when navigating to cart shipping
    setIsCartOpen(false);
    // Navigate to the cart shipping page
    navigate('/cart-shipping');
  };



  useEffect(() => {
    axios.get('http://localhost:8000/apy/categories/')
      .then(response => {
        setCategori(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
      const checkAuthenticationStatus = async () => {
        try {
          // Make an API request to check authentication status
          await axios.get(checkAuth);
          // If the response indicates the user is authenticated, continue with the current flow
        } catch (error) {
          // If the request fails due to authentication error, show the modal
          setShowModal(true);
        }
      };
  
      // Check authentication status periodically (e.g., every 5 minutes)
      const intervalId = setInterval(checkAuthenticationStatus, 120 * 60 * 1000);
  
      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    }, []);
  
    const handleCloseModal = () => {
    setShowModal(false);
    handleLogout();
    navigate('/login')
    }
    

   
      const toggleDropdown = () => {
        console.log("Dropdown toggled");
        if (mystyle !== "drop-hide") setMyStyle("drop-hide");
        else setMyStyle("drop-show")
        // Toggle the display property of the dropdown menu
        
        
      };
    

    const openSearch = () => {
      setIsSearchOpen(true);
    };
    const Changestatu = () =>{
      console.log("you just clicked");

      
      if (style !== "hide-menu") setStyle("hide-menu");
      else setStyle("show-menu")
    }
    const closeSearch = () => {
      setIsSearchOpen(false);
    };

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate("/")
    }
    const toggleCartSidebar = () => {
      if (user) {
        setIsCartOpen(!isCartOpen);
      } else {
        navigate('/login');
      }
    };
    
  

    return ( 
      
        <header className='header'>
            
            <nav className=' navbar navbar-expand-lg bg-white d-flex justify-content-between'>
                {/*the logo */}
                <a href="#"  >
                <img src="https://cdn.logo.com/hotlink-ok/logo-social.png" className='logo' />
                </a>
                {/* first list of navigation bar*/ }
                <ul className='BigList justify-content-evenly'>
                        <li className='list hover1'>

                        <Link to="/" className='links-router nav-link' >Home</Link>
                        
                        </li>
                        <li className='list hover1'>
                        <Link to="/Products" className='links-router nav-link'>Products</Link>
                          <div className="dropdown-content">
                            <ul class="dropdown-item">
                            {categori.map((category, index) => (
                            <li key={index}>
                                    <Link className="dropdown-item text-uppercase" to={`/Products/${category.id}`}>{category.name}</Link>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </li>
                     <li className='list hover1'>
                        <Link to="/About" className='links-router nav-link'>About Us</Link>
                        
                        </li>
                    
                        <li className='list hover1'>
                        <Link to="/ContactUs" className='links-router nav-link'>Contact Us</Link>
                        </li>
                </ul>
                <div className='d-flex justify-content-start second-list1'>
                        {/* list of Icons */}
                        <ul className='BigList2'>
                          <li className='list2'>
                            <button className='buton' onClick={openSearch}>
                              <GoSearch className="fonts" />
                              
                            </button>
                            <Search isOpen={isSearchOpen} onRequestClose={closeSearch} />
                          </li>
                          <li className='list2'>
                            <button className="buton links-router" onClick={toggleCartSidebar}>
                              <HiOutlineShoppingBag className="fonts" />
                            </button>
                          </li>
                          
                        </ul>

                        {user ? (
                            <ul className='BigList2'>
                              <li className='list2'>
                                <div className='dropdown'>
                                  <button className='buton' onClick={toggleDropdown}>
                                    <Icon name='user' />
                                  </button>
                                  

                                    <ul className={`dropdown-menu ${mystyle}`}>
                                        <li>
                                          <NavLink  to="/profile">Profile</NavLink>
                                        </li>
                                        <li>
                                          <NavLink  to="/" onClick={handleLogout}>Logout</NavLink>
                                        </li>
                                      </ul>
                                    
                                </div>
                              </li>
                            </ul>
                          ) : (
                          <ul className='BigList2'>
                            <li className='list2'>
                              <button className='butns'>
                                <Link className='links-router nav-link' to='/login'>Login</Link>
                              </button>
                            </li>
                            <li className='list2'>
                              <button className='butns'>
                                <Link className='links-router nav-link' to='/signup'>Signup</Link>
                              </button>
                            </li>
                          </ul>
                        )}
                        <div className='list2'>
                            <button className='bton menu-icon' onClick={Changestatu}>
                              <FiMenu className="fonts" />
                            </button>
                          </div>
                      </div>
                          
                 
                 
              </nav>
              <Outlet/>
             
              <div className= {style}>
                <div className='the-colors'>
                <ul className='BigList-mobile'>
                    <li className='list-mobile hover-mobile'>
                        Home</li>
                    <li className='list-mobile hover-mobile'>About</li>
                    <li className='list-mobile hover-mobile'>Products</li>
                    <li className='list-mobile hover-mobile'>Contact</li>
                </ul>
                </div>
                </div>

                <Offcanvas show={isCartOpen} onHide={() => setIsCartOpen(false)} placement="end" style={{ width: '400px' }}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Your Cart</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <CartPanel handleCheckout={handleCheckout} />
                  </Offcanvas.Body>
                </Offcanvas>

                {/* Modal for displaying session expiration */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Session Expired</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your session has expired. Please log in again to continue.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button><Link to="/login"><Button variant="primary" onClick={handleLogout}>
            Log In
          </Button></Link>
          
        </Modal.Footer>
      </Modal>
                
        </header>
        
    )
}

export default Navibar;