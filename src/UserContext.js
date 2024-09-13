import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto
export const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    // Almacenar el nombre de usuario
    const setUserContext = (username) => {
        setUser(username);
    };

    
    useEffect(() => {
        // Check if user info is stored in localStorage
        const storedUser = localStorage.getItem('user');
        console.log(storedUser);
        if(storedUser){
            try {
                console.log("Set user: ", JSON.parse(storedUser).username);
                setUser( JSON.parse(storedUser).username); // Parse and set user if exists
                console.log("Set role: ", JSON.parse(storedUser).roles);
                setRole( JSON.parse(storedUser).role);
            } catch (error) {
                console.error("Error parsing stored user data", error);
                localStorage.removeItem('user'); // Clear corrupted user data
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, role, setRole }}>
            {children}
        </UserContext.Provider>
    );
};
