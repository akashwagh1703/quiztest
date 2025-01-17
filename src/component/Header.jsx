import React, { useState } from 'react';
import Menu from './Menu';
import { Link, useNavigate } from 'react-router-dom';

// Function to generate a random background color
const getRandomColor = () => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#F4A261', '#2A9D8F'];
    return colors[Math.floor(Math.random() * colors.length)];
};

// Function to get initials from the user's name
const getInitials = (name) => {
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');
    return initials;
};

const Header = () => {
    const navigate = useNavigate(); // Initialize navigate for redirection
    const user = JSON.parse(localStorage.getItem('userData')) || null;
    const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility
    const initials = getInitials(user.name);
    const backgroundColor = getRandomColor();

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const websiteName = "Quiz Test"; // Accessing env variable in JSX

    return (
        !user
            ? navigate('/user-login')
            : <header className="d-flex justify-content-between align-items-center p-2 bg-gradient shadow-sm rounded-3">
                {/* Content to the left */}
                <div className="d-flex align-items-center">
                    <h2 className="mb-0">{websiteName}</h2>
                </div>

                {/* Menu Component */}
                <div className="d-flex align-items-center">
                    <Menu /> {/* Ensure Menu is properly rendering content */}
                </div>

                {/* User profile section aligned to the right */}
                <div className="d-flex align-items-center" style={{ position: 'relative' }}>
                    {/* User profile icon */}
                    <div
                        style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            backgroundColor: backgroundColor,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            cursor: 'pointer', // Cursor pointer for interaction
                        }}
                        className="ms-4 user-profile"
                        onClick={toggleDropdown} // Handle click to show/hide dropdown
                    >
                        {initials}
                    </div>

                    {/* User profile dropdown */}
                    {showDropdown && (
                        <div className="dropdown-menu show" style={{ position: 'absolute', right: 0, top: '70px', zIndex: 9999 }}>
                            <div className="dropdown-item">{user.name}</div>
                            <div className="dropdown-item">{user.email}</div>
                            <div className="dropdown-item">
                                <Link to="/past-results">Past Results</Link>
                            </div>
                        </div>
                    )}
                </div>
            </header>
    );
};

export default Header;
