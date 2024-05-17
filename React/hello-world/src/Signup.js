import React from "react";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { reset, signup} from './features/auth/authSlice';
import { toast } from 'react-toastify';
import './Login.css'



const Signup = () => {
    const [formData, setFormData] = useState({
        'name': '',
        'email' : '',
        'password' :'',
        're_password': '',
    })

    const {name,email, password,re_password} = formData

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
        if (password !== re_password){
            toast.error("Password do not match")
        }else{
            const userData = {
                name,
                email,
                password,
                re_password,
            }
            dispatch(signup(userData))
        }
        
      
    }

    useEffect(()=>{
        if(isError){
            console.log(message)
        }
        if(isSuccess || user){
            navigate("/Signup-successed")
            toast.success("An activation has been sent to you email. Please check you email")
        }
        dispatch(reset())
        
    }, [isError, isSuccess, dispatch, user, navigate])


    return (

        < div className="parent-log-in">
       <div className="container py-5 ">
          <div className="row d-flex justify-content-center align-items-center ">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 changeH">
              <div className="card  text-white myStyle mt-5 " >
                <div className="card-body px-5 pb-5  text-center">
      
                  <div className="mb-md-2 mt-md-2 pb-2 ">
      
                    <h2 className="fw-bold mb-2 mb-4 logintitle">Sign Up Now</h2>
                    
      
                    

                {isLoading}

                <div className="form-outline form-white mb-3">
                <label className=" labes  mb-2 " for="typeName">Name</label>
                    <input  id="typeName" className="form-control form-control-lg mb-2"
                        type="text"
                        placeholder="Enter Your Name"
                        name="name"
                        onChange={handleChange}
                        value={name}
                        required
                    />
                    <label className="labes  " for="typeEmail">Email</label>
                    <input id="typeEmail" className="form-control form-control-lg mb-2"
                        type="email"
                        placeholder="Enter Email"
                        name="email"
                        onChange={handleChange}
                        value={email}
                        required
                    />
                    <label className=" labes " for="typePaswword1">Password</label>
                    <input id="typePaswword" className="form-control form-control-lg mb-2"
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        onChange={handleChange}
                        value={password}
                        required
                    />
                    <label className="labes " for="typePaswword1">Confirm Password</label>
                     <input id="typePaswword1" className="form-control form-control-lg mb-3"
                        type="password"
                        placeholder=" Confirm Password"
                        name="re_password"
                        onChange={handleChange}
                        value={re_password}
                        required
                    />
                    </div>
                    <p class="small "> <Link className="text-white-50" to="/login">Already have an Account ? </Link> </p>

                    <button className="btn butonns btn-lg px-5" type="submit" onClick={handleSubmit}>Sign Up</button>
                    </div>
            
        
                    </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
       

    )








}
export default Signup;
