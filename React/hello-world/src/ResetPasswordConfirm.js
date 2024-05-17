import React from "react";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {resetPasswordConfirm} from './features/auth/authSlice';
import { toast } from 'react-toastify';
import './Login.css'




const ResetPasswordConfirm = () => {
    const [formData, setFormData] = useState({
        'new_password' : '',
        're_new_password' :'',
    })

    const {uid, token} = useParams()
    console.log(uid, token);

    const { new_password, re_new_password} = formData

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
            uid,
            token,
            new_password,
            re_new_password,
        }
        console.log(userData)
        dispatch(resetPasswordConfirm(userData))
    }

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess || user){
            navigate("/login")
            toast.success("Your password was rest successfully")
        }
        
    }, [isError, isSuccess, dispatch, user, navigate, message])


    return (

        <div className="parent-reset-password" >
        <div className="mb-md-3 mt-md-2 pb-2 pt-5 div-reset">
                <h3 className="title-reset">Reset Your Password</h3>

                {isLoading ? (
                    <p>Loading...</p>
                    ) : (

                <div className=" div-form-reset">
                    <label className="form-label mt-2 mb-3 " > New Password</label>
                    <input type="password" className="form-control form-control-lg label-reset"
                        
                        name="new_password"
                        onChange={handleChange}
                        value={new_password}
                        required
                    />
                    <label className="form-label mt-4 mb-2 " > Retype Password</label>

                    <input type="password" className="form-control form-control-lg label-reset mb-3"
                        
                        name="re_new_password"
                        onChange={handleChange}
                        value={re_new_password}
                        required
                    />
                    

                    <button className="butonns pt-2 pb-2 pr-3 pl-3" type="submit" onClick={handleSubmit}>Reset Password</button>
                </div>
                )}
            </div>
        
        
        </div>

    )


}
export default ResetPasswordConfirm;
