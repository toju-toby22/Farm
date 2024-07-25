import React, { useState, useRef, useEffect } from 'react';
import SignupImage from "../assets/farmm.png"
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import ReactCountryFlag from "react-country-flag";
import { FaChevronDown } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { LuUpload } from "react-icons/lu";
import { IoMdRadioButtonOn } from "react-icons/io";
import { GoDotFill } from "react-icons/go";



const countries = [
    { name: 'Nigeria', code: '+234', countryCode: 'NG' },
    { name: 'United States', code: '+1', countryCode: 'US' },
    { name: 'United Kingdom', code: '+44', countryCode: 'GB' },
    // Add more countries and their codes as needed
];

// const dropdownRef = useRef(null);

const idOptions = ['Passport', 'Driver\'s License', 'National ID'];

const FirstSection = ({ onComplete }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        age: '',
        gender: '',
        address: '',
        idType: '',
        idNumber: '',
        idDocument: null,
        password: '',
        confirmPassword: '',
        profilePic: null,
    });

    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [fileName, setFileName] = useState('No file chosen');
    const [selectedImage, setSelectedImage] = useState(null);
    const [profilePicPreview, setProfilePicPreview] = useState(null);
    const dropdownRef = useRef(null);
    const fileInputRef = useRef(null);
    const [isFormValid, setIsFormValid] = useState(false);



  useEffect(() => {
    const isValid = Object.values(formData).every((field) => field.trim() !== '') && fileName.trim() !== '';
    setIsFormValid(isValid);
  }, [formData, fileName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      phoneNumber: `${selectedCountry.code}${value}`,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({
//         ...formData,
//         profilePicture: URL.createObjectURL(file),
//       });
//     }
//   };

  const handleContinueClick = () => {
    if (isFormValid) {
      onComplete();
    }
  };

    const isPasswordValid = (password) => {
        return password.length >= 8;
    };

    const isPasswordContainsUppercase = (password) => {
        return /[A-Z]/.test(password);
    };

    const isConfirmPasswordValid = (password, confirmPassword) => {
        return password === confirmPassword;
    };

    

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicPreview(reader.result);
                setSelectedImage(reader.result);
                setFormData((prevData) => ({
                    ...prevData,
                    profilePic: reader.result,
                }));
            };
            reader.readAsDataURL(file);
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



    const isFormComplete = () => {
        return (
            formData.firstName &&
            formData.lastName &&
            formData.phoneNumber &&
            formData.address &&
            formData.idType &&
            formData.idNumber &&
            formData.password &&
            formData.confirmPassword &&
            isPasswordValid(formData.password) &&
            isPasswordContainsUppercase(formData.password) &&
            isConfirmPasswordValid(formData.password, formData.confirmPassword) &&
            formData.gender // Ensure gender is selected
        );
    };

    // const handleContinueClick = () => {
    //     if (isFormComplete()) {
    //         submitForm();
    //     }
    // };

    const submitForm = () => {
        const url = '{{url}}/users/signup'; 
        axios.post(url, {
            userDetails: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                credential: formData.phoneNumber,
                email: formData.email,
                password: formData.password,
                roleName: 'farmer',
                gender: formData.gender,
                resAddress: formData.address,
                ageGroup: formData.age,
                hasBankAccount: false, 
                hasSmartphone: true, 
                profilePic: {
                    url: formData.profilePic,
                },
            },
            idUpload: {
                idType: formData.idType,
                idNumber: formData.idNumber,
                url: URL.createObjectURL(formData.idDocument),
            },
            siteId: 'fws-ulbtd7bp',
            bankDetails: null, 
            farmDetails: [], 
        })
            .then((response) => {
                console.log('Form submitted successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
            });
    };

    const [selectedAge, setSelectedAge] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [visible, setVisible] = useState(false);

    const handleAgeChange = (e) => {
        setSelectedAge(e.target.value);
    };

    const handleGenderChange = (e) => {
        setSelectedGender(e.target.value);
        setVisible(true);
    };

    const ageOptions = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"];

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
                    <div className="form_body">
                        <div className='create-account'>
                            <div className='dot-progress'>
                                <div className='check_bar '>
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
                                            <input
                                                className='input-field'
                                                name='firstName'
                                                type="text"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                placeholder='Enter first name'
                                            />
                                        </span>
                                        <span>
                                            <p className='name'>Last Name*</p>
                                            <input
                                                className='input-field'
                                                name='lastName'
                                                type="text"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                placeholder='Enter last name'
                                            />
                                        </span>
                                    </div>
                                    <p className='personal-information'>Phone Number*</p>
                                    <div className="user-phone">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '40px', position: 'relative' }}>
                                            <div ref={dropdownRef} style={{ position: 'relative' }}>
                                                <div
                                                    onClick={toggleDropdown}
                                                    className='input-field flag'
                                                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', padding: '8px' }}
                                                >
                                                    <ReactCountryFlag countryCode={selectedCountry.countryCode} svg style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                                                    {selectedCountry.code}
                                                </div>
                                                {isOpen && (
                                                    <div className="dropdown-content" style={{ position: 'absolute', top: '100%', left: 0, right: 0, border: '1px solid #ccc', backgroundColor: '#fff', zIndex: 1000 }}>
                                                        {countries.map((country) => (
                                                            <div
                                                                key={country.code}
                                                                onClick={() => handleCountryChange(country)}
                                                                style={{ padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                                            >
                                                                <ReactCountryFlag countryCode={country.countryCode} svg style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                                                                {country.name} ({country.code})
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <input
                                                className='input-field'
                                                name='phoneNumber'
                                                type="text"
                                                value={formData.phoneNumber.replace(selectedCountry.code, '')}
                                                onChange={handlePhoneNumberChange}
                                                placeholder='Enter phone number'
                                            />
                                        </div>
                                    </div>
                                    <p className='personal-information'>Email*</p>
                                    <input
                                        className='input-field'
                                        name='email'
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder='Enter your email address'
                                    />
                                    <div className='user-Name'>
                                        <span>
                                            <p className='name'>Age*</p>
                                            <select className='input-field age' value={selectedAge} onChange={handleAgeChange}>
                                                <option value="">Select Age</option>
                                                {ageOptions.map((age) => (
                                                    <option key={age} value={age}>
                                                        {age}
                                                    </option>
                                                ))}
                                            </select>
                                        </span>

                                        <span>
                                            <p className='name'>Choose Gender*</p>
                                            <div>
                                                <span className='gndher'>
                                                    <input
                                                        type="radio"
                                                        className="mx-2"
                                                        name="gender"
                                                        value="Male"
                                                        checked={selectedGender === 'Male'}
                                                        onChange={handleGenderChange}
                                                    />
                                                    <span>Male</span>
                                                </span>

                                                <span className='gnkder'>
                                                    <input
                                                        type="radio"
                                                        className="mx-2"
                                                        name="gender"
                                                        value="Female"
                                                        checked={selectedGender === 'Female'}
                                                        onChange={handleGenderChange}
                                                    />
                                                    <span>Female</span>
                                                </span>
                                            </div>
                                        </span>
                                    </div>

                                    <p className='personal-information'>Residential Address*</p>
                                    <input
                                        className='input-field'
                                        name='address'
                                        type="text"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder='Enter your residential address'
                                    />
                                    <p className='personal-information'>ID Details*</p>
                                    <div className='id-details'>
                                        <input
                                            className='input-field'
                                            name='idNumber'
                                            type="text"
                                            value={formData.idNumber}
                                            onChange={handleInputChange}
                                            placeholder='Enter ID number'
                                        />
                                        <div className="dropdown">
                                            <p className='name'>ID Type*</p>
                                            <div onClick={() => setIsActive(!isActive)} className="dropdown-btn">
                                                {formData.idType || 'Select ID type'} <FaChevronDown />
                                            </div>
                                            {isActive && (
                                                <div className="dropdown-content">
                                                    {idOptions.map((option) => (
                                                        <div
                                                            key={option}
                                                            onClick={() => {
                                                                setFormData((prevData) => ({
                                                                    ...prevData,
                                                                    idType: option
                                                                }));
                                                                setIsActive(false);
                                                            }}
                                                            className="dropdown-item">
                                                            {option}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                       
                                    </div>
                                    <div className="user-Name">
                                        <div>
                                            <p className='name'>Upload Profile Picture (optional)</p>
                                            <div className="profile-picture">
                                                <span className="profile">
                                                    {selectedImage ? (
                                                        <img src={selectedImage} alt="Profile" className="profile-img" />
                                                    ) : (
                                                        <FiUser />
                                                    )}
                                                </span>
                                                <label className="upload-button">
                                                    <input
                                                        type="file"
                                                        accept="image/png, image/jpeg"
                                                        onChange={handleImageChange}
                                                        style={{ display: 'none' }}
                                                    />
                                                    <LuUpload />
                                                    Upload Picture
                                                </label>
                                            </div>
                                            <p>PNG or JPG (max. 5mb)</p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <span>
                                            <p className='name'>Upload ID document*</p>
                                            <div className="choose_file">
                                                <button type="button"
                                                    onClick={() => fileInputRef.current.click()}
                                                    className='upload-button'>
                                                    Choose file
                                                </button>
                                                <input
                                                    type="file"
                                                    accept="application/pdf, image/png, image/jpeg"
                                                    onChange={handleFileChange}
                                                    style={{ display: 'none' }}
                                                    ref={fileInputRef}
                                                />
                                                <p className="name_of_file">
                                                    {fileName}
                                                </p>
                                            </div>
                                        </span>
                                    </div>
                                    <p className='personal-information'>Password*</p>
                                    <input
                                        className='input-field'
                                        name='password'
                                        type="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder='Enter your password'
                                    />
                                    <p className='personal-information'>Confirm Password*</p>
                                    <input
                                        className='input-field'
                                        name='confirmPassword'
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        placeholder='Confirm your password'
                                    />
                                    <div className="password_authentication">
                                        <span className={`cross-check ${isPasswordValid(formData.password) ? 'valid' : 'invalid'}`}>
                                            <span className='checkmark'>
                                                {isPasswordValid(formData.password) ? <FaCheck /> : null}
                                            </span>
                                            <span>Must be at least 8 characters</span>
                                        </span>
                                        <span className={`cross-check ${isPasswordContainsUppercase(formData.password) ? 'valid' : 'invalid'}`}>
                                            <span className='checkmark'>
                                                {isPasswordContainsUppercase(formData.password) ? <FaCheck /> : null}
                                            </span>
                                            <span>Must contain one uppercase letter</span>
                                        </span>
                                    </div>
                                    <div className="continue-back-btn">
                                        <button className='back'>
                                            Back
                                        </button>
                                        <button
                                            className={`continue ${isFormComplete() ? 'enabled' : 'disabled'}`}
                                            onClick={handleContinueClick}
                                            disabled={!isFormComplete()}
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

export default FirstSection;


