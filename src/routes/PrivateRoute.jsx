import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authRepository } from "../repositories/authRepository";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const user = await authRepository.me();
                if (user && user.id) {
                    setAuthenticated(true);
                } else {
                    localStorage.removeItem("access_token");
                    setAuthenticated(false);
                }
            } catch (error) {
                localStorage.removeItem("access_token");
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, []);

    if (loading) return <div>Loading...</div>;

    return authenticated ? children : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

export default PrivateRoute;
