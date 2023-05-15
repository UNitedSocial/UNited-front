import React, { useState } from 'react';
import './modal.css';
import Button from '@mui/material/Button';

function Modal(props:any) {
  const { showModal, onCloseModal } = props;

  const handleBackgroundClick = (e:any) => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay" onClick={handleBackgroundClick}>
          <div className="modal">
            
            <button className="close-button" onClick={onCloseModal}>
              X
            </button>
            <div className="modal-content">{props.children}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
