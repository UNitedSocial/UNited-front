import React, {useState} from 'react';
import ErrorReportForm from './ErrorReportForm';
import Button from '@mui/material/Button';
import {Modal} from "@mui/material";

function Popup(props: any) {

    const [showModal, setShowModal] = useState(false);

    const {toogleNotification} = props;

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
                <>
                    <ErrorReportForm toogleNotification={toogleNotification} handleCloseModal={handleCloseModal}/>
                </>
            </Modal>
        </>
    );
}

export default Popup;
