import React, { useState, useRef, useEffect } from 'react';
import SignupImage from "../assets/farmm.png"
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import ReactCountryFlag from "react-country-flag";
import { FaChevronDown } from "react-icons/fa";
import { BiError } from "react-icons/bi";
import { GoDotFill } from "react-icons/go";
import { MdOutlineFingerprint } from "react-icons/md";
const ThirdSection = () => {
  return (
    <div>
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

                <p>Already have an account? Log In</p>
            </div>



            <div className="form_body">


                <div className='create-account'>
                    <div className='dot-progress'>
                        <div className='check_bar '>
                            <div className="check first-check" >
                            <FaCheck />
                            </div>
                        </div>

                        <div className='check_bar bar'>
                            <div className="check second-check" >
                            <FaCheck />
                            </div>
                        </div>

                        <div className='check_bar bar'>
                            <div className="check" >
                            <GoDotFill />
                            </div>
                        </div>

                        <div className="check last_bar" >
                        <GoDotFill />
                        </div>
                    </div>



                    <div className='form_container'>
                        <h1 className='form_hader'>Create Account</h1>
                        <form action="">
                            <p className='personal-information'>Security - Setup FIngerprint (Optional)</p>    
                           

                            <p className='capture'>Capture Fingerprint (Your L-R index fingers)</p>

                            <div className='fingerprint'>
                                <span>
                                <MdOutlineFingerprint />
                                </span>


                                <span>
                                <MdOutlineFingerprint />
                                </span>


                                <span>
                                <MdOutlineFingerprint />
                                </span>


                                <span>
                                <MdOutlineFingerprint />
                                </span>
                            </div>

                           <div className='skip_container'>
                                <button className='skip-button'>
                                    <input className='skip' type="checkbox" name="" id="" />
                                    Skip for now
                                </button>
                           </div>

                                    <div className="continue-back-btn bank">
                                        <button className='back'>
                                            Back
                                        </button>

                                        <button className='continue'>
                                            Continue
                                        </button>
                                    </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ThirdSection
