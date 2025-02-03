import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { NODEURL } from '../config/Constant';
import 'react-toastify/dist/ReactToastify.css';

const UserRegistration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateFields = () => {
        const errors = {};

        if (!name.trim()) {
            errors.name = 'Name is required.';
        }

        if (!email.trim()) {
            errors.email = 'Email is required.';
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            errors.email = 'Please enter a valid email address.';
        }

        if (!phone.trim()) {
            errors.phone = 'Phone number is required.';
        } else if (!/^\d{10}$/.test(phone)) {
            errors.phone = 'Phone number must be 10 digits.';
        }

        if (!password.trim()) {
            errors.password = 'Password is required.';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters.';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateFields()) {
            toast.error('Please correct the errors in the form.');
            return;
        }

        try {
            const userData = { name, email, phone, password }; // Plaintext password

            const response = await fetch(`${NODEURL}register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                toast.success('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/user-login'), 2000);
            } else {
                const data = await response.json();
                toast.error(data.message || 'Failed to register user.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred during registration.');
        }
    };

    const goToLogin = () => {
        navigate('/user-login');
    };

    return (
        <div className="container py-5">
            <div className="card shadow-lg rounded-lg">
                <div className="card-header text-center bg-info text-white">
                    <h2>User Registration</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleRegister} noValidate>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input
                                type="text"
                                id="phone"
                                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mb-3">
                            Register
                        </button>
                    </form>
                    <button
                        type="button"
                        className="btn btn-secondary w-100"
                        onClick={goToLogin}
                    >
                        Go to Login
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UserRegistration;
