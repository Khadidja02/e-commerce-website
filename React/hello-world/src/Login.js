import React from "react";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {login, reset, userinfo} from './features/auth/authSlice';
import { toast } from 'react-toastify';
import './Login.css'



const Login = () => {
    const [formData, setFormData] = useState({
        'email' : '',
        'password' :'',
    })

    const {email, password} = formData

    const handleChange = (e)=> {
        setFormData( (prev)=> ({
            ...prev,
            [e.target.name] : e.target.value
        })

        )
    }

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isError, isLoading, isSuccess, message} = useSelector((state)=>state.auth)

    const handleSubmit = (e)=> {
        e.preventDefault()
        const userData = {
            email,
            password,
        }
        dispatch(login(userData))
            
    }

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate("/")
        }
        dispatch(reset())
        dispatch(userinfo())
    }, [isError, isSuccess, dispatch, user, navigate,message])


    return (

        < div className="parent-log-in ">
        <div className="container py-5 ">
          <div className="row d-flex justify-content-center align-items-center ">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 changeH">
              <div className="card  text-white myStyle " >
                <div className="card-body px-5 pb-5 text-center">
      
                  <div className="mb-md-3 mt-md-2 pb-2 pt-5">
      
                    <h2 className="fw-bold mb-2 text-uppercase logintitle">Login</h2>
                    <p className="text-white-50 mb-1">Please enter your login and password!</p>
      
                    

                {isLoading}

                    <div className="form-outline form-white mt-2">
                    <label className="form-label mt-2 mb-3 " for="typeEmailX">Email</label>
                        <input id="typeEmailX" className="form-control form-control-lg"
                        type="email"
                            placeholder="email"
                            name="email"
                            onChange={handleChange}
                            value={email}
                            required
                        />
                        
                    </div>
                    <div className="form-outline form-white mt-2 mb-4">
                    <label className="form-label mt-2 mb-3 " for="typePasswordX">Password</label>
                    <input id="typePasswordX" className="form-control form-control-lg"
                     type="password"
                        placeholder="password"
                        name="password"
                        onChange={handleChange}
                        value={password}
                        required
                    />
                    
                    </div>
                    <p class="small mb-3 pb-lg-2"> <Link className="text-white-50" to="/reset-password">Forget Password ?</Link></p>

                    <button className="btn butonns btn-lg px-5" type="submit" onClick={handleSubmit}>Login</button>
                    </div>

                        <div className="mb-5">
                        <p className="mb-0">Don't have an account? <Link className="text-white-50 fw-bold" to='/signup' >Sign Up</Link>
                        </p>
                        </div>

                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        
        
        
        

    )


    }
export default Login;
