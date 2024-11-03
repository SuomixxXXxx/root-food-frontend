import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function ProtectedRoute({ children, allowedRoles, redirectPath = '/' }) {

    const navigate = useNavigate();
    let role = localStorage.getItem("role");

    useEffect(() => {
        if (!allowedRoles.includes(role, null)) {
            navigate(redirectPath, { replace: true });
        }
    }, [allowedRoles, navigate, redirectPath, role]);

    return allowedRoles.includes(role, null) ? children : null;
}
