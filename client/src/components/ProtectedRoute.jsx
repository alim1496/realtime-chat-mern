import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
    return localStorage.getItem("username") ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;