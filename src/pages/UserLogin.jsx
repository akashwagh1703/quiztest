import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ENDPOINTS, VALIDATION } from "../config/Constant";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateFields = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!VALIDATION.EMAIL_PATTERN.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!password.trim()) {
      errors.password = "Password is required.";
    } else if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
      errors.password = `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters.`;
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store both user data and token
        localStorage.setItem("userData", JSON.stringify(data.user));
        localStorage.setItem("authToken", data.token);

        toast.success("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/quiz-dashbord");
        }, 1000);
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Sign in to continue to QuizTest</p>
          </div>

          <div className="login-body">
            <form onSubmit={handleLogin} noValidate>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <i className="bi bi-envelope input-icon"></i>
                  <input
                    type="email"
                    id="email"
                    className={`form-input ${errors.email ? "input-error" : ""}`}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    disabled={loading}
                    aria-label="Email address"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                </div>
                {errors.email && (
                  <div id="email-error" className="error-message" role="alert">
                    <i className="bi bi-exclamation-circle"></i> {errors.email}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-wrapper">
                  <i className="bi bi-lock input-icon"></i>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className={`form-input ${errors.password ? "input-error" : ""}`}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: "" });
                    }}
                    disabled={loading}
                    aria-label="Password"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password-error" : undefined}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                    disabled={loading}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <i className={`bi bi-eye${showPassword ? "-slash" : ""}`}></i>
                  </button>
                </div>
                {errors.password && (
                  <div id="password-error" className="error-message" role="alert">
                    <i className="bi bi-exclamation-circle"></i> {errors.password}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn-primary btn-login"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right"></i>
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="login-footer">
              <p className="signup-text">
                Don't have an account?{" "}
                <Link to="/user-register" className="signup-link">
                  Sign up here
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
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .login-wrapper {
          width: 100%;
          max-width: 450px;
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

        .login-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }

        .login-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 30px;
          text-align: center;
          color: white;
        }

        .login-title {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 8px 0;
        }

        .login-subtitle {
          font-size: 14px;
          opacity: 0.9;
          margin: 0;
        }

        .login-body {
          padding: 40px 30px;
        }

        .form-group {
          margin-bottom: 24px;
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

        .login-footer {
          margin-top: 30px;
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
        }

        .signup-text {
          color: #666;
          font-size: 14px;
          margin: 0;
        }

        .signup-link {
          color: #667eea;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }

        .signup-link:hover {
          color: #764ba2;
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .login-container {
            padding: 10px;
          }

          .login-header {
            padding: 30px 20px;
          }

          .login-body {
            padding: 30px 20px;
          }

          .login-title {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
};

export default UserLogin;
