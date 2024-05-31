import React, { useState } from "react";

import Dashboard from "./Dashboard";
import Login from "./Login";

export default function Acceuil() {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [userData, setUserData] = useState(null);

    const handleLoginSuccess = (userData) => {
        setIsAuthenticated(true);
        setUserData(userData);
    };

    return isAuthenticated ? (
        <Dashboard userData={userData} />
    ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
    );
}
