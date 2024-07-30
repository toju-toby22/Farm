import React from 'react'
import FarmAdded from './FarmAdded'

const Modal = ({ show, handleClose, children,handleFinalizeSubmission, handleAddAnotherFarm }) => {
  return (
    <div className='moadal_container'>
      <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <div className="container-modal">
          <h1>Farm added</h1>
          <p>would you like to add another farm</p>
          <button className='create-account-btn' onClick={handleFinalizeSubmission}>
            No, create my account
          </button>
          <button onClick={handleAddAnotherFarm}>
            Yes I have another farm
          </button>
        </div>

      </div>
    </div>
    </div>
  )
}

export default Modal
