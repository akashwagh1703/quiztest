import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { APIURL } from '../config/Constant';
import 'react-toastify/dist/ReactToastify.css';
import { API_ENDPOINTS, VALIDATION } from '../config/Constant';

const UserRegistration = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({ score: 0, text: '', color: '' });
    const navigate = useNavigate();

    const calculatePasswordStrength = (password) => {
        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;

        const strengths = [
            { score: 0, text: '', color: '' },
            { score: 1, text: 'Weak', color: '#dc3545' },
            { score: 2, text: 'Fair', color: '#fd7e14' },
            { score: 3, text: 'Good', color: '#ffc107' },
            { score: 4, text: 'Strong', color: '#28a745' },
            { score: 5, text: 'Very Strong', color: '#20c997' }
        ];

        return strengths[score];
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear error for this field
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }

        // Calculate password strength on password change
        if (name === 'password') {
            setPasswordStrength(calculatePasswordStrength(value));
        }
    };

    const validateFields = () => {
        const errors = {};

        // Name validation
        if (!formData.name.trim()) {
            errors.name = 'Name is required.';
        } else if (formData.name.trim().length < VALIDATION.NAME_MIN_LENGTH) {
            errors.name = `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters.`;
        } else if (formData.name.trim().length > VALIDATION.NAME_MAX_LENGTH) {
            errors.name = `Name must not exceed ${VALIDATION.NAME_MAX_LENGTH} characters.`;
        }

        // Email validation
        if (!formData.email.trim()) {
            errors.email = 'Email is required.';
        } else if (!VALIDATION.EMAIL_PATTERN.test(formData.email)) {
            errors.email = 'Please enter a valid email address.';
        }

        // Phone validation
        if (!formData.phone.trim()) {
            errors.phone = 'Phone number is required.';
        } else if (!VALIDATION.PHONE_PATTERN.test(formData.phone)) {
            errors.phone = 'Please enter a valid phone number (10-15 digits).';
        }

        // Password validation
        if (!formData.password) {
            errors.password = 'Password is required.';
        } else if (formData.password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
            errors.password = `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters.`;
        } else if (formData.password.length > VALIDATION.PASSWORD_MAX_LENGTH) {
            errors.password = `Password must not exceed ${VALIDATION.PASSWORD_MAX_LENGTH} characters.`;
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password.';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match.';
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

        setLoading(true);

<<<<<<< HEAD
            const response = await fetch(`${APIURL}register`, {
=======
        try {
            const { name, email, phone, password } = formData;
            const userData = { name, email, phone, password };

            const response = await fetch(API_ENDPOINTS.REGISTER, {
>>>>>>> 2b35f1e4cb5fc7e2c2e28ff9ce957f7b73e1dc16
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/user-login'), 2000);
            } else {
                toast.error(data.message || 'Failed to register user. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred during registration. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-wrapper">
                <div className="register-card">
                    <div className="register-header">
                        <h2 className="register-title">Create Account</h2>
                        <p className="register-subtitle">Sign up to get started with QuizTest</p>
                    </div>

                    <div className="register-body">
                        <form onSubmit={handleRegister} noValidate>
                            {/* Name Field */}
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Full Name</label>
                                <div className="input-wrapper">
                                    <i className="bi bi-person input-icon"></i>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className={`form-input ${errors.name ? 'input-error' : ''}`}
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        disabled={loading}
                                        aria-label="Full name"
                                        aria-invalid={!!errors.name}
                                        aria-describedby={errors.name ? 'name-error' : undefined}
                                    />
                                </div>
                                {errors.name && (
                                    <div id="name-error" className="error-message" role="alert">
                                        <i className="bi bi-exclamation-circle"></i> {errors.name}
                                    </div>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <div className="input-wrapper">
                                    <i className="bi bi-envelope input-icon"></i>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className={`form-input ${errors.email ? 'input-error' : ''}`}
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={loading}
                                        aria-label="Email address"
                                        aria-invalid={!!errors.email}
                                        aria-describedby={errors.email ? 'email-error' : undefined}
                                    />
                                </div>
                                {errors.email && (
                                    <div id="email-error" className="error-message" role="alert">
                                        <i className="bi bi-exclamation-circle"></i> {errors.email}
                                    </div>
                                )}
                            </div>

                            {/* Phone Field */}
                            <div className="form-group">
                                <label htmlFor="phone" className="form-label">Phone Number</label>
                                <div className="input-wrapper">
                                    <i className="bi bi-telephone input-icon"></i>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className={`form-input ${errors.phone ? 'input-error' : ''}`}
                                        placeholder="Enter your phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={loading}
                                        aria-label="Phone number"
                                        aria-invalid={!!errors.phone}
                                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                                    />
                                </div>
                                {errors.phone && (
                                    <div id="phone-error" className="error-message" role="alert">
                                        <i className="bi bi-exclamation-circle"></i> {errors.phone}
                                    </div>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="form-group">
                                <label htmlFor="password" className="form-label">Password</label>
                                <div className="input-wrapper">
                                    <i className="bi bi-lock input-icon"></i>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        className={`form-input ${errors.password ? 'input-error' : ''}`}
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        disabled={loading}
                                        aria-label="Password"
                                        aria-invalid={!!errors.password}
                                        aria-describedby={errors.password ? 'password-error' : undefined}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={loading}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                                    </button>
                                </div>
                                {formData.password && passwordStrength.score > 0 && (
                                    <div className="password-strength">
                                        <div className="strength-bar">
                                            <div
                                                className="strength-fill"
                                                style={{
                                                    width: `${(passwordStrength.score / 5) * 100}%`,
                                                    backgroundColor: passwordStrength.color
                                                }}
                                            ></div>
                                        </div>
                                        <span className="strength-text" style={{ color: passwordStrength.color }}>
                                            {passwordStrength.text}
                                        </span>
                                    </div>
                                )}
                                {errors.password && (
                                    <div id="password-error" className="error-message" role="alert">
                                        <i className="bi bi-exclamation-circle"></i> {errors.password}
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="form-group">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <div className="input-wrapper">
                                    <i className="bi bi-lock-fill input-icon"></i>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        disabled={loading}
                                        aria-label="Confirm password"
                                        aria-invalid={!!errors.confirmPassword}
                                        aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        disabled={loading}
                                        aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                                    >
                                        <i className={`bi bi-eye${showConfirmPassword ? '-slash' : ''}`}></i>
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <div id="confirm-password-error" className="error-message" role="alert">
                                        <i className="bi bi-exclamation-circle"></i> {errors.confirmPassword}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="btn-primary btn-register"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner"></span>
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-person-plus"></i>
                                        Create Account
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="register-footer">
                            <p className="login-text">
                                Already have an account?{' '}
                                <Link to="/user-login" className="login-link">
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <style jsx>{`
                .register-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 40px 20px;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                .register-wrapper {
                    width: 100%;
                    max-width: 500px;
                    animation: fadeInUp 0.5s ease-out;
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .register-card {
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    overflow: hidden;
                }

                .register-header {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    padding: 40px 30px;
                    text-align: center;
                    color: white;
                }

                .register-title {
                    font-size: 28px;
                    font-weight: 700;
                    margin: 0 0 8px 0;
                }

                .register-subtitle {
                    font-size: 14px;
                    opacity: 0.9;
                    margin: 0;
                }

                .register-body {
                    padding: 40px 30px;
                    max-height: 70vh;
                    overflow-y: auto;
                }

                .form-group {
                    margin-bottom: 20px;
                }

                .form-label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 600;
                    font-size: 14px;
                    color: #333;
                }

                .input-wrapper {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .input-icon {
                    position: absolute;
                    left: 16px;
                    color: #667eea;
                    font-size: 18px;
                    pointer-events: none;
                    z-index: 1;
                }

                .form-input {
                    width: 100%;
                    padding: 14px 16px 14px 48px;
                    border: 2px solid #e0e0e0;
                    border-radius: 10px;
                    font-size: 15px;
                    transition: all 0.3s ease;
                    background: #f8f9fa;
                }

                .form-input:focus {
                    outline: none;
                    border-color: #667eea;
                    background: white;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                }

                .form-input.input-error {
                    border-color: #dc3545;
                    background: #fff5f5;
                }

                .form-input:disabled {
                    background: #f0f0f0;
                    cursor: not-allowed;
                    opacity: 0.7;
                }

                .password-toggle {
                    position: absolute;
                    right: 16px;
                    background: none;
                    border: none;
                    color: #667eea;
                    cursor: pointer;
                    padding: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                    z-index: 1;
                }

                .password-toggle:hover:not(:disabled) {
                    color: #764ba2;
                    transform: scale(1.1);
                }

                .password-toggle:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .password-strength {
                    margin-top: 8px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .strength-bar {
                    flex: 1;
                    height: 4px;
                    background: #e0e0e0;
                    border-radius: 2px;
                    overflow: hidden;
                }

                .strength-fill {
                    height: 100%;
                    transition: all 0.3s ease;
                }

                .strength-text {
                    font-size: 12px;
                    font-weight: 600;
                    min-width: 80px;
                    text-align: right;
                }

                .error-message {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    margin-top: 8px;
                    color: #dc3545;
                    font-size: 13px;
                    animation: shake 0.3s ease-in-out;
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }

                .btn-primary {
                    width: 100%;
                    padding: 16px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    margin-top: 30px;
                }

                .btn-primary:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
                }

                .btn-primary:active:not(:disabled) {
                    transform: translateY(0);
                }

                .btn-primary:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                    transform: none;
                }

                .spinner {
                    width: 18px;
                    height: 18px;
                    border: 3px solid rgba(255, 255, 255, 0.3);
                    border-top-color: white;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .register-footer {
                    margin-top: 30px;
                    text-align: center;
                    padding-top: 20px;
                    border-top: 1px solid #e0e0e0;
                }

                .login-text {
                    color: #666;
                    font-size: 14px;
                    margin: 0;
                }

                .login-link {
                    color: #667eea;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.2s;
                }

                .login-link:hover {
                    color: #764ba2;
                    text-decoration: underline;
                }

                @media (max-width: 480px) {
                    .register-container {
                        padding: 20px 10px;
                    }

                    .register-header {
                        padding: 30px 20px;
                    }

                    .register-body {
                        padding: 30px 20px;
                    }

                    .register-title {
                        font-size: 24px;
                    }
                }
            `}</style>
        </div>
    );
};

export default UserRegistration;
