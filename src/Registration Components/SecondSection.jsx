import React, { useState, useRef, useEffect } from 'react';
import SignupImage from "../assets/farmm.png"
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import ReactCountryFlag from "react-country-flag";
import { FaChevronDown } from "react-icons/fa";

import { GoDotFill } from "react-icons/go";

import { IoIosRadioButtonOff } from "react-icons/io";



const SecondSection = () => {
    const [isActive, setisActive] = useState(false)
    const [selected, setSelected] = useState("")

    const options = [
        "Access Bank",
        "Fidelity Bank",
        "First Bank of Nigeria",
        "Guaranty Trust Bank",
        "Polaris Bank",
        "Stanbic IBTC Bank",
        "Standard Chartered Bank",
        "Sterling Bank",
        "Union Bank",
        "United Bank for Africa",
        "Wema Bank",
        "Zenith Bank"
      ];

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
                            <GoDotFill />
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
                            <p className='personal-information'>Bank Details</p>

                         
                         <div className='radio'>
                            <p>Do you have a SmartPhone</p>
                            <span>
                                <span>
                                <input type="radio" className="mx-2" name="isyes" value="1" onClick={ ()=>setVisible(true)} /> Yes 

                                <input type="radio" className="mx-2 mt-1" name="isyes" value="0" onClick={ ()=>setVisible(false)} /> No
                                </span>
                            </span>
                         </div>



                         <div className='radio'>
                            <p>Do you have a Bank Account</p>
                            <span>
                                <span>
                                <input type="radio" className="mx-2" name="isyes" value="1" onClick={ ()=>setVisible(true)} /> Yes 

                                <input type="radio" className="mx-2 mt-1" name="isyes" value="0" onClick={ ()=>setVisible(false)} /> No
                                </span>
                            </span>
                         </div>


                            <div className="dropdown">
                            <p className='name'>Bank Name*</p>

                                <div onClick={e => setisActive(!isActive)} className="dropdown-btn">
                                    {selected} <FaChevronDown /></div>

                                {isActive && (
                                    <div className="dropdown-content">
                                       {options.map((option) =>(
                                         <div 
                                         onClick={(e)=> {
                                        setSelected(option);
                                        setisActive(false)
                                    }}
                                    className="dropdown-item">
                                         {option}
                                     </div>
                                       ))}
                                    </div>
                                )}
                            </div>

                            <div className="user-Name">
                                <span>
                                    <p className='name'>Personal Bank Account Number*</p>
                                    <input className='input-field email'
                                        type="text" placeholder='Enter your Account Number' />
                                        <p>Account Name: GODWIN PRECIOUS</p>
                                </span>

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

export default SecondSection
