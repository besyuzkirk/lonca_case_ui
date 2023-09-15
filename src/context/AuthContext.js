import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context
const AuthContext = createContext();


export function AuthProvider({ children }) {

    const storedIsAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
    const storedVendorId = localStorage.getItem('vendorId');
    const storedVendorName =   localStorage.getItem('vendorName');


    const [isAuthenticated, setIsAuthenticated] = useState(storedIsAuthenticated || false);
    const [vendorId, setVendorId] = useState(storedVendorId || null);
    const [vendorName, setVendorName] = useState(storedVendorName || null);


    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
        localStorage.setItem('vendorId', vendorId);
        localStorage.setItem('vendorName', vendorName);
    }, [isAuthenticated, vendorId, vendorName]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, vendorId, setIsAuthenticated, setVendorId ,vendorName, setVendorName }}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    return useContext(AuthContext);
}
