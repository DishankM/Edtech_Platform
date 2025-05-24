import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function VerifyEmail() {

    const [otp, setOtp] = React.useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading,signupData}= useSelector((state)=>state.auth);


    useEffect(() => {

        if(!signupData){
            navigate('/signup');
        }},[])



    const handleOnSubmit = (e) => {

        e.preventDefault();
        const {email,accountType,confirmPassword,password,lastName,firstName}=signupData;

        dispatch(signUp(accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate));
    }
    
  return (
    <div className=" h-[100vh] flex justify-center items-center">
        {
            loading ? (
                <div><div class="custom-loader"></div></div>
            ) : (
                <div>
                    <h1>Verify Email</h1>
                    <p>A verification code has been send to you. Enter the code  below</p>

                    <form onSubmit={handleOnSubmit}>
                      <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        inputStyle="w-[20px] rounded-[8px] border-[1px] border-richblack-500 text-[3rem] text-center"
                        focusStyle="border-[5px] border-red-500"
                        isInputNum={true}
                        shouldAutoFocus={true}
                        containerStyle="flex justify-between gap-4"
                        renderInput={(props) => <input {...props} />}

                      />
                        <button type='submit'>
                            Verify Email
                        </button>
                    </form>

                    <div>
                    <div className='mt-6 flex items-center justify-between'>
                        <Link to={"/login"}>
                            <p class="flex items-center gap-x-2 text-richblack-5"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path></svg> Back To Login</p>
                        </Link>
                    </div>
                    <button onClick={() => dispatch(setOtp(signupData.email, navigate))}>
                        Resend it
                    </button>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail