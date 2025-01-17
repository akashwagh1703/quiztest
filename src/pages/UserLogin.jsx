import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateFields = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!password.trim()) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Email:', email); // Log email
    console.log('Password:', password); // Log password

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userData", JSON.stringify(data.user));
        navigate("/quiz-test");
      } else {
        const data = await response.json();
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during login.");
    }
  };


  const goToRegister = () => {
    navigate("/user-register"); // Redirect to the registration page
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg rounded-lg">
        <div className="card-header text-center bg-info text-white">
          <h2>User Login</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleLogin} noValidate>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Login
            </button>
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={goToRegister}
            >
              Go to Register
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserLogin;
