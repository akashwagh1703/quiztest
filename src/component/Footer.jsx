import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css'; // Custom styles for the footer

const Footer = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove user data from localStorage
        localStorage.removeItem('userData');
        // Navigate to the home page
        navigate('/');
    };

    return (
        <footer className="footer-container py-3">
            <div className="container">
                <div className="row text-center text-md-start">
                    {/* Logout Button Column */}
                    <div className="col-12 col-md-4 mb-3">
                        <button
                            className="btn btn-outline-danger btn-sm footer-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>

                    {/* Tech Connect / Social Links Column */}
                    <div className="col-12 col-md-4 mb-3">
                        <div className="footer-social-links">
                            <a href="https://github.com" className="footer-social-link me-3">
                                <i className="fab fa-github"></i> GitHub
                            </a>
                            <a href="https://stackoverflow.com" className="footer-social-link me-3">
                                <i className="fab fa-stack-overflow"></i> StackOverflow
                            </a>
                            <a href="https://dev.to" className="footer-social-link">
                                <i className="fab fa-dev"></i> DEV.to
                            </a>
                        </div>
                    </div>

                    {/* Copyright Column */}
                    <div className="col-12 col-md-4 mb-3">
                        <small>&copy; {new Date().getFullYear()} Your Tech Company. All rights reserved.</small>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
