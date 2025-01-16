import React from 'react';

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

const Header = ({ user }) => {
    const initials = getInitials(user.name);
    const backgroundColor = getRandomColor();

    return (
        <header className="d-flex justify-content-between align-items-center p-4 bg-gradient shadow-sm rounded-3">
            <div className="d-flex align-items-center">
                {/* Display user profile image or initials if no image is provided */}
                <div
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: backgroundColor,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        fontSize: '24px',
                        fontWeight: 'bold',
                    }}
                    className="me-4"
                >
                    {initials}
                </div>
                <div>
                    <h5 className="mb-1">{user.name}</h5>
                    <p className="mb-0 text-muted">{user.email}</p>
                </div>
            </div>
            <div>
                <h1 className="display-4">React Quiz Test</h1>
            </div>
            <div>
                <span className="badge bg-warning text-dark fs-5">Score: {user.currentScore}</span>
            </div>
        </header>
    );
};

export default Header;
