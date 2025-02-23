import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const AdminProtectedPage = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem('authToken');
        const decode = jwtDecode(token)
        if(decode.role!=="ADMIN"){
            navigate('/home');
        }
    }, [navigate]);

    return <div>{children}</div>;
};

export default AdminProtectedPage;