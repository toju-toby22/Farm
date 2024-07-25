import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import SignupImage from "../assets/farmm.png"
import { MdOutlineFingerprint } from "react-icons/md";


const LoginPage = () => {
    return (
        <div className="container">
            <div className="Image">
                <img className='img' src={SignupImage} alt="" srcset="" />
            </div>


            <div className="Form">
                <div className="already-have-an-account">
                    <span className='back_home'>
                        <IoIosArrowBack />
                        <p>Back home</p>
                    </span>

                    
                </div>



                <div className="form_body">


                    <div className='create-account'>




                        <div className='form_container'>
                            <h1 className='form_hader'>Welcome back!</h1>
                            <form action="">
                                <p className='personal-information'>Welcome back! Please enter your details</p>



                                <div className="user-Name">
                                    <span>
                                        <p className='name'>Email address / Phone number</p>
                                        <input className='input-field email'
                                            type="text" placeholder='Enter Email or Phone number' />
                                        <p className='error'>
                                        This phone number is not verified. Log in with email instead.
                                        </p>

                                    </span>

                                </div>





                                <div className=" ">


                                <p className='name'>Password</p>
                                    <span className='password-finger'>
                                        <input className='input-field email'
                                            type="password" placeholder='Enter Password' />
                                            <div className='fingerprint'>
                                        <span>
                                            <MdOutlineFingerprint />
                                        </span>
                                    </div>
                                    </span>

                                    

                                </div>
                               <span className='remember'>
                                <span className='check-rember'>
                                    <input type="checkbox" name="" id="" />
                                    <p>Remember me for 30 days</p>
                                </span>

                                <p className='forgot'>Forgot password</p>


                               </span>

















                                <div className="continue-back-btn bank">

                                    <button className='continue' >
                                        Login
                                    </button>
                                
                                </div>
                                <span className='no-account'>
                                    Don't have an account?
                                <p className='forgot'>Sign up</p>

                                </span>
                            </form>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
