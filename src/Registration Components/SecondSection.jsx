import React, { useState, useEffect } from 'react';
import SignupImage from "../assets/farmm.png";
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";
const SecondSection = ({ formData, onFormDataChange, onContinue, onBack }) => {
    const [isActive, setIsActive] = useState(false);
    const [selected, setSelected] = useState(formData.bankDetails.bankName || "");
    const [visible, setVisible] = useState(formData.userDetails.hasBankAccount === "true");
    const [bankAccountNumber, setBankAccountNumber] = useState(formData.bankDetails.accountNumber || "");
    const [hasSmartphone, setHasSmartphone] = useState(formData.userDetails.hasSmartphone);
    const [isContinueEnabled, setIsContinueEnabled] = useState(false);

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

    useEffect(() => {
        // Update formData whenever the internal state changes
        onFormDataChange({
            userDetails: {
                ...formData.userDetails,
                hasSmartphone,
                hasBankAccount: visible ? "true" : "false"
            },
            bankDetails: {
                accountNumber: bankAccountNumber,
                bankName: selected
            }
        });
    }, [hasSmartphone, visible, selected, bankAccountNumber]);

    useEffect(() => {
        // Check if all required fields are filled to enable the continue button
        const isValid = visible ? selected && bankAccountNumber : true;
        setIsContinueEnabled(isValid);
    }, [visible, selected, bankAccountNumber]);

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
                                    <p className='personal-information'>Bank Details</p>

                                    <div className='radio'>
                                        <p>Do you have a Smartphone</p>
                                        <span>
                                            <span>
                                                <input
                                                    type="radio"
                                                    className="mx-2"
                                                    checked={hasSmartphone === true}
                                                    onChange={() => setHasSmartphone(true)}
                                                /> Yes
                                                <input
                                                    type="radio"
                                                    className="mx-2 mt-1"
                                                    checked={hasSmartphone === false}
                                                    onChange={() => setHasSmartphone(false)}
                                                /> No
                                            </span>
                                        </span>
                                    </div>

                                    <div className='radio'>
                                        <p>Do you have a Bank Account</p>
                                        <span>
                                            <span>
                                                <input
                                                    type="radio"
                                                    className="mx-2"
                                                    checked={visible}
                                                    onChange={() => setVisible(true)}
                                                /> Yes
                                                <input
                                                    type="radio"
                                                    className="mx-2 mt-1"
                                                    checked={!visible}
                                                    onChange={() => setVisible(false)}
                                                /> No
                                            </span>
                                        </span>
                                    </div>

                                    {visible && (
                                        <>
                                            <div className="dropdown">
                                                <p className='name'>Bank Name*</p>
                                                <div onClick={() => setIsActive(!isActive)} className="dropdown-btn">
                                                    {selected || 'Select Bank'} <FaChevronDown />
                                                </div>

                                                {isActive && (
                                                    <div className="dropdown-content">
                                                        {options.map((option) => (
                                                            <div
                                                                key={option}
                                                                onClick={() => {
                                                                    setSelected(option);
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
                                                    <p className='name'>Personal Bank Account Number*</p>
                                                    <input
                                                        className='input-field email'
                                                        type="text"
                                                        placeholder='Enter your Account Number'
                                                        value={bankAccountNumber}
                                                        onChange={(e) => setBankAccountNumber(e.target.value)}
                                                    />
                                                    <p>Account Name: GODWIN PRECIOUS</p>
                                                </span>
                                            </div>
                                        </>
                                    )}

                                    <div className="continue-back-btn bank">
                                        <button className='back' type="button" onClick={onBack}>
                                            Back
                                        </button>

                                        <button
                                            className='continue'
                                            type="button"
                                            onClick={onContinue}
                                            disabled={!isContinueEnabled}
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

export default SecondSection;
