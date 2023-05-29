import React, {useState} from 'react';
import './ErrorReportForm.css';
import Checkbox from './Checkbox';
import {Box} from "@mui/material";
import {reportError} from "../../../backendConnection/Users/reportError";
import {useAuth0} from "@auth0/auth0-react";

function ErrorReportForm(props: any) {

    const [report, setReport] = useState('');
    const [checked, setChecked] = useState([0]);

    const reportType = ['error', 'grupo', 'usuario'];

    const {getAccessTokenSilently, isAuthenticated} = useAuth0();

    const {toogleNotification, handleCloseModal} = props;

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        let newChecked : any[] = [];

        if (currentIndex === -1) {
            newChecked = [value]
        } else {
            newChecked = [];
        }

        setChecked(newChecked);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // Lógica para enviar el reporte de errores
        reportError(report, reportType[checked[0]], getAccessTokenSilently, isAuthenticated)
            .then(() => {
                toogleNotification('Reporte enviado con éxito', 'success');
                handleCloseModal();
                setReport('');
            })
            .catch(() => {
                toogleNotification('Error al enviar el reporte', 'error');
            });
    };


    return (
        <Box sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            bgcolor: "background.paper",
            boxShadow: 0,
            p: 0,
        }}>
            <form onSubmit={handleSubmit} className="error-report-form">
                <h2 className="form-title">Formulario de reportes</h2>
                <label htmlFor="error-description" className="form-label">
                    Tipo de reporte:
                </label>
                <Checkbox handleToggle={handleToggle} checked={checked} reportType={reportType}/>
                <label htmlFor="error-description" className="form-label">
                    Descripción:
                </label>
                <textarea
                    id="error-description"
                    className="form-textarea"
                    value={report}
                    onChange={(e) => setReport(e.target.value)}
                    required
                />

                <button type="submit" className="form-button">
                    Enviar reporte
                </button>
            </form>
        </Box>
    );
}

export default ErrorReportForm;
