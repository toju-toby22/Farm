import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FirstSection from '../Registration Components/FirstSection'
import SecondSection from '../Registration Components/SecondSection'
import ThirdSection from '../Registration Components/ThirdSection'
import FourthSecion from '../Registration Components/FourthSecion'
import axios from 'axios';
import Modal from '../Registration Components/Modal';

const RegistrationPage = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState({
    userDetails: {
      firstName: '',
      lastName: '',
      credential: '', // phone number
      email: '',
      password: '',
      roleName: 'farmer',
      gender: '',
      resAddress: '',
      ageGroup: '',
      hasBankAccount: 'false',
      hasSmartphone: false,
      profilePic: {
        url: null
      }
    },
    idUpload: {
      idType: '',
      idNumber: '',
      url: null
    },
    siteId: '',
    bankDetails: {
      accountNumber: '',
      bankName: ''
    },
    farmDetails: [{
      name: '',
      address: '',
      long: '',
      lat: '',
      docUploads: [],
      crops: []
    }]
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleFormDataChange = (updatedData) => {
    setFormData(prevData => ({ ...prevData, ...updatedData }));
  };

  const handleContinue = () => {
    setCurrentSection(prevSection => prevSection + 1);
  };

  const handleBack = () => {
    setCurrentSection(prevSection => prevSection - 1);
  };

  const handleSubmit = () => {
    setIsModalOpen(true);
  };

  const handleFinalizeSubmission = async () => {
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((item, index) => {
            Object.keys(item).forEach(subKey => {
              formDataToSend.append(`${key}[${index}][${subKey}]`, item[subKey]);
            });
          });
        } else if (typeof formData[key] === 'object' && formData[key] !== null) {
          Object.keys(formData[key]).forEach(subKey => {
            formDataToSend.append(`${key}[${subKey}]`, formData[key][subKey]);
          });
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      console.log([...formDataToSend]);

      const response = await axios.post('{{url}}/users/signup', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Sign up successful', response.data);
      setIsModalOpen(false); 
      navigate('/login'); 
    } catch (error) {
      console.error('Error signing up', error);
    }
  };

  const handleAddAnotherFarm = () => {
    setIsModalOpen(false);
 
    setFormData(prevData => ({
      ...prevData,
      farmDetails: [...prevData.farmDetails, {
        name: '',
        address: '',
        long: '',
        lat: '',
        docUploads: [],
        crops: []
      }]
    }));
    setCurrentSection(4); 
  };

  return (
    <div>
      {currentSection === 1 && 
        <FirstSection 
          formData={formData}
          onFormDataChange={handleFormDataChange} 
          onContinue={handleContinue} 
        />}
      {currentSection === 2 && 
        <SecondSection 
          formData={formData}
          onFormDataChange={handleFormDataChange} 
          onContinue={handleContinue} 
          onBack={handleBack} 
        />}
      {currentSection === 3 && 
        <ThirdSection 
          formData={formData}
          onFormDataChange={handleFormDataChange} 
          onContinue={handleContinue} 
          onBack={handleBack} 
        />}
      {currentSection === 4 && 
        <FourthSecion 
          formData={formData}
          onFormDataChange={handleFormDataChange} 
          onBack={handleBack} 
          onSubmit={handleSubmit}
        />}
      
      <Modal 
        show={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        handleFinalizeSubmission={handleFinalizeSubmission}
        handleAddAnotherFarm={handleAddAnotherFarm}
      />
    </div>
  );
};
export default RegistrationPage
