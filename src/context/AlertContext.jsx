import React from 'react'
import { useState } from 'react';
import { createContext } from 'react'

export const AlertContext = createContext();

const AlertProvider = ({ children }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [tipoAlert, setTipoAlert] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const handleAlert = (message , tipo) => {
        setTipoAlert(tipo)
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000)
    }

    return (
        <AlertContext.Provider value={{showAlert, alertMessage, handleAlert, tipoAlert }}>
            {children}
        </AlertContext.Provider>
    )
}

export default AlertProvider