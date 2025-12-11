import React, { useState, useEffect, useRef } from 'react';
import Menu from './Menu';
import { Link, useNavigate } from 'react-router-dom';
import { WEBSITE_NAME } from '../config/Constant';

const getInitials = (name) => {
    if (!name) return '?';
    const nameParts = name.trim().split(' ');
    const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
    return initials.substring(0, 2);
};

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (!userData) {
            navigate('/user-login');
            return;
        }

        try {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
        } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('userData');
            localStorage.removeItem('authToken');
            navigate('/user-login');
        }
    }, [navigate]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    if (!user) {
        return null;
    }

    const initials = getInitials(user.name);

    return (
        <header className={`dashboard-header ${scrolled ? 'scrolled' : ''}`}>
            <nav className="nav-container">
                <div className="nav-brand">
                    <Link to="/quiz-dashbord" className="brand-link">
                        <i className="bi bi-trophy-fill"></i>
                        <span>{WEBSITE_NAME}</span>
                    </Link>
                </div>

                <div className="nav-menu">
                    <Menu />
                </div>

                <div className="nav-user" ref={dropdownRef}>
                    <button
                        className="user-button"
                        onClick={toggleDropdown}
                        aria-label="User menu"
                        aria-haspopup="true"
                        aria-expanded={showDropdown}
                    >
                        <div className="user-avatar">{initials}</div>
                        <span className="user-name">{user.name}</span>
                        <i className={`bi bi-chevron-${showDropdown ? 'up' : 'down'}`}></i>
                    </button>

                    {showDropdown && (
                        <div className="dropdown-menu">
                            <div className="dropdown-header">
                                <div className="user-avatar-large">{initials}</div>
                                <div className="user-info">
                                    <div className="user-name-large">{user.name}</div>
                                    <div className="user-email">{user.email}</div>
                                </div>
                            </div>
                            <div className="dropdown-divider"></div>
                            <Link
                                to="/quiz-dashbord"
                                className="dropdown-item"
                                onClick={() => setShowDropdown(false)}
                            >
                                <i className="bi bi-speedometer2"></i>
                                Dashboard
                            </Link>
                            <Link
                                to="/past-results"
                                className="dropdown-item"
                                onClick={() => setShowDropdown(false)}
                            >
                                <i className="bi bi-clock-history"></i>
                                Quiz History
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            <style jsx>{`
                .dashboard-header {
                    position: sticky;
                    top: 0;
                    width: 100%;
                    background: white;
                    z-index: 1000;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
                }

                .dashboard-header.scrolled {
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                }

                .nav-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 16px 30px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 30px;
                }

                .nav-brand {
                    flex-shrink: 0;
                }

                .brand-link {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 24px;
                    font-weight: 800;
                    color: #667eea;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }

                .brand-link:hover {
                    color: #5568d3;
                }

                .brand-link i {
                    font-size: 28px;
                }

                .nav-menu {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                }

                .nav-user {
                    position: relative;
                    flex-shrink: 0;
                }

                .user-button {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: white;
                    border: 2px solid #e0e0e0;
                    padding: 8px 16px;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 15px;
                    font-weight: 600;
                    color: #333;
                }

                .user-button:hover {
                    border-color: #667eea;
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
                }

                .user-avatar {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background: #667eea;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 14px;
                }

                .user-name {
                    max-width: 150px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .dropdown-menu {
                    position: absolute;
                    top: calc(100% + 10px);
                    right: 0;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                    min-width: 280px;
                    overflow: hidden;
                    animation: slideDown 0.3s ease;
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .dropdown-header {
                    padding: 20px;
                    background: #f8f9fa;
                    display: flex;
                    gap: 15px;
                    align-items: center;
                }

                .user-avatar-large {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: #667eea;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 18px;
                    flex-shrink: 0;
                }

                .user-info {
                    flex: 1;
                    min-width: 0;
                }

                .user-name-large {
                    font-size: 16px;
                    font-weight: 700;
                    color: #333;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .user-email {
                    font-size: 13px;
                    color: #666;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-top: 2px;
                }

                .dropdown-divider {
                    height: 1px;
                    background: #e0e0e0;
                    margin: 8px 0;
                }

                .dropdown-item {
                    width: 100%;
                    padding: 12px 20px;
                    border: none;
                    background: transparent;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 15px;
                    font-weight: 500;
                    color: #333;
                    text-decoration: none;
                }

                .dropdown-item:hover {
                    background: #f8f9fa;
                    color: #667eea;
                }

                .dropdown-item i {
                    font-size: 18px;
                    color: #667eea;
                    width: 20px;
                }

                @media (max-width: 1024px) {
                    .nav-container {
                        padding: 14px 20px;
                    }

                    .brand-link {
                        font-size: 20px;
                    }

                    .brand-link i {
                        font-size: 24px;
                    }

                    .user-name {
                        max-width: 100px;
                    }
                }

                @media (max-width: 768px) {
                    .nav-container {
                        padding: 12px 15px;
                        gap: 15px;
                    }

                    .brand-link span {
                        display: none;
                    }

                    .user-name {
                        display: none;
                    }

                    .user-button {
                        padding: 8px;
                        min-width: 44px;
                        justify-content: center;
                    }

                    .dropdown-menu {
                        right: -10px;
                        min-width: 260px;
                    }
                }
            `}</style>
        </header>
    );
};

export default Header;
