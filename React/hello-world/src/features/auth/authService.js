import axios from "axios"

const BACKEND_DOMAIN = "http://localhost:8000"

const SIGNUP_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/`
const LOGIN_URL = `${BACKEND_DOMAIN}/api/v1/auth/jwt/create/`
const ACTIVATE_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/activation/`
const GET_USER_INFO = `${BACKEND_DOMAIN}/api/v1/auth/users/me/`
const RESET_PASSWORD_URL= `${BACKEND_DOMAIN}/api/v1/auth/users/reset_password/`
const RESET_PASSWORD_CONFIRM_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/reset_password_confirm/`




const signup = async (userData)=>{
    const config ={
        headers: {
            'Content-Type' : 'application/json'
        }

    }
    const response = await axios.post(SIGNUP_URL, userData, config)

    return response.data
}

const login = async(userData)=> {
    const config = {
        headers:{
            'Content-Type' :'application/json'
        }
    }

    const response = await axios.post(LOGIN_URL, userData, config)

    if(response.data){
        localStorage.setItem('token_access', response.data.access);
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem('refresh_token', response.data.refresh);
          
        
    }

    return response.data
}

const logout =()=>{
    return localStorage.removeItem("user")
}

const activate = async (userData)=>{
    const config ={
        headers: {
            'Content-Type' : 'application/json'
        }

    }
    const response = await axios.post(ACTIVATE_URL, userData, config)

    return response.data
}

const resetPassword = async (userData)=>{
    const config ={
        headers: {
            'Content-Type' : 'application/json'
        }

    }
    const response = await axios.post(RESET_PASSWORD_URL, userData, config)

    return response.data
}

const resetPasswordConfirm = async (userData)=>{
    const config ={
        headers: {
            'Content-Type' : 'application/json'
        }

    }
    const response = await axios.post(RESET_PASSWORD_CONFIRM_URL, userData, config)

    return response.data
}

const userinfo = async (accesstoken)=>{
    const config ={
        headers: {
            'Authorization': `Bearer ${accesstoken}`
        }

    }
    const response = await axios.get(GET_USER_INFO, config)

    return response.data
}

const authService = { signup, login, logout, resetPassword, resetPasswordConfirm, userinfo, activate}

export default authService;
    
