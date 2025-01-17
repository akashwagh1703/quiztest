// UserForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Update to useNavigate

const UserForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isFormValid, setIsFormValid] = useState(true);
    const navigate = useNavigate(); // Replace useHistory with useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !phone) {
            setIsFormValid(false);
            return;
        }

        const userData = { name, email, phone };

        try {
            const response = await fetch('http://localhost:5000/save-user', { // Use the correct backend URL
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                localStorage.setItem('userData', JSON.stringify(userData));
                navigate('/quiz-dashbord');
            } else {
                console.error('Failed to save user data.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className="container py-5">
            <div className="card shadow-lg rounded-lg">
                <div className="card-header text-center bg-info text-white">
                    <h2>User Information</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input
                                type="text"
                                id="phone"
                                className="form-control"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        {!isFormValid && (
                            <div className="alert alert-danger">
                                All fields are required!
                            </div>
                        )}
                        <button type="submit" className="btn btn-primary w-100">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserForm;
