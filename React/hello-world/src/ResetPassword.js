import React from "react";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {resetPassword} from './features/auth/authSlice';
import { toast } from 'react-toastify';
import './Login.css'


const ResetPassword = () => {
    const [formData, setFormData] = useState({
        'email' : '',
    })

    const {email} = formData

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
    
        }
        dispatch(resetPassword(userData))
    }

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate("/Sented")
            toast.success("A reset password email has been sent to you")
        }
        
    }, [isError, isSuccess, dispatch, user, navigate])


    return (

        <div className="parent-reset" >
        <div>
                <h1 className=" mb-4">Reset Your Password</h1>

                {isLoading}
                <label className="form-label mt-2 mb-3 " for="typeEmailX"> Enter Your Email</label>
                
                    <input type="text" className="form-control form-control-lg mb-3"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        value={email}
                        required
                    />
                  

                    <button className="btn butonns btn-lg px-5 ml-5" type="submit" onClick={handleSubmit}>Reset Password</button>
               
            </div>
        
        
        </div>

    )


}
export default ResetPassword;
