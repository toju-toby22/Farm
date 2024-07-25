import React from 'react'

const Modal = ({ show, handleClose, children }) => {
  return (
    <div className='moadal_container'>
      <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        {children}
      </div>
    </div>
    </div>
  )
}

export default Modal
