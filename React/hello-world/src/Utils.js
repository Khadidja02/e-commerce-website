import axios from "axios";

const THE_BACKEND_DOMAIN = "http://localhost:8000/apy";

export const authAxios = axios.create({
    baseURL: THE_BACKEND_DOMAIN, // Your API base URL
  });
  
  // Add an interceptor to include the access token in the request headers
  authAxios.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("token_access"); // Get the access token from localStorage
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );  
export const addToCartUrl = `${THE_BACKEND_DOMAIN}/add-to-cart/`; 
export const orderSummaryURL = `${THE_BACKEND_DOMAIN}/order-summary/`;   
export const userIDURL = `${THE_BACKEND_DOMAIN}/user-id/`;
export const addressListURL = (addressType) =>
  `${THE_BACKEND_DOMAIN}/my-addresses/?address_type=${addressType}`;
export const addressCreateURL = `${THE_BACKEND_DOMAIN}/addresses/`;
export const addressUpdateURL = id => `${THE_BACKEND_DOMAIN}/addresses/${id}/update/`;
export const addressDeleteURL = id => `${THE_BACKEND_DOMAIN}/addresses/${id}/delete/`; 
export const ConfirmOrderUrl = `${THE_BACKEND_DOMAIN}/confirm-order/`;  
export const applyCouponUrl = `${THE_BACKEND_DOMAIN}/add-coupon/`; 
export const historyOrderUrl = `${THE_BACKEND_DOMAIN}/history-order/`; 
export const AboutUrl = `${THE_BACKEND_DOMAIN}/about-us/1/`; 
export const ContactUrl = `${THE_BACKEND_DOMAIN}/contact/`;
export const ChangePasswordUrl = `${THE_BACKEND_DOMAIN}/change-password/`;
export const orderProductDeleteURL = id => `${THE_BACKEND_DOMAIN}/order-products/${id}/delete/`;
export const orderItemUpdateQuantityURL = `${THE_BACKEND_DOMAIN}/order-product/update-quantity/`;
export const userUpdateUrl= `${THE_BACKEND_DOMAIN}/user-update/`;
export const checkAuth= `${THE_BACKEND_DOMAIN}/check-auth/`;
export const clearCartUrl =  `${THE_BACKEND_DOMAIN}/clear-cart/`;