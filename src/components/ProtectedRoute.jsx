import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { mockAuth } from '../mockApi';
import { Loader2 } from 'lucide-react';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            const session = mockAuth.getSession();
            setUser(session || null);
            setLoading(false);
        };
        checkAuth();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-12 h-12 animate-spin text-green-600" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Role-Based Clearance Protocol
    const hasClearance = allowedRoles.includes(user.role);
    
    // Mission Restriction check
    if (!hasClearance) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Elite Administrative Layer (Check for basha@gmail.com)
    if (user.role === 'admin' && user.email !== 'basha@gmail.com') {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;
