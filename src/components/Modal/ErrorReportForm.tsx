import React, { useState } from 'react';
import './ErrorReportForm.css';
import Checkbox from './Checkbox';

function ErrorReportForm() {
  const [report, setReport] = useState('');

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Lógica para enviar el reporte de errores
    console.log('Reporte de errores enviado:', report);
    setReport('');
  };

  return (
    <form onSubmit={handleSubmit} className="error-report-form">
      <h2 className="form-title">Formulario de reportes</h2>
      <label htmlFor="error-description" className="form-label">
        Tipo de reporte:
      </label>
      <Checkbox/>
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
  );
}

export default ErrorReportForm;
