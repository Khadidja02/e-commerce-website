import { Component } from 'react';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './Home'

import About from './About';
import Products from './Products';
import Footer from './compo/Footer';
import Nomatch from './Nomatch';

import AddressForm from './AdressForm';
import AllProducts from './AllProducts';
import ContactUs from './ContactUs';
import ProductViews from './ProductViews';
import Bagpage from './Bagpage';
import {store} from './store';
import { Provider } from 'react-redux';
import Login from './Login';
import Navibar from './compo/Navibar'
import Signup from './Signup';
import Activation from './Activation';
import ResetPassword from './ResetPassword';
import ResetPasswordConfirm from './ResetPasswordConfirm';
import Testing from './Testing';
import MensProducts from './MensProducts';
import Cart from './Cart';
import OrderConfirmation from './ConfirmOrder';
import OrderHistory from './OrderHistory';
import User from './User Account/User';
import EditUser from './User Account/EditUser';
import UserDetails from './User Account/UserDetails';
import AddressList from './ShippingAddress';
import ChangePasswordForm from './ChangePassword';
import EmailSent from './EmailSent';
import SignupSuccessed from './SignupSuccessed';
import ThankYou from './ThankYou';

const UPDATE_FORM = "UPDATE_FORM";
const CREATE_FORM = "CREATE_FORM";



class App extends Component {
  render(){
  return (
    
      <>
      <Provider store={store}>
        <Navibar/>
      
          <Routes>
            <Route path='/profile'element= {<User/>}>
              <Route index element={<UserDetails/>}  />
              <Route path='user-details' element = {<UserDetails/>}/>
               <Route path='/profile/edit-user' element = {<EditUser/>}/>
               <Route path='/profile/order-history' element= {<OrderHistory/>}/>
               <Route path='/profile/adresses' element= {<AddressList/>}/>
                <Route path="/profile/add" element={<AddressForm/>} formType={CREATE_FORM} />
                <Route path="/profile/edit/:id" element={<AddressForm formType={UPDATE_FORM} />} />
              
               <Route path='/profile/security' element= {<ChangePasswordForm/>}/>
               

            </Route>

            <Route path='/' element={<Home/>}/>
            <Route path='test' element = {<Testing/>}/>
            <Route path='Bagpage' element={<Bagpage/>}/>
            <Route path='About' element={<About/>}/>
            <Route path='Sented' element={<EmailSent/>}/>
            <Route path='Signup-successed' element={<SignupSuccessed/>}/>
            <Route path='signup' element={<Signup/>}/>
            <Route path='thank-you' element={<ThankYou/>}/>
            <Route path='activate/:uid/:token' element={<Activation/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='reset-password' element={<ResetPassword/>}/>
            <Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>}/>
            <Route path='Productviews/:slug' element={<ProductViews/>}/>
            <Route path='cart-shipping' element= {<Cart/>}/>
            <Route path='confirm-order' element= {<OrderConfirmation/>}/>
            
            <Route path='Products' element={<Products/>}>
              <Route index element={<AllProducts/>}  />
              <Route path='AllProducts' element={<AllProducts/>}/>
              <Route path='/Products/:category_id' element={<MensProducts />}/>
              
              
            </Route>
            <Route path='ContactUs' element={<ContactUs/>}></Route>
            <Route path='*' element={<Nomatch/>}/>
          </Routes>

          <Footer/>
      
      </Provider> 
  </>
    
    
    
  );
}
}

export default App;
