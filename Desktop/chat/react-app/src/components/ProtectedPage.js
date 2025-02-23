import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const ProtectedPage = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
        }
        const decode = jwtDecode(token)
        if(decode.exp>=Date.now()){
            localStorage.removeItem('authToken')
            navigate('/login');
        }
    }, [navigate]);

    return <div>{children}</div>;
};

export default ProtectedPage;