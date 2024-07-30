import React, { useState } from 'react';
import SignupImage from "../assets/farmm.png";
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { MdOutlineFingerprint } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";


const ThirdSection = ({ onContinue, onBack }) => {
  const [isSkipChecked, setIsSkipChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsSkipChecked(e.target.checked);
  };

  return (
    <div>
      <div className="container">
        <div className="Image">
          <img className='img' src={SignupImage} alt="Signup" />
        </div>

        <div className="Form">
          <div className="already-have-an-account">
            <span className='back_home' onClick={onBack}>
              <IoIosArrowBack />
              <p>Back home</p>
            </span>
            <p>Already have an account? Log In</p>
          </div>

          <div className="form_body">
            <div className='create-account'>
              <div className='dot-progress'>
                <div className='check_bar'>
                  <div className="check first-check">
                    <FaCheck />
                  </div>
                </div>

                <div className='check_bar bar'>
                  <div className="check second-check">
                    <FaCheck />
                  </div>
                </div>

                <div className='check_bar bar'>
                  <div className="check">
                    <GoDotFill />
                  </div>
                </div>

                <div className="check last_bar">
                  <GoDotFill />
                </div>
              </div>

              <div className='form_container'>
                <h1 className='form_hader'>Create Account</h1>
                <form>
                  <p className='personal-information'>Security - Setup Fingerprint (Optional)</p>

                  <p className='capture'>Capture Fingerprint (Your L-R index fingers)</p>

                  <div className='fingerprint'>
                    <span><MdOutlineFingerprint /></span>
                    <span><MdOutlineFingerprint /></span>
                    <span><MdOutlineFingerprint /></span>
                    <span><MdOutlineFingerprint /></span>
                  </div>

                  <div className='skip_container'>
                    <button
                      className='skip-button'
                      type="button"
                      onClick={() => setIsSkipChecked(!isSkipChecked)}
                    >
                      <input
                        className='skip'
                        type="checkbox"
                        checked={isSkipChecked}
                        onChange={handleCheckboxChange}
                      />
                      Skip for now
                    </button>
                  </div>

                  <div className="continue-back-btn bank">
                    <button
                      className='back'
                      type="button"
                      onClick={onBack}
                    >
                      Back
                    </button>

                    <button
                      className='continue'
                      type="button"
                      onClick={onContinue}
                      disabled={!isSkipChecked}
                    >
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
  );
};

export default ThirdSection;
