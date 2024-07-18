import React, { useContext } from 'react'
import { Alert } from 'react-bootstrap';
import { AlertContext } from '../context/AlertContext'

import "./IAlert.css"

const IAlert = () => {
    const {showAlert, alertMessage, tipoAlert} = useContext(AlertContext);

  return (
    <>
        {showAlert && (
            <Alert variant={tipoAlert} className='container-alert' >
                {alertMessage}
            </Alert>
        )}
    </>
  )
}

export default IAlert