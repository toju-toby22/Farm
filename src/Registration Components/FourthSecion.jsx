import React, { useState, useRef, useEffect } from 'react';
import SignupImage from "../assets/farmm.png"
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import ReactCountryFlag from "react-country-flag";
import { FaChevronDown } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { IoCloudUploadOutline } from "react-icons/io5";
import { IoIosRadioButtonOff } from "react-icons/io";
import { CiFileOn } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import Modal from './Modal';
import FarmAdded from './FarmAdded';




const months = [
    { name: 'January', start: '01-01', end: '01-31' },
    { name: 'February', start: '02-01', end: '02-28' },
    // ... other months
    { name: 'December', start: '12-01', end: '12-31' }
];

const FourthSecion = () => {
    const [selectedStartMonth, setSelectedStartMonth] = useState(months[0]);
    const [selectedEndMonth, setSelectedEndMonth] = useState(months[0]);
    const [isActiveStart, setIsActiveStart] = useState(false);
    const [isActiveEnd, setIsActiveEnd] = useState(false);
    const [selected, setSelected] = useState("")
    const [isActive, setisActive] = useState(false)

    const handleMonthChange = (setSelectedMonth, month) => {
        setSelectedMonth(month);
    };

    const handleStartMonthClick = (e) => {
        setIsActiveStart(!isActiveStart);
    };

    const handleEndMonthClick = (e) => {
        setIsActiveEnd(!isActiveEnd);
    };

    const options = [
        "Maize",
        "Rice",
        "Cassava",
        "Yam",
        "Cocoa",
        "Groundnut",
        "Soybean",
        "Palm Oil",
        "Cotton",
        "Rubber",
        "Wheat",
        "Sugarcane"
    ];


    const [filled, setFilled] = useState(0);
    const [loading, isLoading] = useState (false)


    useEffect(() => {
        if (filled < 100 && isLoading) {
            setTimeout(() => setFilled(prev => prev += 5), 50)
        }
    },[filled, isLoading])

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        event.preventDefault();
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
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
                                <div className="check third-check" >
                                    <FaCheck />
                                </div>
                            </div>

                            <div className="check last_bar" >
                                <GoDotFill />
                            </div>
                        </div>



                        <div className='form_container'>
                            <h1 className='form_hader'>Create Account</h1>
                            <form action="">
                                <p className='personal-information'>Farm Registrations</p>



                                <div className="user-Name">
                                    <span>
                                        <p className='name'>Farm Name (optional)</p>
                                        <input className='input-field email'
                                            type="text" placeholder='Enter Farm Name' />
                                    </span>

                                </div>





                                <p className='name'>Farm Coordinates (optional)</p>
                                <div className="user-Name">

                                    <span>
                                        <input className='input-field' type="text" placeholder='Longitude' />
                                    </span>

                                    <span>
                                        <input className='input-field' type="text" placeholder='Latitude' />
                                    </span>
                                </div>
                                <p>Ex: Longitude: 8.6753° E. Latitude: 9.0820° N</p>






                                <p className='name'>Crops cultivated and planting season</p>
                                <div className='add-crop'>

                                    <div className="user-Name">
                                        <div className="dropdown">
                                            <p className='name'>What crops do you want from this farm</p>

                                            <div onClick={e => setisActive(!isActive)} className="dropdown-btn">
                                                {selected} <FaChevronDown /></div>

                                            {isActive && (
                                                <div className="dropdown-content">
                                                    {options.map((option) => (
                                                        <div
                                                            onClick={(e) => {
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

                                    </div>
                                    <div className="user-Name ">

                                        <div className="dropdown-container calender">
                                            <div className="dropdown">
                                                <div onClick={handleStartMonthClick} className="dropdown-btn">
                                                    {selectedStartMonth.name} <FaChevronDown />
                                                </div>
                                                {isActiveStart && (
                                                    <div className="dropdown-content">
                                                        {months.map((month) => (
                                                            <div
                                                                key={month.name}
                                                                onClick={() => handleMonthChange(setSelectedStartMonth, month)}
                                                                className="dropdown-item"
                                                            >
                                                                {month.name}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="dropdown">
                                                <div onClick={handleEndMonthClick} className="dropdown-btn">
                                                    {selectedEndMonth.name} <FaChevronDown />
                                                </div>
                                                {isActiveEnd && (
                                                    <div className="dropdown-content">
                                                        {months.map((month) => (
                                                            <div
                                                                key={month.name}
                                                                onClick={() => handleMonthChange(setSelectedEndMonth, month)}
                                                                className="dropdown-item"
                                                            >
                                                                {month.name}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                </div>








                                <button className='add-crop-btn'>
                                    <FaPlus />
                                    Add another crop
                                </button>


                                <div className="drag-upload">
                                    <span className='drag'>
                                        <IoCloudUploadOutline />
                                    </span>

                                    <p className='upload-instruction'><span>Click to upload</span> or drag and drop</p>
                                    <p className=''>PNG, JPG or PDF (max. 10MB)</p>
                                </div>

                                <div className='upload-container'>
                                    <div className="uploaded">
                                        <CiFileOn className='delete' />

                                        <div className="file">
                                            <p>filename djbfiwewuefw'</p>
                                            <span>4.2mb</span>
                                        </div>
                                        <RiDeleteBinLine className='delete' />

                                    </div>

                                    <div className="progressBar">
                                        <div style={{
                                            height:"100%",
                                            width: `${filled}`,
                                            backgroundColor:"#0d8a6a",
                                            transition: "width 0.5s"
                                        }}>

                                        </div>
                                        <span className='progreebar'>
                                                {filled} %
                                            </span>
                                    </div>
                                </div>


                                <div className="continue-back-btn bank">
                                    <button className='back'>
                                        Back
                                    </button>

                                    <button className='continue' onClick={handleOpenModal}>
                                        Continue
                                    </button>
                                    <Modal show={showModal} handleClose={handleCloseModal}>
            <FarmAdded/>
      </Modal>
                                </div>
                            </form>
            


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FourthSecion
