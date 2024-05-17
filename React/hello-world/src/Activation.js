import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {activate, reset} from './features/auth/authSlice';
import { toast } from 'react-toastify';
import './Activation.css'


const Activation = () => {
   

    const {uid, token} = useParams();

   

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isError, isLoading, isSuccess, message} = useSelector((state)=>state.auth)

    const handleSubmit = (e)=> {
        e.preventDefault()
        const userData = {
            uid,
            token,
        }
        dispatch(activate(userData))
        console.log(userData)
        toast.success("Your account has been activated ! You can login Now !")
    }

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate("/login")
        }
        dispatch(reset())
        
    }, [isError, isSuccess, dispatch, user, navigate, message])


    return (

        <>
        <div className="activate-div">
                <h5 className="title-activate mb-5">Please Click On The Button To Activate Your Account !</h5>

                {isLoading ? (
                    <p>Loading...</p>
                    ) : (
                    <button className="butn-activate" type="submit" onClick={handleSubmit}>
                        Activate Account
                    </button>
                    )}

            </div>
        
        
        </>

    )


}
export default Activation;
