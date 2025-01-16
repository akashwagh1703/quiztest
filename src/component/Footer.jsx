import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = ({ user, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove user data from localStorage
        localStorage.removeItem('userData');
        // Navigate to the home page
        navigate('/');
        // Call the onLogout callback to notify the parent component
        if (onLogout) {
            onLogout();
        }
    };

    return (
        <footer className="py-4 bg-dark text-light">
            <div className="container text-center">
                <h5 className="mb-3">User Information</h5>
                <div className="mb-3">
                    <p className="mb-1">
                        <strong>Name:</strong> {user.name}
                    </p>
                    <p className="mb-1">
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p className="mb-0">
                        <strong>Score:</strong> {user.currentScore}
                    </p>
                </div>
                <button
                    className="btn btn-outline-danger btn-lg mt-3 shadow"
                    onClick={handleLogout}
                >
                    Logout
                </button>
                <div className="mt-4">
                    <small>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</small>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
