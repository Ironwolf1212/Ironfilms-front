import React, { createContext, useState, useEffect } from 'react';
import { checkAuthStatus } from './authService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authStatus, setAuthStatus] = useState('Not authenticated');

    useEffect(() => {
        const fetchAuthStatus = async () => {
            const status = await checkAuthStatus();
            setAuthStatus(status);
        };
        fetchAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };