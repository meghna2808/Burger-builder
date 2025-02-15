import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import './Toolbar.css';
import { useNavigate } from "react-router-dom";
const Toolbar = () => {
    const { user, logout } = useAuth(); 
    const navigate = useNavigate(); // Get authentication state
    const handleLogout = async () => {
        await logout(); // Logs out the user
        navigate("/"); // to home page
    };
    return (
        <nav className="toolbar">
            <Link to="/" className="nav-link">Home</Link>
            {user && <Link to="/order" className="nav-link">Orders</Link>}
            {user ? (
                <button className="nav-link logout-btn" onClick={handleLogout}>Logout</button>
            ) : (
                <Link to="/auth" className="nav-link">Login</Link>
            )}
        </nav>
    );
};

export default Toolbar;