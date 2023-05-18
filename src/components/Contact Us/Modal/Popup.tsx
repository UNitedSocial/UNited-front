import React, {useState} from 'react';
import ErrorReportForm from './ErrorReportForm';
import Button from '@mui/material/Button';
import {Backdrop, Modal} from "@mui/material";

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
            <Button variant="text" onClick={handleOpenModal}>¿Necesitas reportar algún error/grupo/usuario?</Button>
            <Modal
                open={showModal}
                onClose={handleCloseModal}
            >
                <ErrorReportForm/>
            </Modal>
        </>
    );
}

export default Popup;
