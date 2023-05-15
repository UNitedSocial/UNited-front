import React, { useState } from 'react';
import Modal from './Modal';
import ErrorReportForm from './ErrorReportForm';
import Button from '@mui/material/Button';

function Popup() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button variant="text" onClick={handleOpenModal}>Necesitas reportar algún error/grupo/usuario ?</Button>
      <Modal showModal={showModal} onCloseModal={handleCloseModal}>

        <ErrorReportForm/>
      </Modal>
    </>
  );
}

export default Popup;