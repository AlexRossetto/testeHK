import React from 'react';
import './styles.css'

function Modal({ title, subtitle, children, closeModal }) {

  return (
    <div className="modal">
      <div className="modal-container">
        <div className="modal-closer" onClick={() => closeModal()}>X</div>
        <div className="modal-title">{ title }</div>
        {subtitle && <div className="modal-subtitle">{ subtitle }</div>}
        {children}
      </div>
    </div>
  )
}

export default Modal;