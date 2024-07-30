import React, { useState, useEffect } from 'react';
import SignupImage from "../assets/farmm.png";
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck, FaChevronDown, FaPlus } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoCloudUploadOutline } from "react-icons/io5";
import { CiFileOn } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import Modal from './Modal'; // Assuming Modal component is correctly implemented
import FarmAdded from './FarmAdded'; // Assuming FarmAdded component is correctly implemented

const months = [
  { name: "January" }, { name: "February" }, { name: "March" },
  { name: "April" }, { name: "May" }, { name: "June" },
  { name: "July" }, { name: "August" }, { name: "September" },
  { name: "October" }, { name: "November" }, { name: "December" }
];

const cropsOptions = [
  "Maize", "Rice", "Cassava", "Yam", "Cocoa", "Groundnut",
  "Soybean", "Palm Oil", "Cotton", "Rubber", "Wheat", "Sugarcane"
];

const FourthSection = ({ formData, onFormDataChange, onBack, onSubmit }) => {
  const [crops, setCrops] = useState([{ selectedCrop: '', selectedStartMonth: 'January', selectedEndMonth: 'January', isActive: false, isActiveStart: false, isActiveEnd: false }]);
  const [files, setFiles] = useState([]);
  const [filled, setFilled] = useState({});

  const options = [
    "Maize", "Rice", "Cassava", "Yam", "Cocoa", "Groundnut",
    "Soybean", "Palm Oil", "Cotton", "Rubber", "Wheat", "Sugarcane"
  ];
  const handleToggleDropdown = (index, type) => {
    setCrops(prevCrops => prevCrops.map((crop, i) =>
      i === index ? { ...crop, [type]: !crop[type] } : crop
    ));
  };

  const handleCropClick = (index, crop) => {
    setCrops(prevCrops => prevCrops.map((item, i) =>
      i === index ? { ...item, selectedCrop: crop, isActive: false } : item
    ));
  };

  const handleMonthChange = (index, type, month) => {
    setCrops(prevCrops => prevCrops.map((crop, i) =>
      i === index ? { ...crop, [type]: month, [`isActive${type === 'selectedStartMonth' ? 'Start' : 'End'}`]: false } : crop
    ));
  };

  const handleAddCrop = () => {
    setCrops([...crops, { selectedCrop: '', selectedStartMonth: 'January', selectedEndMonth: 'January', isActive: false, isActiveStart: false, isActiveEnd: false }]);
  };

  const handleDeleteCrop = (index) => {
    setCrops(crops.filter((_, i) => i !== index));
  };

  const handleDelete = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
    setFilled(prevFilled => {
      const newFilled = { ...prevFilled };
      delete newFilled[fileName];
      return newFilled;
    });
  };


  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    selectedFiles.forEach(file => {
      setFilled(prevFilled => ({ ...prevFilled, [file.name]: 0 }));
      simulateUpload(file.name);
    });
  };

  const simulateUpload = (fileName) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setFilled(prevFilled => ({ ...prevFilled, [fileName]: progress }));
    }, 500);
  };

  const isFormComplete = 
    formData.farmDetails[0].name &&
    formData.farmDetails[0].long &&
    formData.farmDetails[0].lat &&
    crops.every(crop => crop.selectedCrop && crop.selectedStartMonth && crop.selectedEndMonth);

  return (
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
                <div className="check third-check">
                  <FaCheck />
                </div>
              </div>
              <div className="check last_bar">
                <GoDotFill />
              </div>
            </div>
            <div className='form_container'>
              <h1 className='form_header'>Create Account</h1>
              <form>
                <p className='personal-information'>Farm Registrations</p>
                <div className="user-Name">
                  <span>
                    <p className='name'>Farm Name (optional)</p>
                    <input
                      className='input-field'
                      type="text"
                      placeholder='Enter Farm Name'
                      value={formData.farmDetails[0].name}
                      onChange={(e) => onFormDataChange({ farmDetails: [{ ...formData.farmDetails[0], name: e.target.value }] })}
                    />
                  </span>
                </div>
                <p className='name'>Farm Coordinates (optional)</p>
                <div className="user-Name">
                  <span>
                    <input
                      className='input-field'
                      type="text"
                      placeholder='Longitude'
                      value={formData.farmDetails[0].long}
                      onChange={(e) => onFormDataChange({ farmDetails: [{ ...formData.farmDetails[0], long: e.target.value }] })}
                    />
                  </span>
                  <span>
                    <input
                      className='input-field'
                      type="text"
                      placeholder='Latitude'
                      value={formData.farmDetails[0].lat}
                      onChange={(e) => onFormDataChange({ farmDetails: [{ ...formData.farmDetails[0], lat: e.target.value }] })}
                    />
                  </span>
                </div>
                <p>Ex: Longitude: 8.6753° E. Latitude: 9.0820° N</p>
                <p className='name'>Crops cultivated and planting season</p>
                {crops.map((crop, index) => (
                  <div key={index} className='add-crop'>
                    <div className="user-Name">
                      <div className="dropdown">
                        <p className='name'>What crops do you want from this farm</p>
                        <div onClick={() => handleToggleDropdown(index, 'isActive')} className="dropdown-btn">
                          {crop.selectedCrop || 'Select Crop'} <FaChevronDown />
                        </div>
                        {crop.isActive && (
                          <div className="dropdown-content">
                            {options.map((option) => (
                              <div
                                key={option}
                                onClick={() => handleCropClick(index, option)}
                                className="dropdown-item"
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="user-Name">
                      <div className="dropdown-container calender">
                        <div className="dropdown">
                          <div onClick={() => handleToggleDropdown(index, 'isActiveStart')} className="dropdown-btn">
                            {crop.selectedStartMonth} <FaChevronDown />
                          </div>
                          {crop.isActiveStart && (
                            <div className="dropdown-content">
                              {months.map((month) => (
                                <div
                                  key={month.name}
                                  onClick={() => handleMonthChange(index, 'selectedStartMonth', month.name)}
                                  className="dropdown-item"
                                >
                                  {month.name}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="dropdown">
                          <div onClick={() => handleToggleDropdown(index, 'isActiveEnd')} className="dropdown-btn">
                            {crop.selectedEndMonth} <FaChevronDown />
                          </div>
                          {crop.isActiveEnd && (
                            <div className="dropdown-content">
                              {months.map((month) => (
                                <div
                                  key={month.name}
                                  onClick={() => handleMonthChange(index, 'selectedEndMonth', month.name)}
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
                    <button type="button" onClick={() => handleDeleteCrop(index)}>Remove Crop</button>
                  </div>
                ))}
                <button className='add-crop-btn' type="button" onClick={handleAddCrop}>
                  <FaPlus />
                  Add another crop
                </button>

                <div className='document'>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/png, image/jpeg, application/pdf"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    multiple
                  />
                  <div className="drag-upload" onClick={() => document.getElementById('fileInput').click()}>
                    <span className='drag'>
                      <IoCloudUploadOutline />
                    </span>
                    <p className='upload-instruction'><span>Click to upload</span> or drag and drop</p>
                    <p>Maximum file size 10MB</p>
                  </div>
                  {files.length > 0 && files.map((file, index) => (
                    <div key={index} className="upload-container">
                      <div className="uploaded">
                        <CiFileOn className='delete' onClick={() => handleDelete(file.name)} />
                        <div className="file">
                          <p>{file.name}</p>
                          <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                        <RiDeleteBinLine className='delete' onClick={() => handleDelete(file.name)} />
                      </div>
                      <div className="progressBar">
                        <div
                          style={{
                            height: "100%",
                            width: `${filled[file.name] || 0}%`,
                            backgroundColor: "#0d8a6a",
                            transition: "width 0.5s"
                          }}
                        />
                        <span className='progressbar'>
                          {filled[file.name] || 0} %
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="continue-back-btn bank">
                  <button className='back' type="button" onClick={onBack}>
                    Back
                  </button>
                  <button
                    className={`continue ${isFormComplete ? 'active' : ''}`}
                    type="button"
                    disabled={!isFormComplete}
                    onClick={onSubmit}
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
  );
};


export default FourthSection;

