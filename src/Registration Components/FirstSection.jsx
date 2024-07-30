import React, { useState, useRef, useEffect } from 'react';
import SignupImage from "../assets/farmm.png"
import logo from "../assets/logo.png"
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import ReactCountryFlag from "react-country-flag";
import { FaChevronDown } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { LuUpload } from "react-icons/lu";
import { IoMdRadioButtonOn } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";


const countries = [
    { name: 'Nigeria', code: '+234', countryCode: 'NG' },
    { name: 'United States', code: '+1', countryCode: 'US' },
    { name: 'United Kingdom', code: '+44', countryCode: 'GB' },
    // Add more countries and their codes as needed
];


const FirstSection = ({ formData, onFormDataChange,onContinue }) => {
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber || selectedCountry.code);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleCountryChange = (country) => {
        setSelectedCountry(country);
        setPhoneNumber(country.code);
        setIsOpen(false);
    };

    const handlePhoneNumberChange = (e) => {
        const input = e.target.value;
        if (!input.startsWith(selectedCountry.code)) {
            setPhoneNumber(selectedCountry.code + input.replace(selectedCountry.code, ''));
        } else {
            setPhoneNumber(input);
        }
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const [selectedAge, setSelectedAge] = useState('');
    const ageOptions = Array.from({ length: 82 }, (_, index) => index + 18);

    const handleAgeChange = (event) => {
        setSelectedAge(event.target.value || '');
    };

    const [isActive, setIsActive] = useState(false);
    const [selectedIdType, setSelectedIdType] = useState(formData.idType || '');
    const idOptions = ["National ID card (NIN)", "Voter's card", "International Passport"];

    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageButtonClick = (event) => {
        event.preventDefault();
        document.getElementById('fileInput').click();
    };

    const [fileName, setFileName] = useState('No file chosen');
    const fileInputRef = useRef(null);

    const handleButtonClick = (event) => {
        event.preventDefault();
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName('No file chosen');
        }
    };

    const [firstName, setFirstName] = useState(formData.firstName || '');
    const [lastName, setLastName] = useState(formData.lastName || '');
    const [email, setEmail] = useState(formData.email || '');
    const [selectedGender, setSelectedGender] = useState(formData.gender || '');
    const [residentialAddress, setResidentialAddress] = useState(formData.residentialAddress || '');
    const [idNumber, setIdNumber] = useState(formData.idNumber || '');
    const [password, setPassword] = useState(formData.password || '');
    const [confirmPassword, setConfirmPassword] = useState(formData.confirmPassword || '');
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [errors, setErrors] = useState({
        minLength: false,
        match: false,
      });
      const [isPasswordValid, setIsPasswordValid] = useState(true);
    const validateForm = () => {
        const isValid = (
            firstName && lastName && email && selectedAge && selectedGender &&
            residentialAddress && selectedIdType && idNumber &&
            password && confirmPassword && password === confirmPassword &&
            phoneNumber.length > selectedCountry.code.length &&
            fileName !== 'No file chosen'
        );
        setIsFormComplete(isValid);
    };

    useEffect(() => {
        validateForm();
        onFormDataChange({
          userDetails: {
            firstName,
            lastName,
            credential: phoneNumber,
            email,
            password,
            gender: selectedGender,
            resAddress: residentialAddress,
            ageGroup: selectedAge,
            profilePic: {
              url: selectedImage
            }
          }
        });
      }, [
        firstName, lastName, email, phoneNumber, selectedAge,
        selectedGender, residentialAddress, password, confirmPassword,
        selectedImage, fileName
      ]);

      const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
      const validatePasswords = () => {
        const minLength = password.length >= 8;
        const specialChar = specialCharPattern.test(password);
        const match = password === confirmPassword;
        const isValid = password.length >= 8 && /\W/.test(password);
        setIsPasswordValid(isValid);
    
        setErrors({
          minLength: !minLength,
          specialChar: !specialChar,
          match: !match,
        });
      };
    
      useEffect(() => {
        validatePasswords();
      }, [password, confirmPassword]);
    
    return (
        <div>
            <div className="container">
                <div className="Image">
                    <img className='img' src={SignupImage} alt="Signup" />
                </div>
                <div className="Form">
                    <div className="already-have-an-account">
                        <span className='back_home'>
                            <IoIosArrowBack />
                            <p>Back home</p>
                        </span>
                        <p>Already have an account? Log In</p>
                    </div>


                    <div className=" logo-nav">
                        <span className='back_home'>
                            <img src={logo} alt=''/>
                        </span>
                        <span className='home-back'>
                        <IoHomeOutline />
                            <p>Back </p>
                        </span>
                    </div>
                    <div className="form_body">
                        <div className='create-account'>
                            <div className='dot-progress check-prog'>
                                <div className='check_bar'>
                                    <div className="check first-check">
                                        <GoDotFill />
                                    </div>
                                </div>
                                <div className='check_bar bar'>
                                    <div className="check">
                                        <GoDotFill />
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
                                    <p className='personal-information'>Personal Information</p>
                                    <div className="user-Name">
                                        <span>
                                            <p className='name'>First Name*</p>
                                            <input className='input-field' type="text" placeholder='Enter first name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                        </span>
                                        <span>
                                            <p className='name'>Last Name*</p>
                                            <input className='input-field' type="text" placeholder='Enter last name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                        </span>
                                    </div>
                                    <p className='personal-information'>Phone Number*</p>
                                    <div className="user-phone">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '40px', position: 'relative' }}>
                                            <div ref={dropdownRef} style={{ position: 'relative' }}>
                                                <div
                                                    onClick={toggleDropdown}
                                                    className='input-field flag'
                                                >
                                                    <ReactCountryFlag countryCode={selectedCountry.countryCode} svg style={{ width: '24px', height: '24px' }} />
                                                </div>
                                                {isOpen && (
                                                    <div style={{ position: 'absolute', top: '100%', left: 0, backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', zIndex: 1 }}>
                                                        {countries.map((country) => (
                                                            <div
                                                                key={country.countryCode}
                                                                onClick={() => handleCountryChange(country)}
                                                                style={{ display: 'flex', alignItems: 'center', padding: '8px', cursor: 'pointer' }}
                                                            >
                                                                <ReactCountryFlag countryCode={country.countryCode} svg style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                                                                <span className='country-name'>{country.name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <input
                                                className='input-field input-number'
                                                type="text"
                                                value={phoneNumber}
                                                onChange={handlePhoneNumberChange}
                                                placeholder="Enter phone number"
                                            />
                                        </div>
                                    </div>
                                    <div className="user-Name">
                                        <span>
                                            <p className='name'>Email address (optional)</p>
                                            <input className='input-field email' type="text" placeholder='Enter email address' value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </span>
                                    </div>
                                    <div className="user-Name">
                                        <span>
                                            <p className='name'>Age*</p>
                                            <select className='input-field age' value={selectedAge} onChange={handleAgeChange}>
                                                <option value="">Select Age</option>
                                                {ageOptions.map((age) => (
                                                    <option key={age} value={age}>{age}</option>
                                                ))}
                                            </select>
                                        </span>
                                        <span>
                                            <p className='name'>Choose Gender*</p>
                                            <div>
                                                <span className='gender'>
                                                    <input type="radio" className="mx-2" name="gender" value="Male" onChange={() => setSelectedGender('Male')} />
                                                    <span>Male</span>
                                                </span>
                                                <span className='gender'>
                                                    <input type="radio" className="mx-2" name="gender" value="Female" onChange={() => setSelectedGender('Female')} />
                                                    <span>Female</span>
                                                </span>
                                            </div>
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            <p className='name'>Residential address*</p>
                                            <input className='input-field' type="text" placeholder='Enter residential address' value={residentialAddress} onChange={(e) => setResidentialAddress(e.target.value)} />
                                        </span>
                                    </div>
                                    <div className="dropdown">
                                        <p className='name'>ID Type*</p>
                                        <div onClick={() => setIsActive(!isActive)} className="dropdown-btn">
                                            {selectedIdType || "Select ID Type"} <FaChevronDown />
                                        </div>
                                        {isActive && (
                                            <div className="dropdown-content">
                                                {idOptions.map((option) => (
                                                    <div
                                                        key={option}
                                                        onClick={() => {
                                                            setSelectedIdType(option);
                                                            setIsActive(false);
                                                        }}
                                                        className="dropdown-item"
                                                    >
                                                        {option}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className="user-Name">
                                        <span>
                                            <p className='name'>ID Number*</p>
                                            <input className='input-field' type="text" placeholder='Enter your ID number' value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            <p className='name'>Upload ID document*</p>
                                            <div className="choose_file">
                                                <button type="button" onClick={handleButtonClick}>
                                                    Choose file
                                                </button>
                                                <input
                                                    type="file"
                                                    accept="application/pdf, image/png, image/jpeg"
                                                    onChange={handleFileChange}
                                                    style={{ display: 'none' }}
                                                    ref={fileInputRef}
                                                />
                                                <p className="name_of_file">{fileName}</p>
                                            </div>
                                        </span>
                                    </div>
                                    <div className="user-Name">
                                        <span>
                                            <p className='name'>Create Password*</p>
                                            <input className={`input-field ${!isPasswordValid ? 'input-error' : ''}`}
                                             type="password" placeholder='Enter your password'
                                              value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </span>
                                    </div>
                                    <div className="user-Name">
                                        <span>
                                            <p className='name'>Confirm Password*</p>
                                            <input className='input-field password' type="password" 
                                            placeholder='Confirm password' 
                                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                        </span>
                                    </div>
                                    <div className="password_authentication">
        <span className={`cross-check ${errors.minLength ? 'error' : ''}`}>
          <span className={`checkmark ${errors.minLength ? 'error' : ''}`}>
            <FaCheck />
          </span>
          <span >Must be at least 8 characters</span>
        </span>
        <span className={`cross-check ${errors.specialChar ? 'error' : ''}`}>
          <span className={`checkmark ${errors.minLength ? 'error' : ''}`}>
            <FaCheck />
          </span>
          <span>Must contain at least one special character</span>
        </span>
        <span className={`cross-check ${errors.match ? 'error' : ''}`}>
          <span className={`checkmark ${errors.minLength ? 'error' : ''}`}>
            <FaCheck />
          </span>
          <span>Must match the password</span>
        </span>
      </div>
                                    <div className="user-Name">
                                        <span>
                                            <p className='name'>Upload Profile Picture (optional)</p>
                                            <span className="profile-picture">
                                                <span className="profile">
                                                    {selectedImage ? (
                                                        <img src={selectedImage} alt="Profile" className="profile-img" />
                                                    ) : (
                                                        <FiUser />
                                                    )}
                                                </span>
                                                <label>
                                                    <input
                                                        type="file"
                                                        id="fileInput"
                                                        accept="image/png, image/jpeg"
                                                        onChange={handleImageChange}
                                                        style={{ display: 'none' }}
                                                    />
                                                    <button className='upload-button' onClick={handleImageButtonClick}>
                                                        <LuUpload />
                                                        Upload Picture
                                                    </button>
                                                </label>
                                            </span>
                                            <p>PNG or JPG (max. 5mb)</p>
                                        </span>
                                    </div>
                                    <div className="continue-back-btn">
                                        <button className='back'>
                                            Back
                                        </button>
                                        <button 
                                        className={`continue ${isFormComplete ? 'active' : ''}`} 
                                        type="button" 
                                        disabled={!isFormComplete}
                                        onClick={isFormComplete ? onContinue : null}
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
export default FirstSection